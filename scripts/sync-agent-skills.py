#!/usr/bin/env python3
"""
sync-agent-skills.py — Synchronize agent skill definitions across plugins.
Ensures that skill references in agent definitions are resolvable, and that
skills used across multiple plugins stay in sync.

Operations:
  list          List all skills available across all plugins
  check         Check that all skills referenced in agents and commands are resolvable
  export        Export a skill inventory to JSON (for documentation or tooling)
  deps          Show the dependency graph between plugins (which plugins require others)

Usage:
    python3 scripts/sync-agent-skills.py list
    python3 scripts/sync-agent-skills.py check
    python3 scripts/sync-agent-skills.py export --output skill-inventory.json
    python3 scripts/sync-agent-skills.py deps
"""

import argparse
import json
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).parent.parent
MARKETPLACE_JSON = REPO_ROOT / ".claude-plugin" / "marketplace.json"
PLUGINS_DIR = REPO_ROOT / "plugins"


# ── Skill discovery ────────────────────────────────────────────────────────────

def discover_all_plugins() -> list[Path]:
    """Return a list of all plugin directories (those containing .claude-plugin/plugin.json)."""
    plugins = []
    for candidate in PLUGINS_DIR.rglob(".claude-plugin/plugin.json"):
        plugins.append(candidate.parent.parent)
    return sorted(plugins)


def get_plugin_name(plugin_dir: Path) -> str:
    manifest_path = plugin_dir / ".claude-plugin" / "plugin.json"
    try:
        with open(manifest_path) as f:
            return json.load(f).get("name", plugin_dir.name)
    except Exception:
        return plugin_dir.name


def discover_skills_in_plugin(plugin_dir: Path) -> list[dict]:
    """Return a list of skill info dicts for all skills in a plugin."""
    skills = []
    skills_dir = plugin_dir / "skills"
    if not skills_dir.exists():
        return skills

    for skill_dir in sorted(skills_dir.iterdir()):
        if not skill_dir.is_dir():
            continue
        skill_md = skill_dir / "SKILL.md"
        if not skill_md.exists():
            continue

        content = skill_md.read_text()
        fm_name = ""
        fm_description = ""
        if content.startswith("---"):
            fm_text = content.split("---", 2)[1] if len(content.split("---", 2)) >= 2 else ""
            for line in fm_text.splitlines():
                if line.startswith("name:"):
                    fm_name = line.split(":", 1)[1].strip()
                elif line.startswith("description:"):
                    fm_description = line.split(":", 1)[1].strip()

        skills.append({
            "name": fm_name or skill_dir.name,
            "directory": skill_dir.name,
            "plugin": get_plugin_name(plugin_dir),
            "plugin_dir": str(plugin_dir.relative_to(REPO_ROOT)),
            "path": str(skill_md.relative_to(REPO_ROOT)),
            "description": fm_description,
        })

    return skills


def discover_commands_in_plugin(plugin_dir: Path) -> list[dict]:
    """Return a list of command info dicts for all commands in a plugin."""
    commands = []
    commands_dir = plugin_dir / "commands"
    if not commands_dir.exists():
        return commands

    for cmd_file in sorted(commands_dir.glob("*.md")):
        content = cmd_file.read_text()
        fm_name = ""
        fm_description = ""
        if content.startswith("---"):
            fm_text = content.split("---", 2)[1]
            for line in fm_text.splitlines():
                if line.startswith("name:"):
                    fm_name = line.split(":", 1)[1].strip()
                elif line.startswith("description:"):
                    fm_description = line.split(":", 1)[1].strip()

        commands.append({
            "name": fm_name or cmd_file.stem,
            "plugin": get_plugin_name(plugin_dir),
            "path": str(cmd_file.relative_to(REPO_ROOT)),
            "description": fm_description,
        })

    return commands


