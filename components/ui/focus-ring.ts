// focus-ring.ts: DESIGN.md's keyboard focus outline (3px, link color, 3px away), in one place.
// Every focusable element that isn't an input adds it to its own classes: Button, the header
// links, the product name link, the checkbox. Focus isn't inherited, so a parent can't set it.
export const focusRing =
  "focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-link focus-visible:outline-solid";
