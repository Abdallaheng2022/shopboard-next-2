<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ShopBoard v2 (Next.js, Tailwind first)

ShopBoard v2 is ShopBoard v1 (`shopboard-next`) rebuilt on a fresh `create-next-app` project:
the same five pages, 404 page, cart, checkout and states, with the design written in
Tailwind CSS instead of one hand-written CSS file. The behavior must stay exactly the same as
v1. Only the styling, the folder root and the package manager change.

## The three instruction files

Each file has one job. Don't repeat a rule in two files: point to the file that owns it.

| File        | Owns                                                        | Read by          |
| ----------- | ----------------------------------------------------------- | ---------------- |
| `AGENTS.md` | How the code is written: stack, structure, code rules       | every agent      |
| `DESIGN.md` | How the app looks: tokens and visual rules. No code in it   | every agent      |
| `CLAUDE.md` | How Claude Code works here: imports this file, the workflow | Claude Code only |

Read before any change: `node_modules/next/dist/docs/` for Next.js (see the block above), and
`DESIGN.md` before any change a user can see.

## Stack

- Next.js 16.4 (App Router), React 19, TypeScript with `"strict": true`
- `cacheComponents` and `partialPrefetching` on (the `create-next-app` defaults)
- Tailwind CSS 4 through the `@tailwindcss/turbopack` loader in `next.config.ts`
  (what `create-next-app` 16.4 sets up). No `postcss.config.mjs`, no `tailwind.config.*`.
- shadcn/ui (Radix base) for the checkout fields; react-hook-form, Zod and
  `@hookform/resolvers` for the checkout form
- Fonts from `next/font/google`
- pnpm; oxlint, Prettier (with `prettier-plugin-tailwindcss`), husky and lint-staged

## What the code may use

The course so far plus what Next.js gives for the same jobs: Server and Client Components,
`next/link`, `next/navigation`, `next/font`, `next/error`'s `catchError`, `connection()`,
`React.cache`, `useSyncExternalStore` (only in `cart.hooks.ts`).

- No state library, no data-fetching library, no Server Actions, no API routes.
- `memo`, `useCallback` and `useMemo` only where v1 measured a problem (see "Performance").
- No `"use cache"`: the products must be fresh on every visit, and the API's test switches
  must work.
- No new npm package without asking first.

## No AI slop

- No AI chat logs, no plan or notes files, no leftover or unused files, no code nobody asked
  for. The create-next-app demo files (`public/*.svg`, the demo `page.tsx`) go once the real
  pages replace them.
- Every hook, piece of state, effect, `"use client"` and Tailwind class has a reason you can
  say in one sentence. If there is no reason, remove it.
- After every change, say what changed, where, and why (in the commit message).

## Structure

No `src/` folder: `app/` and the other folders sit at the project root, as
`create-next-app` made them. The `@/*` alias points at the root (`tsconfig.json`).

```
app/                          # Routes only: one folder per URL (App Router)
├── layout.tsx                # Header + {children} + Footer, fonts, globals.css
├── globals.css               # Tailwind import and the DESIGN.md tokens. No style rules
├── page.tsx                  # "/"
├── products/[id]/page.tsx    # "/products/:id"
├── cart/page.tsx             # "/cart"
├── checkout/page.tsx         # "/checkout"
├── checkout/success/page.tsx # "/checkout/success"
├── not-found.tsx             # any URL with no route
├── error.tsx                 # last safety net for errors no LoadBoundary catches
└── icon.svg                  # the favicon
components/                   # General components: no module owns them
├── layout/                   # Header ("use client"), ShopLink ("use client"), Footer
├── ui/                       # LoadBoundary, LoadError, Overlay, StatusMessage, heading.ts
└── shadcn/                   # From the shadcn CLI (button, the checkout fields). Not linted
lib/utils.ts                  # cn(): clsx + tailwind-merge, taught our @theme names
modules/                      # One folder per feature (same files as v1)
├── products/                 # types, logic, state, api (server only) · components/
├── cart/                     # types, logic, storage, store, hooks · components/
├── checkout/                 # schema · components/
└── auth/components/RegisterForm.tsx
shared/
├── api/                      # config, client (the only fetch), errors, result
└── ui/format.ts              # formatPrice()
```

## Where a file goes

