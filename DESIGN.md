---
version: alpha
name: ShopBoard
description: A calm, bright shop board. Soft gray page, white cards, one blue for every action, one coral for decoration only.
colors:
  background: "#EEF0F3"
  foreground: "#0E1116"
  card: "#FFFFFF"
  muted: "#E2E6EE"
  muted-foreground: "#63666A"
  subtle-foreground: "#36393E"
  border: "#CFD1D4"
  primary: "#3B5BFD"
  primary-foreground: "#FFFFFF"
  primary-soft: "#D5DBF4"
  highlight: "#FF7A59"
  highlight-foreground: "#0E1116"
  link: "#294CFD"
  destructive: "#D92D20"
  success: "#16A34A"
typography:
  hero:
    fontFamily: Bricolage Grotesque
    fontSize: 4.4rem
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.01em
  h1:
    fontFamily: Bricolage Grotesque
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -0.01em
  h2:
    fontFamily: Bricolage Grotesque
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.01em
  h3:
    fontFamily: Bricolage Grotesque
    fontSize: 1.125rem
    fontWeight: 700
    lineHeight: 1.3
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  lead:
    fontFamily: Inter
    fontSize: 1.2rem
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.4
  eyebrow:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.08em
  price:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -0.01em
  mono:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 10px
  md: 18px
  lg: 28px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  tap: 44px
  header: 64px
  page-max: 1240px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: 0 20px
    height: "{spacing.tap}"
  button-secondary:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 0 20px
    height: "{spacing.tap}"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.link}"
    rounded: "{rounded.md}"
    padding: 0 12px
    height: "{spacing.tap}"
  input:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 10px 14px
    height: "{spacing.tap}"
  product-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: 20px
  panel:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 20px
  dialog:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: 24px
  cart-badge-count:
    backgroundColor: "{colors.highlight}"
    textColor: "{colors.highlight-foreground}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.full}"
    height: 20px
  status-message:
    backgroundColor: "{colors.card}"
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.md}"
    padding: 20px
---

# ShopBoard design

How ShopBoard looks: the tokens above (normative) and the visual rules below. No code here
(that is `AGENTS.md`). The design is ShopBoard v1's.

## Overview

A light, airy shop page. The page is a soft gray with three blurred color glows behind
everything (blue top left, coral top right, faint blue bottom right), named `page-glows`.
They keep their light colors in dark mode. Content sits on white
cards with large rounded corners. There is one action color, blue (`primary`). Coral
(`highlight`) never means "click me": it only decorates (the cart count, gradients).

Motion is short and quiet: things rise 10px and fade in (`rise`, 0.45s; the hero's `hero`,
0.5s), dialogs pop in (`pop`, 0.22s), toasts slide up (`slide-up`, 0.24s), cards lift 3px on
hover. Everything stops when the user asks for reduced motion.

## Colors

Each token is a role, not a hue. Use the role, never the hex value.

| Token               | Role                                                      |
| ------------------- | --------------------------------------------------------- |
| `background`        | The page                                                  |
| `foreground`        | Main text                                                 |
| `card`              | Cards, panels, inputs, dialogs                            |
| `muted`             | Hover background, tinted tiles, skeletons                 |
| `muted-foreground`  | Secondary text: categories, hints, empty states           |
| `subtle-foreground` | Labels                                                    |
| `border`            | Borders and dividers; also the input border               |
| `primary`           | Every action: primary buttons, focus ring, selection      |
| `primary-soft`      | A tinted card tile; the placeholder art                   |
| `highlight`         | Decoration only: the cart count, gradients                |
| `link`              | Links, ghost buttons, the keyboard focus outline          |
| `destructive`       | Errors: an invalid field's border, error messages, toasts |
| `success`           | Success messages                                          |

Dark mode follows the system setting (`prefers-color-scheme`), there is no toggle. These
tokens change in dark mode; the others keep their light value:

