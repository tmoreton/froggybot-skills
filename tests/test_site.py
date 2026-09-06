from __future__ import annotations

import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "site"
OUTPUT = ROOT / "dist"


class SiteTests(unittest.TestCase):
    def test_required_pages_exist(self) -> None:
        for path in (
            "index.html",
            "library/index.html",
            "contribute/index.html",
            "privacy/index.html",
            "terms/index.html",
            "invite/index.html",
            "404.html",
            "CNAME",
        ):
            self.assertTrue((SITE / path).is_file(), path)

    def test_public_links_use_app_subdomain(self) -> None:
        pages = "\n".join(path.read_text() for path in SITE.rglob("*.html"))
        self.assertIn("https://app.froggybot.com/", pages)
        self.assertNotIn('href="/app', pages)

    def test_library_loads_the_same_origin_catalog(self) -> None:
        script = (SITE / "scripts/library.js").read_text()
        self.assertIn("fetch('/catalog.json'", script)
        self.assertIn("tool.enabled !== false", script)
        self.assertIn("tool.listed !== false", script)
        self.assertIn("requiredToolIds", script)

    def test_catalog_points_at_current_repository(self) -> None:
        catalog = json.loads((ROOT / "catalog.json").read_text())
        self.assertEqual(catalog["repository"], "tmoreton/frogbot-skills")

    def test_featured_skills_are_core_group_workflows(self) -> None:
        catalog = json.loads((ROOT / "catalog.json").read_text())
        featured = {skill["id"] for skill in catalog["skills"] if skill.get("featured")}
        self.assertEqual(
            featured,
            {
                "group-intake",
                "trip-planner",
                "event-planner",
                "group-decision",
                "shared-budget",
            },
        )

    def test_implementation_helpers_are_not_listed(self) -> None:
        catalog = json.loads((ROOT / "catalog.json").read_text())
        tools = {tool["id"]: tool for tool in catalog["tools"]}
        for tool_id in ("web", "calculator", "current_time", "delegate"):
            self.assertFalse(tools[tool_id].get("listed", True), tool_id)
        self.assertFalse(tools["browser"].get("featured", False))

    def test_build_publishes_every_skill_document(self) -> None:
        source_skills = sorted(
            path.relative_to(ROOT) for path in (ROOT / "skills").glob("*/SKILL.md")
        )
        published_skills = sorted(
            path.relative_to(OUTPUT) for path in (OUTPUT / "skills").glob("*/SKILL.md")
        )
        self.assertEqual(published_skills, source_skills)

    def test_build_publishes_every_tool_schema(self) -> None:
        source_schemas = sorted(
            path.relative_to(ROOT) for path in (ROOT / "tools").glob("*/openapi.yaml")
        )
        published_schemas = sorted(
            path.relative_to(OUTPUT) for path in (OUTPUT / "tools").glob("*/openapi.yaml")
        )
        self.assertEqual(published_schemas, source_schemas)


if __name__ == "__main__":
    unittest.main()
