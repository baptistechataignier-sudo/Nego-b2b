#!/usr/bin/env bash
# deploy-managed-agent.sh
# Deploy a managed agent from the claude-for-financial-services marketplace.
#
# Usage:
#   ./scripts/deploy-managed-agent.sh <agent-name> [--env ENV] [--dry-run]
#
# Arguments:
#   agent-name    One of: pitch-agent, gl-reconciler, market-researcher
#   --env         Deployment environment: dev | staging | prod (default: dev)
#   --dry-run     Print what would happen without actually deploying
#
# Requirements:
#   - ANTHROPIC_API_KEY set in environment or .env file
#   - claude CLI installed and authenticated
#   - jq installed for JSON parsing

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# ── Defaults ────────────────────────────────────────────────────────────────
AGENT_NAME=""
ENV="dev"
DRY_RUN=false

# ── Parse arguments ──────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
  case "$1" in
    --env)
      ENV="$2"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    -h|--help)
      head -20 "$0" | grep '^#' | sed 's/^# \?//'
      exit 0
      ;;
    *)
      if [[ -z "$AGENT_NAME" ]]; then
        AGENT_NAME="$1"
      else
        echo "ERROR: Unexpected argument: $1" >&2
        exit 1
      fi
      shift
      ;;
  esac
done

# ── Validate inputs ──────────────────────────────────────────────────────────
VALID_AGENTS=("pitch-agent" "gl-reconciler" "market-researcher")

if [[ -z "$AGENT_NAME" ]]; then
  echo "ERROR: agent-name is required." >&2
  echo "Usage: $0 <agent-name> [--env ENV] [--dry-run]" >&2
  exit 1
fi

valid=false
for a in "${VALID_AGENTS[@]}"; do
  [[ "$AGENT_NAME" == "$a" ]] && valid=true && break
done

if [[ "$valid" == "false" ]]; then
  echo "ERROR: Unknown agent '$AGENT_NAME'. Valid agents: ${VALID_AGENTS[*]}" >&2
  exit 1
fi

PLUGIN_DIR="${REPO_ROOT}/plugins/agent-plugins/${AGENT_NAME}"
PLUGIN_JSON="${PLUGIN_DIR}/.claude-plugin/plugin.json"
AGENT_MD="${PLUGIN_DIR}/agents/${AGENT_NAME}.md"

if [[ ! -f "$PLUGIN_JSON" ]]; then
  echo "ERROR: plugin.json not found at ${PLUGIN_JSON}" >&2
  exit 1
fi

if [[ ! -f "$AGENT_MD" ]]; then
  echo "ERROR: Agent definition not found at ${AGENT_MD}" >&2
  exit 1
fi

# ── Load environment variables ───────────────────────────────────────────────
ENV_FILE="${REPO_ROOT}/.env.${ENV}"
if [[ -f "$ENV_FILE" ]]; then
  echo "Loading environment from ${ENV_FILE}"
  # shellcheck disable=SC1090
  set -a; source "$ENV_FILE"; set +a
elif [[ -f "${REPO_ROOT}/.env" ]]; then
  echo "Loading environment from .env"
  # shellcheck disable=SC1091
  set -a; source "${REPO_ROOT}/.env"; set +a
fi

if [[ -z "${ANTHROPIC_API_KEY:-}" ]]; then
  echo "ERROR: ANTHROPIC_API_KEY is not set." >&2
  echo "Set it in your environment or in .env.${ENV}" >&2
  exit 1
fi

# ── Read plugin metadata ─────────────────────────────────────────────────────
PLUGIN_NAME=$(jq -r '.name' "$PLUGIN_JSON")
PLUGIN_VERSION=$(jq -r '.version' "$PLUGIN_JSON")
PLUGIN_DESC=$(jq -r '.description' "$PLUGIN_JSON")

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Deploying Managed Agent"
echo "  Agent:       ${PLUGIN_NAME} v${PLUGIN_VERSION}"
echo "  Environment: ${ENV}"
echo "  Description: ${PLUGIN_DESC}"
echo "  Dry run:     ${DRY_RUN}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ── Validate agent definition ────────────────────────────────────────────────
echo ""
echo "Step 1/4: Validating agent definition..."
python3 "${SCRIPT_DIR}/validate.py" --plugin-dir "$PLUGIN_DIR"

# ── Run pre-deployment checks ────────────────────────────────────────────────
echo ""
echo "Step 2/4: Running pre-deployment checks..."
python3 "${SCRIPT_DIR}/check.py" --plugin-dir "$PLUGIN_DIR" --env "$ENV"

# ── Deploy ───────────────────────────────────────────────────────────────────
echo ""
echo "Step 3/4: Deploying agent..."

if [[ "$DRY_RUN" == "true" ]]; then
  echo "[DRY RUN] Would deploy agent '${PLUGIN_NAME}' to environment '${ENV}'"
  echo "[DRY RUN] Agent definition: ${AGENT_MD}"
  echo "[DRY RUN] Plugin manifest:  ${PLUGIN_JSON}"
  echo "[DRY RUN] API key:          ${ANTHROPIC_API_KEY:0:8}... (truncated)"
else
  # Deploy via claude CLI
  if command -v claude &>/dev/null; then
    claude agent deploy \
      --name "$PLUGIN_NAME" \
      --definition "$AGENT_MD" \
      --env "$ENV" \
      --api-key "$ANTHROPIC_API_KEY"
  else
    echo "WARNING: claude CLI not found. Deploying via API directly..."
    # Fallback: direct API deployment
    SYSTEM_PROMPT=$(python3 -c "
import re, sys
content = open('${AGENT_MD}').read()
# Strip YAML frontmatter
body = re.sub(r'^---.*?---\n', '', content, flags=re.DOTALL).strip()
print(body)
")
    curl -sS -X POST https://api.anthropic.com/v1/agents \
      -H "x-api-key: ${ANTHROPIC_API_KEY}" \
      -H "anthropic-version: 2023-06-01" \
      -H "content-type: application/json" \
      -d "$(jq -n \
        --arg name "$PLUGIN_NAME" \
        --arg desc "$PLUGIN_DESC" \
        --arg prompt "$SYSTEM_PROMPT" \
        '{name: $name, description: $desc, system_prompt: $prompt}')"
  fi
  echo "Agent '${PLUGIN_NAME}' deployed to '${ENV}' successfully."
fi

# ── Post-deployment verification ─────────────────────────────────────────────
echo ""
echo "Step 4/4: Post-deployment verification..."

if [[ "$DRY_RUN" == "false" ]]; then
  python3 "${SCRIPT_DIR}/check.py" --plugin-dir "$PLUGIN_DIR" --env "$ENV" --post-deploy
fi

echo ""
echo "Done. Agent '${PLUGIN_NAME}' is ready in '${ENV}'."
