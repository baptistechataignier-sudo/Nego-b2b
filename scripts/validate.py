#!/usr/bin/env python3
"""
validate.py — Validate Claude plugin manifests, agent definitions, and skill files
against the expected schema before deployment.

Usage:
    python3 scripts/validate.py --plugin-dir <path>
    python3 scripts/validate.py --marketplace
    python3 scripts/validate.py --all
"""

import argparse
import json
import re
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).parent.parent
MARKETPLACE_JSON = REPO_ROOT / ".claude-plugin" / "marketplace.json"

# Required top-level fields in plugin.json
PLUGIN_JSON_REQUIRED = {"name", "description", "version", "author", "license"}
PLUGIN_JSON_AUTHOR_REQUIRED = {"name", "email"}
MARKETPLACE_JSON_REQUIRED = {"name", "description", "owner", "plugins"}
MARKETPLACE_PLUGIN_ENTRY_REQUIRED = {"name", "description", "version", "source"}

# Agent frontmatter required fields
AGENT_FRONTMATTER_REQUIRED = {"name", "description", "model"}

# Skill frontmatter required fields
SKILL_FRONTMATTER_REQUIRED = {"name", "description"}

SEMVER_RE = re.compile(r"^\d+\.\d+\.\d+$")


class ValidationError(Exception):
    pass


