import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteHeader } from "@/components/layout/site-header";

export default function MainLayout({ children }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="container-app flex-1 py-4 pb-24 sm:py-6 md:pb-8">
        {children}
      </main>
      <MobileNav />
    </>
  );
}
