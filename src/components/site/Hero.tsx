import { useEffect, useRef } from "react";
import logoAsset from "@/assets/logo.gif.asset.json";

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Mouse-driven depth
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${x * 30}px, ${y * 30}px, 0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x * -50}px, ${y * -50}px, 0)`;
      }
    };
    wrap.addEventListener("mousemove", onMove);
    return () => wrap.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="top"
      ref={wrapRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-hero"
    >
      {/* ambient */}
      <div ref={glowRef} className="pointer-events-none absolute -top-40 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.18_235/0.45),transparent_60%)] blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,oklch(0.86_0.15_200/0.25),transparent_60%)] blur-3xl" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 py-32 lg:grid-cols-[1.15fr_1fr]">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/60 px-3 py-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
            Repair · Upgrade · Evolve · 24/7
          </div>

          <h1 className="text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl xl:text-8xl">
            <span className="block text-foreground">The digital world</span>
            <span className="block text-shine">never sleeps.</span>
            <span className="block text-foreground">Neither do we.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Maintenance Planet is the engineering partner behind ambitious
            digital products. We keep your platforms live, your infrastructure
            evolving, and your AI-built prototypes ready for the real world.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#ai-completion"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[oklch(0.72_0.18_235)] to-[oklch(0.86_0.15_200)] px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_20px_60px_-15px_oklch(0.78_0.19_220/0.75)] transition-transform hover:scale-[1.03]"
            >
              Complete my AI project
              <svg className="transition-transform group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/60 px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-surface-2"
            >
              Explore services
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-hairline pt-8 text-left">
            {[
              ["24/7", "Monitoring & response"],
              ["120+", "Platforms maintained"],
              ["<15m", "Critical-incident SLA"],
            ].map(([k, v]) => (
              <div key={k as string}>
                <dt className="text-2xl font-semibold text-foreground lg:text-3xl">
                  <span className="text-gradient">{k}</span>
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div ref={orbRef} className="relative mx-auto hidden aspect-square w-full max-w-lg lg:block">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.18_235/0.35),transparent_70%)] blur-2xl animate-pulse-glow" />
          <img
            src={logoAsset.url}
            alt="Maintenance Planet — animated logo"
            className="relative z-10 h-full w-full animate-float-slow object-contain"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        Scroll to enter
      </div>
    </section>
  );
}