class Validator:
    def __init__(self) -> None:
        self.errors: list[str] = []
        self.warnings: list[str] = []

    def error(self, msg: str) -> None:
        self.errors.append(msg)

    def warning(self, msg: str) -> None:
        self.warnings.append(msg)

    @property
    def passed(self) -> bool:
        return len(self.errors) == 0

    def _parse_frontmatter(self, content: str, filepath: Path) -> dict:
        """Extract YAML frontmatter fields (simple key-value parser, no yaml dep)."""
        if not content.startswith("---"):
            self.error(f"{filepath.name}: Missing YAML frontmatter (must start with ---)")
            return {}

        parts = content.split("---", 2)
        if len(parts) < 3:
            self.error(f"{filepath.name}: Malformed YAML frontmatter (missing closing ---)")
            return {}

        fm_text = parts[1]
        fields = {}
        # Simple key: value or key: | (multiline block) parsing
        for line in fm_text.splitlines():
            if ":" in line and not line.startswith(" "):
                key, _, value = line.partition(":")
                fields[key.strip()] = value.strip()

        return fields

    def validate_plugin_json(self, plugin_json_path: Path) -> None:
        """Validate a plugin.json manifest file."""
        try:
            with open(plugin_json_path) as f:
                manifest = json.load(f)
        except FileNotFoundError:
            self.error(f"plugin.json not found at {plugin_json_path}")
            return
        except json.JSONDecodeError as e:
            self.error(f"plugin.json at {plugin_json_path} is invalid JSON: {e}")
            return

        rel = plugin_json_path.relative_to(REPO_ROOT)

        # Required fields
        for field in PLUGIN_JSON_REQUIRED:
            if field not in manifest:
                self.error(f"{rel}: Missing required field '{field}'")

        # Version format
        version = manifest.get("version", "")
        if version and not SEMVER_RE.match(version):
            self.error(f"{rel}: version '{version}' is not valid semver (expected X.Y.Z)")

        # Author structure
        author = manifest.get("author", {})
        if isinstance(author, dict):
            for field in PLUGIN_JSON_AUTHOR_REQUIRED:
                if field not in author:
                    self.error(f"{rel}: author is missing required field '{field}'")
        else:
            self.error(f"{rel}: 'author' must be an object with 'name' and 'email' fields")

        # License is a known SPDX identifier
        license_val = manifest.get("license", "")
        known_licenses = {"MIT", "Apache-2.0", "GPL-3.0", "BSD-2-Clause", "BSD-3-Clause", "ISC", "UNLICENSED"}
        if license_val and license_val not in known_licenses:
            self.warning(f"{rel}: license '{license_val}' is not a standard SPDX identifier")

        # Keywords should be a list
        keywords = manifest.get("keywords", [])
        if not isinstance(keywords, list):
            self.error(f"{rel}: 'keywords' must be an array")
        elif not keywords:
            self.warning(f"{rel}: 'keywords' array is empty — add relevant keywords for discovery")

    def validate_agent_md(self, agent_path: Path) -> None:
        """Validate an agent .md file."""
        rel = agent_path.relative_to(REPO_ROOT)
        try:
            content = agent_path.read_text()
        except FileNotFoundError:
            self.error(f"{rel}: File not found")
            return

        fields = self._parse_frontmatter(content, agent_path)
        if not fields:
            return  # Error already recorded

        for field in AGENT_FRONTMATTER_REQUIRED:
            if field not in fields:
                self.error(f"{rel}: frontmatter missing required field '{field}'")

        # Name matches filename
        stem = agent_path.stem
        fm_name = fields.get("name", "")
        if fm_name and fm_name != stem:
            self.warning(
                f"{rel}: frontmatter 'name' ({fm_name}) does not match filename ({stem}). "
                "These should match for consistent routing."
            )

        # Description should include examples
        description_section = content.split("---", 2)[1] if "---" in content else ""
        if "description:" in description_section and "<example>" not in description_section:
            self.warning(
                f"{rel}: Agent description does not include <example> blocks. "
                "Add at least 2 concrete examples for accurate agent routing."
            )

        # Model field
        model = fields.get("model", "")
        valid_models = {"inherit", "claude-opus-4-5", "claude-sonnet-4-5", "claude-haiku-4-5", "claude-opus-4-0", "claude-sonnet-4-0"}
        if model and model not in valid_models:
            self.warning(f"{rel}: model '{model}' is not a recognized value. Use 'inherit' to use the session model.")

        # Body should be non-trivial
        parts = content.split("---", 2)
        body = parts[2].strip() if len(parts) >= 3 else ""
        if len(body) < 200:
            self.warning(
                f"{rel}: Agent body is very short ({len(body)} chars). "
                "A production-quality agent definition should include role, process, and quality standards."
            )

    def validate_skill_md(self, skill_path: Path) -> None:
        """Validate a SKILL.md file."""
        rel = skill_path.relative_to(REPO_ROOT)
        try:
            content = skill_path.read_text()
        except FileNotFoundError:
            self.error(f"{rel}: File not found")
            return

        fields = self._parse_frontmatter(content, skill_path)
        if not fields:
            return

        for field in SKILL_FRONTMATTER_REQUIRED:
            if field not in fields:
                self.error(f"{rel}: frontmatter missing required field '{field}'")

        # Body content check
        parts = content.split("---", 2)
        body = parts[2].strip() if len(parts) >= 3 else ""
        if len(body) < 300:
            self.warning(
                f"{rel}: Skill body is short ({len(body)} chars). "
                "Skills should include substantive step-by-step process documentation."
            )

    def validate_command_md(self, cmd_path: Path) -> None:
        """Validate a command .md file."""
        rel = cmd_path.relative_to(REPO_ROOT)
        try:
            content = cmd_path.read_text()
        except FileNotFoundError:
            self.error(f"{rel}: File not found")
            return

        fields = self._parse_frontmatter(content, cmd_path)
        if not fields:
            return

        if "name" not in fields:
            self.error(f"{rel}: frontmatter missing required field 'name'")
        if "description" not in fields:
            self.error(f"{rel}: frontmatter missing required field 'description'")

    def validate_marketplace_json(self) -> None:
        """Validate the root marketplace.json."""
        if not MARKETPLACE_JSON.exists():
            self.error(f"marketplace.json not found at {MARKETPLACE_JSON.relative_to(REPO_ROOT)}")
            return

        try:
            with open(MARKETPLACE_JSON) as f:
                marketplace = json.load(f)
        except json.JSONDecodeError as e:
            self.error(f"marketplace.json is invalid JSON: {e}")
            return

        for field in MARKETPLACE_JSON_REQUIRED:
            if field not in marketplace:
                self.error(f"marketplace.json: Missing required field '{field}'")

        plugins = marketplace.get("plugins", [])
        if not isinstance(plugins, list):
            self.error("marketplace.json: 'plugins' must be an array")
            return

        if not plugins:
            self.warning("marketplace.json: 'plugins' array is empty")

        seen_names = set()
        for i, plugin in enumerate(plugins):
            if not isinstance(plugin, dict):
                self.error(f"marketplace.json: plugins[{i}] is not an object")
                continue

            for field in MARKETPLACE_PLUGIN_ENTRY_REQUIRED:
                if field not in plugin:
                    self.error(f"marketplace.json: plugins[{i}] missing required field '{field}'")

            name = plugin.get("name", "")
            if name in seen_names:
                self.error(f"marketplace.json: Duplicate plugin name '{name}'")
            seen_names.add(name)

            # Verify source path exists
            source = plugin.get("source", "").lstrip("./")
            if source:
                source_path = REPO_ROOT / source
                if not source_path.exists():
                    self.error(
                        f"marketplace.json: Plugin '{name}' source path "
                        f"'{plugin['source']}' does not exist"
                    )

    def validate_plugin_dir(self, plugin_dir: Path) -> None:
        """Validate all files within a plugin directory."""
        # plugin.json
        plugin_json = plugin_dir / ".claude-plugin" / "plugin.json"
        self.validate_plugin_json(plugin_json)

        # Agent files
        agents_dir = plugin_dir / "agents"
        if agents_dir.exists():
            for agent_file in sorted(agents_dir.glob("*.md")):
                self.validate_agent_md(agent_file)

        # Skill files
        skills_dir = plugin_dir / "skills"
        if skills_dir.exists():
            for skill_dir in sorted(skills_dir.iterdir()):
                if skill_dir.is_dir():
                    skill_md = skill_dir / "SKILL.md"
                    self.validate_skill_md(skill_md)

        # Command files
        commands_dir = plugin_dir / "commands"
        if commands_dir.exists():
            for cmd_file in sorted(commands_dir.glob("*.md")):
                self.validate_command_md(cmd_file)


