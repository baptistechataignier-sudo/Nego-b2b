#!/usr/bin/env python3
"""
check.py — Pre- and post-deployment health checks for Claude financial services agents.

Usage:
    python3 scripts/check.py --plugin-dir <path> --env <dev|staging|prod>
    python3 scripts/check.py --plugin-dir <path> --env prod --post-deploy
    python3 scripts/check.py --all  # Check all plugins in the marketplace
"""

import argparse
import json
import os
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).parent.parent
MARKETPLACE_JSON = REPO_ROOT / ".claude-plugin" / "marketplace.json"

# ANSI colors
GREEN = "\033[92m"
YELLOW = "\033[93m"
RED = "\033[91m"
RESET = "\033[0m"
BOLD = "\033[1m"


def ok(msg: str) -> None:
    print(f"  {GREEN}✓{RESET} {msg}")


def warn(msg: str) -> None:
    print(f"  {YELLOW}⚠{RESET} {msg}")


def fail(msg: str) -> None:
    print(f"  {RED}✗{RESET} {msg}")


def check_plugin_structure(plugin_dir: Path) -> list[str]:
    """Return a list of error messages for structural issues."""
    errors = []

    plugin_json = plugin_dir / ".claude-plugin" / "plugin.json"
    if not plugin_json.exists():
        errors.append(f"Missing plugin.json at {plugin_json.relative_to(REPO_ROOT)}")
        return errors  # Can't continue without manifest

    # Validate plugin.json schema
    try:
        with open(plugin_json) as f:
            manifest = json.load(f)
    except json.JSONDecodeError as e:
        errors.append(f"Invalid JSON in plugin.json: {e}")
        return errors

    required_fields = ["name", "description", "version", "author", "license"]
    for field in required_fields:
        if field not in manifest:
            errors.append(f"plugin.json missing required field: '{field}'")

    # Check version format
    version = manifest.get("version", "")
    parts = version.split(".")
    if len(parts) != 3 or not all(p.isdigit() for p in parts):
        errors.append(f"plugin.json version '{version}' is not valid semver (expected X.Y.Z)")

    # Check for agent definitions (if it's an agent plugin)
    agents_dir = plugin_dir / "agents"
    if agents_dir.exists():
        agent_files = list(agents_dir.glob("*.md"))
        if not agent_files:
            errors.append(f"agents/ directory exists but contains no .md files")

        for agent_file in agent_files:
            content = agent_file.read_text()
            if not content.startswith("---"):
                errors.append(f"{agent_file.name} is missing YAML frontmatter")
            elif "name:" not in content.split("---")[1]:
                errors.append(f"{agent_file.name} frontmatter is missing 'name' field")
            elif "description:" not in content.split("---")[1]:
                errors.append(f"{agent_file.name} frontmatter is missing 'description' field")

    # Check for skill definitions
    skills_dir = plugin_dir / "skills"
    if skills_dir.exists():
        for skill_dir in skills_dir.iterdir():
            if skill_dir.is_dir():
                skill_md = skill_dir / "SKILL.md"
                if not skill_md.exists():
                    errors.append(f"Skill directory '{skill_dir.name}' is missing SKILL.md")
                else:
                    content = skill_md.read_text()
                    if not content.startswith("---"):
                        errors.append(f"skills/{skill_dir.name}/SKILL.md is missing YAML frontmatter")

    # Check for command definitions
    commands_dir = plugin_dir / "commands"
    if commands_dir.exists():
        for cmd_file in commands_dir.glob("*.md"):
            content = cmd_file.read_text()
            if not content.startswith("---"):
                errors.append(f"commands/{cmd_file.name} is missing YAML frontmatter")

    return errors


def check_marketplace_registry(plugin_dir: Path) -> list[str]:
    """Verify the plugin is registered in marketplace.json."""
    errors = []
    if not MARKETPLACE_JSON.exists():
        errors.append("marketplace.json not found at .claude-plugin/marketplace.json")
        return errors

    with open(MARKETPLACE_JSON) as f:
        marketplace = json.load(f)

    plugin_json = plugin_dir / ".claude-plugin" / "plugin.json"
    if not plugin_json.exists():
        return errors  # Already reported in structure check

    with open(plugin_json) as f:
        manifest = json.load(f)

    plugin_name = manifest.get("name", "")
    registered_names = [p["name"] for p in marketplace.get("plugins", [])]

    if plugin_name not in registered_names:
        errors.append(
            f"Plugin '{plugin_name}' is not registered in marketplace.json. "
            f"Add it to the 'plugins' array."
        )
    else:
        # Check that source path is correct
        entry = next(p for p in marketplace["plugins"] if p["name"] == plugin_name)
        expected_source = "./" + str(plugin_dir.relative_to(REPO_ROOT))
        actual_source = entry.get("source", "")
        if actual_source != expected_source:
            errors.append(
                f"marketplace.json source path for '{plugin_name}' is '{actual_source}', "
                f"expected '{expected_source}'"
            )

    return errors


