// page-section.tsx: the frame of every page's content (DESIGN.md "Layout": the section's
// vertical padding) and its title (DESIGN.md "Section title": a short primary bar above it).
// The bar is a real element, not a ::before, so it is a plain class on a tag.
import type { ComponentProps, ReactNode } from "react";
import { headingVariants } from "@/components/ui/heading";
import { cn } from "@/lib/utils";

function PageSection({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("py-section", className)} {...props} />;
}

interface PageTitleProps {
  id: string;
  // h1 for a page's own title, h2 for a section inside a page.
  level?: 1 | 2;
  className?: string;
  children: ReactNode;
}

function PageTitle({ id, level = 1, className, children }: PageTitleProps) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <Heading id={id} className={cn(headingVariants({ level }), "mb-5", className)}>
      <span aria-hidden="true" className="mb-3 block h-title-bar w-8 rounded-bar bg-primary" />
      {children}
    </Heading>
  );
}

export { PageSection, PageTitle };
