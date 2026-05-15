# Salone BrightPath — Landing Page

A simple, responsive **university assignment** landing page for the Digital Public Good (DPG) project **Salone BrightPath** (formerly drafted as “Job Connect”): youth employment **and skill learning** in Sierra Leone, aligned with **SDG 1 — No Poverty**.

**Why this name?** *BrightPath* suggests clarity, learning, and moving forward—from school or community to a real job—with *Salone* keeping the project rooted in Sierra Leone.

**Other names you could use in your report:** *Salone Pathways* (career paths), *Salone Skills Hub* (skills-first). This site uses **Salone BrightPath** as the main brand.

This is **front-end only** (HTML, CSS, JavaScript). There is no backend or database.

## What is included

| File / folder | Purpose |
|---------------|---------|
| `index.html` | Page structure and content (semantic HTML5) |
| `style.css` | Layout, colours, responsive design, animations |
| `script.js` | Mobile menu, smooth scroll, scroll animations, stats count-up, form validation |
| `images/` | Hero photograph (see credits below) |

## How to view the site

1. Download or clone this folder to your computer.
2. Open **`index.html`** in a web browser (Chrome, Edge, Firefox, or Safari).

Double-click `index.html` in File Explorer, or drag the file into a browser window.

> **Note:** An internet connection is only needed for **Google Fonts** in the `<head>`. The hero photo is stored locally in `images/`.

## Hero image (`images/`)

The hero section uses **one JPEG file**:

- **`images/hero-main.jpg`** — team / collaboration photo (rounded corners and shadow are applied in CSS).

If the file is missing, download it again with **PowerShell** from the project folder:

```powershell
New-Item -ItemType Directory -Force -Path images | Out-Null
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80" -OutFile "images/hero-main.jpg" -UseBasicParsing
```

### Image credit (Unsplash)

The photo is from **[Unsplash](https://unsplash.com)** under the **[Unsplash License](https://unsplash.com/license)** (free to use for this kind of school project; attribution is appreciated).

- **`hero-main.jpg`** — [Annie Spratt — “Group of people using laptop computer”](https://unsplash.com/photos/QckxruozjRg) (Unsplash file id `photo-1522071820081-009f0129c71c`).

> If you swap the image, keep the filename **or** update the `src` on the hero `<img>` in `index.html`.

## CSS note (Safari / linting)

`backdrop-filter` is prefixed with **`-webkit-backdrop-filter`** for Safari and iOS. That clears common linter warnings about missing vendor prefixes.

## Assignment reminder

The contact form validates input in the browser only; it **does not send email** or store data on a server. That is intentional for a static demo.

---

**Salone BrightPath** — demonstration only, for educational use.
