// layout.tsx: what stays on every page: the Navbar (Header) and the Footer. The current page goes
// in {children}. It also loads the three fonts and globals.css.
import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";

// next/font downloads the fonts at build time and serves them from this site: no request to
// Google in the browser, and no jump when the font arrives. Each one sets a CSS variable that
// @theme in globals.css turns into font-display, font-sans and font-mono.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "ShopBoard",
  description: "ShopBoard: everything your shop needs, in one board.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable} ${jetBrainsMono.variable}`}>
      {/* The parent of every page, so what all text shares is set once here and inherited:
          the body font (font-sans, from Preflight), color, line height, text-pretty, smoothing,
          and the selection colors (selection: reaches every element inside). Plus the page
          background and its glows (DESIGN.md "Overview"). */}
      <body className="min-h-dvh bg-background bg-(image:--page-glows) bg-fixed leading-body text-pretty text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
        <Header />
        {/* The page column: at most 1240px, centered, with the fluid side padding. */}
        <main className="mx-auto w-full max-w-page px-page">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
