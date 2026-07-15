import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { FrameSequence } from "@/components/site/FrameSequence";
import { ContactForm } from "@/components/site/ContactForm";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="relative overflow-clip">
      <Nav />
      <Hero />

      {/* CHAPTER 1 — scroll-scrubbed sequence */}
      <FrameSequence
        prefix="/frames/seq1/f_"
        count={121}
        width={640}
        height={432}
        scrollLength={2.75}
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">Chapter 01</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
            Every business is a{" "}
            <span className="text-gradient">living network</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Websites, apps, APIs, databases, dashboards. Hundreds of moving
            parts, running around the clock — each one a potential point of
            failure or a chance to grow.
          </p>
        </div>
      </FrameSequence>

      <WhoWeAre />
      <Ecosystem />
      <Services />

      {/* CHAPTER 2 — second scrubbed sequence */}
      <FrameSequence
        prefix="/frames/seq2/f_"
        count={121}
        width={640}
        height={224}
        scrollLength={2.5}
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">Chapter 02</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
            Technology needs{" "}
            <span className="text-gradient">continuous maintenance</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Not once a quarter. Not "when something breaks." Continuously —
            with monitoring, upgrades, and a partner who answers when the
            pager goes off.
          </p>
        </div>
      </FrameSequence>

      <AICompletion />
      <DigitalPresence />
      <Platforms />
      <Partners />
      <WhyMP />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* SECTION PRIMITIVES                                                        */
/* ────────────────────────────────────────────────────────────────────────── */

function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-xs uppercase tracking-[0.4em] text-accent">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {intro}
        </p>
      )}
    </div>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-28 sm:py-36 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* SECTIONS                                                                  */
/* ────────────────────────────────────────────────────────────────────────── */

function WhoWeAre() {
  return (
    <Section id="who">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hairline to-transparent" />
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.1fr]">
        <SectionHeader
          eyebrow="Who we are"
          title={
            <>
              A senior engineering team,
              <br />
              <span className="text-gradient">on standby for your stack.</span>
            </>
          }
          intro="Maintenance Planet is a specialist studio for post-launch software. We take over the parts most teams struggle with — reliability, upgrades, security, cloud costs, and finishing what AI code generators started."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { k: "Founded on", v: "20+ years of production engineering" },
            { k: "Coverage", v: "24 / 7 / 365 across time zones" },
            { k: "Focus", v: "Web, cloud, AI-generated apps" },
            { k: "Promise", v: "Nothing we touch quietly breaks" },
          ].map((c) => (
            <div key={c.k} className="rounded-2xl border border-hairline bg-panel p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.k}</p>
              <p className="mt-2 text-lg font-medium">{c.v}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Ecosystem() {
  const items = [
    { t: "Frontends", d: "React, Next, TanStack, Vue, Svelte, Astro." },
    { t: "Backends", d: "Node, Bun, Deno, Python, Go, Rust services." },
    { t: "Databases", d: "Postgres, MySQL, Redis, Mongo, ClickHouse." },
    { t: "Cloud", d: "AWS, GCP, Azure, Cloudflare, Vercel, Fly, Railway." },
    { t: "AI", d: "OpenAI, Anthropic, Gemini, xAI, open-weights, on-prem." },
    { t: "DevOps", d: "CI/CD, IaC, observability, security, cost tuning." },
  ];
  return (
    <Section id="ecosystem" className="border-t border-hairline">
      <SectionHeader
        eyebrow="Technology ecosystem"
        title={
          <>
            One partner for the{" "}
            <span className="text-gradient">whole stack</span>.
          </>
        }
        intro="We don't force you onto a template. We work fluently across the frameworks, clouds and models your team already uses — and quietly modernise the parts that hold you back."
      />

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <div
            key={it.t}
            className="group relative overflow-hidden rounded-3xl border border-hairline bg-panel p-8 transition-transform hover:-translate-y-1"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.18_235/0.35),transparent_70%)] blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              0{i + 1}
            </p>
            <h3 className="mt-3 text-2xl font-semibold">{it.t}</h3>
            <p className="mt-2 text-muted-foreground">{it.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Services() {
  const items = [
    {
      t: "Maintenance & monitoring",
      d: "Uptime, alerting, backups, security patches, dependency upgrades — handled without a ticket queue.",
    },
    {
      t: "Performance & cost tuning",
      d: "We profile slow endpoints, oversized queries and inflated cloud bills, then quietly reclaim both speed and margin.",
    },
    {
      t: "AI project completion",
      d: "Turning Lovable, Bolt, Cursor and Replit prototypes into production apps with real auth, data and deployments.",
    },
    {
      t: "Cloud migrations",
      d: "Move confidently between AWS, GCP, Azure or edge runtimes — with zero-downtime cutovers and full IaC.",
    },
    {
      t: "Feature delivery",
      d: "Embedded engineering pods that ship features on your roadmap, using your tools, your style, your standards.",
    },
    {
      t: "Security & compliance",
      d: "Hardening, secrets hygiene, SOC 2 / ISO / GDPR readiness — before an auditor forces the conversation.",
    },
  ];
  return (
    <Section id="services" className="border-t border-hairline">
      <SectionHeader
        eyebrow="Our services"
        title={
          <>
            Six disciplines.
            <br />
            <span className="text-gradient">One accountable team.</span>
          </>
        }
      />

      <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <div
            key={it.t}
            className="group relative bg-background p-8 transition-colors hover:bg-surface"
          >
            <span className="text-xs font-mono text-muted-foreground">
              /{String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-xl font-semibold">{it.t}</h3>
            <p className="mt-3 text-muted-foreground">{it.d}</p>
            <div className="mt-6 h-px w-10 bg-gradient-accent transition-all duration-500 group-hover:w-24" />
          </div>
        ))}
      </div>
    </Section>
  );
}

