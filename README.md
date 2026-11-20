# Argus Panoptes — photography portfolio

A black canvas, white text, monochrome photography, three separate project galleries, and an About page. Plain HTML and CSS. No JavaScript, packages, build process, or remote font dependencies. Sample images are included so the site works offline.

## Open on your Mac
Unzip the download, then double-click `index.html` to open it in Safari. Open the whole folder in VS Code to edit it. Save a change and refresh Safari.

## Files
- `index.html`: homepage and project links
- `natural-history.html`: first project gallery
- `passing-places.html`: second project gallery
- `waterlines.html`: third project gallery
- `about.html`: editable biography
- `style.css`: all visual styling and mobile layouts
- `images/`: replace these sample photographs with your own
- `.nojekyll`: disables Jekyll processing on GitHub Pages

## Personalize
1. Replace the JPG files in `images/`, keeping their names, or update every corresponding `src` and `href` in the HTML. Names are case-sensitive on GitHub Pages.
2. Update the photograph `alt` text and captions to describe your own work.
3. Change project titles, descriptions, name, and biography directly in the HTML files. The current project names and biography are editable starter content, not claims about your photographic practice.
4. Add your real email in `about.html` using the commented example. No fake contact button is enabled.
5. Remove the sample-image notice in About once you have replaced all sample photos.
6. To keep original photo colors, remove `filter: grayscale(100%);` from `img` in `style.css`. This CSS changes display only; the source JPGs retain their original colors.
7. To add photographs, duplicate a `<figure>` in a project page. Its image link opens the original file, where the browser provides zoom and Back returns to the gallery.
8. To add a project, copy an existing project HTML page, change its images and text, add a matching `<article class="project-card">` in `index.html`, and update the next-project links.

## Publish with GitHub Pages
1. Create a GitHub repository, for example `photography`.
2. Upload the CONTENTS of this folder to the repository root. `index.html` must be at the root, not inside an extra `argus-gallery` folder. Preserve the `images` folder.
3. Commit the files to `main`.
4. In repository **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/(root)**, and save.
5. GitHub displays your site URL after deployment. A project site usually lives at `https://YOUR-USERNAME.github.io/photography/`.

All site links are relative so they work at a GitHub project subpath. The code is ready to upload; this download does not create a GitHub repository or publish the site for you.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Sample image sources
The included photographs are Unsplash demonstration assets, not photographs by Jeevan Kumar Papaganti. Replace them with your own work before presenting this as your personal photographic portfolio. The footer identifies the portfolio owner and does not grant ownership of these sample photographs.

- `forest.jpg`: https://images.unsplash.com/photo-1441974231531-c6227db76b6e
- `mountains.jpg`: https://images.unsplash.com/photo-1464822759023-fed622ff2c3b
- `city.jpg`: https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b
- `architecture.jpg`: https://images.unsplash.com/photo-1511818966892-d7d671e672a2
- `coast.jpg`: https://images.unsplash.com/photo-1473116763249-2faaef81ccda
- `water.jpg`: https://images.unsplash.com/photo-1500375592092-40eb2168fd21
