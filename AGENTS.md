<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ShopBoard v2 (Next.js, Tailwind, UI kit)

ShopBoard v2 is the Day 6 assignment: ShopBoard v1 (`shopboard-next`) rebuilt on a fresh
`create-next-app` project with the course's structure. It has the same features, cart,
checkout and states as v1, with these differences: `/products` is its own route; loading,
errors and 404s use the route files (`loading.tsx`, `error.tsx`, `notFound()`); everything
is styled with Tailwind through our UI kit in `components/ui`.

## The three instruction files

Each file has one job. Don't repeat a rule in two files: point to the file that owns it.

| File        | Owns                                                                      | Read by          |
| ----------- | ------------------------------------------------------------------------- | ---------------- |
| `AGENTS.md` | How the code is written: stack, structure, code rules                     | every agent      |
| `DESIGN.md` | How the app looks: tokens and visual rules. No code in it                 | every agent      |
| `CLAUDE.md` | How Claude works here: imports this file, the workflow, the UI rules list | Claude Code only |

Read before any change: `node_modules/next/dist/docs/` for Next.js (see the block above), and
`DESIGN.md` before any change a user can see.

## Stack

- Next.js 16.4 (App Router), React 19, TypeScript with `"strict": true`
- `cacheComponents` and `partialPrefetching` on (the `create-next-app` defaults)
- Tailwind CSS 4 through the `@tailwindcss/turbopack` loader in `next.config.ts`
  (what `create-next-app` 16.4 sets up). No `postcss.config.mjs`, no `tailwind.config.*`.
- shadcn/ui (Radix base) as the starting point of the UI kit; `cva`, `clsx`, `tailwind-merge`
- react-hook-form, Zod and `@hookform/resolvers` for the checkout form
- Fonts from `next/font/google`
- pnpm; oxlint, Prettier (with `prettier-plugin-tailwindcss`), husky and lint-staged

## What the code may use

The course so far plus what Next.js gives for the same jobs: Server and Client Components,
the route files, `next/link`, `next/navigation` (`notFound`, `useRouter`, `usePathname`),
`next/font`, `connection()`, `React.cache`, `useSyncExternalStore` (only in `cart.hooks.ts`).

- No state library, no data-fetching library, no Server Actions, no API routes.
- `memo`, `useCallback` and `useMemo` only where v1 measured a problem (see "Performance").
- No `"use cache"`: the products must be fresh on every visit, and the API's test switches
  must work.
- No new npm package without asking first.

## No AI slop

- No AI chat logs, no plan or notes files, no leftover or unused files, no code nobody asked
  for. The create-next-app demo files (`public/*.svg`, `app/favicon.ico`, the demo
  `page.tsx`) go once the real files replace them.
- Every hook, piece of state, effect, `"use client"` and Tailwind class has a reason you can
  say in one sentence. If there is no reason, remove it.
- After every change, say what changed, where, and why (in the commit message).

## Structure

The course's layout: `app/` holds only routes; components, features and `lib` sit next to
it. No `src/` folder. The `@/*` alias points at the root (`tsconfig.json`).

```
app/                              # Routes only (App Router)
├── layout.tsx                    # Header + <main>{children}</main> + Footer, fonts, CSS
├── globals.css                   # Tailwind import and the DESIGN.md tokens. No style rules
├── page.tsx                      # "/": the hero, with a link to /products
├── not-found.tsx                 # any unknown URL, and every notFound()
├── error.tsx                     # last safety net ("use client", retry)
├── icon.svg                      # the favicon
├── products/
│   ├── page.tsx                  # "/products": awaits the products, shows ProductsSection
│   ├── loading.tsx               # the skeleton grid, shown at once
│   ├── error.tsx                 # "We couldn't load the products" + Try again
│   └── [id]/
│       ├── page.tsx              # "/products/:id": the product, or notFound()
│       └── loading.tsx
├── cart/                         # page.tsx · loading.tsx · error.tsx
└── checkout/
    ├── page.tsx                  # the form at once; the summary in its own <Suspense>
    └── success/page.tsx          # the thank-you (?name=)
components/
├── layout/                       # header.tsx ("use client"), shop-link.tsx, footer.tsx,
│                                 # page-section.tsx (PageSection, PageTitle)
└── ui/                           # The UI kit. Knows nothing about products or the cart
    ├── button · input · label · field · card · badge · skeleton (.tsx)
    │                             # from the shadcn CLI, adapted to DESIGN.md
    ├── select.tsx                # ours: a native <select> that looks like Input
    ├── modal.tsx                 # ours: native <dialog>
    ├── status-message.tsx        # ours: empty, no-match and error messages
    ├── error-message.tsx         # ours: what every error.tsx shows ("Try again")
    ├── heading.ts                # ours: headingVariants for h1–h3
    └── focus-ring.ts             # ours: the focus outline classes, in one place
features/                         # One folder per feature
├── products/                     # products.types · .logic · .state · .api (server only)
│                                 # · components/ (product-card, products-section…)
├── cart/                         # cart.types · .logic · .storage · .store · .hooks
│                                 # · components/ (add-to-cart-button, cart-content…)
├── checkout/                     # checkout.schema · components/
└── auth/components/register-form.tsx
lib/
├── utils.ts                      # cn(): clsx + tailwind-merge, taught our @theme names
├── format.ts                     # formatPrice()
└── api/                          # config.ts (server address) · client.ts (the only fetch)
                                  # · errors.ts (ApiError)
public/                           # files served as they are
```