- **A URL:** `app/<path>/page.tsx`. A page holds the layout of that page and the small async
  loaders that wait for its data. Everything else lives in a module.
- **One feature:** `modules/<feature>/`.
- **The page frame:** `components/layout/`.
- **Any feature could use it:** `components/ui/`. It knows nothing about products or the cart.
- **From the shadcn CLI:** `components/shadcn/` (the `ui` alias in `components.json`). Add one
  with `pnpm dlx shadcn@latest add <name>`. Then adapt only its classes and variants to
  DESIGN.md, keep its structure and variant names, and say at the top what changed.

## Styling (Tailwind first)

- **Tokens come from `DESIGN.md`.** `app/globals.css` declares them once as CSS variables
  (light in `:root`, dark in `@media (prefers-color-scheme: dark)`) and maps them to Tailwind
  in `@theme inline`, with the same names. A new token goes into `DESIGN.md` first, then
  `globals.css`, then a component.
- **Opacity is a modifier, not a token:** `bg-background/80` (header), `ring-primary/20`
  (input focus).
- **shadcn and our components share the same variables.** shadcn's names (`--background`,
  `--primary`, `--muted`, `--border`…) are our token names, so a shadcn component looks like
  ShopBoard with no extra CSS. The names shadcn needs and DESIGN.md doesn't have are aliases
  in `globals.css`, never new colors: `secondary` and `accent` → `muted`, `popover` → `card`,
  `input` → `border`, `ring` → `primary`.
- **No CSS rules, no `@apply`, anywhere.** `globals.css` holds only the `@import` and the
  tokens (`:root`, the dark query, `@theme`). Every element is styled by the classes on its
  own tag. No CSS Modules, no `style={{}}` for design.
- **What children share goes once on the parent tag, if CSS inherits it.** `<body>` sets the
  font, text color, line height, `text-pretty` and the `selection:` colors for the whole app.
  Font, color, line height, letter spacing and text wrap inherit; margin, padding, border,
  background, size and outline don't.
- **Never style children from the parent** (`[&_h1]:…`, `*:…`, `**:…`): those selectors are
  more specific than the child's own classes, so a child could no longer override them.
- **Repeated class sets: a shadcn component first, our `cva` second.** shadcn has it →
  `components/shadcn/` (`Button`: variants `default`, `outline`, `ghost`, size `lg`; with
  `asChild` it styles a `<Link>`). shadcn has none → a `cva` in `components/ui/`
  (`headingVariants` for `h1`–`h3`). Never a CSS class.
- **Every focusable element carries the focus outline** in its own classes
  (`focus-visible:outline-3 … outline-link`, as in `Button`): focus is not inherited.
- **Only theme values.** `bg-card`, `text-muted-foreground`, `rounded-lg`, `shadow-lift`.
  No arbitrary colors (`bg-[#3b5bfd]`) and no raw hex in a component. An arbitrary value is
  allowed only for a one-off layout value DESIGN.md gives (`grid-cols-[260px_minmax(0,1fr)]`).
  An arbitrary property (`[text-rendering:optimizeLegibility]`) only for a CSS property that
  has no utility.
- **Mobile first.** Unprefixed classes are for small screens; `md:`, `lg:` add to them.
- **Dark mode follows the system.** Tailwind's default `dark:` variant is the media query;
  the tokens already switch, so components rarely need `dark:`. No `.dark` class.
- **Conditional classes use `cn()`** from `lib/utils.ts` (`clsx` + `tailwind-merge`),
  never string concatenation.
- **A new `@theme` name that tailwind-merge can't guess** (a `text-*` size, a `shadow-*`, a
  spacing, a `leading-*`) is added to `extendTailwindMerge` in `lib/utils.ts` too, or `cn()` may drop it.
- **Preflight is on.** Headings, paragraphs and lists have no margin and no size of their own
  (`headingVariants` gives headings their DESIGN.md size). Every gap is set on purpose with
  `gap-*`, `space-y-*` or `m*-*`; compare each page with v1.
- **A value no utility has becomes a token**, then a class: the glows are `--page-glows` in
  `:root`, used as `bg-(image:--page-glows)`.
- **Reduced motion is per class, not a global reset:** every animation or transition gets
  `motion-safe:` or `motion-reduce:` (`motion-reduce:transition-none` on `Button`).
