# Contributing

FroggyBot Skills accepts small, reviewable additions that help a person or group reach a concrete outcome.

## Choose the right contribution

- **Skill:** readable instructions that shape how a FroggyBot approaches work.
- **Tool or connector:** a public definition for reading from or acting in another service.
- **Website or documentation:** a focused improvement to `site/`, `README.md`, or `docs/`.

Do not put executable integrations inside a skill. Remote MCP servers stay hosted outside this repository, and credentials belong to the user who connects them.

Private additions do not need review. Add a private skill or HTTPS MCP server directly in the FroggyBot app. Submit a pull request only when you want it listed for everyone.

## Add a skill

1. Search `catalog.json`, open pull requests, and the [live library](https://froggybot.com/library/) for overlap.
2. Copy the closest existing skill folder and rename it with a lowercase, hyphenated ID.
3. Keep the package instruction-only: one `SKILL.md` plus optional `.md`, `.txt`, or `.json` references.
4. Write a description that states the outcome and when the skill applies.
5. Include only guidance that changes the quality, safety, or consistency of the result.
6. Add the catalog entry and run the checks.

A minimal `SKILL.md`:

```markdown
---
name: example-skill
description: Turn a specific input into a useful, clearly bounded outcome.
---

# Example Skill

Use this skill when ...

1. Confirm the inputs that materially affect the result.
2. Produce the outcome in the shortest useful form.
3. State any uncertainty or action that needs approval.

Do not ...
```

Its matching `catalog.json` entry:

```json
{
  "id": "example-skill",
  "version": 1,
  "name": "Example Skill",
  "description": "Turn a specific input into a useful, clearly bounded outcome.",
  "category": "Planning",
  "author": "Your GitHub name",
  "tags": ["example", "outcome"],
  "path": "skills/example-skill/SKILL.md",
  "requiredToolIds": []
}
```

Use at most six meaningful tags. Add `featured: true` only when maintainers have chosen the skill as a primary starting point. A skill may name only tool IDs already present in `catalog.json`.

## Change an existing skill

Preserve its ID. If instructions change behavior, increment its integer `version` and update the catalog release. Existing tagged versions remain available to bots that already selected them.

## Propose a tool

Open a focused pull request, or use the tool request first when you want design feedback. Include:

- the user outcome and exact actions;
- what information is read, stored, created, or changed;
- the authentication method and where credentials will live;
- whether actions are read-only, sandboxed, or interactive;
- rate limits, cost, and failure behavior; and
- the smallest permissions that support the outcome.

Community pull requests never add secrets or hosted executable code. Public built-ins maintained by FroggyBot use reviewed OpenAPI schemas under `tools/<provider>/openapi.yaml`. Today, a community MCP server is connected privately by each user through the app. A public connection-recipe format can be added later without moving its server or credentials into this repository.

## Run the checks

```bash
python3 scripts/validate_catalog.py
python3 -m unittest discover -s tests
python3 scripts/build_site.py
```

Open `dist/index.html` through a local HTTP server when changing the site:

```bash
python3 -m http.server 8000 --directory dist
```

Then check the homepage, library search and filters, mobile layout, contribution links, legal pages, and invite forwarding.

## Review checklist

Reviewers check that a public contribution is useful, distinct, concise, safe, least-privilege, and understandable without private context. Review determines public discoverability; it does not prevent users from installing the same capability privately.