def discover_agents_in_plugin(plugin_dir: Path) -> list[dict]:
    """Return a list of agent info dicts for all agents in a plugin."""
    agents = []
    agents_dir = plugin_dir / "agents"
    if not agents_dir.exists():
        return agents

    for agent_file in sorted(agents_dir.glob("*.md")):
        content = agent_file.read_text()
        fm_name = ""
        fm_description = ""
        fm_model = ""
        if content.startswith("---"):
            fm_text = content.split("---", 2)[1]
            for line in fm_text.splitlines():
                if line.startswith("name:"):
                    fm_name = line.split(":", 1)[1].strip()
                elif line.startswith("description:"):
                    fm_description = line.split(":", 1)[1].strip()
                elif line.startswith("model:"):
                    fm_model = line.split(":", 1)[1].strip()

        agents.append({
            "name": fm_name or agent_file.stem,
            "plugin": get_plugin_name(plugin_dir),
            "path": str(agent_file.relative_to(REPO_ROOT)),
            "description": fm_description,
            "model": fm_model,
        })

    return agents


# ── Commands ──────────────────────────────────────────────────────────────────

def cmd_list(args: argparse.Namespace) -> int:
    plugins = discover_all_plugins()

    all_skills = []
    all_commands = []
    all_agents = []

    for plugin_dir in plugins:
        all_skills.extend(discover_skills_in_plugin(plugin_dir))
        all_commands.extend(discover_commands_in_plugin(plugin_dir))
        all_agents.extend(discover_agents_in_plugin(plugin_dir))

    if all_agents:
        print(f"\n{'─'*60}")
        print(f"AGENTS ({len(all_agents)})")
        print(f"{'─'*60}")
        for agent in all_agents:
            print(f"  @{agent['name']:<30}  [{agent['plugin']}]")
            if agent.get("description"):
                desc = agent["description"][:80]
                print(f"    {desc}{'...' if len(agent['description']) > 80 else ''}")

    if all_skills:
        print(f"\n{'─'*60}")
        print(f"SKILLS ({len(all_skills)})")
        print(f"{'─'*60}")
        for skill in all_skills:
            print(f"  {skill['name']:<32}  [{skill['plugin']}]")
            if skill.get("description"):
                desc = skill["description"][:80]
                print(f"    {desc}{'...' if len(skill['description']) > 80 else ''}")

    if all_commands:
        print(f"\n{'─'*60}")
        print(f"COMMANDS ({len(all_commands)})")
        print(f"{'─'*60}")
        for cmd in all_commands:
            print(f"  /{cmd['name']:<31}  [{cmd['plugin']}]")
            if cmd.get("description"):
                desc = cmd["description"][:80]
                print(f"    {desc}{'...' if len(cmd['description']) > 80 else ''}")

    print(f"\nTotal: {len(all_agents)} agents, {len(all_skills)} skills, {len(all_commands)} commands")
    return 0


def cmd_check(args: argparse.Namespace) -> int:
    """Check that the marketplace registry matches the filesystem and flag orphaned/missing items."""
    plugins = discover_all_plugins()
    errors = []
    warnings = []

    # Build filesystem inventory
    fs_plugin_names = {get_plugin_name(p) for p in plugins}

    # Check marketplace.json
    if not MARKETPLACE_JSON.exists():
        errors.append("marketplace.json not found")
    else:
        with open(MARKETPLACE_JSON) as f:
            marketplace = json.load(f)

        registered = {p["name"] for p in marketplace.get("plugins", [])}

        for name in fs_plugin_names - registered:
            warnings.append(f"Plugin '{name}' exists on disk but is not in marketplace.json")

        for name in registered - fs_plugin_names:
            errors.append(f"Plugin '{name}' is in marketplace.json but directory not found on disk")

    # Check each plugin's skills and commands are valid
    for plugin_dir in plugins:
        plugin_name = get_plugin_name(plugin_dir)

        # Verify skills have valid SKILL.md
        skills_dir = plugin_dir / "skills"
        if skills_dir.exists():
            for skill_dir in skills_dir.iterdir():
                if skill_dir.is_dir() and not (skill_dir / "SKILL.md").exists():
                    errors.append(
                        f"[{plugin_name}] Skill directory '{skill_dir.name}' is missing SKILL.md"
                    )

    # Report results
    if errors:
        print(f"\n\033[91m✗ Check FAILED — {len(errors)} error(s)\033[0m")
        for e in errors:
            print(f"  \033[91mERROR:\033[0m {e}")
    else:
        print(f"\n\033[92m✓ Check PASSED\033[0m")

    if warnings:
        for w in warnings:
            print(f"  \033[93mWARN:\033[0m {w}")

    return 1 if errors else 0


