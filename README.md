# paulschlegel.github.io

Paul Schlegel's personal website + CV. Static HTML/CSS/JS, no build step,
bilingual (German/English) with a header toggle.

## Local preview

```
cd paulschlegel.github.io
python3 -m http.server 8000
# open http://localhost:8000
```

A static server is required (not opening the files directly) because the
header/footer are loaded via `fetch()` from `partials/`.

## Deploy to GitHub Pages

```
git init
git remote add origin https://github.com/thegr8paul/paulschlegel.github.io.git
git add .
git commit -m "Initial site"
git branch -M main
git push -u origin main
```

Because the repo is named `<username>.github.io`, GitHub Pages serves it
automatically at `https://paulschlegel.github.io/` — no extra Pages config
needed, just confirm in the repo's Settings → Pages that the source is
"Deploy from branch: main / (root)".

## Structure

```
index.html          Home
career.html          Full CV / timeline
projects.html        Project cards grouped by category, with tags
project-*.html       One detail page per project
contact.html         Contact details + links
partials/            Shared header.html / footer.html, loaded via fetch()
assets/css/style.css Design system
assets/js/main.js    Partial includes, language switcher, nav toggle
assets/img/          Portrait
assets/files/        Downloadable CV PDF
```

## Editing translations

Every translatable element carries `data-de` / `data-en` attributes (can
contain inline HTML like `<strong>`). `assets/js/main.js` swaps the visible
content based on the toggle state and remembers the choice in
`localStorage`. To add a new translatable element, give it matching
`data-de="..."` and `data-en="..."` attributes.
