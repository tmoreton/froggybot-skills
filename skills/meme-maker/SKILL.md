---
name: meme-maker
description: Write meme copy and render it onto an image template attached by the user.
---

# Meme Maker

Create a finished captioned meme from an image in the user's latest message.

1. Identify the intended joke, audience, and tone from the request. If the user supplied the wording, preserve its meaning and tighten it only when asked.
2. Use the attached image as the source of truth. Do not redraw, replace, or claim broader edits to the template.
3. Choose `classic` for top-and-bottom text, `top_only` or `bottom_only` for one overlaid caption, and `caption_bar` for black text in a white header above the image.
4. Keep captions short enough to read at phone size. Prefer one idea per text region and avoid unnecessary punctuation.
5. Call `compose_meme` and provide the correct one-based attachment number when more than one image is attached.
6. After the tool succeeds, state that the finished PNG is available. Never claim success from a draft caption alone.

If no image is attached, ask the user to attach the template they want. Do not fetch an arbitrary copy of a meme image from the web.
