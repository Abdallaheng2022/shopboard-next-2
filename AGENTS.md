<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ShopBoard v2 (Next.js, Tailwind, UI kit)

The Day 6 assignment: ShopBoard v1 rebuilt on `create-next-app` with the course's structure.
Same features as v1; `/products` is its own route; loading, errors and 404s use the route
files; everything is styled with Tailwind through the UI kit in `components/ui`.

Each instruction file has one job; never repeat a rule in two of them:
`AGENTS.md` how the code is written · `DESIGN.md` how the app looks (no code) ·
`CLAUDE.md` how Claude works here (imports this file).

## Stack

Next.js 16.4 (App Router, `cacheComponents`, `partialPrefetching`), React 19, TypeScript
strict, Tailwind CSS 4 through the `@tailwindcss/turbopack` loader (no PostCSS or Tailwind
config file), shadcn/ui (Radix) + `cva` + `clsx` + `tailwind-merge`, react-hook-form + Zod for
the checkout, `next/font/google` (never a `<link>` to Google), pnpm, oxlint, Prettier (Tailwind plugin), husky, lint-staged.

- No state library, no data-fetching library, no Server Actions, no API routes, no
  `"use cache"` (the products must be fresh, and the API's test switches must work).
- `memo`, `useCallback`, `useMemo` only where v1 measured a problem (see "State").
- No new npm package without asking first.

## No AI slop

- No chat logs, plan or notes files, unused files, or code nobody asked for. Demo files from
  `create-next-app` go once real files replace them.
- Every hook, state, effect, `"use client"` and class has a one-sentence reason, or it goes.
- Each commit message says what changed, where and why.

## Where a file goes

One folder per job, and one UI folder only: `components/ui`. No `src/`; `@/*` is the root.

| Folder                | Holds                                                                    |
| --------------------- | ------------------------------------------------------------------------ |
| `app/`                | Routes only: `page`, `layout`, `loading`, `error`, `not-found`, the icon |
| `components/layout/`  | The page frame: header, shop link, footer, `PageSection`/`PageTitle`     |
| `components/ui/`      | The UI kit: shadcn files (adapted) and ours. Dumb: see below             |
| `features/<feature>/` | One feature's types, logic, API calls and `components/`                  |
| `lib/`                | Code with no UI any part uses: `cn()`, `formatPrice()`, `api/`           |

- **A page** awaits its data and lays out the page; everything else lives in a feature.
- **The kit is dumb:** a `components/ui` file takes props and `className`, and has no data,
  no feature import and no app state. A Button doesn't know what a cart is.
- **From the shadcn CLI** (`pnpm dlx shadcn@latest add <name>` → `components/ui/`): it is our
  code from then on. Adapt its classes to `DESIGN.md`, name variants as `DESIGN.md` and the
  assignment do (`primary`, not `default`), delete what we don't use, and say at the top of
  the file what changed from the CLI's version. No shadcn component? Our own `cva` file.
- **Names:** kebab-case files (`cart-row.tsx`), PascalCase components (`CartRow`).
- Each file starts with a comment saying what it is and why; the folder map lives there, not
  in this file.

## Styling (Tailwind only)

- **Tokens come from `DESIGN.md`.** `app/globals.css` declares them once (light in `:root`,
  dark in `@media (prefers-color-scheme: dark)`) and maps them in `@theme inline` with the
  same names. A new token: `DESIGN.md` first, then `globals.css`, then `lib/utils.ts` if
  tailwind-merge can't guess its group (`text-*` sizes, `shadow-*`, spacing, `leading-*`),
  then a component. A token name is used in one namespace only: `--spacing-page` and
  `--container-page` together made `max-w-page` read the spacing (40px), so the page width
  is `--container-page-max`.
- **shadcn's names are our names** (`--background`, `--primary`, `--border`…). The ones
  `DESIGN.md` lacks are aliases, never new colors: `secondary`/`accent` → `muted`,
  `popover` → `card`, `input` → `border`, `ring` → `primary`.
- **No CSS rules and no `@apply` anywhere.** `globals.css` holds the `@import`, the tokens and
  the `@keyframes` of the `--animate-*` tokens. No CSS Modules, no `style={{}}` for design.
- **Tokens only in components:** no hex, no `px`, no `[..]` value or property.
  `globals.css` removes Tailwind's built-in colors and radii (`--color-*: initial`,
  `--radius-*: initial`), so `bg-white` or `rounded-xl` is not a class at all. A value the
  scale lacks becomes a token (`--page-glows` → `bg-(image:--page-glows)`). So does a
  `DESIGN.md` value that reads badly on the scale: `-translate-y-lift`, not `-translate-y-0.75`. Opacity is a
  modifier: `bg-background/80`.
- **One source per style:** a class set used twice lives in one kit file. A new look is a
  new variant, never a copied class string. Button: `primary` · `secondary` · `ghost`,
  `sm` · `md` · `lg`, `asChild` for a `<Link>`: a link that looks like a button is
  `<Button asChild>`, never a copy of its classes. Modal: `size` `sm` · `md` · `lg`.
- **Shared and inherited goes on the parent:** `<body>` sets font, color, line height,
  `text-pretty` and `selection:`. What doesn't inherit (margin, padding, border, background,
  size, outline) goes on the tag itself. **Never style children from a parent**
  (`[&_h1]:`, `*:`, `**:`): it beats the child's own classes.
- **Focus is visible on every control, in its own classes:** buttons, links, checkboxes use
  `focusRing` (`components/ui/focus-ring.ts`); inputs and selects show their ring.
