# JM STUDIO — About page update

1. Replace the existing `about.html` with this version.
2. Put `about.css` beside it, in the same folder as `index.html`.
3. Copy the two placeholder SVG files into your existing `images` folder. Merge the folder; do not delete your other images.
4. Open `about.html` in Safari. The Projects and logo links return to your existing homepage.

This update uses its own stylesheet, so it does not change the other pages or your existing style.css. Copy these files into the existing site, rather than uploading the ZIP itself to GitHub.

## Add your portraits
Save your photos as `images/jeevan.jpg` and `images/mridula.jpg`.
In about.html, replace:
- `images/jeevan-placeholder.svg` with `images/jeevan.jpg`
- `images/mridula-placeholder.svg` with `images/mridula.jpg`
Change the alt text to `Portrait of Jeevan` and `Portrait of Mridula`.
If using .png or .jpeg files, use that actual extension in the HTML. File names and paths are case-sensitive.

## Fill in your details
Find the comments for each person in about.html and replace the biography, education, and email placeholder text. A commented example shows how to turn each email into a clickable mailto link. These are HTML placeholders, not a submission form; edit and save the source in VS Code.

JM STUDIO is large in the About page header and oversized in the main heading. The two profiles appear side by side on wide screens and stack on phones. Portraits display in black and white; remove the grayscale rule in about.css if desired.

The original homepage and project pages are not included in this update. Their branding can be updated separately in the next step.