| Token                | Dark      |
| -------------------- | --------- |
| `background`         | `#0F1014` |
| `foreground`         | `#EBEBF0` |
| `card`               | `#18191E` |
| `muted`              | `#212229` |
| `muted-foreground`   | `#9A9CA7` |
| `subtle-foreground`  | `#C8C9D0` |
| `border`             | `#31323A` |
| `primary`            | `#4D6AFD` |
| `primary-foreground` | `#0B0B0D` |
| `primary-soft`       | `#1B2243` |
| `link`               | `#5F79FD` |

`highlight` stays light in dark mode, so the cart count keeps dark ink
(`highlight-foreground`).

A transparent color is an existing token at an opacity, never a new token: the header is
`background` at 82%, the input focus ring is `primary` at 20%.

## Typography

Three families, all served by this site (never loaded from a third party at view time):

- **Bricolage Grotesque** (display): `h1`, `h2`, `h3`, the hero title, the logo.
- **Inter** (body): everything else.
- **JetBrains Mono**: `code`, `kbd`, `pre`.

Headings balance their lines; paragraphs avoid a single word on the last line. Prices and
counts use tabular (fixed-width) digits, so they don't shift as they change.

The hero and `h2` sizes are fluid: they grow with the screen between a minimum and the
token's size (minimum, preferred, maximum):

- hero: `clamp(2.4rem, 5.5vw, 4.4rem)`
- `h2`: `clamp(1.5rem, 2.4vw, 2rem)`
- hero text (`lead`): `clamp(1.05rem, 1.4vw, 1.2rem)`

Inputs use `16px` text, so iOS doesn't zoom in on focus.

## Layout

- The page content is at most `page-max` (1240px) wide, centered, with a side padding
  (`page`) of `clamp(16px, 4vw, 40px)`.
- The header and the footer hold their content in a 1200px column (`frame`: 1280px minus
  the 40px side padding). The header is sticky, at least `header` (64px) tall, with a
  blurred, 82% opaque `background`.
- Every clickable thing is at least `tap` (44px) tall and wide.
- Sections have a vertical padding (`section`) of `clamp(40px, 7vw, 88px)`; the hero (`hero`)
  `clamp(56px, 9vw, 112px)`.
- Mobile first. Breakpoints used: `768px` (`md`), `900px` (`hero-split`: the hero gets two
  columns), `960px` (`checkout-split`), `1024px` (`lg`).
- Hero: one column; from `hero-split`, the text on the left (1.1fr) and the art on the right
  (0.9fr, at least 320px tall), 48px apart (`hero-columns`). The title is at most 18ch wide,
  the text 46ch.
- Products page: the three filters stack on mobile, sit in one row from `md` (2fr 1fr 1fr,
  `filters-columns`), and become a sticky 260px sidebar from `lg` (`sidebar-columns`), 16px
  under the header.
- Product grid (`product-grid-columns`): `repeat(auto-fill, minmax(min(100%, 210px), 1fr))`,
  gap (`grid`) `clamp(16px, 2vw, 24px)`.
- Checkout: form (max 480px) then summary (max 360px); side by side, 32px apart, from
  `checkout-split`.

## Elevation & Depth

Three shadows, all soft and pushed down:

| Token    | Value                                   | Used on                    |
| -------- | --------------------------------------- | -------------------------- |
| `lift`   | `0 18px 40px -18px rgb(14 17 22 / 35%)` | a product card on hover    |
| `panel`  | `0 8px 24px -16px rgb(14 17 22 / 35%)`  | the filters sidebar        |
| `dialog` | `0 30px 80px -20px rgb(0 0 0 / 45%)`    | the sign-up dialog, toasts |

The dialog's backdrop (`backdrop`) is `#0E1116` at 55% with a 6px blur. It keeps this value in
dark mode.

## Shapes