- **Mobile first** (`sm:`/`md:`/`lg:` add to it); check 360, 768, 1280px. **Dark mode** is
  the system's: tokens switch, so components rarely need `dark:`; no `.dark` class.
- **Motion:** every animation or transition gets `motion-safe:` or `motion-reduce:`.
- **Preflight is on:** no default margins or heading sizes (`headingVariants` sizes
  headings); set every gap on purpose. `cn()` for conditional classes, never concatenation.
  Prettier sorts the classes. Small files: too long to read at once? Split it.

## Server and Client Components

- Server by default. `"use client"` only on the outermost component that needs state,
  effects, browser APIs or handlers: `header.tsx`, `products-section.tsx`,
  `add-to-cart-button.tsx`, `cart-content.tsx`, `checkout-content.tsx`, `order-summary.tsx`,
  every `error.tsx`, and kit files with their own state (`modal.tsx`, `error-message.tsx`,
  `error-boundary.tsx`). Files they import
  don't repeat it.
- A Client Component can't import a Server Component but can show one passed as a prop (the
  checkout page passes the summary to `CheckoutContent`).
- `import "server-only"` in `lib/api/config.ts`, `lib/api/client.ts` and `*.api.ts`.

## Data, loading and errors

- `lib/api/config.ts` alone knows the server address: `API_BASE_URL` from `.env.local`
  (see `.env.example`), server only, no `NEXT_PUBLIC_`. Test states by putting `/delay/3000`,
  `/fail/500` or `/empty` before `/api`, then restart.
- Only `client.ts` calls `fetch`; only `*.api.ts` call `getJson`; only pages call
  `loadProducts()` / `loadProduct(id)`, which call `connection()` first (nothing fetched at
  build time) and are wrapped in `React.cache` (one fetch per request).
- **Waiting** is the folder's `loading.tsx`; **failing** is its `error.tsx` (`"use client"`,
  a fixed message, "Try again" calls `retry()`; never `error.message`, which production
  replaces; don't log it again). **Missing** is `notFound()` (`/products/abc`,
  `/products/99999`). An empty store, "no match" or an empty cart are messages, not errors.
- **One part waits or fails, the page doesn't:** the checkout page calls `loadProducts()`
  without `await` and passes the Promise down; `OrderSummary` reads it with `use()` inside
  its own `<Suspense>` and the kit's `ErrorBoundary` (Next.js's `catchError`). The form
  shows at once and keeps working if the summary fails. `<Suspense>` alone doesn't catch
  errors.
- `params` are Promises (`await props.params`), typed with `PageProps<"/products/[id]">`.
  Read the URL (`usePathname`) only inside `<Suspense>`.
- Links the user clicks are `<Link>`; a move the code decides is `useRouter()`
  (`router.replace("/checkout/success?name=…")`, so "Back" skips the checkout).

## State

- One owner, one copy; what can be computed is computed in the render.
- **The cart is v1's store, not the slides' `CartProvider` with `useState(loadCart)`:** the
  server has no `localStorage`, so that would render an empty cart on the server and the saved
  one in the browser (a hydration mismatch). `cart.store.ts` owns it; `useSyncExternalStore`
  in `cart.hooks.ts` gives the server and the first browser render an empty cart.
- Every change goes through `updateCart()` with a pure function from `cart.logic.ts`;
  components use `useCartActions()`. A page that shows the cart says "Loading cart…" until
  `useCartLoaded()`.
- Measured in v1 (5,000 products, a 300-line cart), so kept: `memo` on `ProductCard` and
  `CartRow`; `useCallback` on `CartContent`'s `handleAction`; `useMemo` on
  `getCategories(products)` only; the cart actions are one constant object.
- Effects only for what is outside React: `error-message.tsx` (the `online` event),
  `modal.tsx` (`showModal()` / `close()`) and `useRemoveUnavailable` in `cart.hooks.ts`
  (deletes cart lines whose product is no longer sold, once a page has the products). No effect loads data or reacts to a click.

## The checkout form

`checkoutSchema` holds every rule and message; the form type is `z.infer` of it. `useForm`
with `zodResolver`, `defaultValues`, `mode: "onTouched"`, the kit's `Field`/`Label`/`Input`,
`<form noValidate>`. Placing the order: `orderPlaced`, `clear()`, then navigate.

## TypeScript

Strict, plus `noFallthroughCasesInSwitch`. Unused imports, variables and parameters
are oxlint's `no-unused-vars` (an error), not tsconfig's `noUnused*`: those also check the
files Next.js generates in `.next/`, and `next dev` writes one with unused imports. No `any`,
`as` or `!`. Outside data (API, localStorage, URL) is `unknown` until a check narrows it. Fixed
options are unions; a wrong variant is a type error. `pnpm typecheck` runs `next typegen`.

## Before you finish

- `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build` pass (the pre-commit hook
  runs them).
- `pnpm build && pnpm start` (stop the old server first): every page at 360/768/1280px, hover,
  Tab through every control, both color schemes, the Console, the three API states.
- `grep -rn "fetch(" app components features lib` finds only `lib/api/client.ts`.
- `grep -rnE "#[0-9a-fA-F]{3,8}\b" app components features --include=*.ts --include=*.tsx`
  and `grep -rnE "[a-z]-\[|[\" ]\[[a-z-]+:" app components features` find nothing.
- This file, `DESIGN.md`, `CLAUDE.md` and `README.md` match the code. All in English.
