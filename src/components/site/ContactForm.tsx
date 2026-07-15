import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { submitContact } from "@/lib/contact.functions";

export function ContactForm() {
  const submit = useServerFn(submitContact);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [ok, setOk] = useState(false);

  const mutation = useMutation({
    mutationFn: () =>
      submit({
        data: {
          name: form.name,
          email: form.email,
          company: form.company || null,
          message: form.message,
          source: "site-contact",
        },
      }),
    onSuccess: () => {
      setOk(true);
      setForm({ name: "", email: "", company: "", message: "" });
    },
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  if (ok) {
    return (
      <div className="rounded-3xl border border-hairline bg-panel p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.72_0.18_235)] to-[oklch(0.86_0.15_200)] text-primary-foreground">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
        </div>
        <h3 className="mt-6 text-2xl font-semibold">Signal received.</h3>
        <p className="mt-2 text-muted-foreground">
          A senior engineer will reply within one business day.
        </p>
        <button
          onClick={() => setOk(false)}
          className="mt-6 text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!mutation.isPending) mutation.mutate();
      }}
      className="rounded-3xl border border-hairline bg-panel p-6 sm:p-10"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name" required>
          <input
            required
            value={form.name}
            onChange={set("name")}
            maxLength={120}
            className="field"
            placeholder="Ada Lovelace"
          />
        </Field>
        <Field label="Email" required>
          <input
            required
            type="email"
            value={form.email}
            onChange={set("email")}
            maxLength={255}
            className="field"
            placeholder="you@company.com"
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Company">
            <input
              value={form.company}
              onChange={set("company")}
              maxLength={200}
              className="field"
              placeholder="Optional"
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="What can we help you with?" required>
            <textarea
              required
              value={form.message}
              onChange={set("message")}
              minLength={10}
              maxLength={4000}
              rows={5}
              className="field resize-none"
              placeholder="Tell us about your project, stack, or the AI-built prototype you'd like to ship."
            />
          </Field>
        </div>
      </div>

      {mutation.isError && (
        <p className="mt-4 text-sm text-destructive">
          {(mutation.error as Error)?.message ?? "Something went wrong."}
        </p>
      )}

      <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          We reply within one business day. No spam, ever.
        </p>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.72_0.18_235)] to-[oklch(0.86_0.15_200)] px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_20px_60px_-15px_oklch(0.78_0.19_220/0.75)] transition-transform hover:scale-[1.03] disabled:opacity-60"
        >
          {mutation.isPending ? "Transmitting…" : "Send message"}
          <svg className="transition-transform group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </button>
      </div>

      <style>{`
        .field {
          width: 100%;
          background: oklch(0.10 0.025 250 / 0.6);
          border: 1px solid var(--color-hairline);
          border-radius: 0.85rem;
          padding: 0.85rem 1rem;
          color: var(--foreground);
          font-size: 0.95rem;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }
        .field::placeholder { color: oklch(0.55 0.02 245); }
        .field:focus {
          outline: none;
          border-color: oklch(0.78 0.16 220 / 0.6);
          box-shadow: 0 0 0 4px oklch(0.78 0.16 220 / 0.15);
          background: oklch(0.12 0.025 250 / 0.9);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}
