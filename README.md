# ShopBoard

A small online shop built with Next.js 16 and Tailwind CSS 4: browse and filter products,
open one, add it to a cart that is saved in the browser, and check out.

This is the Day 6 assignment: ShopBoard rebuilt on the Next.js App Router, styled only with
Tailwind, through its own UI kit in `components/ui`.

## Features

- **Products** (`/products`): search by name, filter by category, sort by price.
- **Product page** (`/products/[id]`): one product, loaded on the server. An unknown id
  (`/products/abc`, `/products/99999`) shows the 404 page.
- **Cart** (`/cart`): change quantities, remove lines, see the total. Saved in
  `localStorage`, shared between tabs. A product the shop no longer sells leaves the cart.
- **Checkout** (`/checkout`): a validated form (name, email, address). The order summary
  loads and can fail on its own; the form keeps working.
- **Thank-you** (`/checkout/success`): greets the customer by name.
- **Sign up**: a dialog on the native `<dialog>` element (Esc closes it, focus stays inside
  and comes back).
- **Loading, errors, 404**: every page that loads data shows a loading state while it waits
  and an error with "Try again" if it fails (the checkout only in its summary).
- **Responsive** from 360px up, **dark mode** from the system setting, every control usable
  with the keyboard.

## Tech stack

| Area      | Tools                                                               |
| --------- | ------------------------------------------------------------------- |
| Framework | Next.js 16.4 (App Router), React 19, TypeScript (strict)            |
| Styling   | Tailwind CSS 4, shadcn/ui (Radix), class-variance-authority, `cn()` |
| Forms     | react-hook-form, Zod                                                |
| Quality   | oxlint, Prettier (sorts Tailwind classes), husky, lint-staged       |
| Package   | pnpm                                                                |

## Getting started

You need Node.js 20.9 or newer (what Next.js 16 requires) and pnpm.

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

### Environment variables

| Variable       | Required | Default                                |
| -------------- | -------- | -------------------------------------- |
| `API_BASE_URL` | No       | `https://shopboard-api.vercel.app/api` |

It is read on the server only. To change it, copy `.env.example` to `.env.local`.

To see the loading, error and empty states, put one of these before `/api`, then restart
the server:

```bash
API_BASE_URL=https://shopboard-api.vercel.app/delay/3000/api   # slow: loading screens
API_BASE_URL=https://shopboard-api.vercel.app/fail/500/api     # failing: error screens
API_BASE_URL=https://shopboard-api.vercel.app/empty/api        # no products
```

## Scripts

| Command             | What it does                                  |
| ------------------- | --------------------------------------------- |
| `pnpm dev`          | Start the development server                  |
| `pnpm build`        | Build for production                          |
| `pnpm start`        | Serve the production build                    |
| `pnpm typecheck`    | Generate the route types, then run TypeScript |
| `pnpm lint`         | Run oxlint                                    |
| `pnpm format`       | Format the code with Prettier                 |
| `pnpm format:check` | Check the formatting without changing files   |

Before every commit, husky runs lint-staged (oxlint and Prettier on the staged files), then
`typecheck`, `lint`, `format:check` and `build`.

## Project structure

