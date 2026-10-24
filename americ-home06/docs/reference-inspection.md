# Americ — Home 06 reference spec

Source: https://demo.bravisthemes.com/americ/home-06/ (Bravis-Themes, WordPress + Elementor, "pxl" widget framework)
Inspected live on 2026-10-24 at 1440×900, 768×1024 and 375×812.

Legend: **[V]** = verified from DOM/computed styles · **[S]** = seen in screenshots · **[A]** = approximation / inferred

---

## 1. Global tokens

### Colors [V]
| Token | Value | Used for |
|---|---|---|
| `--body-bg-color` | `#f2f2f2` | page background, header bg on mobile/sticky |
| `--primary-color` | `#dbe8e8` | light text on dark (hero, footer headings, menu links on dark header, submit text) |
| `--secondary-color` | `#475355` | body text |
| `--link-color` | `#263037` | links, filled button bg (`rgb(38,48,55)`) |
| heading color | `#233032` (`rgb(35,48,50)`) | headings, outline-button text/border |
| dark section bg | `#253136` (`rgb(37,49,54)`) | portfolio + client logos |
| team image placeholder | `#1e3136` | behind team photos |
| muted text on dark | `#868f91` (`rgb(134,143,145)`) | portfolio intro, footer links |
| light heading on dark | `#e7e9e9` | portfolio title, blog card titles |
| portfolio number | `#425255` | big "01–04" numerals |
| outline marquee stroke | `#758e99`, 1px, transparent fill | marquee text |
| contact card bg | `#e4e5e5` | form card |
| footer left bg | `#121a1d` | footer main |
| footer right bg | `#1a2528` | footer map column |

### Typography [V]
- Single family: **DM Sans** (Google Fonts, weights 200–800, italics). Icons: Flaticon (theme font).
- Body: 18px / ~30px line-height / 400 / `#475355`.
- Section headings (H3 style): 45px / 54px / 400 / letter-spacing 0.35px / `#233032`. Tablet 35px, mobile 30px.
- Hero title: 47px / 400 / `#dbe8e8` (tablet 47px, mobile 35px). Hero sub: 20px (mobile 18px).
- Service card title: ~23px (mobile verified 23px) [V mobile, A desktop].
- Blog card title: 28px (tablet 22px, mobile 17px), `#e7e9e9`.
- Team name 24px, role 14px.
- Marquee: 150px / 700 / uppercase, outline only.
- Menu: 14px / 400.
- Footer: column headings 24px (mobile 18px), links 16px (mobile 14px), map heading 30px, copyright 15px.
- Headings are generally light weight (400) — no bold headings anywhere except the marquee.