- **Class order** is sorted by `prettier-plugin-tailwindcss`. Don't sort by hand.
- Fonts come from `next/font/google` in `app/layout.tsx`; their CSS variables feed
  `--font-display`, `--font-sans` and `--font-mono` in `@theme`. Never a `<link>` to Google.

## Server and Client Components

- Every component is a Server Component unless its file starts with `"use client"`.
- `"use client"` only where the component is used directly by a Server Component AND needs
  state, effects, browser APIs or event handlers: `Header`, `ShopLink`, `ProductsSection`,
  `ProductDetails`, `CartContent`, `CheckoutContent`, `OrderSummary`, `LoadBoundary`, `error.tsx`.
  Components imported by one of those are client code already; they don't repeat it.
- A Client Component can't import a Server Component, but can show one passed as a prop:
  the checkout page passes the summary to `CheckoutContent` as `summary`.
- Server-only files start with `import "server-only"`: `config.ts`, `client.ts`,
  `products.api.ts`. Importing one in the browser fails the build.

## API client

- `shared/api/config.ts` is the only file with the server address. `API_BASE_URL` comes from
  `.env.local` (documented in `.env.example`); default `https://shopboard-api.vercel.app/api`.
  No `NEXT_PUBLIC_` prefix: the address is used on the server only.
- To test the states, put `/delay/3000`, `/fail/500` or `/empty` BEFORE `/api`
  (`https://shopboard-api.vercel.app/delay/3000/api`), then restart the server.
- Only `client.ts` calls `fetch`; only `*.api.ts` files call `getJson`; only pages call
  `loadProducts()` / `loadProduct(id)`.

## Loading data and errors

- A page shows a `LoadBoundary` around a small async Server Component that awaits
  `loadProducts()` or `loadProduct(id)` and passes the result to a Client Component.
- `loadProducts()` and `loadProduct(id)` call `connection()` first; `React.cache` shares one
  fetch per render. They return a `LoadResult` and never throw an `ApiError`; the Client
  Component calls `readLoadResult()`, which throws for the nearest `LoadBoundary`.
- `LoadBoundary` = `catchError` (from `next/error`) around `<Suspense>`. Its `retry()` asks the
  server for the page again. `LoadError` also retries on the browser's `online` event.
- `params` and `searchParams` are Promises. Await them inside a `<Suspense>`.
- Read the current URL (`usePathname`) only inside `<Suspense>` (`ShopLink`).

## State

- Every piece of state has one owner and one copy. Anything that can be computed is computed
  in the render.
- The cart's one owner is `cart.store.ts`, read through `useSyncExternalStore` in
  `cart.hooks.ts`. Every change goes through `updateCart()` with a pure function from
  `cart.logic.ts` that returns a NEW cart. Components change the cart only through
  `useCartActions()`.
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

## The checkout form

- Every rule and message is in `checkoutSchema`; the form type is `z.infer` of it.
- `useForm` with `zodResolver`, `defaultValues`, `mode: "onTouched"`; shadcn's `Field`,
  `FieldLabel`, `Input`, `FieldError`; `<form noValidate>`.
- Placing the order sets `orderPlaced`, calls `clear()`, then
  `router.replace("/checkout/success?name=…")`.

## TypeScript

- `"strict": true`, plus `noUnusedLocals`, `noUnusedParameters`,
  `noFallthroughCasesInSwitch`. No `any`, no `as`, no `!`. Data from outside (API,
  localStorage, the URL) is `unknown` or a string until a check narrows it.
- A value with a fixed set of options is a union.
- `pnpm typecheck` runs `next typegen` first so the route types are up to date.

## Rules from mistakes (from v1, still true)

1. Load data inside a `<Suspense>`, after `connection()`.
2. Read the URL only inside `<Suspense>`.
3. Never throw an `ApiError` across the server/browser line.
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
- `pnpm build && pnpm start`, then check every page, both color schemes, the Console, and the
  three API states. Compare each page with v1 side by side: it must look the same.
- `grep -rn "fetch(" app components modules shared` finds only `shared/api/client.ts`.
- `grep -rnE "#[0-9a-fA-F]{3,8}\b" app components modules` finds nothing outside
  `app/globals.css`.
- Keep this file, `DESIGN.md`, `CLAUDE.md` and `README.md` in sync with the code. Code, comments and
  commit messages in English.
