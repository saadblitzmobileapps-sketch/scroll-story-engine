import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { LoadingScreen } from "@/components/site/LoadingScreen";
import { OrbitJourney } from "@/components/site/OrbitJourney";
import { AgileProcess } from "@/components/site/AgileProcess";
import { ContactForm } from "@/components/site/ContactForm";
import logoAsset from "@/assets/logo.gif.asset.json";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <LoadingScreen />
      <main className="relative overflow-clip">
        <Nav />
        <Hero />
        <OrbitJourney />
        <AgileProcess />
        <Partners />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

function Partners() {
  const partners = [
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
    "Shopify",
    "HubSpot",
    "Meta",
    "Google Ads",
  ];
  return (
    <section id="partners" className="relative border-t border-hairline py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">Partners</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            Standing on the shoulders of{" "}
            <span className="text-gradient">production-grade platforms</span>.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            We're certified, integrated and battle-tested on the platforms
            powering the internet — so your stack stays in good company.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {partners.map((p) => (
            <div
              key={p}
              className="group relative flex h-24 items-center justify-center overflow-hidden rounded-2xl border border-hairline bg-panel text-sm font-semibold tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.18_235/0.35),transparent_70%)] blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative border-t border-hairline py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Contact</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              Tell us what you're building —{" "}
              <span className="text-gradient">we'll reply with a plan.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Websites, mobile apps, digital marketing, AI rescues or ongoing
              maintenance. One form, one team, one accountable partner.
            </p>
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
                  <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Response</dt>
                  <dd className="mt-1 text-base">Within 1 business day · 24/7 on incidents</dd>
                </div>
              </div>
            </dl>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
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
              Your true tech partner. Repair · Upgrade · Evolve — 24/7
              engineering for a world that never logs off.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {[
              { t: "Company", l: ["Services", "Process", "Partners"] },
              { t: "Solutions", l: ["Websites", "Mobile apps", "AI rescue"] },
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
