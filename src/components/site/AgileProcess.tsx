import { useEffect, useRef, useState } from "react";
import { Compass, PenTool, Code2, Rocket, RefreshCw } from "lucide-react";

const STEPS = [
  {
    n: "01",
    label: "Discover",
    d: "Sprint-zero workshop. Goals, users, risks and success metrics on one page.",
    Icon: Compass,
  },
  {
    n: "02",
    label: "Design",
    d: "Rapid prototypes, design tokens and a shippable UI system — no dead pixels.",
    Icon: PenTool,
  },
  {
    n: "03",
    label: "Develop",
    d: "Two-week sprints, demo every Friday, code in your repo from day one.",
    Icon: Code2,
  },
  {
    n: "04",
    label: "Deploy",
    d: "Automated CI/CD, feature flags and staged rollouts to real users.",
    Icon: Rocket,
  },
  {
    n: "05",
    label: "Iterate",
    d: "Retros, telemetry and a living roadmap — the product never sits still.",
    Icon: RefreshCw,
  },
];

export function AgileProcess() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf: number | null = null;
    const update = () => {
      raf = null;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, 1 - (rect.top - vh * 0.2) / (rect.height + vh * 0.4)));
      setProgress(p);
    };
    const onScroll = () => {
      if (raf != null) return;
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const active = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));

  return (
    <section id="process" ref={wrapRef} className="relative border-t border-hairline py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">Process</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            Agile, but <span className="text-gradient">actually agile</span>.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Two-week sprints, weekly demos, monthly retros. You see progress
            every Friday — not at the end of the quarter.
          </p>
        </div>

        <div className="relative mt-16">
          {/* progress rail */}
          <div className="absolute left-6 top-0 bottom-0 hidden w-px bg-hairline lg:block">
            <div
              className="absolute left-0 top-0 w-px bg-gradient-to-b from-electric to-cyan transition-[height] duration-500"
              style={{ height: `${progress * 100}%` }}
            />
          </div>

          <ol className="space-y-6 lg:pl-16">
            {STEPS.map((s, i) => {
              const done = i <= active;
              return (
                <li
                  key={s.n}
                  className={[
                    "relative rounded-3xl border p-6 transition-all duration-500 sm:p-8",
                    done
                      ? "border-electric/50 bg-panel"
                      : "border-hairline bg-surface/30",
                  ].join(" ")}
                >
                  {/* rail dot */}
                  <span
                    className={[
                      "absolute -left-[54px] top-8 hidden h-4 w-4 rounded-full border-2 transition-all duration-500 lg:block",
                      done
                        ? "border-electric bg-electric shadow-[0_0_20px_oklch(0.72_0.18_235/0.9)]"
                        : "border-hairline bg-background",
                    ].join(" ")}
                  />
                  <div className="flex flex-wrap items-center gap-4">
                    <span
                      className={[
                        "flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors",
                        done
                          ? "border-electric bg-surface text-electric"
                          : "border-hairline bg-surface/60 text-muted-foreground",
                      ].join(" ")}
                    >
                      <s.Icon size={22} />
                    </span>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        Sprint / {s.n}
                      </p>
                      <h3 className="text-2xl font-semibold">{s.label}</h3>
                    </div>
                  </div>
                  <p className="mt-4 max-w-2xl text-muted-foreground">{s.d}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
