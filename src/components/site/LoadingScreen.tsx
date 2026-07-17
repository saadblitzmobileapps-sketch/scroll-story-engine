import { useEffect, useState } from "react";
import logoAsset from "@/assets/logo.gif.asset.json";

/**
 * Full-screen intro overlay with the animated Maintenance Planet logo.
 * Fades out after the logo has had time to play once.
 */
export function LoadingScreen() {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");

  useEffect(() => {
    // Lock scroll while the intro is on screen.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t1 = window.setTimeout(() => setPhase("out"), 2400);
    const t2 = window.setTimeout(() => {
      setPhase("gone");
      document.body.style.overflow = prev;
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = prev;
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden
      className={[
        "fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-opacity duration-700",
        phase === "out" ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-hero" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.18_235/0.45),transparent_60%)] blur-3xl animate-pulse-glow" />

      <div className="relative flex flex-col items-center gap-8">
        {/* orbit ring behind logo */}
        <div className="relative flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
          <div className="absolute inset-0 rounded-full border border-hairline" />
          <div
            className="absolute inset-6 rounded-full border border-hairline"
            style={{ animation: "spin 14s linear infinite" }}
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_18px_currentColor] text-cyan" />
          </div>
          <div
            className="absolute inset-14 rounded-full border border-hairline"
            style={{ animation: "spin 22s linear infinite reverse" }}
          >
            <span className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rounded-full bg-electric shadow-[0_0_18px_currentColor] text-electric" />
          </div>

          <img
            src={logoAsset.url}
            alt="Maintenance Planet"
            className="relative z-10 w-40 sm:w-52"
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
            Booting the planet
          </p>
          <div className="h-[2px] w-40 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full bg-gradient-accent"
              style={{ animation: "loading-bar 2.2s ease-out forwards" }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
