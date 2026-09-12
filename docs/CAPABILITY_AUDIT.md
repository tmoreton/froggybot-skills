# Capability audit

Updated September 11, 2026.

## Product lens

FroggyBot's niche is group coordination: invite people easily, preserve editable shared memory, reach a decision, and automatically produce the itinerary, budget, list, brief, or file everyone can use.

The public catalog should contain workflows that materially change how a result is produced. Generic writing, summarizing, brainstorming, teaching, and planning remain available through the base model without separate skills.

## Shipped skills

- Group Trip Planner
- Event Planner
- Group Decision Helper
- Group Intake
- Shared Budget
- Deep Research
- Data Workspace
- Meme Lord
- YouTube Thumbnail Director
- YouTube Strategy
- Trend Scout

The five group workflows are the product's core. Deep Research and Data Workspace remain as broadly useful advanced workflows. Meme Lord and the three creator-research skills support a small, evidence-backed creator expansion. Generic and service-wrapper skills were removed because the base model already covers them and Git history preserves their earlier examples.

## Tool presentation

User-facing tools are Web Search, Shared Lists, Files & Data, Interactive Browser, Image Generator, YouTube, and X. Web Reader, Calculator, World Clock, Focused Delegate, and Meme Lord's compositor remain enabled as internal dependencies but are not shown as choices. X is read-only and limited to recent public-post research.

## Creator expansion

Creator Studio and Trend Scout are the first creator bots. Creator Studio deliberately installs both YouTube Strategy and YouTube Thumbnail Director so public research and image creation work together. Because Image Generator requires interactive approval, Creator Studio cannot participate in group replies or group schedules. Direct turns preflight the bot's full tool set, so even research-only requests require approval unless Image Generator was persistently allowed; the same persistent approval is required for a direct bot schedule. Trend Scout is safe for point-in-time group or scheduled research, but it must not claim continuous monitoring unless the user configures a schedule.

The research and sequencing evidence is recorded in [BOT_CATALOG_RESEARCH.md](BOT_CATALOG_RESEARCH.md).

## Connection model

FroggyBot supports three capability sources:

1. FroggyBot built-ins maintained by the project.
2. Community skills and connector definitions merged into this public repository.
3. Private instruction-only skills created directly in the app, plus reviewed provider account connections.

FroggyBot-owned keys for shared services stay server-side and are never entered by users. Private account access uses provider-specific OAuth; its per-user credentials are encrypted, retrieved only by the runtime, and excluded from prompts, skill documents, bot shares, and skill shares. Existing custom MCP connections remain viewable and removable as legacy records, but users cannot add or edit developer-key connections.

## Next integrations

Prioritize Google Calendar, Google Drive and documents, maps and places, Notion, email, and Slack. These strengthen the group-planning loop more than additional generic personas or social-search wrappers.
