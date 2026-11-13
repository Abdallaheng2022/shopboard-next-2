# ShopBoard vs shopboard-reference

Reference: https://github.com/yaman3bd/shopboard-reference (Next.js 16, React 19, Zustand, shadcn/ui).
My project: this repo (Vite 8, React 19, React Router 8, Context, shadcn/ui for the checkout only).

How I studied it: [say what you did: npm install and npm run dev, every page, the delay / fail / empty
states, the "spam" review, the feature you followed end to end, and what git log showed]

## 1. Structure

- **What I did:** One folder per feature in `src/modules/`. Files are named `<module>.<role>.ts`
  (`products.api.ts`, `cart.logic.ts`). Each module has its pages in `pages/` and its components in
  `components/`. General components are in `components/ui` and `components/layout`, generated shadcn
  files in `components/shadcn`, and the fetch code in `shared/api`.
- **What the reference does:** Also one folder per feature in `modules/`, but files are named for
  their job only (`types.ts`, `api.ts`, `store.ts`). Pages are not in the modules: they live in
  `app/` (Next.js routes) and stay thin: fetch, then render the module's components. The API is a
  separate backend inside the same repo (`app/api`), and it never imports from `modules/`.
- **What I will take, and why:** I keep my file names and my `pages/` folders, because the rule is
  clear and the module name in the file name helps when many tabs are open. I will take the
  "Adding a module" steps (spec, types, api, state, components, route, checks), because today
  CLAUDE.md says where files go but not in what order to build a new feature.

## 2. API client

- **What I did:** `shared/api/client.ts` has `getJson(path)`, the only `fetch`. The base URL is in
  one place (`config.ts`, read from `VITE_API_BASE_URL`). It stops after 10 seconds, checks
  `navigator.onLine` first, and throws an `ApiError` with one of five kinds (offline, network,
  timeout, http, invalid-response). `errors.ts` turns each kind into a message the user can read.
  It returns `unknown`, so every caller must check the data. It only does GET.
- **What the reference does:** `lib/api-client.ts` has `api<T>(path, { method, body })`, the only
  `fetch`, for GET, POST and DELETE. It reads the server's own error message (`{ error: "..." }`)
  and turns an empty 204 answer into `null`. It has no timeout and no offline check. It trusts its
  own API: the JSON is given the type `T` with no check.
- **What I will take, and why:** I will take reading the server's `{ error }` message, so the user
  sees the real reason, not only a status code. I will also fix my 404 message: it always says
  "We couldn't find the products". That is true today only because every request is for products.
  I will add `method` and `body` only when a feature needs to send data, not before.

## 3. Types and schemas

- **What I did:** `products.types.ts` has my own app types (`name`, `price` in dollars, `inStock`).
  The API's shape (`title`, `price_cents`, `in_stock`) stays inside `products.api.ts`, where the
  type guard `isApiProduct` checks each product and `toProduct()` turns it into mine. Bad products
  are skipped with a warning. `Category`, `CategoryFilter` and `SortOrder` are unions. Zod is only
  for the checkout form.
- **What the reference does:** Plain types that match the API exactly (`ApiProduct`, `ProductList`),
  and `Product` adds an `image`. The categories are one array, `CATEGORIES = [...] as const`, and the
  `Category` type is made from it. Zod is used for the forms and inside the API route to check what
  the browser sends. API answers are not checked: it is their own API.
- **What I will take, and why:** I will take the `as const` array for the categories, so the type
  and my `isCategory` guard both come from one list. Today a new category must be added in two
  places. I keep my type guards, because my API is not in my repo, and the reference itself says an
  outside API needs a check.

## 4. State

- **What I did:** The cart lives in `CartProvider` with `useState`, shared through two contexts:
  `CartContext` for the lines and `CartActionsContext` for the actions, which never change. It is
  saved to localStorage in an effect, and read back with a type guard. Filters are `useState` in
  `ProductsSection`. The thank-you page is a route, not a state. Every `memo` and `useCallback` was
  measured first and is listed in CLAUDE.md.
- **What the reference does:** The cart is a Zustand store with `persist`. It saves only the data
  (`partialize`) and has a `version`, so old saved carts are dropped when the shape changes.
  `useHydrated()` stops the cart count from flashing "0" on the first render. Filters, search and
  sort live in the URL (`?category=&q=&sort=`). Reviews use `useOptimistic`, with the reducer as a
  pure function in `optimistic.ts`.
- **What I will take, and why:** I will move the filters into the URL with React Router's
  `useSearchParams`. Then a filtered list can be shared as a link, a refresh keeps it, Back works,
  and `ProductsSection` has one less piece of state. I will not take Zustand: the course hasn't
  covered it, and my two contexts already stop the extra re-renders (I measured it).

## 5. Forms

- **What I did:** react-hook-form with `zodResolver(checkoutSchema)`, `mode: "onTouched"` and
  `noValidate`. Each input is a `Controller` with shadcn's `Field`, `FieldLabel`, `Input` and
  `FieldError`. There are three fields (name, email, address). The limits are named constants.
- **What the reference does:** The same tools, with ten fields: contact, address, delivery method
  (radio group) and card. The card number is checked with the Luhn check, and the expiry date with
  `MM/YY` and "not expired". Only the last 4 digits of the card are sent. When saving fails, the
  review form gives back what the user typed with `form.reset(values)`.
