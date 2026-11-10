// utils.ts: cn() joins class names (clsx) and lets the last class win when two set the same
// thing (tailwind-merge), so <Input className="rounded-lg"> replaces the default rounded-md.
import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge knows Tailwind's default names only. Without these, it would read
// "text-hero" as a text color and drop it next to "text-foreground", and the same for
// "shadow-lift" next to a shadow color. The names come from @theme in app/globals.css.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["h1", "h2", "h3", "hero", "lead", "price"],
      shadow: ["lift", "panel", "dialog"],
      spacing: [
        "tap",
        "header",
        "page",
        "section",
        "hero",
        "grid",
        "lift",
        "title-bar",
        "input-x",
        "input-y",
      ],
      container: [
        "page-max",
        "frame",
        "dialog",
        "hero-title",
        "hero-text",
        "checkout-form",
        "checkout-summary",
        "toast",
      ],
      font: ["display"],
      leading: ["body"],
      tracking: ["heading", "eyebrow"],
      animate: ["rise", "hero", "pop", "slide-up", "shimmer"],
      blur: ["backdrop"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