## Where a file goes

- **A URL:** `app/<path>/page.tsx`, with its `loading.tsx` and `error.tsx` when it loads
  data. A page awaits its data and lays out the page. Everything else lives in a feature.
- **One feature:** `features/<feature>/`: its types, logic, API calls and components.
- **The page frame:** `components/layout/`.
- **The UI kit:** `components/ui/`. A file there is dumb: a Button doesn't know what a cart
  is. It takes props and `className`, and has no data, no feature import and no app state.
- **From the shadcn CLI:** `pnpm dlx shadcn@latest add <name>` writes it into
  `components/ui/`. It is our code from then on: adapt its classes to DESIGN.md, name its
  variants as DESIGN.md and the assignment do (`primary`, not shadcn's `default`), delete
  what we don't use, and say at the top what changed from the CLI's file.
- **Code any part can use with no UI:** `lib/`.
- **File names:** kebab-case (`product-card.tsx`, `add-to-cart-button.tsx`), as shadcn and
  the course name them. The component inside is PascalCase (`ProductCard`).

## Styling (Tailwind first)

- **Tokens come from `DESIGN.md`.** `app/globals.css` declares them once as CSS variables
  (light in `:root`, dark in `@media (prefers-color-scheme: dark)`) and maps them to Tailwind
  in `@theme inline`, with the same names. A new token goes into `DESIGN.md` first, then
  `globals.css`, then a component.
- **shadcn and our components share the same variables.** shadcn's names (`--background`,
  `--primary`, `--muted`, `--border`…) are our token names. The names shadcn needs and
  DESIGN.md doesn't have are aliases in `globals.css`, never new colors: `secondary` and
  `accent` → `muted`, `popover` → `card`, `input` → `border`, `ring` → `primary`.
- **No CSS rules, no `@apply`, anywhere.** `globals.css` holds only the `@import` and the
  tokens (and the `@keyframes` of the `--animate-*` tokens, which Tailwind keeps inside
  `@theme`). Every element is styled by the classes on its own tag. No CSS Modules, no
  `style={{}}` for design, no CSS file but `globals.css`.
- **Tokens only.** No hex, no `px`, no `[..]` value in a component: only the Tailwind scale
  and our theme names (`bg-card`, `rounded-lg`, `shadow-lift`, `min-h-tap`, `px-6.5`). A
  value the scale doesn't have becomes a token first, then a class: the glows are
  `--page-glows`, used as `bg-(image:--page-glows)`.
- **Opacity is a modifier, not a token:** `bg-background/80` (header), `ring-primary/20`.
- **One source for every style.** A class set used twice lives in one `components/ui` file,
  never copied: shadcn's component first (`Button`: variant `primary` · `secondary` ·
  `ghost`, size `sm` · `md` · `lg`; `asChild` styles a `<Link>`), our own `cva` when shadcn
  has none (`headingVariants`).
  A new look is a new variant, not a copied class string.
- **Small files.** Too long to read at once? Split it.
- **What children share goes once on the parent tag, if CSS inherits it.** `<body>` sets the
  font, text color, line height, `text-pretty` and the `selection:` colors for the whole app.
  Font, color, line height, letter spacing and text wrap inherit; margin, padding, border,
  background, size and outline don't.
- **Never style children from the parent** (`[&_h1]:…`, `*:…`, `**:…`): those selectors are
  more specific than the child's own classes, so a child could no longer override them.
- **Focus is visible on every control**, in the control's own classes (focus is not
  inherited): buttons, links and checkboxes show DESIGN.md's outline
  (`focusRing` from `components/ui/focus-ring.ts`); inputs and selects show their
  ring instead (`primary` border + `ring-primary/20`). Never remove focus without one.