- **What I will take, and why:** I will add a delivery method and the card fields, with the checks
  done in the schema with `refine`, and keep only the last 4 digits. My checkout is too thin to
  show what Zod can do. I will keep `mode: "onTouched"`, which the reference does not use: it
  avoids red errors on the first letter.

## 6. Loading, error and not-found

- **What I did:** Every part that loads data is inside `LoadBoundary` (an Error Boundary and
  Suspense in one). Data is read with `use()` from a promise cache, and a reset forgets a failed
  request. `LoadError` shows a plain message with "Try again" and retries by itself when the
  browser goes back online. Empty and no-match are shown by `ProductsContent`. A missing product
  returns `null`, and `ProductDetails` shows "We couldn't find this product". A 404 page catches
  every unknown URL. While a page's code loads, it shows the text "Loading page…".
- **What the reference does:** Next.js files on every route: `loading.tsx` with `Skeleton`,
  `error.tsx` that always uses one `ErrorMessage` component, and `not-found.tsx` where a route
  reads an id. The product page uses two parallel routes (`@reviews`, `@related`), each with its own
  loading and error files, so one slow or broken part never takes the page down. Empty states use
  shadcn's `Empty`.
- **What I will take, and why:** I will make a "not found" product a real not-found view with a link
  back to the shop, like the reference's `not-found.tsx`, instead of one line of text. I will also
  show a skeleton instead of "Loading page…", so the page keeps its shape while it loads.

## 7. UI kit and tokens

- **What I did:** My own design in `style.css` (912 lines): tokens first (colors, radius, spacing,
  fonts), then base styles, then one block per component. shadcn is used only for the checkout
  fields, and its CSS is in a layer, so my design always wins. The rule is: changing code never
  changes the design.
- **What the reference does:** shadcn/ui is the whole UI kit. The tokens are in `globals.css` with
  Tailwind 4's `@theme`, and DESIGN.md explains the whole system (colors, type, spacing, radius,
  components, do's and don'ts). It has dark mode with a toggle. Components may not use hex codes or
  arbitrary values like `h-[32rem]`.
- **What I will take, and why:** I will write a short DESIGN section (or file) that explains my
  tokens and when to use each one, for example that `--accent` is for actions and `--second` only
  decorates. Today that knowledge is only in comments at the top of `style.css`. I will not move to
  Tailwind everywhere, because my rule is to keep the design as it is.

## 8. Tooling

- **What I did:** oxlint with `--deny-warnings`, Prettier, husky and lint-staged. The pre-commit
  hook runs lint-staged, then typecheck, lint, format:check and a full build. oxlint blocks `any`
  and `!`, but not `as`, even though CLAUDE.md bans it.
- **What the reference does:** ESLint with the Next.js configs. It blocks `any`, `!` and `as` (with
  `consistent-type-assertions: never`), with an exception for shadcn's generated files. The
  pre-commit hook runs only lint-staged (ESLint and Prettier on the changed files). There is a
  `typecheck` script.
- **What I will take, and why:** I will add a lint rule that blocks `as`, so my rule is checked by
  the tool and not only written in CLAUDE.md. A rule nobody checks gets broken one day. I keep my
  stricter hook: it is slower, but a broken build can never be committed.

## 9. CLAUDE.md

- **What I did:** A long file: the stack, what the code may use at this point in the course, "No AI
  slop", the structure, where a file goes, the role of each module file, imports, API client,
  components, routes, state, a performance table with measurements, effects, loading and errors,
  the form, styling, shadcn, TypeScript, and 21 rules from real mistakes.
- **What the reference does:** Shorter and easier to scan: "Read first", stack, commands, structure,
  data, routes and states, server and client, state, optimistic UI, forms, UI, naming, "Adding a
  module", and 6 rules from mistakes. It says to run lint, typecheck and format:check before saying
  a task is done, and never to skip the hook.
- **What I will take, and why:** I will add a "Commands" section with "run every check before you
  say a task is done", and the "Adding a module" steps (see Structure). My file is very long, so a
  short list at the top helps the AI and me find the most important rules first.

## What I did better

- **I check outside data.** Every product from the API and the cart from localStorage passes a type
  guard before the app uses it. The reference trusts its JSON, which is only safe because its API
  lives in the same repo.
- **Requests fail in a clear way.** A timeout, an offline check, five kinds of error with a message
  for each, and an automatic retry when the internet comes back. The reference has one error type,
  no timeout, and no retry without a click.
- **My performance work is measured.** I made a slow case (5,000 products, a 300-line cart), took
  the median of 7 runs, fixed it, and wrote down why each `memo` and `useCallback` is needed. The
  reference doesn't talk about re-renders at all.
- **The checkout never shows red on the first letter** (`mode: "onTouched"`).
- **The hook is stricter.** Mine also runs typecheck and build before every commit.
- **My rules come with their story.** Each of my 21 rules says what went wrong, so it's easy to see
  why the rule exists.

## My grade

**Grade:** Very Good

**Why:** My code is careful where it matters most: outside data is checked, errors are clear, and
performance was measured, not guessed. I understand and can explain each part. It is not Excellent
yet: the checkout has only three fields, there are no tests, the `as` rule is not checked by the
linter, the 404 message is too general, and the app never sends data to the server. The reference
showed me that the features I am missing (filters in the URL, optimistic updates, a full checkout)
are exactly the ones where I would learn the most next.
