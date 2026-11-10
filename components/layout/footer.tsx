// footer.tsx: the bottom of every page. Its content sits in the same 1200px column as the
// header's (max-w-frame with the page's side padding).
export function Footer() {
  return (
    <footer className="mt-10 border-t border-border text-sm text-muted-foreground">
      <div className="mx-auto max-w-frame px-page py-10">
        <p>© 2026 ShopBoard</p>
      </div>
    </footer>
  );
}
