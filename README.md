# L&S Advance Sdn. Bhd. — Website

Static marketing site for **L&S Advance Sdn. Bhd.**, a fiberglass / FRP manufacturer in Banting, Selangor, Malaysia. Plain HTML/CSS/JS — no build step, no framework.

## Structure

```
index.html            Home — hero, "what we do" teasers, about teaser, CTA (+ first-visit splash)
404.html              Not-found page (GitHub Pages serves it for any missing path)
CNAME                 Custom domain for GitHub Pages (lsadvance.com.my)
about/index.html      About page          -> /about/
services/index.html   Services page       -> /services/  (+ 4x Service JSON-LD)
faq/index.html        FAQ page            -> /faq/       (+ FAQPage JSON-LD)
contact/index.html    Contact page        -> /contact/   (full-page centered form)
terms-conditions/index.html  Terms & Conditions -> /terms-conditions/
privacy-policy/index.html    Privacy Policy     -> /privacy-policy/
robots.txt            Crawler rules + sitemap reference
sitemap.xml           All seven clean page URLs
Assets/
  LS-Logo-transparent.png  Brand logo, transparent bg (nav, footer, splash) — USED
  LS Logo.png              Original logo with light-gray bg (kept as source, unused)
  Gate Page.png            Original facility signboard photo (source)
  facility-signboard.{webp,jpg}  Optimized signboard image, shown on the About page
  favicon.svg              Blue+yellow hexagon favicon echoing the logo
  products/frp-*.{webp,jpg}      Optimized product photos for the homepage gallery
  css/styles.css           All styles (blue + yellow industrial theme, mobile-first)
  js/main.js               Nav toggle + form UX + header auto-hide + scroll reveal
```

**Header auto-hide:** the sticky header slides out of view when you scroll down and
reappears when you move the pointer near the top edge (pointer devices) or scroll up
(touch). Always shown at the very top of the page and on keyboard focus; disabled for
`prefers-reduced-motion`. Logic in `Assets/js/main.js`.

**Homepage scroll-reveal ("card swipe-up"):** homepage cards/sections carry a `.reveal`
class and fade/slide up as they enter the viewport (IntersectionObserver). Disabled for
`prefers-reduced-motion` and for no-JS. **To revert:** remove the `reveal` class from the
elements in `index.html`, the `.reveal` CSS block in `styles.css`, and the reveal observer
in `main.js` (nothing else depends on it).

**Company registration number** `1124511-T` in the footer comes from the company's own
facility signboard (`Assets/Gate Page.png`, "No. Sykt.: 1124511-T"). Verify against SSM
records; if L&S also has a new 12-digit SSM registration number, add it alongside.

**Legal pages** (`/terms-conditions/`, `/privacy-policy/`) are adapted from a standard
policy template with L&S Advance's name, address, domain, and Malaysian jurisdiction.
They should be reviewed by the company before relying on them. The privacy policy routes
all contact to the enquiry form (`/contact/`) since no business email is confirmed — add
a real email there once available.

**Clean URLs.** Each inner page is a folder with an `index.html`, so URLs are
extensionless: `/about/`, `/services/`, `/faq/`, `/contact/` (no `.html`). All internal
links and asset references are **root-relative** (`/about/`, `/Assets/…`) — this works
because the site is served at the domain root (`lsadvance.com.my`). If you ever host it
under a sub-path instead (e.g. `user.github.io/REPO/`), these root-relative paths would
need adjusting.

Each page duplicates the same `<header>`/nav and `<footer>` markup (no templating engine).
The current page's nav link carries `aria-current="page"` with a visible active style.

**Logo.** The nav/footer/splash use `LS-Logo-transparent.png` — the original PNG with its
light-gray background removed and cropped tight, so it sits cleanly on the dark bar with no
white box. If the client provides an official transparent/vector logo, drop it in and update
the `src`/`width`/`height` references.

**First-visit splash:** `index.html` shows a full-screen navy overlay with the **whole logo
(hexagon + "Ls")** filling bottom-to-top (~0.9s fill + ~0.3s fade) via a CSS clip-path
animation, then reveals the page. Runs **once per browser session** (`sessionStorage`), only
on the home page, and is skipped entirely for `prefers-reduced-motion` users. It's a pure
overlay on top of fully-present HTML — it never gates content from crawlers.

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

1. **Wire up the enquiry form.** `contact/index.html` → `<form id="enquiryForm" action="#" …>`. Replace `action="#"` with a real handler:
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
- **Company background / founding story** for the About section (per client decision, do NOT use family-business framing — describe the company purely by its manufacturing positioning).
- **Project photos / case studies** — for a Portfolio section.
- **Business phone + email** — currently the enquiry form is the only contact channel; no phone/email is shown or in the schema because none was confirmed.

Placeholders for the omitted **Process** and **Portfolio** sections are left as HTML comments in `index.html` where they should slot in (remember to renumber the visible section numbers and add nav links when you add them).

> Note: the SSM registry classification "Heavy and Civil Engineering Construction" is deliberately **not** used anywhere on the site or in the schema — it's a broad registry code, not a description of the actual fiberglass/FRP business.
