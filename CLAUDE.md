@AGENTS.md

# Claude Code

`AGENTS.md` (imported above) holds the code rules, `DESIGN.md` the look. This file holds only
how Claude works here. A wrong rule is fixed where it lives, never copied here.

## Before a change

- Read `DESIGN.md` before anything a user can see, and the Next.js guide for the API you use
  in `node_modules/next/dist/docs/`. No `node_modules`? Say so; don't code from memory.
- v1 (`shopboard-next`) is the reference for behavior and look; the Day 6 slides for
  structure. Read v1, never change it. Not available? Say what you couldn't compare.

## One change, then a review

Abdallah is learning ("Claude applies, Abdallah reviews"):

1. Do one change, nothing more. One change = one commit, its message in English (what,
   where, why).
2. Explain what changed and why; ask two or three questions that check the reasoning.
3. Stop until he says go on.

## UI rules (Day 6)

Details in the `AGENTS.md` section named in brackets.

- Tailwind only: no CSS rules, no `@apply`, no CSS file but `globals.css` ("Styling").
- Tokens only: colors, radius, fonts from `@theme`; no hex, `px` or `[..]` ("Styling").
- One UI folder, `components/ui`, and it is dumb ("Where a file goes").
- One source: a style lives in one kit file; a new look is a new variant ("Styling").
- Typed variants with `cva` + `cn()`, like `button.tsx`; small files ("Styling").
- Focus visible on every control; hover, dark mode, 360/768/1280px checked ("Styling").

## A new kit component

Read `components/ui/button.tsx` and build the same way. shadcn has it? Start from
`pnpm dlx shadcn@latest add <name>` (or write it in the CLI's shape and say so, for a
`--dry-run` compare). Show the file before a page uses it. A review fix that applies to the
next component too becomes a rule in `AGENTS.md` in the same commit.

## Replies to Abdallah

- Answer in his message's language. In Arabic: the explanation fully Arabic; every English
  term, file, command or code on its own line, in a code block or a table, never inside an
  Arabic sentence. Use the real English term, never an invented Arabic one.
- End a learning reply with a glossary table (English → Arabic).
- Mark important claims ✅ established, ⚠️ probable, ❓ unsure, and name the doc.

## Commands

- pnpm only (never `npm install` or `yarn`: a second lock file). No new package without
  asking.
- Don't start a second `next dev`: Next.js 16 keeps a lock file. Ask, or use the running one.
- After each change: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build`. Say which
  one couldn't run and why; never call a change checked when it wasn't.
- Don't edit by hand: the `nextjs-agent-rules` block in `AGENTS.md` (`next dev` owns it) and
  `pnpm-lock.yaml` (pnpm owns it).
