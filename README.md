# AIRES — landing page

Static site, no build step: `index.html`, `style.css`, `script.js`, `assets/`.

- Run locally: `python3 -m http.server 8765` then open http://127.0.0.1:8765/
- Language: Indonesian is in the HTML; English strings live in `script.js` (`EN` object).
  Elements are tagged with `data-i18n="key"` (text) or `data-i18n-placeholder` / `data-i18n-aria-label` (attributes).
  `?lang=en` forces English; the choice is remembered in localStorage.
- Icons: Lucide (ISC licence) as an inline SVG sprite at the top of `<body>`.
- Logo: `assets/aires-logo.webp` / `.png` is a static first frame of the old 2.2 MB animated GIF (cropped, ~8 KB WebP).
- Contact form is front-end only: it validates, then opens the visitor's mail app via `mailto:contact@airesresearch.org`.
- Team members are placeholders — search for `[Nama anggota` in `index.html` and `[Team member` in `script.js`.
