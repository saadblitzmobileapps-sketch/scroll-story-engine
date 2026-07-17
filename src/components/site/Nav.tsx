import { useEffect, useState } from "react";
import logoAsset from "@/assets/logo.gif.asset.json";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#partners", label: "Partners" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <div
          className={[
            "flex items-center gap-3 rounded-full px-3 py-2 transition-all duration-500",
            scrolled
              ? "border border-hairline bg-surface/60 backdrop-blur-xl shadow-panel"
              : "border border-transparent",
          ].join(" ")}
        >
          <a href="#top" className="flex items-center" aria-label="Maintenance Planet — home">
            <img
              src={logoAsset.url}
              alt="Maintenance Planet"
              className="h-9 w-auto"
            />
          </a>
        </div>

        <nav
          className={[
            "hidden items-center gap-1 rounded-full border px-2 py-1.5 text-sm transition-all duration-500 md:flex",
            scrolled
              ? "border-hairline bg-surface/60 backdrop-blur-xl shadow-panel"
              : "border-transparent bg-surface/30 backdrop-blur",
          ].join(" ")}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-1.5 text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-to-r from-[oklch(0.72_0.18_235)] to-[oklch(0.86_0.15_200)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.78_0.19_220/0.7)] transition-transform hover:scale-[1.03] md:inline-flex"
          >
            Start a project
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-hairline bg-surface/60 p-2.5 backdrop-blur-xl md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-6 mt-3 rounded-2xl border border-hairline bg-surface/80 p-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface-2 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-[oklch(0.72_0.18_235)] to-[oklch(0.86_0.15_200)] px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Start a project
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
