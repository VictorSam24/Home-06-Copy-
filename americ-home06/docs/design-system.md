# Americ Home 06 — Design System

Implementation: `src/styles/theme.css` (tokens) → `base.css` (elements, layout) → `components.css` → `sections.css` (page layout).
Live preview of every token and component: `styleguide.html`.

**Source labels.** **[V]** = measured from the live reference (`demo.bravisthemes.com/americ/home-06/`, inspected 2026-10-24 at 1440, 768 and 375 px). **[A]** = approximation: either derived from verified values or not measurable on the reference. The same tags appear as comments in the CSS.

---

## 1. Theme overview

A quiet corporate look built on one font (DM Sans), a near-monochrome slate-and-mint palette and almost no decoration:

- Headings are **regular weight (400)**, never bold. The only bold text is the 150px outlined marquee.
- **Square corners** on every image and card. Only buttons are rounded (pill).
- **No shadows** on content. Sections are separated by thin 1px rules and background changes (light `#f2f2f2` ↔ dark slate `#253136`).
- Imagery is dark and desaturated. Three sections use full-bleed fixed-attachment (parallax) photos: hero, video banner, contact.
- Motion: autoplay carousels, outline-text marquees, fade-in-up on scroll, image zoom-and-dim on hover.

## 2. Colour palette

| Token | HEX | Role | |
|---|---|---|---|
| `--color-primary` | `#263037` | Filled buttons, links, dropdown bg | V |
| `--color-secondary` | `#dbe8e8` | Pale mint: light text on dark, button text | V |
| `--color-accent` | `#758e99` | Marquee outline stroke, focus ring | V |
| `--color-ink` | `#233032` | Headings, outline-button border | V |
| `--color-background` | `#f2f2f2` | Page, mobile header, side panel | V |
| `--color-surface` | `#e4e5e5` | Contact card | V |
| `--color-surface-dark` | `#253136` | Portfolio + client sections | V |
| `--color-media-fallback` | `#1e3136` | Behind photos while loading / on hover dim | V |
| `--color-text` | `#475355` | Body copy | V |
| `--color-muted` | `#868f91` | Text on dark, footer links | V |
| `--color-heading-invert` | `#e7e9e9` | Headings on dark, stat-card text | V |
| `--color-numeral` | `#425255` | Inactive portfolio numbers/titles | V |
| `--color-border` | `#cbcbcb` | Rules on light backgrounds | V |
| `--color-border-dark` | `#3e4a4d` | Rules on dark backgrounds | V |
| `--color-border-input` | `#9da2a4` | Underline inputs | V |
| `--color-border-footer` | `#232b2e` | Footer bar rule | V |
| `--color-button-hover` | `#000000` | Filled-button hover fill | V |
| `--color-footer-bg` | `#121a1d` | Footer main | V |
| `--color-footer-bg-alt` | `#1a2528` | Footer map column | V |
| Hero glass panel | `rgba(138,146,146,.38)` + 14px blur | The original is a frosted PNG | A |

Note: the theme's own CSS calls the mint `--primary-color`. Here it is `--color-secondary`, because the slate is what buttons and links actually use.

## 3. Typography

**Family:** DM Sans (Google Fonts) for every role: display, headings, body, navigation, buttons [V]. Fallback: `system-ui, -apple-system, "Segoe UI", sans-serif`.

| Role | Token | Desktop | Tablet ≤1024 | Mobile ≤767 | Weight / line-height / tracking |
|---|---|---|---|---|---|
| Marquee | `--fs-marquee` | 150 | 150 | 150 | 700 / 1 / uppercase, 1px outline [V] |
| Portfolio numeral | `--fs-numeral` | 130 | 100 [A] | 80 | 400 / 0.8 [V] |
| Stat counter | `--fs-counter` | 100 | 80 [A] | 64 [A] | 400 / 1, uppercase "K" [V] |
| Hero title | `--fs-hero` | 47 | 47 | 35 | 400 / 1.2 [V] |
| Section heading | `--fs-h2` | 45 | 35 | 30 | 400 / 1.2 / 0.35px [V] |
| Portfolio title | `--fs-portfolio-title` | 32 | 28 [A] | 25 | 400 / 1.2 / 0.35px [V] |
| Footer map heading | `--fs-h3` | 30 | 30 | 26 [A] | 400 [V] |
| Stat label / card title | `--fs-h4` | 28 | 22 | 17 | 400 / 1.2 [V] |
| Service title | `--fs-h5` | 26 | 26 | 23 | 400 [V] |
| Team name | `--fs-name` | 24 | 24 | 24 | 400 [V] |
| Footer column title | `--fs-h6` | 24 | 24 | 18 | 400 [V] |
| Lead (hero text) | `--fs-lead` | 20 | 20 | 18 | 400 [V] |
| Body | `--fs-body` | 18 | 18 | 18 | 400 / 1.666 (30px) [V] |
| Small (card text, footer links) | `--fs-small` | 16 | 16 | 14 | 400 [V] |
| Nav, roles | `--fs-xs` | 14 | 14 | 14 | 400 [V] |
| Buttons | `--fs-body` | 18 | 18 | 18 | 500 / tracking 0.4px [V] |
| Eyebrow label | `--fs-label` | 14 | 14 | 14 | 500, uppercase, 0.12em [A]. Not used on Home 06 |

