@AGENTS.md

# Claude Code

`AGENTS.md` (imported above) holds the code rules and `DESIGN.md` the visual rules. This
file holds only what is specific to Claude Code: how to work in this repo. Don't copy a rule
from those files here; if one is wrong, fix it where it lives.

## Before you change anything

- Read `DESIGN.md` before any change a user can see: a component, a page, `globals.css`.
- Read the Next.js guide for the API you are about to use in `node_modules/next/dist/docs/`.
  If `node_modules` is missing, say so and ask for `pnpm install`; don't code from memory.
- The v1 project (`shopboard-next`) is the reference for behavior and look. Read it; never
  change it.

## How we work: one step, then a review

Abdallah is learning from this migration. He chose "Claude applies, Abdallah reviews":

1. Do one step of the "Migration" list below, and nothing from the next step.
2. Explain what changed and why. Ask two or three review questions that make him check the
   reasoning, not just the result.
3. Stop and wait for his review. Start the next step only when he says so.

A step is one commit. The message says what changed, where and why, in English.
Tick the step in the list below in the same commit.

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
  import paths changed.

## Files you don't edit by hand

- The block between `<!-- BEGIN:nextjs-agent-rules -->` and `<!-- END:nextjs-agent-rules -->`
  in `AGENTS.md`: `next dev` owns it.
- `components/shadcn/` and `lib/utils.ts`: the shadcn CLI owns them.
- `pnpm-lock.yaml`: pnpm owns it.

## Migration

The working list for moving v1 to v2. Delete this section in step 10, when it is done: after
that it would be a stale plan file (see "No AI slop" in `AGENTS.md`).

1. [x] Rules: `AGENTS.md`, `DESIGN.md` and `CLAUDE.md`, one job each
2. [ ] Tooling: package.json scripts and dependencies, oxlint, Prettier (with the Tailwind
       plugin), husky, lint-staged, stricter tsconfig, `.env.example`
3. [ ] Tailwind + shadcn base: `globals.css` tokens and base styles, `components.json`,
       `lib/utils.ts`, fonts and frame in `app/layout.tsx`, `Button`
4. [ ] Logic with no UI, copied as is: `shared/`, the `*.types`, `*.logic`, `*.state`,
       `*.api`, `cart.*` and `checkout.schema` files
5. [ ] Frame: `Header`, `ShopLink`, `Footer`, `Overlay`, `RegisterForm`
6. [ ] General UI: `LoadBoundary`, `LoadError`, `StatusMessage`, `error.tsx`, `not-found.tsx`
7. [ ] Products: home page, product page and their components
8. [ ] Cart page and its components
9. [ ] Checkout, the shadcn fields and the success page
10. [ ] Clean-up and checks: remove the demo files and this section, write the README, run
        the "Before you finish" list in `AGENTS.md`
