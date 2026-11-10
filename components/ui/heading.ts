// heading.ts: the heading look from DESIGN.md "Typography", once. The shared part is the base;
// the level sets the size and line height. Used on the tag itself:
// <h1 className={headingVariants({ level: 1 })}>. A size class added after it wins in cn().
import { cva } from "class-variance-authority";

export const headingVariants = cva("font-display font-bold tracking-heading text-balance", {
  variants: {
    level: {
      1: "text-h1",
      2: "text-h2",
      3: "text-h3",
    },
  },
});