## 4. Spacing scale

`--space-1…12` = 4, 8, 12, 16, 20, 24, **30**, 40, 50, **70**, **80**, **150** px. Bold values are verified section paddings and carousel gutters.

| Use | Value |
|---|---|
| Default section padding | 80px [V], 70 tablet, 50 mobile |
| Portfolio section | 133px top / 120px bottom [V] |
| Video banner | 150px vertical [V] |
| Contact | 85px / 83px [V] |
| Heading → description | 20–24px [A] |
| Heading block → content | 50px [A] |
| Grid gap | 30px [V] |
| Service card padding | 106 50 92 63 [V]; mobile 50 20 [V] |
| Contact card padding | 66 76 80 80 [V]; mobile 66 50 80 [V] |
| Stat-card overlay inset | 34px top, 40px left [V] |
| Team grid | 50px column gap, 503px row pitch [V] |
| Form field rhythm | 67px between fields [V] |

## 5. Containers & breakpoints

| Token | Value | |
|---|---|---|
| `--container-max` | 1410px content (x = 15…1425 at 1440) | V |
| `--gutter` | 15px at every width | V |
| Header height | 77px desktop, 80px ≤1024 | V |

| Breakpoint | Width | What changes |
|---|---|---|
| Desktop | ≥1025px | Full nav, transparent header over hero |
| Large-tablet | ≤1199px | Stat carousel 1-up, clients 4-up [V Swiper settings] |
| Tablet | ≤1024px | Hamburger header (fixed, `#f2f2f2`), columns stack, parallax off [V] |
| Mobile | ≤767px | Single column, portfolio shows an image per row, Company + Customer footer columns side by side [V] |

## 6. Buttons

| Variant | Spec |
|---|---|
| Outline (`.btn--outline`) | 52px high, padding 0 38px, radius 100px, 1px `#233032` border, text `#233032` 18/500 [V]. Hover: slate fill sweeps up from the bottom, text turns mint [A] |
| Filled (`.btn--primary`) | 52px high, padding 0 40px, bg `#263037`, text `#dbe8e8` [V]. Hover: black fill sweeps up, white text [V] |
| On dark | Outline swaps to mint border and text [A] |
| Video (`.video-btn`) | 240px circle (200 mobile), white 1px ring, ring draws on hover [V] |
| Icon (`.icon-btn`) | 44×44 hit area, 20px icon [A] |

## 7. Cards

| Card | Spec |
|---|---|
| Service | No fill, 1px `#cbcbcb` right rule, top and bottom rules on the row, 90×72 line icon, 26px title, 16px text [V] |
| Stat (image) | 600:435 photo on `#1e3136`; counter + label top-left; title fades in on hover; image scales 1.05 and dims to 0.7 [V] |
| Portfolio row | 130px numeral + 32px title, bottom-aligned, 1px dark rule, 38px apart; active row turns mint and swaps the 557×771 featured image [V] |
| Team | 4:5 photo (440×554) on `#1e3136`; hover: scale 1.05, opacity 0.5, four square social buttons slide in [V] |
| Contact | `#e4e5e5`, square, no shadow, underline-only fields [V] |

## 8. Borders, radius, shadows

- **Borders:** always 1px. Light `#cbcbcb`, dark `#3e4a4d`, input `#9da2a4`, footer `#232b2e` [V].
- **Radius:** 0 everywhere except buttons (100px pill) and circular video, back-to-top and map pins [V].
- **Shadows:** none on content. `--shadow-dropdown: 0 5px 5px rgba(0,0,0,.05)` on menus and the sticky header [V]. `--shadow-float` exists only for floating UI [V].

## 9. Component inventory