### Buttons [V]
- Outline pill: height 52px, padding `0 38px`, radius 100px, 1px solid `#233032`, text 18px/500, letter-spacing 0.4px, transparent bg. Hover keeps transparent bg + same text color (the theme's own hover animation, likely text-slide, is [A]).
- Filled pill (form submit): bg `#263037`, text `#dbe8e8`, padding `0 40px`, height 52px, radius 100px.

### Layout [V]
- Boxed container ≈ **1330px** wide at 1440 viewport; many sections are full-width/stretched.
- No border-radius on images/cards (all 0px). No card shadows. Thin 1px dividers instead.
- Breakpoints follow Elementor: ≤1024 tablet (hamburger header), ≤767 mobile.

---

## 2. Sections in order (desktop 1440px, y = top offset)

0. **Header** (sticky) — h ≈ 77px [V]. Transparent over hero with light (`#dbe8e8`) menu; a second sticky version with white bg + dark logo (`logo2.png`) slides in on scroll [V: two header sections, sticky one at y=-77]. Logo left (`logo.png` 110×29), centered menu Home / Pages / Services / Portfolio / Blog / Contact with down-chevron (rotates on hover [V]), Home has a mega "showcase" of 10 demo thumbnails. Right: search icon + hamburger that opens a **hidden side panel** (logo, blurb, Contact Info: 3 Madison Street NY…, email, phone, New York Office, socials) [V]. Hamburger lines animate width on hover [V].
1. **Hero** (y 0, h 971) — full-width bg photo `2024/05/bg-image1.jpg` (man on sofa with laptop, dark). Bottom-right translucent frosted panel (`bg-overlay1.png`, 691×358) containing title "Digital transformation to grow your company" + paragraph [V/S]. No CTA button.
2. **Services carousel** (y 971, h 862, pad 80/0/40) — centered heading "We provide the premium services / for business" (2 lines). Swiper: 3 per view (4 on xxl, 2 md, 1 xs), loop, autoplay 5s, speed 500ms, no arrows/dots, 30px gutter [V]. Cards: line icon (`icon-service1..4.png`), title, ~3-line excerpt; separated by 1px vertical/horizontal dividers, no bg [S]. Items: Tax strategy, Manage investment, We Build Success, Financial advices.
3. **Stat/blog carousel + intro** (y 1832, h 500) — left: Swiper, 2 per view (1 on lg and below), image cards 453×328 (`post-img*-1-600x435.jpg`) with big "24K"/"4K" overlay number + small title on the image [S]. Right column: heading "Create your own unique & have fun doing it!", paragraph, outline button "View About Us". Hover: image scale 1.05 + opacity 0.7, title chars lift −10px [V].
4. **Marquee 1** (y 2333, h 221) — "WELCOME TO AMERIC WORDPRESS THEMES" outline text 150px, scrolls left infinitely, `16s linear` [V].
5. **Portfolio** (y 2554, h 1158, bg `#253136`, pad 70/0) — top row: "Our latest portfolio" left, muted paragraph right. Below: left list of 4 rows, each a huge numeral (01–04, `#425255`) + title, 1px divider, rows fade-in-up (WOW) [V]. Right: image (`post-img*-1-553x533.jpg`, tall) that swaps per hovered row [A: hover-swap inferred from 4 bg images in one slot]. Titles: "Porttitor rhoncus dolor purus noneni mraesent", "Fringilla urna port titor rhoncus dolr purusm", "Dferons torestory ort titorhoncus dolr wefgh", "Transformation sparks financial income for all".
6. **Client logos** (y 3711, h 285, same dark bg) — Swiper 5 per view (4 lg, 3 md, 2 sm, 1 xs), autoplay; white line logos `cline1..5.png`, top divider [V].
7. **Video banner** (y 3996, h 775, pad 150/0) — full-width parallax bg `2024/05/bg-video.jpg` (misty forest). Centered 240px circle with 1px white ring, "▶ Play Video" → YouTube `ShF79Pog6Ew` in Magnific Popup lightbox [V]. Ring animates (progress-circle stroke) on hover [V].
8. **Team** (y 4771, h 1195) — left 2/3: grid 3 cols × 2 rows (col-xl-4 / 2 cols on md & tablet / 1 col mobile), photo 277×349 (`team-img*.jpg`, ~4:5), name 24px, role 14px. Hover: image scale 1.05, opacity 0.5, social icons slide in [V]. Right 1/3, **sticky while scrolling** (`pxl-row-scroll-fixed`): heading "Meet our professional team", paragraph, outline button "View All Members". Members: Jesica Doe – Manager, Anna Mariana – UI/UX Designer, Roberto Doe – SEO, Maxim Smith – Marketing agent, Leonia jena – Developer, Marian Antonio – Developer.
9. **Marquee 2** (y 5967, h 209) — "LET'S CONTACT –" outline text, same style.
10. **Contact** (y 6176, h 766, pad 85/0/83) — full-width bg `2024/05/bg-form1.jpg` (man at laptop). Right-aligned card 679×568, bg `#e4e5e5` (frosted/light) [V]: "Let's get in touch" (45px), underline-only inputs (Your Name, Your Email, Your Message — 520px wide, 50px high, bottom border only), filled pill "Send Message" [V/S]. Contact Form 7.
11. **Footer** (y 6942, h 541) — 2/3 + 1/3 split. Left (`#121a1d`): logo, blurb, social icons (fb, twitter, linkedin, instagram); three link columns Company / Customer / Offices; bottom bar "© All Rights Reserved. – Americ – BravisThemes." with top divider. Right (`#1a2528`): "Where can you find us?" + dotted world map `img-map.png` with pulsing location dots (England, France, Spain, Belgium, Poland, Italy) [V/S].

Fixed extras: back-to-top circle bottom-right [S]; right-edge demo toolbar (cart/docs/support/grid) — this is the demo vendor's toolbar, not part of the design; omit.

---

## 3. Responsive [V]
| Section | Tablet 768 | Mobile 375 |
|---|---|---|
| Header | hamburger, bg `#f2f2f2`, h 80, fixed | same |
| Hero | 758h, title 47px | 638h, title 35px |
| Services | 2 per view, heading 35px | 1 per view, heading 30px |
| Blog+intro | stacks (carousel then text), 1 per view | stacks |
| Portfolio | stacks, 1336h | stacks, 2310h, titles 25px |
| Team | 2 cols, sticky column stacks | 1 col |
| Contact | card full width | card full width, heading 30px |
| Footer | stacks, link cols 2-up | stacks, link cols 2-up |
| Marquee | stays 150px | stays 150px |

---

## 4. Motion & libraries [V]
jQuery, Swiper, Slick, GSAP + ScrollTrigger + SplitText (char-split headings), WOW.js fadeInUp, Isotope, Magnific Popup, tilt.js, parallax-scroll, parallax-move-mouse, custom cursor.js, counter/numerator. Expect: split-char heading reveals on scroll, fade-in-up cards, parallax backgrounds, autoplay carousels, infinite marquees.

## 5. Assets (all under `https://demo.bravisthemes.com/americ/wp-content/uploads/`)
`2024/03/logo.png`, `2024/03/logo2.png`, `2024/05/bg-image1.jpg`, `2024/05/bg-overlay1.png`, `2024/03/icon-service1..4.png`, `2024/03/post-img{1,3,5,8}-1-600x435.jpg`, `2024/03/post-img{1,2,3,5}-1-553x533.jpg`, `2024/05/cline1..5.png`, `2024/05/bg-video.jpg`, `2024/03/team-img{2,3,4}.jpg`, `2024/04/team-img{4,5,6}.jpg`, `2024/05/bg-form1.jpg`, `2024/04/img-map.png`.

**Licensing:** these images belong to a paid ThemeForest theme demo (and its stock-photo licences). Hotlinking or reusing them in a production site isn't permitted unless you've bought the theme. Use them only as local placeholders while you build, then swap in your own images or royalty-free ones (Unsplash/Pexels) of the same aspect ratios.

## 6. Not verified
- Exact hover animation of the outline buttons (CSS shows no colour change; probably a JS text-slide).
- Whether the portfolio image swaps on hover or on scroll position.
- Exact service-card title size at desktop (mobile is 23px).
- The full content of the dropdown sub-menus (not expanded).
