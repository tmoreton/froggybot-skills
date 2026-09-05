# FroggyBot Skills

This is the public home for FroggyBot’s website, public skills, and discoverable tool definitions.

- [froggybot.com](https://froggybot.com) is built from `site/` and published with GitHub Pages after every push to `main`.
- `skills/` contains readable, instruction-only ways of working.
- `archive/skills/` preserves retired examples without shipping them in the catalog.
- `tools/` contains the canonical, narrowly scoped OpenAPI definitions for reviewed external services.
- `catalog.json` is the machine-readable directory consumed by the website and FroggyBot app.

The Expo web app that mirrors iOS is separate at [app.froggybot.com](https://app.froggybot.com). The public site’s `/invite` page preserves invite parameters and hands them to that app.

## Repository map

```text
skills/<skill-id>/SKILL.md   One public skill per folder
tools/<provider>/            Reviewed external API definitions
infrastructure/              Declarative deployment for provider-specific gateway targets
site/                        Static froggybot.com source
scripts/validate_catalog.py  Catalog and package safety checks
scripts/build_site.py        GitHub Pages build
tests/                       Website structure checks
docs/                        Catalog decisions and maintainer notes
```

## Contribute a skill

1. Search the [public library](https://froggybot.com/library/) and existing pull requests.
2. Fork this repository and copy the closest folder under `skills/`.
3. Give the folder a lowercase, hyphenated ID such as `trip-planner`.
4. Write a concise `SKILL.md` with only `name` and `description` in its frontmatter.
5. Add the public metadata and reviewed `requiredToolIds` to `catalog.json`.
6. Run the checks below and open a pull request.

```bash
python3 scripts/validate_catalog.py
python3 -m unittest discover -s tests
python3 scripts/build_site.py
```

Read [CONTRIBUTING.md](CONTRIBUTING.md) for the complete review rules and a copyable catalog example. If you only have an idea, use the [skill request form](https://github.com/tmoreton/frogbot-skills/issues/new?template=skill-request.yml).

You do not need a pull request to make a private skill or connect a private MCP server. Add it directly in the FroggyBot app. Repository review is only required to make something publicly discoverable.

## Skill rules

- Skills are instructions and optional static Markdown, text, or JSON references.
- Skills cannot contain executable code, binaries, secrets, tokens, or hidden remote instructions.
- Each skill should solve one recognizable user outcome and explain its important boundary.
- Required tools are declared once in `catalog.json`; skill frontmatter does not repeat runtime bindings.
- Existing behavior is immutable. Bump `version` before changing instructions that users may rely on.

## Propose a tool

Tools can access services or take actions. A public proposal must describe the exact actions, data involved, authentication, external side effects, and least permissions needed. Contributors may open a focused pull request directly or start with a [tool request](https://github.com/tmoreton/frogbot-skills/issues/new?template=tool-request.yml) when the shape is still uncertain.

A private remote MCP server stays hosted by its provider or contributor, and each user supplies their own credential in the app. Public built-ins maintained by FroggyBot are enabled only after their server-side binding is deployed and tested. Secrets and executable integration code never live in this repository or the app bundle.

## What stays in the app backend

This repository owns capability definitions: names, descriptions, skill instructions, tool actions, runtime bindings, and external OpenAPI schemas. The private app repository keeps only the generic machinery needed to use them safely:

- catalog signature, validation, caching, and version pinning;
- user-created private skills, private MCP connections, and sharing records;
- per-user credentials encrypted in AWS Secrets Manager and resolved only at invocation time;
- reviewed runtime implementations such as the calculator and browser session manager;
- the allowlist that prevents public catalog entries from activating arbitrary bundled code; and
- AWS credentials, permissions, and deployed gateway resources.

Those pieces cannot be downloaded as community content because they execute with trusted server permissions. The app contains no fallback copy of this public catalog. Write-capable private connections require approval for each direct-chat turn and cannot run in schedules or group rounds.

The X and YouTube targets are the one deployment exception to the main AgentCore project file. AgentCore project schema v1 cannot express an API key's header/query location or prefix, so `infrastructure/gateway-targets.yaml` owns those two targets declaratively next to their canonical schemas. Remove that template when the project schema supports these fields; do not copy the schemas back into the app repository.

## Publishing model

Every accepted catalog change does two things without a mobile release:

1. GitHub Pages rebuilds the public directory from the new `catalog.json`.
2. FroggyBot’s AWS backend refreshes the same reviewed catalog and makes available entries selectable in the app.

Bots remain pinned to the skill version they selected. A user can create a private, editable copy or add a private MCP server without changing the public catalog. Sharing a bot or skill never shares its private connections or credentials.

See [docs/CAPABILITY_AUDIT.md](docs/CAPABILITY_AUDIT.md) for the current keep, retire, and next-tool decisions.
