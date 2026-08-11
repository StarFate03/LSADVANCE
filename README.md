# L&S Advance Sdn. Bhd. — Website

Static marketing site for **L&S Advance Sdn. Bhd.**, a fiberglass / FRP manufacturer in Banting, Selangor, Malaysia. Plain HTML/CSS/JS — no build step, no framework.

## Structure

```
index.html            The whole site (single page, anchored sections + JSON-LD schema)
robots.txt            Crawler rules + sitemap reference
sitemap.xml           Single canonical URL
Assets/
  LS Logo.png         Brand logo (used in nav + footer)
  favicon.svg         Blue+yellow hexagon favicon echoing the logo
  css/styles.css      All styles (blue + yellow industrial theme, mobile-first)
  js/main.js          Mobile nav toggle + form validation/UX
```

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000

## Deploy

Upload the whole folder to any static host — Netlify, Cloudflare Pages, GitHub Pages, or ordinary web hosting. HTTPS is handled at the host/domain level.

## Design

- **Colors** match the brand logo: royal blue `#252ec9` + yellow `#fcf00f`, over a deep navy `#0a1650`. (This replaces the earlier navy + orange direction.) Yellow is only ever used as a background behind **dark navy text** for contrast safety.
- **Type:** Oswald (condensed uppercase display) for headings, Inter for body — loaded from Google Fonts.
- **Sections:** Hero → 01 About → 02 Services → 03 FAQ → 04 Contact, alternating dark/light bands, with a blue contact band.

## SEO / GEO built in

- Unique `<title>` + meta description, canonical tag, Open Graph + Twitter meta.
- One `<h1>`, ordered `<h2>`/`<h3>`; semantic HTML5 landmarks.
- JSON-LD structured data: **Organization**, **LocalBusiness**, four **Service** blocks, and a **FAQPage** mirroring the on-page FAQ.
- `sitemap.xml` + `robots.txt`.
- All copy is real HTML text (not JS-injected), so crawlers and AI fetchers that don't run JS still read everything.

## BEFORE GOING LIVE — action items

1. **Wire up the enquiry form.** `index.html` → `<form id="enquiryForm" action="#" …>`. Replace `action="#"` with a real handler:
   - Easiest: a [Formspree](https://formspree.io) endpoint, e.g. `action="https://formspree.io/f/XXXXXXXX" method="POST"`.
   - Or your host's built-in form service (Netlify Forms, etc.).
   Until this is set, the form validates but blocks submit and shows a helper message (see `Assets/js/main.js`).
2. **Confirm the domain.** All absolute URLs (canonical, Open Graph, sitemap, robots) use `https://lsadvance.com.my/`. Update them if the final domain differs.
3. **Logo asset (optional but recommended).** `LS Logo.png` is 1448×1086 with a light-gray background, so it's shown inside a white "chip". For cleaner placement + faster load, export a **transparent-background** version and a **WebP** copy.

## Content still needed from the client (deliberately omitted, not invented)

These were flagged `[CONFIRM]` in the copy draft and are **not** on the site yet, because publishing wrong specifics hurts trust and AI-citation more than honest omission. Add them once verified:

- **Process & Capabilities** section — materials/resin systems, fabrication method (hand lay-up / spray-up / filament winding), equipment, facility size, production capacity.
- **Certifications** — ISO, SIRIM, etc. (only if genuinely held).
- **FRP tank capacity range** (e.g. "from X to Y litres") — concrete numbers get cited more.
- **Industries / sectors served** and any shareable client types.
- **Founding story / family background** for the About section.
- **Project photos / case studies** — for a Portfolio section.
- **Business phone + email** — currently the enquiry form is the only contact channel; no phone/email is shown or in the schema because none was confirmed.

Placeholders for the omitted **Process** and **Portfolio** sections are left as HTML comments in `index.html` where they should slot in (remember to renumber the visible section numbers and add nav links when you add them).

> Note: the SSM registry classification "Heavy and Civil Engineering Construction" is deliberately **not** used anywhere on the site or in the schema — it's a broad registry code, not a description of the actual fiberglass/FRP business.