```
app/                              # Routes only (App Router)
├── layout.tsx                    # Header + <main>{children}</main> + Footer, fonts, CSS
├── globals.css                   # Tailwind import and the design tokens. No style rules
├── page.tsx                      # "/": the hero, with a link to /products
├── not-found.tsx                 # any unknown URL, and every notFound()
├── error.tsx                     # last safety net ("Try again")
├── icon.svg                      # the favicon
├── products/
│   ├── page.tsx                  # "/products": awaits the products, shows ProductsSection
│   ├── loading.tsx               # the skeleton grid, shown at once
│   ├── error.tsx                 # "We couldn't load the products" + Try again
│   └── [id]/
│       ├── page.tsx              # "/products/:id": the product, or notFound()
│       ├── loading.tsx           # "Loading product…"
│       └── error.tsx             # "We couldn't load this product" + Try again
├── cart/
│   ├── page.tsx                  # "/cart": awaits the products, shows CartContent
│   ├── loading.tsx               # "Loading cart…"
│   └── error.tsx                 # "We couldn't load your cart" + Try again
└── checkout/
    ├── page.tsx                  # the form at once; the summary in its own <Suspense>
    └── success/page.tsx          # the thank-you (?name=)
components/
├── layout/                       # The page frame
│   ├── header.tsx                # the Navbar: logo, Shop, Sign up (Modal), CartLink, Toast
│   ├── shop-link.tsx             # "Shop", marked as the current page on /products
│   ├── cart-link.tsx             # the cart button with its item count
│   ├── footer.tsx
│   └── page-section.tsx          # PageSection and PageTitle (the bar above every title)
└── ui/                           # The UI kit. Knows nothing about products or the cart
    ├── button · input · label · field · card · badge · skeleton (.tsx)
    │                             # from shadcn/ui, adapted to the design
    ├── select.tsx                # ours: a native <select> that looks like Input
    ├── modal.tsx                 # ours: native <dialog>, size sm | md | lg
    ├── toast.tsx                 # ours: a short message at the bottom of the screen
    ├── status-message.tsx        # ours: the box for loading, empty and error messages
    ├── error-message.tsx         # ours: what every error.tsx shows ("Try again")
    ├── error-boundary.tsx        # ours: an error boundary for one part of a page
    ├── heading.ts                # ours: headingVariants for h1–h3
    └── focus-ring.ts             # ours: the keyboard focus outline, in one place
features/                         # One folder per feature
├── products/
│   ├── products.types.ts         # Product, Category, Filters
│   ├── products.logic.ts         # search, filter and sort (pure functions)
│   ├── products.state.ts         # the starting filters, and which screen: empty, no match, list
│   ├── products.api.ts           # loadProducts() and loadProduct(id) (server only)
│   └── components/               # hero, products-section, product-controls,
│                                 # products-content, product-grid, product-card,
│                                 # product-art, product-price
├── cart/
│   ├── cart.types.ts             # Cart, CartItem, CartLine
│   ├── cart.logic.ts             # add, change, remove, count, total, lines (pure functions)
│   ├── cart.storage.ts           # read and write localStorage
│   ├── cart.store.ts             # the one owner of the cart
│   ├── cart.hooks.ts             # useCart, useCartActions, useCartLoaded, useRemoveUnavailable
│   └── components/               # add-to-cart-button, cart-content, cart-row
├── checkout/
│   ├── checkout.schema.ts        # the form's rules and messages (Zod)
│   └── components/               # checkout-content, checkout-form, order-summary,
│                                 # thank-you-title
└── auth/components/register-form.tsx
lib/
├── utils.ts                      # cn(): clsx + tailwind-merge, taught our token names
├── format.ts                     # formatPrice()
└── api/
    ├── config.ts                 # the server address (API_BASE_URL)
    ├── client.ts                 # getJson(): the only fetch
    └── errors.ts                 # ApiError
```

**The UI kit** (`components/ui`) knows nothing about products or the cart: it takes props
and `className`. It holds shadcn/ui components adapted to the design (Button, Input, Label,
Field, Card, Badge, Skeleton) and our own (Select, Modal, Toast, StatusMessage,
ErrorMessage, ErrorBoundary). Each component has typed props, and the ones with variants
use `cva`, so a wrong variant is a type error.

**The design tokens** (colors, radii, fonts, sizes) live once in `app/globals.css`, in
Tailwind's `@theme`. Components use them by name (`bg-card`, `rounded-lg`, `shadow-lift`),
never as hex codes, `px` or `[..]` values. Tailwind's built-in colors and radii are switched
off, so only our tokens exist.

## Design decisions

Two choices differ from the course slides on purpose:

1. **The cart is a small store read with `useSyncExternalStore`, not a Context with
   `useState(loadCart)`.** The server has no `localStorage`. With `useState(loadCart)` the
   server would render an empty cart and the browser the saved one, and React would report a
   hydration mismatch. The store gives both the same empty cart first, then the saved one.
2. **The checkout summary has its own `<Suspense>` and error boundary.** The page starts
   loading the products without waiting for them, so the form shows at once, and if the
   products fail only the summary shows "Try again".

## For contributors and AI agents

| File        | What it holds                                       |
| ----------- | --------------------------------------------------- |
| `AGENTS.md` | How the code is written: structure, styling, rules  |
| `DESIGN.md` | How the app looks: the design tokens and components |
| `CLAUDE.md` | How Claude Code works here, and the UI rules        |

## Deploy

1. Push the repository to GitHub.
2. (https://vercel.com/abdallaheng2022/shopboard-next-2) Vercel detects Next.js and pnpm.
3. Optional: set `API_BASE_URL` under Project → Settings → Environment Variables.
