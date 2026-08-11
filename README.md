# L&S Advance Sdn. Bhd. — Website

Static marketing site for **L&S Advance Sdn. Bhd.**, a fiberglass / FRP manufacturer in Banting, Selangor, Malaysia. Plain HTML/CSS/JS — no build step, no framework.

## Structure

```
index.html            Home — hero, "what we do" teasers, about teaser, CTA (+ first-visit splash)
about.html            About page
services.html         Services page (+ 4x Service JSON-LD)
faq.html              FAQ page (+ FAQPage JSON-LD)
contact.html          Contact page (enquiry form)
robots.txt            Crawler rules + sitemap reference
sitemap.xml           All five page URLs
Assets/
  LS Logo.png         Brand logo (used in nav + footer)
  favicon.svg         Blue+yellow hexagon favicon echoing the logo
  css/styles.css      All styles (blue + yellow industrial theme, mobile-first)
  js/main.js          Mobile nav toggle + form validation/UX
```

Multi-page static site — each page duplicates the same `<header>`/nav and `<footer>`
markup (no templating engine). The nav CTA and all internal links point to real page
URLs; the current page's nav link carries `aria-current="page"` with a visible active style.

**First-visit splash:** `index.html` shows a full-screen navy overlay with the "LS" mark
filling bottom-to-top (~0.9s fill + ~0.3s fade), then reveals the page. It's a CSS
clip-path animation, runs **once per browser session** (`sessionStorage`), only on the
home page, and is skipped entirely for `prefers-reduced-motion` users. It's a pure overlay
on top of fully-present HTML — it never gates content from crawlers.

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
- **Pages:** Home → About (01) → Services (02) → FAQ (03) → Contact (04), alternating dark/light bands, with a blue contact band.

## SEO / GEO built in

- Unique `<title>` + meta description + `<link rel="canonical">` **per page**, Open Graph + Twitter meta.
- One `<h1>` per page, ordered `<h2>`/`<h3>`; semantic HTML5 landmarks.
- JSON-LD structured data: **Organization** + **LocalBusiness** on every page; four **Service** blocks on `services.html`; **FAQPage** on `faq.html` mirroring the on-page FAQ.
- `sitemap.xml` lists all five URLs + `robots.txt`.
- All copy is real HTML text (not JS-injected), so crawlers and AI fetchers that don't run JS still read everything (the splash is a pure overlay, not a content gate).

## BEFORE GOING LIVE — action items

1. **Wire up the enquiry form.** `contact.html` → `<form id="enquiryForm" action="#" …>`. Replace `action="#"` with a real handler:
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