def print_results(v: Validator, label: str) -> None:
    if v.errors:
        print(f"\n\033[91m✗ FAILED: {label}\033[0m")
        for e in v.errors:
            print(f"  \033[91mERROR:\033[0m {e}")
    else:
        print(f"\n\033[92m✓ PASSED: {label}\033[0m")

    if v.warnings:
        for w in v.warnings:
            print(f"  \033[93mWARN:\033[0m {w}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate Claude plugin files")
    parser.add_argument("--plugin-dir", type=Path, help="Validate a specific plugin directory")
    parser.add_argument("--marketplace", action="store_true", help="Validate only marketplace.json")
    parser.add_argument("--all", action="store_true", help="Validate all plugins in marketplace.json")
    args = parser.parse_args()

    exit_code = 0

    if args.marketplace or args.all:
        v = Validator()
        v.validate_marketplace_json()
        print_results(v, "marketplace.json")
        if not v.passed:
            exit_code = 1

    if args.plugin_dir:
        plugin_dir = args.plugin_dir.resolve()
        if not plugin_dir.exists():
            print(f"\033[91mERROR: Plugin directory not found: {plugin_dir}\033[0m", file=sys.stderr)
            return 1
        v = Validator()
        v.validate_plugin_dir(plugin_dir)
        print_results(v, str(plugin_dir.relative_to(REPO_ROOT)))
        if not v.passed:
            exit_code = 1

    elif args.all:
        if not MARKETPLACE_JSON.exists():
            print(f"\033[91mERROR: marketplace.json not found\033[0m", file=sys.stderr)
            return 1

        with open(MARKETPLACE_JSON) as f:
            marketplace = json.load(f)

        results = []
        for plugin_entry in marketplace.get("plugins", []):
            source = plugin_entry["source"].lstrip("./")
            plugin_dir = REPO_ROOT / source
            v = Validator()
            if plugin_dir.exists():
                v.validate_plugin_dir(plugin_dir)
                print_results(v, source)
            else:
                v.error(f"Plugin directory not found: {plugin_dir}")
                print_results(v, source)
            results.append(v.passed)

        total = len(results)
        passed = sum(results)
        print(f"\n{'='*60}")
        print(f"Summary: {passed}/{total} plugins passed validation")
        if passed < total:
            exit_code = 1

    elif not args.marketplace:
        parser.print_help()
        return 1

    return exit_code


if __name__ == "__main__":
    sys.exit(main())