- **Mobile first.** Unprefixed classes are for small screens; `sm:`, `md:`, `lg:` add to
  them. Check 360, 768 and 1280px.
- **Dark mode follows the system.** Tailwind's default `dark:` variant is the media query;
  the tokens already switch, so components rarely need `dark:`. No `.dark` class.
- **Reduced motion is per class:** every animation or transition gets `motion-safe:` or
  `motion-reduce:` (`motion-reduce:transition-none` on `Button`).
- **Conditional classes use `cn()`**, never string concatenation. A new `@theme` name that
  tailwind-merge can't guess (a `text-*` size, a `shadow-*`, a spacing, a `leading-*`) is
  added to `extendTailwindMerge` in `lib/utils.ts` too, or `cn()` may drop it.
- **Preflight is on.** Headings, paragraphs and lists have no margin and no size of their own
  (`headingVariants` gives headings their size). Every gap is set on purpose with `gap-*`,
  `space-y-*` or `m*-*`; compare each page with v1.
- **Class order** is sorted by `prettier-plugin-tailwindcss`. Don't sort by hand.
- Fonts come from `next/font/google` in `app/layout.tsx`; their CSS variables feed
  `--font-display`, `--font-sans` and `--font-mono` in `@theme`. Never a `<link>` to Google.

## Server and Client Components

- Server by default. `"use client"` only in a file that needs state, effects, browser APIs
  or event handlers, and only on the outermost such component a Server Component renders:
  `header.tsx`, `products-section.tsx`, `add-to-cart-button.tsx`, `cart-content.tsx`,
  `checkout-content.tsx`, `order-summary.tsx`, and every `error.tsx`. What they import is
  client code already and doesn't repeat it (`shop-link.tsx` is inside `header.tsx`).
- A kit file that needs state or effects carries its own `"use client"` (`modal.tsx`), so
  any page can use it, as the course's Modal prompt asks.
- The product page is a Server Component: only its `AddToCartButton` reaches the browser.
- A Client Component can't import a Server Component, but can show one passed as a prop:
  the checkout page passes the summary to `CheckoutContent` as `summary`.
- Server-only files start with `import "server-only"`: `lib/api/config.ts`,
  `lib/api/client.ts`, `products.api.ts`. Importing one in the browser fails the build.

## API client

- `lib/api/config.ts` is the only file with the server address. `API_BASE_URL` comes from
  `.env.local` (documented in `.env.example`); default `https://shopboard-api.vercel.app/api`.
  No `NEXT_PUBLIC_` prefix: the address is used on the server only.
- To test the states, put `/delay/3000`, `/fail/500` or `/empty` BEFORE `/api`
  (`https://shopboard-api.vercel.app/delay/3000/api`), then restart the server.
- Only `client.ts` calls `fetch`; only `*.api.ts` files call `getJson`; only pages call
  `loadProducts()` / `loadProduct(id)`.

## Loading data and errors

- **A page fetches on the server:** it awaits `loadProducts()` or `loadProduct(id)` itself.
  No `useEffect` fetches, no loading state in a component.
- **Waiting is `loading.tsx`:** every route folder that loads data has one. It shows at
  once, while the layout and the Navbar keep working.
- **Failing is `error.tsx`:** `"use client"`, shows a fixed message and "Try again", which
  calls `retry()`. It covers its folder only; the rest of the app keeps working.
- **Missing is `notFound()`:** an unknown or invalid product id (`/products/999`,
  `/products/abc`) calls it, and `app/not-found.tsx` shows. An empty store and "no match"
  are not errors: `products-section.tsx` shows them.
- **One part waits, the page doesn't:** the checkout summary sits in its own `<Suspense>`,
  so the form shows at once, and a failed summary doesn't take the form down.
- `loadProducts()` and `loadProduct(id)` call `connection()` first, so nothing is fetched
  at build time; `React.cache` shares one fetch per request.
- `params` and `searchParams` are Promises: `await props.params`. Page props are typed with
  Next.js's `PageProps<"/products/[id]">`.
- Read the current URL (`usePathname`) only inside `<Suspense>` (`ShopLink`).

## State

- Every piece of state has one owner and one copy. Anything that can be computed is computed
  in the render.
- **The cart is a store, not a Context with `useState`.** The course shows a `CartProvider`
  with `useState(loadCart)`; we keep v1's store, because the server renders every page first
  and has no `localStorage`: `useState(loadCart)` would give the server an empty cart and the
  browser the saved one, and React would report a hydration mismatch. `cart.store.ts` is the
  one owner; `useSyncExternalStore` in `cart.hooks.ts` gives the server and the first browser
  render an empty cart, then the saved one.