| Component | Class | On Home 06 |
|---|---|---|
| Logo | `.logo` | ✓ |
| Header / sticky header | `.site-header`, `.is-stuck` | ✓ |
| Main nav + dropdown | `.nav`, `.dropdown` | ✓ |
| Hamburger | `.burger` | ✓ |
| Info side panel | `.offcanvas`, `.info-panel` | ✓ |
| Mobile menu | `.offcanvas--left`, `.mobile-nav` | ✓ (≤1024) |
| Search overlay | `.search-overlay` | ✓ (layout [A]) |
| Buttons | `.btn--primary`, `.btn--outline` | ✓ |
| Section heading | `.section-title`, `.section-desc`, `.section-head` | ✓ |
| Carousel | `.carousel` + `data-carousel` | ✓ ×3 |
| Service card | `.service-card` | ✓ |
| Stat card | `.stat-card` | ✓ |
| Marquee | `.marquee` | ✓ ×2 |
| Portfolio list + stage | `.portfolio-row`, `.portfolio-stage` | ✓ |
| Client logo | `.client-logo` | ✓ |
| Video button + lightbox | `.video-btn`, `.lightbox` | ✓ |
| Team card | `.team-card` | ✓ |
| Contact card + fields | `.contact-card`, `.field` | ✓ |
| Footer columns, map | `.footer-col`, `.world-map` | ✓ |
| Back to top | `.to-top` | ✓ |
| Eyebrow, stat, blog card, workflow step, testimonial, pricing | `.eyebrow`, `.stat`, `.blog-card`, `.step`, `.testimonial`, `.pricing` | ✗ Home 06 has none. Provided for other pages [A] |

## 10. Responsive behaviour

| Section | Desktop | Tablet (768) | Mobile (375) |
|---|---|---|---|
| Header | Transparent over hero, white sticky bar after 300px | Fixed `#f2f2f2` bar, hamburger opens menu | Same |
| Hero | 971px; glass panel bottom-right, 48% wide | 758px | 638px; panel 338px square from x=38 [V] |
| Services | 3-up | 2-up | 1-up |
| Stats + intro | 2/3 carousel (2-up) + 1/3 text | Stacked, 1-up | Stacked |
| Portfolio | List left, featured image right | Same, narrower | Image above each row, numbers 80px [V] |
| Clients | 5-up | 3-up | 2-up |
| Team | 3-col grid + sticky intro | 2-col, intro below | 1-col, intro below [V] |
| Contact | Card right-aligned 679px | Full width | Full width |
| Footer | 2/3 + 1/3 | Stacked | Stacked; 2-up link columns [V] |

Fixed-attachment backgrounds switch to `scroll` at ≤1024px and on touch devices. All motion stops under `prefers-reduced-motion`.

## 11. CSS variable reference

All tokens live in `src/styles/theme.css` and are grouped as follows:

- **Brand:** `--color-primary`, `--color-primary-rgb`, `--color-secondary`, `--color-secondary-rgb`, `--color-accent`, `--color-ink`, `--color-ink-deep`
- **Surfaces:** `--color-background`, `--color-surface`, `--color-surface-dark`, `--color-media-fallback`, `--color-overlay-glass`
- **Text:** `--color-heading`, `--color-text`, `--color-muted`, `--color-heading-invert`, `--color-text-invert`, `--color-numeral`
- **Borders:** `--color-border`, `--color-border-strong`, `--color-border-input`, `--color-border-dark`, `--color-border-footer`
- **Interaction:** `--color-button-bg`, `--color-button-text`, `--color-button-hover`, `--color-button-hover-text`, `--color-button-outline-hover-bg`, `--color-link`, `--color-link-hover`, `--color-link-invert-hover`, `--color-focus-ring`
- **Footer:** `--color-footer-bg`, `--color-footer-bg-alt`, `--color-footer-heading`, `--color-footer-text`
- **Type:** `--font-display`, `--font-body`, `--font-nav`, `--font-button`, `--fw-light|regular|medium|bold`, `--fs-marquee`, `--fs-hero`, `--fs-h2…h6`, `--fs-name`, `--fs-lead`, `--fs-body`, `--fs-small`, `--fs-xs`, `--fs-label`, `--fs-numeral`, `--fs-portfolio-title`, `--fs-counter`, `--lh-tight|heading|body`, `--ls-heading|button|label`
- **Layout:** `--container-max`, `--container-wide`, `--gutter`, `--page-gutter`, `--space-1…12`, `--section-py`, `--section-py-dark`, `--grid-gap`, `--grid-gap-lg`, `--card-padding`, `--card-padding-sm`, `--form-card-padding`, `--heading-gap`, `--heading-block-gap`
- **Components:** `--header-height`, `--btn-height`, `--btn-padding-x`, `--input-height`, `--video-btn-size`, `--radius-none|sm|pill|round`, `--shadow-dropdown`, `--shadow-float`, `--ratio-blog|portfolio|portfolio-sm|team|video`
- **Motion:** `--ease`, `--dur-fast`, `--dur`, `--dur-slow`, `--marquee-duration` (16s [V]), `--carousel-delay` (5000 [V]), `--carousel-speed` (500 [V]), `--hover-scale` (1.05 [V])

---

## Images

The reference's photos belong to a paid ThemeForest theme, so this build uses free [Unsplash](https://unsplash.com/license) photos matched for subject, crop and tone. The photo IDs are in `index.html`. Logos, service icons and the world map are original SVGs. The map is generated by `tools/generate-map.cjs` with the `dotted-map` package. If you own an Americ licence, you can swap in the original files at the same aspect ratios.
