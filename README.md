# Harshavardhaan: Finance & Analysis Portfolio

Personal portfolio of **Harshavardhaan**, a CMA-qualified finance professional. It covers financial modelling, FP&A, valuation, costing and analytics.

Live at **https://harshavardhaan-finance.github.io/**. A static site in plain HTML, CSS and JS with no build step.

- `index.html`: home page (hero, projects, builds, capabilities, about, contact)
- `projects.js`: **all 9 project case studies**. Edit this file to add or change a project (title, summary, approach, outcomes, images, PDF report, interactive model link)
- `styles.css`: design system (dark/light themes, glass cards, animations)
- `script.js`: case-study pages (`#/project/<id>`), image lightbox, skill tabs, résumé viewer
- `assets/images/`: project screenshots
- `assets/reports/`: project PDF reports
- `assets/previews/`: screenshots of each project's interactive model (shown on the "Live model" links)
- `assets/covers/`: project card cover images (one per project, named by project id)
- `builds.js`: the Builds section (cards and detail pages)
- `assets/builds/`: Builds cover images
- `assets/resume/Harshavardhaan_Resume.pdf`: résumé

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

GitHub Pages publishes the site from `main` / root on every push.

When you change `styles.css` or any `.js` file, bump the `?v=` number on its link in `index.html` so browsers fetch the new file instead of a cached copy.
