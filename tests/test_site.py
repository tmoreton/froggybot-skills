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

    def test_bot_directory_loads_the_same_origin_catalog(self) -> None:
        script = (SITE / "scripts/library.js").read_text()
        page = (SITE / "library/index.html").read_text()
        self.assertIn("fetch('/catalog.json'", script)
        self.assertIn("tool.enabled !== false", script)
        self.assertIn("requiredToolIds", script)
        self.assertIn("catalog.bots.filter", script)
        self.assertIn("data-bot-count", page)
        self.assertNotIn('data-tab="skills"', page)
        self.assertNotIn('data-tab="tools"', page)
        self.assertNotIn("data-skill-count", page)
        self.assertNotIn("data-tool-count", page)
        self.assertIn("Included with setup", script)

    def test_homepage_promotes_bots_instead_of_capability_parts(self) -> None:
        page = (SITE / "index.html").read_text()
        self.assertIn("Browse ready-made bots", page)
        self.assertIn("Request beta access", page)
        self.assertIn("Private beta", page)
        self.assertIn("data-bot-count", page)
        self.assertNotIn("Browse skills & tools", page)
        self.assertNotIn("data-skill-count", page)
        self.assertNotIn("data-tool-count", page)

    def test_every_public_bot_has_a_concrete_example(self) -> None:
        catalog = json.loads((ROOT / "catalog.json").read_text())
        script = (SITE / "scripts/library.js").read_text()
        for bot in catalog["bots"]:
            self.assertIn(f"{bot['id']!r}:", script, bot["id"])
        self.assertIn("Example request", script)
        self.assertIn("Typical result", script)

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

    def test_bot_configs_keep_runtime_choices_and_credentials_out(self) -> None:
        catalog = json.loads((ROOT / "catalog.json").read_text())
        allowed = {
            "id",
            "version",
            "name",
            "tagline",
            "prompt",
            "color",
            "category",
            "author",
            "tags",
            "featured",
            "skillIds",
            "toolIds",
        }
        for bot in catalog["bots"]:
            self.assertLessEqual(set(bot), allowed, bot["id"])
            self.assertFalse(
                {"model", "provider", "reasoning", "mode", "token", "credential"}
                & set(bot),
                bot["id"],
            )

    def test_chief_is_a_minimal_public_bot(self) -> None:
        catalog = json.loads((ROOT / "catalog.json").read_text())
        chief = next(bot for bot in catalog["bots"] if bot["id"] == "chief")

        self.assertEqual(chief["name"], "Chief")
        self.assertEqual(chief["color"], "#007A3D")
        self.assertEqual(chief["toolIds"], ["current_time"])
        self.assertNotIn("systemRole", chief)
        self.assertNotIn("requiredOnSetup", chief)

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

    def test_build_publishes_every_bot_evaluation(self) -> None:
        source_evals = sorted(
            path.relative_to(ROOT) for path in (ROOT / "bots").glob("*/evals.json")
        )
        published_evals = sorted(
            path.relative_to(OUTPUT) for path in (OUTPUT / "bots").glob("*/evals.json")
        )
        self.assertEqual(published_evals, source_evals)

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