function AICompletion() {
  const missing = [
    "Backend & database",
    "Real authentication",
    "Working APIs",
    "Deployment & hosting",
    "Scalability & caching",
    "Security & secrets",
    "Monitoring & backups",
    "Payments & billing",
  ];
  const builders = [
    "Lovable",
    "Replit",
    "Cursor",
    "Firebase Studio",
    "Bolt",
    "Claude",
    "ChatGPT",
    "v0",
    "Windsurf",
  ];
  return (
    <Section id="ai-completion" className="border-t border-hairline">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.18_235/0.25),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">
            AI project completion
          </p>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            Built something with AI…
            <br />
            <span className="text-gradient">but it isn't finished?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            You have a working prototype. What you need is a production
            application — with the backend, the security, the deployment and
            the reliability that AI builders don't finish on their own.
            That's exactly what we do.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.15fr]">
          <div className="rounded-3xl border border-hairline bg-panel p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Built with
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {builders.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-hairline bg-surface-2 px-4 py-2 text-sm font-medium"
                >
                  {b}
                </span>
              ))}
            </div>
            <p className="mt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              We finish the last mile
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {missing.map((m) => (
                <li key={m} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-accent text-primary-foreground">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                  </span>
                  <span className="text-foreground">{m}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-hairline bg-gradient-to-br from-[oklch(0.20_0.05_240)] to-[oklch(0.10_0.03_260)] p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,oklch(0.86_0.15_200/0.35),transparent_60%)] blur-3xl" />
            <h3 className="text-3xl font-semibold leading-tight sm:text-4xl">
              From <span className="text-gradient">demo</span> to{" "}
              <span className="text-gradient">deployed</span>, in weeks.
            </h3>
            <p className="mt-4 text-muted-foreground">
              We audit your prototype, plan the shortest path to production,
              and stay on to maintain it once it's live. No re-writes for
              their own sake. No lock-in.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                ["1", "Audit", "3–5 days"],
                ["2", "Ship", "2–6 weeks"],
                ["3", "Maintain", "Ongoing"],
              ].map(([n, s, t]) => (
                <div key={s} className="rounded-2xl border border-hairline bg-background/40 p-5">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Step {n}</p>
                  <p className="mt-2 text-xl font-semibold">{s}</p>
                  <p className="text-xs text-muted-foreground">{t}</p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.72_0.18_235)] to-[oklch(0.86_0.15_200)] px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_20px_60px_-15px_oklch(0.78_0.19_220/0.75)] transition-transform hover:scale-[1.03]"
            >
              Complete my AI project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

