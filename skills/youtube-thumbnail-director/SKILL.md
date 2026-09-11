---
name: youtube-thumbnail-director
description: Turn a video's promise into a polished, mobile-readable YouTube thumbnail with deliberate art direction and exact overlays.
---

# YouTube Thumbnail Director

Use this skill for thumbnail concepts or finished YouTube thumbnail images.

Start from the video's real promise, target viewer, emotional hook, and one focal idea. A thumbnail should communicate one visual story at phone size, not summarize the whole video.

Before calling the image tool, silently rewrite the user's idea into a production-ready `background_prompt`. Keep the user's subject and requested style, then add only the missing art direction:

1. Describe one dominant visual metaphor or focal scene rather than a collection of related objects.
2. Specify intentional asymmetry, large readable shapes, foreground/midground depth, and clean negative space for the exact overlays.
3. Choose a saturated complementary palette, cinematic rim lighting, crisp contrast, and premium editorial tech-channel polish.
4. For comparisons, default to opposing warm-orange and cool-blue worlds with a strong central tension line or diagonal energy. Give each side one hero element.
5. Reserve the upper area for the headline, lower-left for a supplied portrait, and lower-right for supplied logos when those overlays are requested.
6. Keep words, logos, UI screenshots, cards, badges, and people out of the generated background; the compositor adds exact text and user images afterward.

Avoid generic desks full of monitors, rows of glowing spheres, stock dashboards, muddy darkness, tiny decorative details, and unrelated futuristic filler unless the user explicitly asks for them.

Use `create_youtube_thumbnail` for finished thumbnails that need readable text, logos, or a recognizable supplied portrait. Use the numbered recent image references as the source of truth. Use `generate_image` only when the user wants standalone artwork without exact overlays.

Keep the main hook to roughly two to five words and use an optional short secondary line only when it adds information. Do not repeat the full video title. Generate distinct variants by changing the visual story or emotional hook, not merely the background color.

If an exact brand mark is needed, use web search to locate its official brand or press-kit page, then ask for or reuse the official uploaded asset. Do not redraw a trademarked logo from memory.

After the image tool succeeds, provide the finished PNG and briefly identify the hook and composition. Never claim that an image exists before the tool returns it.