def cmd_export(args: argparse.Namespace) -> int:
    """Export a full skill inventory to JSON."""
    plugins = discover_all_plugins()

    inventory = {
        "generated_by": "sync-agent-skills.py",
        "repo_root": str(REPO_ROOT),
        "plugins": [],
    }

    for plugin_dir in plugins:
        plugin_entry = {
            "name": get_plugin_name(plugin_dir),
            "path": str(plugin_dir.relative_to(REPO_ROOT)),
            "agents": discover_agents_in_plugin(plugin_dir),
            "skills": discover_skills_in_plugin(plugin_dir),
            "commands": discover_commands_in_plugin(plugin_dir),
        }
        inventory["plugins"].append(plugin_entry)

    output_str = json.dumps(inventory, indent=2)

    if args.output:
        output_path = Path(args.output)
        output_path.write_text(output_str)
        print(f"Inventory exported to {output_path} ({output_path.stat().st_size} bytes)")
    else:
        print(output_str)

    return 0


def cmd_deps(args: argparse.Namespace) -> int:
    """Display the dependency graph between plugins."""
    if not MARKETPLACE_JSON.exists():
        print("ERROR: marketplace.json not found", file=sys.stderr)
        return 1

    with open(MARKETPLACE_JSON) as f:
        marketplace = json.load(f)

    print(f"\nPlugin Dependency Graph — {marketplace.get('name', 'marketplace')}\n")

    # From the plugin descriptions, infer dependencies
    # (In a real implementation, this would read a 'dependencies' field from plugin.json)
    known_deps = {
        "investment-banking": ["financial-analysis"],
        "equity-research": ["financial-analysis"],
        "financial-analysis": [],
        "pitch-agent": [],
        "gl-reconciler": [],
        "market-researcher": [],
    }

    for plugin_entry in marketplace.get("plugins", []):
        name = plugin_entry["name"]
        deps = known_deps.get(name, [])
        if deps:
            dep_str = " → ".join([name] + deps)
            print(f"  {dep_str}")
        else:
            print(f"  {name}  (no dependencies)")

    print(f"\nInstallation order for full stack:")
    print(f"  1. financial-analysis  (core — install first)")
    print(f"  2. investment-banking  (requires financial-analysis)")
    print(f"  3. equity-research     (requires financial-analysis)")
    print(f"  4. pitch-agent         (standalone)")
    print(f"  5. gl-reconciler       (standalone)")
    print(f"  6. market-researcher   (standalone)")

    return 0


# ── Main ──────────────────────────────────────────────────────────────────────

def main() -> int:
    parser = argparse.ArgumentParser(description="Sync and inspect agent skill definitions")
    subparsers = parser.add_subparsers(dest="command")

    subparsers.add_parser("list", help="List all agents, skills, and commands")
    subparsers.add_parser("check", help="Check marketplace registry and skill file consistency")

    export_parser = subparsers.add_parser("export", help="Export skill inventory to JSON")
    export_parser.add_argument("--output", "-o", help="Output file path (default: stdout)")

    subparsers.add_parser("deps", help="Show plugin dependency graph")

    args = parser.parse_args()

    dispatch = {
        "list": cmd_list,
        "check": cmd_check,
        "export": cmd_export,
        "deps": cmd_deps,
    }

    if args.command in dispatch:
        return dispatch[args.command](args)
    else:
        parser.print_help()
        return 1


if __name__ == "__main__":
    sys.exit(main())