function DigitalPresence() {
  const cols = [
    { t: "Domains & DNS", d: "Managed records, SSL, email deliverability, migration between registrars." },
    { t: "Content & SEO", d: "Editable content pipelines, structured data, Core Web Vitals, sitemap hygiene." },
    { t: "Analytics", d: "Server-side tracking, first-party pipelines, dashboards your team actually reads." },
    { t: "Brand systems", d: "Design tokens, component libraries, and a website that stays on-brand as it grows." },
  ];
  return (
    <Section id="digital-presence" className="border-t border-hairline">
      <SectionHeader
        eyebrow="Digital presence management"
        title={
          <>
            Your online surface,{" "}
            <span className="text-gradient">quietly perfect</span>.
          </>
        }
        intro="From the domain that points at your app to the analytics that measure it — we own the full digital-presence layer so your marketing and product teams can focus on the story."
      />
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cols.map((c) => (
          <div key={c.t} className="rounded-3xl border border-hairline bg-panel p-8">
            <h3 className="text-xl font-semibold">{c.t}</h3>
            <p className="mt-3 text-muted-foreground">{c.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Platforms() {
  const chunks = [
    ["Shopify", "WooCommerce", "Wix", "Squarespace", "Webflow", "Framer"],
    ["WordPress", "Ghost", "Sanity", "Contentful", "Payload", "Strapi"],
    ["HubSpot", "Zoho", "Salesforce", "Zapier", "Make", "n8n"],
    ["Supabase", "Firebase", "PlanetScale", "Neon", "MongoDB", "Turso"],
  ];
  return (
    <Section id="platforms" className="border-t border-hairline overflow-hidden">
      <SectionHeader
        eyebrow="Featured platforms"
        title={
          <>
            We speak every{" "}
            <span className="text-gradient">platform your business runs on</span>.
          </>
        }
      />
      <div className="mt-14 space-y-4">
        {chunks.map((row, r) => (
          <div key={r} className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <div className="flex shrink-0 gap-4 animate-marquee" style={{ animationDirection: r % 2 ? "reverse" : "normal" }}>
              {[...row, ...row, ...row].map((n, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap rounded-full border border-hairline bg-surface/60 px-6 py-3 text-sm font-medium backdrop-blur"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Partners() {
  return (
    <Section id="partners" className="border-t border-hairline">
      <SectionHeader
        eyebrow="Partner technologies"
        title={
          <>
            Trusted on the same tools{" "}
            <span className="text-gradient">the internet is built on</span>.
          </>
        }
        intro="We stand on production-grade platforms — the same ones powering the world's most demanding products."
      />
      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {[
          "AWS",
          "Google Cloud",
          "Azure",
          "Cloudflare",
          "Vercel",
          "Supabase",
          "Stripe",
          "OpenAI",
          "Anthropic",
          "GitHub",
          "Sentry",
          "Datadog",
        ].map((p) => (
          <div
            key={p}
            className="flex h-24 items-center justify-center rounded-2xl border border-hairline bg-panel text-sm font-semibold tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            {p}
          </div>
        ))}
      </div>
    </Section>
  );
}

function WhyMP() {
  const items = [
    {
      t: "Accountable, always",
      d: "One dedicated pod. Real engineers, real names, real response times. No ticket carousel.",
    },
    {
      t: "Bias for keeping things simple",
      d: "We prefer boring, proven infrastructure over trendy re-writes. Your product should get more interesting, not the stack under it.",
    },
    {
      t: "AI-native, human-owned",
      d: "We use AI aggressively to move faster — and take full responsibility for every line that reaches production.",
    },
    {
      t: "Transparent operations",
      d: "Runbooks, changelogs, and monthly reviews so you always know what's happening in your systems.",
    },
  ];
  return (
    <Section id="why" className="border-t border-hairline">
      <SectionHeader
        eyebrow="Why Maintenance Planet"
        title={
          <>
            Not an agency.
            <br />
            <span className="text-gradient">A permanent extension of your team.</span>
          </>
        }
      />
      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map((it) => (
          <div key={it.t} className="relative overflow-hidden rounded-3xl border border-hairline bg-panel p-8">
            <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.18_235/0.25),transparent_60%)] blur-3xl" />
            <h3 className="text-2xl font-semibold">{it.t}</h3>
            <p className="mt-3 text-muted-foreground">{it.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Process() {
  const steps = [
    { n: "01", t: "Discover", d: "We map your systems, your risks, your goals. One week, structured, no fluff." },
    { n: "02", t: "Stabilise", d: "We fix the fires, patch the leaks, and get monitoring in place. You feel it in week two." },
    { n: "03", t: "Ship", d: "We deliver against your roadmap on a predictable cadence, with visible progress every week." },
    { n: "04", t: "Evolve", d: "As the platform matures, we advise, refactor and modernise — keeping you ahead of the curve." },
  ];
  return (
    <Section id="process" className="border-t border-hairline">
      <SectionHeader
        eyebrow="Our process"
        title={
          <>
            A rhythm you can plan around,{" "}
            <span className="text-gradient">forever</span>.
          </>
        }
      />
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div
            key={s.n}
            className="relative rounded-3xl border border-hairline bg-panel p-8"
          >
            <div className="flex items-baseline justify-between">
              <span className="text-4xl font-semibold text-gradient">{s.n}</span>
              {i < steps.length - 1 && (
                <svg className="hidden text-muted-foreground lg:block" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              )}
            </div>
            <h3 className="mt-4 text-xl font-semibold">{s.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" className="border-t border-hairline">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeader
            eyebrow="Contact"
            title={
              <>
                Let's make your platform{" "}
                <span className="text-gradient">boring in the best way</span>.
              </>
            }
            intro="Tell us what you're building, what's broken, or what an AI builder didn't finish. We'll reply with a plan — not a sales deck."
          />
          <dl className="mt-10 space-y-4 text-sm">
            <div className="flex items-start gap-4 rounded-2xl border border-hairline bg-panel p-5">
              <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-full bg-gradient-accent text-primary-foreground">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/></svg>
              </span>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</dt>
                <dd className="mt-1 text-base">hello@maintenanceplanet.com</dd>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-hairline bg-panel p-5">
              <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-full bg-gradient-accent text-primary-foreground">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              </span>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Response time</dt>
                <dd className="mt-1 text-base">Within 1 business day, 24/7 on active incidents.</dd>
              </div>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-hairline">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-24 bg-gradient-to-b from-transparent to-ink" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-md">
            <p className="text-2xl font-semibold">
              <span className="text-gradient">Maintenance Planet</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Your true tech partner. Repair, upgrade, evolve — 24/7 engineering
              for a world that never logs off.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {[
              { t: "Company", l: ["Who we are", "Services", "Process"] },
              { t: "Solutions", l: ["AI project completion", "Digital presence", "Cloud migrations"] },
              { t: "Contact", l: ["hello@maintenanceplanet.com", "24/7 support"] },
            ].map((c) => (
              <div key={c.t}>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {c.t}
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {c.l.map((x) => (
                    <li key={x} className="text-foreground/80 hover:text-foreground">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Maintenance Planet. All rights reserved.</p>
          <p className="uppercase tracking-[0.3em]">Repair · Upgrade · Evolve</p>
        </div>
      </div>
    </footer>
  );
}
