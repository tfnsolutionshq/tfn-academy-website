# TFN Academy — Website (React / TypeScript / Tailwind)

Production-stack rebuild of the TFN Academy marketing site, converted from the
approved static-HTML prototype into the team's standard frontend stack.

## Stack

- React 19 + TypeScript
- Tailwind CSS v4.3.4 (see "Deviations from spec" below)
- Framer Motion (page transitions, mega menu, modal, accordion, mobile drawer)
- React Router DOM (central routes in `src/routes/index.tsx`)
- lucide-react (icons, via a curated map for tree-shaking — see below)
- Recharts installed per spec; not currently used anywhere on this public
  marketing site (no charts needed yet). Safe to remove if unused long-term,
  or keep for a future admin/reporting page.
- Context API for the two genuinely global concerns: theme (light/dark) and
  toast notifications. Everything else (the Apply flow, filters, forms) is
  local component state, per the "avoid unnecessary global state" guidance.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # type-checks (tsc -b) then builds to dist/
npm run preview   # serve the production build locally
```

`npm run build` runs `tsc -b && vite build`. The app is a single-page app, so
your hosting needs to rewrite all paths to `index.html` (Netlify `_redirects`,
Vercel's default SPA handling, nginx `try_files`, etc.). Direct deep links
(e.g. `/programmes/frontend`) will 404 on a plain static file host without
this rewrite.

## Project structure

Follows the Clean Architecture layout from the brief:

```
src/
├── app/                     # App shell: providers, config, App.tsx
├── pages/<name>/presentation/
│   ├── components/          # page-specific components
│   └── <Name>Page.tsx
├── shared/
│   ├── components/ui/       # Button, Dropdown, Modal, Icon, etc.
│   ├── components/layout/   # Header, Footer, MainLayout, WhatsAppFab
│   ├── context/             # ThemeContext, ToastContext
│   ├── hooks/                # useTheme, useToast
│   ├── constants/           # academyData.ts — all site content
│   ├── types/                # academy.ts — TypeScript interfaces for the data
│   └── utils/
├── routes/                  # central route table
└── services/api/            # empty — no backend yet (see below)
```

No page currently needs a `domain/` or `data/` subfolder of its own — the
content is static and typed centrally in `shared/constants` and
`shared/types`, which is where `domain`-layer logic for this site lives.
`services/api/` is scaffolded but empty, ready for when the three portals
(admin/facilitator/student — built separately as a prototype) get wired to a
real backend that this site can also call for things like dynamic seat counts
or discount-code validation.

## Content and data

All programme, scholarship, hub, blog, talent, careers and kids-programme
content was converted programmatically from the approved HTML prototype into
`src/shared/constants/academyData.ts`, typed against
`src/shared/types/academy.ts`. Edit content there, not inline in pages.

### Placeholder values — replace before launch

These are carried over from the prototype and marked `PLACEHOLDER` in
`academyData.ts`:

- **Course fee**: NGN 150,000 flat for every programme
- **Bank transfer details**: dummy bank name and account number
- **WhatsApp numbers**: cohort-invite link and support number are both demo
  values
- **Seats remaining per programme**: static sample numbers, not live counts
- **Verify-certificate records**: three demo certificate numbers
  (TFN-CERT-0001/0002/0003)
- **Discount codes**: TFN10, EARLYBIRD, WELCOME5000 are demo codes with no
  real backing
- **Hub rates**: training room / flexi desk / meeting room pricing

### Simulated behaviour (no backend yet)

Per the brief's "do not introduce backend-dependent functionality unless
requested" and "use static or locally defined data," these flows run
entirely client-side with no persistence:

- The **Apply** page (course selection → details → environment → review →
  payment) — "paying" just flips local state and shows a success screen with
  a fake reference number.
- The **Hub** booking estimator — calculates a price and shows a fake
  booking reference; nothing is actually reserved.
- **Contact**, **Careers**, and **Hire Talents** consultation forms — show a
  success state on submit; no email is sent.

None of this is wired to the admin/facilitator/student portal prototype
built earlier. Connecting real submission, payment, and seat-tracking is the
next phase once a backend/API is in place.

## Deviations from the spec

The brief says to flag any difference from the stated environment:

1. **Tailwind CSS v4.3.2 does not exist on npm.** The latest published 4.x
   release at build time was **v4.3.4**, which is what's installed. If a
   specific patch version is required for your pipeline, pin it in
   `package.json` and re-test — no v4.3-specific API was used that should
   behave differently between patch versions.
2. **Recharts is installed but unused.** The current site has no data
   visualisation. Left in per "use existing dependencies," flagged here in
   case you'd rather remove it to trim `node_modules`.
3. **Icons are not looked up dynamically from lucide-react's full icon
   registry.** Importing by name from `lucide-react`'s `icons` object pulls
   in the entire icon set (1000+ icons, ~1.2MB) and defeats tree-shaking.
   Instead, `src/shared/components/ui/Icon.tsx` explicitly imports and maps
   the ~115 icon names actually used by the content and UI. If you add new
   content that references an icon name not in that map, it will silently
   fall back to a neutral circle — add the import and map entry in
   `Icon.tsx` when that happens.
4. **Brand/social icons (Facebook, Instagram, LinkedIn, Twitter, YouTube)
   aren't available in the installed lucide-react version** — they were
   split into a separate package upstream. Not currently used anywhere on
   the site; add `lucide-react`'s successor or another icon source if social
   links are added later.

## Known limitations / suggested next steps

- **Main JS bundle is ~526KB (170KB gzipped)** in one chunk. This is
  reasonable for a content-heavy site but could be split further (e.g. by
  moving `academyData.ts` category data behind per-page dynamic imports) if
  Lighthouse scores demand it.
- **No automated test suite.** Pages were manually and automatically
  smoke-tested (every route, light/dark, desktop/mobile, key form flows) but
  there's no Jest/Vitest/Playwright suite checked in.
- **Accessibility**: semantic headings, labelled form fields, keyboard-
  reachable dropdowns/modals (Escape to close, focus-visible rings) and
  `aria-*` attributes are in place throughout, but there's been no screen-
  reader pass or formal WCAG audit.
- **No SEO metadata** (per-page `<title>`/meta descriptions, Open Graph,
  sitemap) — add via `react-helmet-async` or Vite's HTML transform if needed.
- **No analytics** wired up.
