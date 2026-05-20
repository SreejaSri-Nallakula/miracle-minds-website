# Miracle Minds – School Website Plan

A polished, responsive 6-page marketing site built as a React + Vite + Tailwind app (TanStack Start template via the web_app artifact). All design tokens come straight from your brief.

## Brand system (set up once, used everywhere)

- Tailwind theme tokens in `index.css` / `tailwind.config.ts`:
  - `--brand-red: #E8272A`, `--brand-blue: #1A5BA8`, `--bg-light: #F4F7FB`, `--text-dark: #1C1C2E`, `--footer-blue: #1A3A6B`
- Fonts via Google Fonts: **Poppins** (headings) + **Inter** (body)
- Reusable components:
  - `LogoBadge` — the split "MIRACLE" (red) / "MINDS" (blue) wordmark, used in navbar + footer
  - `SectionHeading` — title with red underline accent + optional red→blue gradient bar
  - `IconCard`, `StepCircle`, `InfoBox`, `CTABanner`
- Global motion: fade-in on scroll + hover lift/zoom (transform + opacity only, no heavy libs)

## Layout shell

- `SiteLayout` with sticky `Navbar` and `Footer` wrapping all routes
- **Navbar**: left logo badge, right links (Home, About, Admissions, Facilities, Gallery, Contact), far-right red CTA "Admissions Open 2025"; mobile hamburger slides in from right
- **Footer**: dark blue `#1A3A6B`, 3 columns (badge+tagline / quick links / phone+socials) + centered © bar

## Pages

1. **Home (`/`)** — Hero with red→blue diagonal gradient + headline & two CTAs → 4-card highlights strip (red top accent) → About preview 2-col → "Latest Updates" cards with blue left border → 4-image gallery preview with hover zoom
2. **About (`/about`)** — Gradient hero → intro paragraphs → Vision (blue) + Mission (red) cards → Principal's quote card → 2×2 Core Values icon tiles
3. **Admissions (`/admissions`)** — Gradient hero → 3 numbered red step circles → documents checklist with blue check icons → blue eligibility info box → red "Ready to Enroll?" CTA card with phone `9849140520`
4. **Facilities (`/facilities`)** — Section heading → 2×2 facility cards, alternating red/blue icons, hover lift
5. **Gallery (`/gallery`)** — Filter tabs (All / Events / Classrooms / Activities, active = red) → 3-column responsive masonry of 12 placeholder slots → click opens lightbox overlay
6. **Contact (`/contact`)** — 2-column: left = address + phones (`9849140520`, `9063614513`) + email + Maps iframe placeholder; right = Name / Phone / Message form with red "Send Message" button (client-side zod validation, no backend wired)

## Responsiveness & performance

- Mobile-first; cards collapse to single column under `md`
- Hamburger drawer for nav
- `loading="lazy"` on all images, CSS-only animations
- No charting/animation libs added

## Technical notes

- Routes via the template's router; one file per page under `src/routes/`
- Shared UI in `src/components/` (LogoBadge, Navbar, Footer, SectionHeading, cards, Lightbox)
- Placeholder images generated as lightweight SVG/illustrated assets in `src/assets/` (children, books, stars, school building) so the site looks complete without external image dependencies
- Contact form: client-side only for now; can be wired to Lovable Cloud + email later if you want real submissions

## Not included (ask if you want them)

- Real backend for the contact form (would need Lovable Cloud + email)
- Real photography (using illustrated placeholders)
- CMS for announcements (currently hardcoded sample content)