- `rounded.md` (18px) is the default: buttons, inputs, panels, cart lines, messages.
- `rounded.lg` (28px): product cards, the hero art, dialogs, the sidebar.
- `rounded.sm` (10px): small inner pieces.
- `rounded.full`: the cart badge button and its count.
- The placeholder art inside a card uses `rounded.lg` minus 4px, so it nests.

## Components

- **Buttons**: primary (blue, white text), secondary (white with a `foreground` border),
  ghost (looks like a nav link, `link` text). All scale to 98% while pressed. Three sizes:
  small (12px side padding, `body-sm` text, still 44px tall), medium (44px, 20px side
  padding) and large (48px tall, 26px side padding). Disabled: 50% opacity, `not-allowed` cursor.
- **Inputs and selects**: `card` background, `border` border, `rounded.md`. On focus: the
  border turns `primary` and a 4px `primary/20` ring appears. Invalid: `destructive` border.
- **Hero**: the title (`hero` type), the text (`lead`, `muted-foreground`, 16px above and
  24px below), a large primary button. From `hero-split`, the art on the right: a blue and a
  coral glow over `muted` (`hero-art`), `rounded.lg`. Each part rises in (`hero`).
- **Product card**: `card` background; every 4n+2 card uses `muted`, every 5n+3 uses
  `primary-soft` (a bento rhythm). A 4:3 placeholder art on top: a dot grid 12px apart over a
  `primary-soft` → `muted` gradient (`product-art`). Hover or focus inside: lift 3px with the `lift` shadow.
  The product name looks like a heading, not a blue link; it underlines on hover and focus.
- **Category label** (`eyebrow`): uppercase, `muted-foreground`.
- **Section title**: a 32×3px `primary` bar above it.
- **Status and empty messages**: dashed `border`, `card` background, centered
  `muted-foreground` text.
- **Skeleton card**: 300px tall, `muted` with a moving light (`skeleton-shine`, a white band at
  45%) that crosses it every 1.4s (`shimmer`).
- **Cart badge**: a 44px round button; the count sits top right on `highlight`.
- **Cart line**: a `panel` card per product, 12px apart. The name (like the product card's),
  the category label and the unit price; then the quantity: small secondary `−` and `+`
  buttons around the count (tabular digits), a ghost "Remove", and the line total in `price`
  type. Stacked on mobile; from `md`, one row with the quantity on the right.
- **Cart total**: a `panel` card under the lines: "Total" and the sum in `price` type, then a
  large primary "Go to checkout" button. An empty cart is a status message with a primary
  "Browse products" button.
- **Order summary** (checkout): a `panel` card titled "Order summary" (`h3`): one row per
  line, the name and quantity on the left, the line total on the right (tabular digits),
  then a `border` divider and "Total" with the sum in `price` type. While it loads, a status
  message; if it fails, the error message with "Try again", and the form keeps working.
- **Thank-you**: the page title "Thank you, {name}!" ("Thank you!" with no name), one
  `muted-foreground` line saying the order is placed, and a primary "Keep shopping" button.
- **Dialog**: centered over the blurred backdrop, 480px wide at most and 16px from each screen
  edge on mobile (`dialog`), pops in (`pop`).
- **Toast**: bottom of the screen on mobile, bottom right and 360px wide from `md`.
  Success uses `primary`, error uses `destructive`.
- **Form fields** (checkout and sign-up): look exactly like the inputs above, with the
  label (`label` type) above the input and the error in `destructive` below it.

## Do's and Don'ts

- Do use a token by its role. Don't introduce a color, size, radius or shadow that is not
  a token in this file.
- Do use `primary` for every action and only for actions. Don't use `highlight` for a
  button or a link.
- Do keep every clickable thing at least 44px. Don't make an icon button smaller.
- Do check a new component in dark mode. Don't add a color that has no dark value.
- Do respect reduced motion. Don't add an animation longer than 0.5s.
- Do add a new token to this file before anyone uses it.
