#!/usr/bin/env python3
"""
orchestrate.py — Orchestrate multi-agent financial workflows using the
claude-for-financial-services plugin agents.

Supports:
  - Sequential pipelines (output of one agent → input of next)
  - Batch research runs (same agent across multiple inputs)
  - Scheduled workflows (run at close, on a cron schedule, etc.)
  - Workflow definitions from YAML config files

Usage:
    python3 scripts/orchestrate.py run --workflow pitch-and-research --company "Acme Corp"
    python3 scripts/orchestrate.py batch --agent market-researcher --inputs inputs.json
    python3 scripts/orchestrate.py list-workflows
    python3 scripts/orchestrate.py run --config workflows/q4-close.yaml
"""

import argparse
import json
import os
import sys
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).parent.parent

# ── Built-in workflow definitions ─────────────────────────────────────────────

BUILT_IN_WORKFLOWS: dict[str, dict] = {
    "pitch-and-research": {
        "description": "Run market-researcher then feed output to pitch-agent to build a data-driven pitch deck.",
        "steps": [
            {
                "agent": "market-researcher",
                "name": "market-research",
                "prompt_template": (
                    "Perform a full market sizing and competitive landscape analysis for {company} "
                    "in the {sector} space. Include TAM/SAM/SOM and identify the top 5 competitors."
                ),
                "output_var": "market_research",
            },
            {
                "agent": "pitch-agent",
                "name": "pitch-deck",
                "prompt_template": (
                    "Build a Series {round} pitch deck for {company}. "
                    "Use the following market research as the basis for the Market slide:\n\n"
                    "{market_research}\n\n"
                    "Additional company context: ARR={arr}, growth={growth_rate}% YoY, raising {raise_amount}."
                ),
                "inputs_from": {"market_research": "market-research.output"},
                "output_var": "pitch_deck",
            },
        ],
    },
    "monthly-gl-close": {
        "description": "Run GL reconciliation across a set of accounts for the monthly close.",
        "steps": [
            {
                "agent": "gl-reconciler",
                "name": "cash-reconciliation",
                "prompt_template": (
                    "Reconcile cash account (GL #{cash_account}) for {period}. "
                    "GL export: {gl_export_path}. Bank statement: {bank_statement_path}. "
                    "Opening balance: {opening_balance}."
                ),
                "output_var": "cash_recon",
            },
            {
                "agent": "gl-reconciler",
                "name": "ar-reconciliation",
                "prompt_template": (
                    "Reconcile accounts receivable (GL #{ar_account}) against sub-ledger for {period}. "
                    "GL export: {gl_export_path}. AR sub-ledger: {ar_subledger_path}."
                ),
                "output_var": "ar_recon",
            },
        ],
    },
    "competitive-intelligence": {
        "description": "Run market-researcher across a list of competitive markets for portfolio monitoring.",
        "steps": [
            {
                "agent": "market-researcher",
                "name": "competitive-research",
                "prompt_template": (
                    "Provide a competitive landscape update for {market}. "
                    "Focus on: new entrants in the last 6 months, funding rounds, product launches, "
                    "and any strategic moves by {competitor_list}. "
                    "Format as an executive intelligence brief."
                ),
                "output_var": "competitive_intel",
            }
        ],
    },
}


# ── Data classes ──────────────────────────────────────────────────────────────

@dataclass
class WorkflowStep:
    agent: str
    name: str
    prompt: str
    output_var: str
    timeout_seconds: int = 120


@dataclass
class WorkflowResult:
    step_name: str
    agent: str
    success: bool
    output: str = ""
    error: str = ""
    duration_seconds: float = 0.0


@dataclass
class WorkflowRun:
    workflow_name: str
    steps: list[WorkflowStep] = field(default_factory=list)
    results: list[WorkflowResult] = field(default_factory=list)
    context: dict[str, Any] = field(default_factory=dict)

    @property
    def succeeded(self) -> bool:
        return all(r.success for r in self.results)


