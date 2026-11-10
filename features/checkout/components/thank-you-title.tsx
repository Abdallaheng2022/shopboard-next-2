// thank-you-title.tsx: the thank-you page's title, with the name from ?name= (AGENTS.md
// "State": the name travels in the URL). Reading searchParams makes this part per-request,
// so the page shows it inside <Suspense>, with the nameless title as the fallback.
import { PageTitle } from "@/components/layout/page-section";

interface ThankYouTitleProps {
  // Missing: the fallback, before the URL is read.
  searchParams?: PageProps<"/checkout/success">["searchParams"];
}

export async function ThankYouTitle({ searchParams }: ThankYouTitleProps) {
  // ?name= is a string, a list (?name=a&name=b) or missing: only a non-empty string counts.
  const name = searchParams === undefined ? undefined : (await searchParams).name;
  const cleanName = typeof name === "string" ? name.trim() : "";
  return (
    <PageTitle id="success-title">
      {cleanName === "" ? "Thank you!" : `Thank you, ${cleanName}!`}
    </PageTitle>
  );
}
