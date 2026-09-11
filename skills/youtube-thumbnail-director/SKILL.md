---
name: youtube-thumbnail-director
description: Turn a video's promise into a polished, mobile-readable YouTube thumbnail with deliberate art direction and exact overlays.
---

# YouTube Thumbnail Director

Use this skill for thumbnail concepts or finished YouTube thumbnail images.

Start from the video's real promise, target viewer, emotional hook, and one focal idea. A thumbnail should communicate one visual story at phone size, not summarize the whole video.

Before calling the image tool, silently rewrite the user's idea into a production-ready visual brief. Keep the user's subject and requested style, then add only the missing art direction:

1. Describe one dominant visual metaphor or focal scene rather than a collection of related objects.
2. Specify intentional asymmetry, large readable shapes, foreground/midground depth, and a clear focal hierarchy.
3. Choose a saturated complementary palette, cinematic rim lighting, crisp contrast, and premium editorial tech-channel polish.
4. For comparisons, use visual tension and contrasting warm/cool color when helpful, but do not default every concept to a literal diagonal split.
5. Describe how the headline, supplied portrait, and supplied logos belong inside the composition. Prefer a natural presenter cutout or photographed subject over a circular avatar. Integrate transparent logos without app tiles, white cards, or thick borders unless the concept specifically calls for one.
6. Keep all essential elements inside a generous safe area so the generated result can be center-cropped to exact 1280x720 output.

Avoid generic desks full of monitors, rows of glowing spheres, stock dashboards, muddy darkness, tiny decorative details, and unrelated futuristic filler unless the user explicitly asks for them.

Use `create_youtube_thumbnail` for finished thumbnails. It sends the entire composition, exact copy, and selected recent images to the configured OpenRouter image model in one request. The tool returns an exact 1280x720 PNG. Use the numbered recent image references as the source of truth. Use `generate_image` only when the user wants standalone artwork rather than a finished thumbnail.

Keep the main hook to roughly two to five words and use an optional short secondary line only when it adds new information. Do not repeat the full video title or say the same thing twice. Treat exact spelling as part of the visual brief.

When generating multiple variants, change the visual story, emotional hook, subject scale, and layout—not merely the background color. Do not force every variant into the same portrait corner, logo corner, split-screen, or caption-pill template. Before retrying a weak result, reassess the concept and remove any failed motif such as fake UI, generic monitors, spheres, oversized copy, boxed logos, or redundant captions; do not preserve it just because it appeared in an earlier image.

If an exact brand mark is needed, use web search to locate its official brand or press-kit page, then ask for or reuse the official uploaded asset. Do not redraw a trademarked logo from memory.

After the image tool succeeds, provide the finished PNG and briefly identify the hook and composition. Never claim that an image exists before the tool returns it.