def check_environment_config(plugin_dir: Path, env: str) -> list[str]:
    """Check environment-specific configuration."""
    errors = []

    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        errors.append("ANTHROPIC_API_KEY is not set in the environment")
    elif not api_key.startswith("sk-ant-"):
        errors.append("ANTHROPIC_API_KEY does not look like a valid Anthropic API key (expected 'sk-ant-' prefix)")

    if env == "prod":
        # Additional production checks
        if not os.environ.get("ANTHROPIC_RATE_LIMIT_TIER"):
            errors.append("ANTHROPIC_RATE_LIMIT_TIER should be set for production deployments")

    return errors


def run_checks(plugin_dir: Path, env: str, post_deploy: bool = False) -> bool:
    """Run all checks for a plugin. Returns True if all pass."""
    print(f"\n{BOLD}Checking: {plugin_dir.relative_to(REPO_ROOT)}{RESET}")

    all_errors = []

    # Structural checks
    print("  Structure:")
    errors = check_plugin_structure(plugin_dir)
    for e in errors:
        fail(e)
    if not errors:
        ok("Plugin structure is valid")
    all_errors.extend(errors)

    # Marketplace registry check
    print("  Marketplace registry:")
    errors = check_marketplace_registry(plugin_dir)
    for e in errors:
        fail(e)
    if not errors:
        ok("Plugin is registered in marketplace.json")
    all_errors.extend(errors)

    # Environment config check
    print(f"  Environment ({env}):")
    errors = check_environment_config(plugin_dir, env)
    for e in errors:
        warn(e)  # Environment issues are warnings, not blocking errors
    if not errors:
        ok("Environment configuration looks good")

    if all_errors:
        print(f"\n  {RED}{BOLD}Result: FAILED — {len(all_errors)} error(s) found{RESET}")
        return False
    else:
        print(f"\n  {GREEN}{BOLD}Result: PASSED{RESET}")
        return True


def main() -> int:
    parser = argparse.ArgumentParser(description="Check Claude plugin health")
    parser.add_argument("--plugin-dir", type=Path, help="Path to the plugin directory")
    parser.add_argument("--env", default="dev", choices=["dev", "staging", "prod"])
    parser.add_argument("--post-deploy", action="store_true", help="Run post-deployment verification")
    parser.add_argument("--all", action="store_true", help="Check all plugins in the marketplace")
    args = parser.parse_args()

    if args.all:
        # Check all plugins listed in marketplace.json
        if not MARKETPLACE_JSON.exists():
            print(f"{RED}ERROR: marketplace.json not found{RESET}", file=sys.stderr)
            return 1

        with open(MARKETPLACE_JSON) as f:
            marketplace = json.load(f)

        results = []
        for plugin_entry in marketplace.get("plugins", []):
            source = plugin_entry["source"].lstrip("./")
            plugin_dir = REPO_ROOT / source
            if plugin_dir.exists():
                passed = run_checks(plugin_dir, args.env)
                results.append(passed)
            else:
                print(f"{RED}ERROR: Plugin directory not found: {plugin_dir}{RESET}")
                results.append(False)

        total = len(results)
        passed = sum(results)
        print(f"\n{'='*60}")
        print(f"Summary: {passed}/{total} plugins passed all checks")
        return 0 if passed == total else 1

    elif args.plugin_dir:
        plugin_dir = args.plugin_dir.resolve()
        if not plugin_dir.exists():
            print(f"{RED}ERROR: Plugin directory not found: {plugin_dir}{RESET}", file=sys.stderr)
            return 1
        passed = run_checks(plugin_dir, args.env, post_deploy=args.post_deploy)
        return 0 if passed else 1

    else:
        parser.print_help()
        return 1


if __name__ == "__main__":
    sys.exit(main())