- Every change goes through `updateCart()` with a pure function from `cart.logic.ts` that
  returns a NEW cart. Components change the cart only through `useCartActions()`.
- A page that shows the cart waits for `useCartLoaded()` and says "Loading cart…" first.
- The thank-you name travels in the URL as `?name=`.

## Performance

Kept from v1, where each one was measured with 5,000 products and a 300-line cart:

| Where             | What                                   | Why                                                           |
| ----------------- | -------------------------------------- | ------------------------------------------------------------- |
| `ProductCard`     | `memo`                                 | typing re-renders `ProductsSection`; same `product` → skipped |
| `cart.hooks.ts`   | actions in one constant object         | a card that only adds never re-renders on a cart change       |
| `CartRow`         | `memo`                                 | a click on one line re-renders `CartContent`; others skipped  |
| `CartContent`     | `useCallback` on `handleAction`        | `CartRow` is `memo`, so `onAction` must stay the same         |
| `ProductsSection` | `useMemo` on `getCategories(products)` | depends on `products` only; typing changes `filters`          |
| `ProductsSection` | NO `useMemo` on `applyFilters`         | it would never skip                                           |

## Effects

| Effect                         | Where               | Outside React | Dependencies            |
| ------------------------------ | ------------------- | ------------- | ----------------------- |
| listen to `online`, then retry | `error-message.tsx` | the browser   | `[retry]`, with cleanup |
| `showModal()` / `close()`      | `modal.tsx`         | the DOM       | `[open]`                |

No effect loads data, calculates a value, or reacts to a click.

## Navigation

- A link the user clicks is `<Link>`. A move your code decides after an action is
  `useRouter()`: placing the order calls `router.replace("/checkout/success?name=…")`
  (`replace`: "Back" skips the checkout page).

## The checkout form

- Every rule and message is in `checkoutSchema`; the form type is `z.infer` of it.
- `useForm` with `zodResolver`, `defaultValues`, `mode: "onTouched"`; the kit's `Field`,
  `Label`, `Input` and the field error; `<form noValidate>`.
- Placing the order sets `orderPlaced`, calls `clear()`, then navigates (see "Navigation").

## TypeScript

- `"strict": true`, plus `noUnusedLocals`, `noUnusedParameters`,
  `noFallthroughCasesInSwitch`. No `any`, no `as`, no `!`. Data from outside (API,
  localStorage, the URL) is `unknown` or a string until a check narrows it.
- A value with a fixed set of options is a union. Every kit component has typed props;
  a variant that doesn't exist is a type error.
- `pnpm typecheck` runs `next typegen` first, so `PageProps` and the route types are current.

## Rules from mistakes (from v1, still true)

1. Load data after `connection()`, inside a boundary (`loading.tsx` or `<Suspense>`).
   Without it the build tries to prerender the request (`HANGING_PROMISE_REJECTION`).
2. Read the URL only inside `<Suspense>`.
3. `error.tsx` never shows `error.message`: in production Next.js replaces a server error's
   message, so it would say the same thing for every failure.
4. Don't log an error a boundary already logged.
5. Hide the empty cart until the browser has read it.
6. Read this version's docs in `node_modules/next/dist/docs/`, not memory.
7. Stop the old server before testing a new build.

## Commands

- `pnpm dev`, `pnpm build`, `pnpm start`
- `pnpm typecheck`: `next typegen && tsc --noEmit`
- `pnpm lint`: `oxlint --deny-warnings`
- `pnpm format` / `pnpm format:check`: Prettier

## Before you finish

- `pnpm typecheck`, `pnpm lint`, `pnpm format:check` and `pnpm build` pass.
- `pnpm build && pnpm start`, then check every page at 360, 768 and 1280px, hover, the
  keyboard focus (Tab through every control), both color schemes, the Console, and the three
  API states (`/delay/3000`, `/fail/500`, `/empty`).
- `grep -rn "fetch(" app components features lib` finds only `lib/api/client.ts`.
- `grep -rnE "#[0-9a-fA-F]{3,8}\b" app components features --include=*.ts --include=*.tsx`
  finds no hex (`app/globals.css` holds the token values, `app/icon.svg` is an image), and `grep -rnE "[a-z]-\[|[\" ]\[[a-z-]+:" app components features` finds
  no `[..]` class.
- Keep this file, `DESIGN.md`, `CLAUDE.md` and `README.md` in sync with the code. Code,
  comments and commit messages in English.
