# ShopBoard v2

The Day 6 assignment: the ShopBoard shop rebuilt on Next.js 16 (App Router) and styled only
with Tailwind CSS 4, through a small UI kit in `components/ui`.

You can browse and filter the products, open one, add it to the cart, change the cart and
check out. The cart is saved in the browser. The products come from the ShopBoard API.

## Run it

Needs Node.js 20.9+ (what Next.js 16 requires) and pnpm.

```bash
pnpm install
cp .env.example .env.local   # optional: the default API works without it
pnpm dev                      # http://localhost:3000
```

| Command                             | What it does                               |
| ----------------------------------- | ------------------------------------------ |
| `pnpm dev`                          | Development server                         |
| `pnpm build` · `pnpm start`         | Production build, then serve it            |
| `pnpm typecheck`                    | `next typegen`, then TypeScript            |
| `pnpm lint`                         | oxlint                                     |
| `pnpm format` · `pnpm format:check` | Prettier (also sorts the Tailwind classes) |

The pre-commit hook runs the last four and `pnpm build`.

**Test the states:** set `API_BASE_URL` in `.env.local` with `/delay/3000`, `/fail/500` or
`/empty` before `/api` (examples in `.env.example`), then restart the server.

## Pages

| URL                 | Shows                                                          |
| ------------------- | -------------------------------------------------------------- |
| `/`                 | The hero, with a link to the products                          |
| `/products`         | Search, category and sort filters, the product grid            |
| `/products/[id]`    | One product; an unknown id shows the 404 page                  |
| `/cart`             | The cart lines, quantities and total                           |
| `/checkout`         | The form at once; the order summary loads and fails on its own |
| `/checkout/success` | The thank-you, with the name from `?name=`                     |

## How it is built

- `app/` holds only routes. Loading, errors and 404s use `loading.tsx`, `error.tsx` and
  `notFound()`; the products are fetched on the server, never in a `useEffect`.
- `components/ui/` is the UI kit, the only UI folder: shadcn/ui components adapted to our
  tokens (Button, Input, Label, Field, Card, Badge, Skeleton) and our own (Select, Modal on
  the native `<dialog>`, StatusMessage, ErrorMessage, ErrorBoundary). Typed variants with
  `cva`, classes joined with `cn()`.
- `features/` holds each feature (products, cart, checkout, auth); `lib/` the API client,
  `cn()` and `formatPrice()`.
- Colors, radius, fonts and sizes are tokens in `app/globals.css` (`@theme`). Dark mode
  follows the system setting.

Two choices differ from the course slides on purpose:

- **The cart is a small store with `useSyncExternalStore`, not a Context with
  `useState(loadCart)`.** The server can't read `localStorage`, so `useState(loadCart)` would
  render an empty cart on the server and the saved one in the browser: a hydration mismatch.
- **The checkout summary has its own `<Suspense>` and error boundary,** so the form shows at
  once and keeps working if the products fail to load.

## For contributors and AI agents

- `AGENTS.md`: how the code is written
- `DESIGN.md`: how the app looks (the tokens)
- `CLAUDE.md`: how Claude Code works in this repo, and the UI rules

## Deploy on Vercel

Import the repository on [vercel.com/new](https://vercel.com/new). Vercel detects Next.js
and pnpm from the lock file. `API_BASE_URL` is optional (Project → Settings → Environment
Variables); without it the app uses `https://shopboard-api.vercel.app/api`.
