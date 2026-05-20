import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { MapPin, Phone, Mail } from "lucide-react";
import { PageHero } from "../components/PageHero";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone").max(20),
  message: z.string().trim().min(1, "Please enter a message").max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <>
      <PageHero title="Get in Touch" subtitle="We'd love to hear from you. Reach out with any questions about admissions or school life." />

      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10">
        {/* Left: contact info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold mb-1">School Address</h4>
              <p className="text-ink/70 leading-relaxed">Miracle Minds – The School of Excellence<br />Andhra Pradesh, India</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold mb-1">Phone</h4>
              <p className="text-ink/70"><a href="tel:9849140520" className="hover:text-brand-red">9849140520</a> / <a href="tel:9063614513" className="hover:text-brand-red">9063614513</a></p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold mb-1">Email</h4>
              <p className="text-ink/70">info@miracleminds.school</p>
            </div>
          </div>

          <div className="aspect-video rounded-2xl overflow-hidden shadow-card border border-border bg-bg-light flex items-center justify-center text-ink/50">
            <iframe
              title="Map"
              loading="lazy"
              className="w-full h-full"
              src="https://www.google.com/maps?q=Andhra+Pradesh&output=embed"
            />
          </div>
        </div>

        {/* Right: form */}
        <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-card p-6 md:p-8 border border-border">
          <h3 className="text-2xl font-bold mb-1">Send us a message</h3>
          <p className="text-ink/60 text-sm mb-6">We'll get back to you within one working day.</p>

          {sent && (
            <div className="mb-4 rounded-lg bg-green-50 text-green-700 border border-green-200 p-3 text-sm">
              Thank you! Your message has been sent.
            </div>
          )}

          <Field label="Name" error={errors.name}>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
              className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none"
              placeholder="Your full name"
            />
          </Field>
          <Field label="Phone" error={errors.phone}>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              maxLength={20}
              className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none"
              placeholder="10-digit mobile"
            />
          </Field>
          <Field label="Message" error={errors.message}>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1000}
              rows={5}
              className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none resize-none"
              placeholder="How can we help you?"
            />
          </Field>

          <button
            type="submit"
            className="w-full mt-2 inline-flex justify-center items-center rounded-full bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-6 py-3 shadow-card transition-colors"
          >
            Send Message
          </button>
        </form>
      </section>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-ink mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-brand-red">{error}</p>}
    </div>
  );
}
