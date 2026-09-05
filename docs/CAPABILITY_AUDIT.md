# Capability audit

Updated September 5, 2026.

## Product lens

FroggyBot's niche is group coordination: invite people easily, preserve editable shared memory, reach a decision, and automatically produce the itinerary, budget, list, brief, or file everyone can use.

The public catalog should contain workflows that materially change how a result is produced. Generic writing, summarizing, brainstorming, teaching, and planning remain available through the base model without separate skills.

## Shipped skills

- Group Trip Planner
- Event Planner
- Group Decision Helper
- Shared Budget
- Deep Research
- Data Workspace

The four group workflows are the product's core. Deep Research and Data Workspace remain as broadly useful advanced workflows. Fourteen generic or service-wrapper skills moved to `archive/skills/`; their history remains available without cluttering the app.

## Tool presentation

User-facing tools are Web Reader, Web Search, Shared Lists, Files & Data, Interactive Browser, and YouTube. Calculator, World Clock, and Focused Delegate remain enabled as internal dependencies but are not shown as choices. X remains disabled until its API credits are restored.

## Connection model

FroggyBot supports three capability sources:

1. FroggyBot built-ins maintained by the project.
2. Community skills and connector definitions merged into this public repository.
3. Private skills and HTTPS MCP connections added directly in the app without review.

Private credentials are encrypted per user, retrieved only by the runtime, and excluded from prompts, skill documents, bot shares, and skill shares. Remote MCP servers may use no authentication, a bearer token, or an API-key header. OAuth provider buttons will use the same connection model as they are added.

## Next integrations

Prioritize Google Calendar, Google Drive and documents, maps and places, Notion, email, and Slack. These strengthen the group-planning loop more than additional generic personas or social-search wrappers.