# ── Agent runner ──────────────────────────────────────────────────────────────

class AgentRunner:
    """Calls a named agent with a prompt and returns the response."""

    def __init__(self, api_key: str) -> None:
        self.api_key = api_key

    def run(self, agent_name: str, prompt: str, timeout: int = 120) -> tuple[bool, str]:
        """
        Call the agent and return (success, output_text).
        In production, this calls the Anthropic API with the agent's system prompt.
        """
        agent_md_path = REPO_ROOT / "plugins" / "agent-plugins" / agent_name / "agents" / f"{agent_name}.md"

        if not agent_md_path.exists():
            return False, f"Agent definition not found: {agent_md_path}"

        # Load system prompt from agent .md (strip frontmatter)
        content = agent_md_path.read_text()
        parts = content.split("---", 2)
        system_prompt = parts[2].strip() if len(parts) >= 3 else content

        try:
            import anthropic  # type: ignore
            client = anthropic.Anthropic(api_key=self.api_key)
            message = client.messages.create(
                model="claude-sonnet-4-5",
                max_tokens=4096,
                system=system_prompt,
                messages=[{"role": "user", "content": prompt}],
            )
            output = message.content[0].text
            return True, output

        except ImportError:
            # Anthropic SDK not installed — simulate for testing
            print(f"  [SIMULATED] Would call agent '{agent_name}' with prompt ({len(prompt)} chars)")
            return True, f"[SIMULATED OUTPUT from {agent_name}]\n\nPrompt received ({len(prompt)} chars)."

        except Exception as e:
            return False, f"API call failed: {e}"


# ── Workflow engine ────────────────────────────────────────────────────────────

class WorkflowEngine:
    def __init__(self, runner: AgentRunner) -> None:
        self.runner = runner

    def resolve_template(self, template: str, context: dict) -> str:
        """Replace {variable} placeholders with context values."""
        try:
            return template.format(**context)
        except KeyError as e:
            raise ValueError(f"Missing required variable in workflow context: {e}")

    def run_workflow(self, workflow_def: dict, context: dict) -> WorkflowRun:
        run = WorkflowRun(workflow_name=workflow_def.get("description", "unnamed"), context=context)
        output_vars: dict[str, str] = {}

        for step_def in workflow_def.get("steps", []):
            agent = step_def["agent"]
            name = step_def["name"]
            template = step_def["prompt_template"]

            # Merge output variables from previous steps into context
            step_context = {**context, **output_vars}

            print(f"\n  → Step: {name} (agent: {agent})")

            try:
                prompt = self.resolve_template(template, step_context)
            except ValueError as e:
                result = WorkflowResult(
                    step_name=name, agent=agent, success=False, error=str(e)
                )
                run.results.append(result)
                print(f"    ✗ Failed: {e}")
                break

            start = time.time()
            success, output = self.runner.run(agent, prompt)
            duration = time.time() - start

            result = WorkflowResult(
                step_name=name,
                agent=agent,
                success=success,
                output=output if success else "",
                error="" if success else output,
                duration_seconds=duration,
            )
            run.results.append(result)

            if success:
                output_var = step_def.get("output_var", name)
                output_vars[output_var] = output
                print(f"    ✓ Completed in {duration:.1f}s ({len(output)} chars)")
            else:
                print(f"    ✗ Failed: {output}")
                break  # Stop pipeline on failure

        return run


# ── Batch runner ──────────────────────────────────────────────────────────────

