import { useEffect, useRef, useState } from "react";

type FrameSequenceProps = {
  /** URL prefix without index, e.g. "/frames/seq1/f_" */
  prefix: string;
  /** Total frame count */
  count: number;
  /** Frame index padding (default 3 → f_001.webp) */
  pad?: number;
  /** File extension including dot */
  ext?: string;
  /** Native width */
  width: number;
  /** Native height */
  height: number;
  /** Vertical scroll length as multiplier of viewport (default 2.5 → 250vh) */
  scrollLength?: number;
  /** Overlay content pinned on top */
  children?: React.ReactNode;
};

/**
 * Apple-style scroll-scrubbed frame sequence.
 * Preloads WebP frames, pins the canvas, and advances the frame index
 * based on the pinned section's scroll progress.
 */
export function FrameSequence({
  prefix,
  count,
  pad = 3,
  ext = ".webp",
  width,
  height,
  scrollLength = 2.5,
  children,
}: FrameSequenceProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(0);

  const frameUrl = (i: number) =>
    `${prefix}${String(i + 1).padStart(pad, "0")}${ext}`;

  // Preload frames
  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];
    let done = 0;
    for (let i = 0; i < count; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(i);
      img.onload = img.onerror = () => {
        if (cancelled) return;
        done++;
        setLoaded(done);
        if (done === count) setReady(true);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefix, count]);

  // Scroll-driven draw
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const drawFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
    };

    const update = () => {
      rafRef.current = null;
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const progress = total > 0 ? scrolled / total : 0;
      const idx = Math.min(count - 1, Math.max(0, Math.floor(progress * (count - 1))));
      drawFrame(idx);
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(update);
    };

    // Initial draw once first frame available
    const first = imagesRef.current[0];
    if (first) {
      if (first.complete) drawFrame(0);
      else first.addEventListener("load", () => drawFrame(0), { once: true });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ready, count, width, height]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full"
      style={{ height: `${scrollLength * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-hero"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 grid-lines opacity-40"
          aria-hidden
        />

        <div className="relative z-10 w-full max-w-6xl px-6">
          <canvas
            ref={canvasRef}
            aria-hidden
            className="mx-auto block w-full rounded-2xl"
            style={{
              aspectRatio: `${width} / ${height}`,
              maxHeight: "70vh",
              filter: "drop-shadow(0 30px 80px oklch(0.72 0.18 235 / 0.35))",
            }}
          />
          {!ready && (
            <div className="mt-6 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Loading sequence · {Math.round((loaded / count) * 100)}%
            </div>
          )}
          {children && <div className="mt-10">{children}</div>}
        </div>
      </div>
    </div>
  );
}
