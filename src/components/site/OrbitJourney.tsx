import { useEffect, useMemo, useRef, useState } from "react";
import planetImg from "@/assets/planet.png";
import {
  Globe,
  Smartphone,
  Megaphone,
  Sparkles,
  Boxes,
  CloudCog,
  Wrench,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";

type Service = {
  id: string;
  label: string;
  title: string;
  tagline: string;
  bullets: string[];
  cta: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
};

const SERVICES: Service[] = [
  {
    id: "web",
    label: "Websites",
    title: "Websites that earn their pixels.",
    tagline:
      "Marketing sites, portals and web apps built for speed, SEO and conversions — not just for looks.",
    bullets: [
      "Design systems & component libraries",
      "Headless CMS, editable content pipelines",
      "Core Web Vitals ≥ 95, SEO-ready out of the box",
    ],
    cta: "Plan my website",
    Icon: Globe,
  },
  {
    id: "mobile",
    label: "Mobile Apps",
    title: "iOS & Android, one product team.",
    tagline:
      "Native-feel cross-platform apps with real offline, push, payments and store submissions handled end to end.",
    bullets: [
      "React Native / Expo & native modules",
      "Auth, payments, push, deep links",
      "TestFlight & Play Console shipped for you",
    ],
    cta: "Scope my mobile app",
    Icon: Smartphone,
  },
  {
    id: "marketing",
    label: "Digital Marketing",
    title: "Traffic that becomes revenue.",
    tagline:
      "Performance SEO, paid, content and lifecycle — measured with first-party analytics you actually trust.",
    bullets: [
      "Technical SEO, schema, internal linking",
      "Google, Meta & LinkedIn paid ops",
      "Email / CRM automation & funnels",
    ],
    cta: "Grow my pipeline",
    Icon: Megaphone,
  },
  {
    id: "ai",
    label: "AI Rescue",
    title: "Finish what an AI builder started.",
    tagline:
      "Half-cooked Lovable, Bolt, Cursor, Replit or v0 projects — we take them the last mile to production.",
    bullets: [
      "Backend, auth, database, deployments",
      "Refactor prompts-to-production code",
      "Handover with docs, tests and runbooks",
    ],
    cta: "Rescue my AI project",
    Icon: Sparkles,
  },
  {
    id: "product",
    label: "Digital Products",
    title: "Custom software, built to compound.",
    tagline:
      "SaaS platforms, internal tools and dashboards designed to scale with your team and outlive the trend cycle.",
    bullets: [
      "Product discovery & lean specs",
      "Multi-tenant, role-based architectures",
      "AI features wired into real workflows",
    ],
    cta: "Build my product",
    Icon: Boxes,
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    title: "Infrastructure that quietly holds.",
    tagline:
      "AWS, GCP, Azure, Cloudflare & Vercel — CI/CD, IaC, observability and cost control by senior engineers.",
    bullets: [
      "Zero-downtime migrations",
      "Terraform / Pulumi & GitOps pipelines",
      "Uptime, logs, alerts, incident response",
    ],
    cta: "Audit my cloud",
    Icon: CloudCog,
  },
  {
    id: "ecom",
    label: "E-commerce",
    title: "Storefronts that ship on time.",
    tagline:
      "Shopify, Woo, headless commerce and custom checkouts — integrated with your ops, ads and fulfilment.",
    bullets: [
      "Shopify / Woo / custom headless builds",
      "Checkout, payments & tax integrations",
      "Attribution stitched across ads & CRM",
    ],
    cta: "Launch my store",
    Icon: ShoppingCart,
  },
  {
    id: "support",
    label: "Maintenance",
    title: "24/7 engineering, on standby.",
    tagline:
      "Continuous monitoring, upgrades and security patches so your platforms never wake you up at 3 AM.",
    bullets: [
      "Uptime, alerting & incident response",
      "Dependency, security & framework upgrades",
      "Monthly reviews with a real engineer",
    ],
    cta: "Start a care plan",
    Icon: Wrench,
  },
];

export function OrbitJourney() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [manualIdx, setManualIdx] = useState<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const count = SERVICES.length;
  // one screen intro + one per service
  const stops = count + 1;

  // Compute angles for each orbit icon (distributed around ring)
  const angles = useMemo(
    () => SERVICES.map((_, i) => (i / count) * 360 - 90),
    [count]
  );

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const update = () => {
      rafRef.current = null;
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
      // First stop is intro, next `count` stops are services
      const raw = p * (stops - 1);
      const idx = Math.min(count - 1, Math.max(0, Math.round(raw) - 1));
      if (manualIdx == null) setActive(idx < 0 ? 0 : idx);
    };
    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [count, stops, manualIdx]);

  // Rotate orbit so that active icon comes to the top-right position.
  const orbitRotation = -angles[active] - 30;

  const scrollToService = (i: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const total = wrap.offsetHeight - window.innerHeight;
    const p = (i + 1) / (stops - 1);
    const top = wrap.offsetTop + total * p;
    setManualIdx(i);
    setActive(i);
    window.scrollTo({ top, behavior: "smooth" });
    window.setTimeout(() => setManualIdx(null), 900);
  };

  const introVisible = progress < 0.06;
  const current = SERVICES[active];

  return (
    <section
      id="services"
      ref={wrapRef}
      className="relative"
      style={{ height: `${stops * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full overflow-hidden bg-hero">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.18_235/0.35),transparent_60%)] blur-3xl"
          style={{
            transform: `translate3d(-50%, ${progress * -80}px, 0)`,
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
          {/* ORBIT VISUAL */}
          <div className="relative mx-auto flex aspect-square w-full max-w-[340px] items-center justify-center sm:max-w-[460px] lg:max-w-[560px]">
            {/* Rings */}
            <div className="absolute inset-0 rounded-full border border-hairline" />
            <div className="absolute inset-[10%] rounded-full border border-hairline" />
            <div className="absolute inset-[22%] rounded-full border border-dashed border-hairline" />

            {/* Orbit ring with icons */}
            <div
              className="absolute inset-[6%] rounded-full transition-transform duration-700 ease-out"
              style={{ transform: `rotate(${orbitRotation}deg)` }}
            >
              {SERVICES.map((s, i) => {
                const isActive = i === active;
                const angle = angles[i];
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollToService(i)}
                    aria-label={s.label}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translate(0, -50%) translate(0, -1px)`,
                    }}
                  >
                    <span
                      className="block"
                      style={{
                        transform: `translateY(calc(-1 * min(220px, 40vw))) rotate(${-angle - orbitRotation}deg)`,
                      }}
                    >
                      <span
                        className={[
                          "flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-500 sm:h-12 sm:w-12 sm:rounded-2xl lg:h-14 lg:w-14",
                          isActive
                            ? "scale-110 border-electric bg-surface text-foreground shadow-[0_0_40px_-8px_oklch(0.72_0.18_235/0.9)]"
                            : "border-hairline bg-surface/70 text-muted-foreground backdrop-blur hover:border-electric hover:text-foreground",
                        ].join(" ")}
                      >
                        <s.Icon size={18} className="sm:hidden" />
                        <s.Icon size={22} className="hidden sm:block" />
                      </span>
                      <span
                        className={[
                          "mt-1.5 block whitespace-nowrap text-center text-[9px] uppercase tracking-[0.18em] transition-colors sm:mt-2 sm:text-[10px] sm:tracking-[0.2em]",
                          isActive ? "text-foreground" : "text-muted-foreground",
                        ].join(" ")}
                      >
                        {s.label}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Central planet */}
            <div className="relative flex h-28 w-28 items-center justify-center sm:h-48 sm:w-48 lg:h-64 lg:w-64">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.18_235/0.55),transparent_70%)] blur-2xl animate-pulse-glow" />
              <div
                className="absolute inset-[-8%] rounded-full border border-hairline/60"
                style={{ animation: "spin 40s linear infinite" }}
              />
              <img
                src={planetImg}
                alt="Maintenance Planet"
                width={512}
                height={512}
                className="relative z-10 h-full w-full object-contain animate-float-slow drop-shadow-[0_0_40px_oklch(0.72_0.18_235/0.6)]"
              />
            </div>
          </div>

          {/* DETAIL PANEL */}
          <div className="relative min-h-[420px]">
            {/* Intro card */}
            <div
              className={[
                "absolute inset-0 flex flex-col justify-center transition-all duration-500",
                introVisible
                  ? "opacity-100 translate-y-0"
                  : "pointer-events-none -translate-y-4 opacity-0",
              ].join(" ")}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-accent">
                Our universe
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
                One planet.
                <br />
                <span className="text-gradient">Every service in orbit.</span>
              </h2>
              <p className="mt-5 max-w-lg text-muted-foreground">
                Keep scrolling — the orbit rotates through every discipline we
                run. Tap any icon to jump straight to it, then send us an
                inquiry from the panel.
              </p>
              <div className="mt-8 text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
                ↓ Scroll to travel the orbit
              </div>
            </div>

            {/* Active service card */}
            {SERVICES.map((s, i) => (
              <div
                key={s.id}
                className={[
                  "absolute inset-0 flex flex-col justify-center transition-all duration-500",
                  i === active && !introVisible
                    ? "opacity-100 translate-y-0"
                    : "pointer-events-none translate-y-6 opacity-0",
                ].join(" ")}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-electric bg-surface text-electric">
                    <s.Icon size={20} />
                  </span>
                  <p className="text-xs uppercase tracking-[0.4em] text-accent">
                    Service · {String(i + 1).padStart(2, "0")} /{" "}
                    {String(count).padStart(2, "0")}
                  </p>
                </div>
                <h3 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-xl text-muted-foreground">
                  {s.tagline}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm text-foreground/90"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={`#contact?service=${s.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("contact");
                      if (el) {
                        try {
                          window.sessionStorage.setItem(
                            "mp:inquiry-service",
                            s.label
                          );
                        } catch {}
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.72_0.18_235)] to-[oklch(0.86_0.15_200)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_20px_60px_-15px_oklch(0.78_0.19_220/0.75)] transition-transform hover:scale-[1.03]"
                  >
                    {s.cta}
                    <ArrowRight size={16} />
                  </a>
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Free scoping call · 30 min
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress rail */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {SERVICES.map((_, i) => (
            <span
              key={i}
              className={[
                "h-1 rounded-full transition-all duration-500",
                i === active && !introVisible
                  ? "w-8 bg-gradient-accent"
                  : "w-4 bg-hairline",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { SERVICES };
