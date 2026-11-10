@AGENTS.md

# Claude Code

`AGENTS.md` (imported above) holds the code rules and `DESIGN.md` the visual rules. This
file holds only what is specific to Claude Code: how to work in this repo. Don't copy a rule
from those files here; if one is wrong, fix it where it lives.

## Before you change anything

- Read `DESIGN.md` before any change a user can see: a component, a page, `globals.css`.
- Read the Next.js guide for the API you are about to use in `node_modules/next/dist/docs/`.
  If `node_modules` is missing, say so and ask for `pnpm install`; don't code from memory.
- The v1 project (`shopboard-next`) is the reference for behavior and look, and the Day 6
  course slides are the reference for structure. Read v1; never change it. Where they differ,
  `AGENTS.md` says which one wins and why.

## How we work: one step, then a review

Abdallah is learning from this migration. He chose "Claude applies, Abdallah reviews":

1. Do one step of the "Migration" list below, and nothing from the next step.
2. Explain what changed and why. Ask two or three review questions that make him check the
   reasoning, not just the result.
3. Stop and wait for his review. Start the next step only when he says so.

A step is one commit. The message says what changed, where and why, in English.
Tick the step in the list below in the same commit.

## UI rules (Day 6)

The rules every UI change follows. Each line names the `AGENTS.md` section (imported above)
that holds the details; change a rule there, not here.

- **Tailwind only:** no CSS file but `globals.css`, no CSS rules, no `@apply` ("Styling").
- **Tokens only:** every color, radius and font comes from `DESIGN.md` through `@theme`; no
  hex, no `px`, no `[..]` value in a component ("Styling").
- **ui is dumb:** a `components/ui` file knows nothing about products or the cart
  ("Where a file goes").
- **One source:** a style lives in one kit component and is never copied; a new look is a
  new variant ("Styling").
- **Small files:** too long to read at once? Split it ("Styling").
- **Typed variants:** `cva` + `cn()` like `button.tsx`; a wrong variant is a type error
  ("TypeScript").
- **Focus is visible on every control**, hover and dark mode are checked, and every page
  works at 360, 768 and 1280px ("Styling", "Before you finish").

## Building a UI kit component (Day 6)

1. Read `components/ui/button.tsx` first and build the same way: `cva` for the variants,
   `cn()` for `className`, tokens only, typed props, the focus outline.
2. shadcn has the component? Start from `pnpm dlx shadcn@latest add <name>`, then adapt it.
   If the CLI can't run here, write it in the CLI's structure and say so, so Abdallah can
   compare it with `--dry-run`.
3. Show the file and stop before any page uses it: it spreads only after his review.
4. A fix he asks for in review that would apply to the next component too becomes a rule in
   `AGENTS.md` ("Styling" or "Where a file goes") in the same commit.

## Replies to Abdallah

- He writes in Arabic or English; answer in the language of his message.
- In Arabic replies: the explanation stays fully Arabic. Every English term, file name,
  command or piece of code goes on its own line, in a code block or in a table, never inside
  an Arabic sentence (the text direction breaks). Use the real English term (`state`,
  `Server Component`, `@theme`), never an invented Arabic word in its place.
- End a learning reply with a short glossary table: English term → Arabic meaning.
- Mark how sure you are about an important claim (✅ established, ⚠️ probable, ❓ unsure),
  and point to the doc that proves it.

## Commands and tools

- pnpm only. Never `npm install` or `yarn`: they create a second lock file.
- No new package without asking first (also in `AGENTS.md`).
- Don't start `next dev` if one is already running: Next.js 16 keeps a lock file and the
  second server fails. Ask, or use the running one.
- After each step run, in this order: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`,
  `pnpm build`. If one can't run here, say which one and why; never report a step as
  checked when it wasn't.
- Logic files from v1 are copied as they are. Check with a diff against v1 that only the
  import paths changed, plus the changes the step names (e.g. no `LoadResult`).

## Files you don't edit by hand

- The block between `<!-- BEGIN:nextjs-agent-rules -->` and `<!-- END:nextjs-agent-rules -->`
  in `AGENTS.md`: `next dev` owns it.
- `pnpm-lock.yaml`: pnpm owns it.

## Migration

The working list for moving v1 to v2, re-planned for the Day 6 course after step 3. Delete
this section in the last step: after that it would be a stale plan file (see "No AI slop"
in `AGENTS.md`).

1. [x] Rules: `AGENTS.md`, `DESIGN.md` and `CLAUDE.md`, one job each
2. [x] Tooling: package.json scripts and dependencies, oxlint, Prettier (with the Tailwind
       plugin), husky, lint-staged, stricter tsconfig, `.env.example`
3. [x] Tailwind + shadcn base: tokens in `globals.css`, `components.json`, `lib/utils.ts`,
       fonts and `<body>` in `app/layout.tsx`, shadcn `Button`, `headingVariants`
4. [x] Day 6 structure: `features/`, `lib/api/`, the UI kit in `components/ui/`, route files
       instead of `LoadBoundary`, `/products` as its own route, kebab-case names
5. [x] Logic with no UI: `lib/api/` (config, client, errors; no `result.ts`), `lib/format.ts`,
       and `features/*`: the types, logic, state, api, cart store and hooks, checkout schema
6. [x] UI kit, reviewed before any page uses it: `input`, `label`, `field`, `card`, `badge`
       from shadcn, adapted; our `select` (the filters' two native selects) and our `modal`
       (native `<dialog>`: Esc closes it, focus stays inside, focus comes back). `badge`
       variants: the cart count and the category label
7. [x] Frame: `header`, `shop-link`, `footer`, the sign-up `modal` with `register-form`;
       `app/not-found.tsx`, `app/error.tsx`, `app/icon.svg`
8. [x] `/` (hero) and `/products`: `page`, `loading`, `error`, filters, product card, empty
       and no-match messages. The products page uses the kit's `Input` (search), `Card`
       (product card) and `Badge` (category), as Task 4 asks
9. [ ] `/products/[id]`: `notFound()`, `loading`, `AddToCartButton`
10. [ ] `/cart`: `page`, `loading`, `error`, cart rows and total
11. [ ] `/checkout` and `/checkout/success`: the form, the summary in its own `<Suspense>`
12. [ ] Clean-up and checks: remove the demo files and this section, write the README, run
        the "Before you finish" list in `AGENTS.md`. Then Abdallah deploys on Vercel and
        submits the repo and the link.