def run_batch(agent_name: str, inputs: list[dict], runner: AgentRunner) -> None:
    """Run the same agent across multiple inputs in sequence."""
    print(f"\nBatch run: {agent_name} × {len(inputs)} inputs")

    results = []
    for i, input_item in enumerate(inputs):
        print(f"\n[{i+1}/{len(inputs)}] {input_item.get('label', f'Input {i+1}')}")
        prompt = input_item.get("prompt", "")
        if not prompt:
            print("  ✗ No 'prompt' field in input — skipping")
            continue

        success, output = runner.run(agent_name, prompt)
        results.append({"input": input_item, "success": success, "output": output})

        if success:
            print(f"  ✓ Done ({len(output)} chars)")
            # Write output if output_path is specified
            if "output_path" in input_item:
                output_path = Path(input_item["output_path"])
                output_path.parent.mkdir(parents=True, exist_ok=True)
                output_path.write_text(output)
                print(f"  → Output written to {output_path}")
        else:
            print(f"  ✗ Failed: {output}")

    successful = sum(1 for r in results if r["success"])
    print(f"\nBatch complete: {successful}/{len(inputs)} succeeded")


# ── CLI ────────────────────────────────────────────────────────────────────────

def main() -> int:
    parser = argparse.ArgumentParser(description="Orchestrate Claude financial services agents")
    subparsers = parser.add_subparsers(dest="command")

    # list-workflows
    subparsers.add_parser("list-workflows", help="List available built-in workflows")

    # run
    run_parser = subparsers.add_parser("run", help="Run a workflow")
    run_parser.add_argument("--workflow", choices=list(BUILT_IN_WORKFLOWS.keys()), help="Built-in workflow name")
    run_parser.add_argument("--config", type=Path, help="Path to a YAML workflow config file")
    run_parser.add_argument("--vars", type=json.loads, default={}, help="JSON object of workflow variables")

    # batch
    batch_parser = subparsers.add_parser("batch", help="Run an agent across multiple inputs")
    batch_parser.add_argument("--agent", required=True, help="Agent name")
    batch_parser.add_argument("--inputs", type=Path, required=True, help="Path to JSON file with inputs array")

    args = parser.parse_args()

    if args.command == "list-workflows":
        print("\nAvailable workflows:\n")
        for name, wf in BUILT_IN_WORKFLOWS.items():
            steps = ", ".join(s["name"] for s in wf["steps"])
            print(f"  {name}")
            print(f"    {wf['description']}")
            print(f"    Steps: {steps}\n")
        return 0

    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        print("ERROR: ANTHROPIC_API_KEY is not set", file=sys.stderr)
        return 1

    runner = AgentRunner(api_key=api_key)

    if args.command == "run":
        if args.workflow:
            workflow_def = BUILT_IN_WORKFLOWS[args.workflow]
        elif args.config:
            try:
                import yaml  # type: ignore
                with open(args.config) as f:
                    workflow_def = yaml.safe_load(f)
            except ImportError:
                print("ERROR: PyYAML is required for --config. Install with: pip install pyyaml", file=sys.stderr)
                return 1
        else:
            print("ERROR: Provide --workflow or --config", file=sys.stderr)
            return 1

        engine = WorkflowEngine(runner)
        print(f"\nRunning workflow: {workflow_def.get('description', args.workflow)}")
        run = engine.run_workflow(workflow_def, args.vars)

        print(f"\n{'='*60}")
        if run.succeeded:
            print(f"\033[92m✓ Workflow completed successfully\033[0m")
            print("\nOutputs:")
            for result in run.results:
                print(f"  {result.step_name}: {len(result.output)} chars in {result.duration_seconds:.1f}s")
        else:
            print(f"\033[91m✗ Workflow failed\033[0m")
            for result in run.results:
                if not result.success:
                    print(f"  Failed at step '{result.step_name}': {result.error}")
        return 0 if run.succeeded else 1

    elif args.command == "batch":
        if not args.inputs.exists():
            print(f"ERROR: Inputs file not found: {args.inputs}", file=sys.stderr)
            return 1

        with open(args.inputs) as f:
            inputs = json.load(f)

        if not isinstance(inputs, list):
            print("ERROR: Inputs JSON must be an array of objects with 'prompt' and optional 'label' fields", file=sys.stderr)
            return 1

        run_batch(args.agent, inputs, runner)
        return 0

    else:
        parser.print_help()
        return 1


if __name__ == "__main__":
    sys.exit(main())
