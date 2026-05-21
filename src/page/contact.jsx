import { useState } from "react";
import { z } from "zod";
import { MapPin, Phone, Mail } from "lucide-react";

const schema = z.object({
  name:    z.string().trim().min(1, "Please enter your name").max(100),
  phone:   z.string().trim().min(7, "Please enter a valid phone").max(20),
  message: z.string().trim().min(1, "Please enter a message").max(1000),
});

/* ─────────────────────────────────────────────
   CHANGE THIS PATH to any image in /public
   e.g. "/images/school-building.jpg"
───────────────────────────────────────────── */
const HERO_IMAGE = "/images/contact-hero.jpg";

export function ContactPage() {
  const [form, setForm]     = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent]     = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs = {};
      r.error.issues.forEach((i) => { errs[i.path[0]] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#f4f5f8]">

      {/* ── Hero with background image ── */}
      <section className="relative bg-[#0f2557] text-white overflow-hidden
                          min-h-[220px] sm:min-h-[260px] md:min-h-[300px]
                          px-5 pt-10 pb-9
                          sm:px-10 sm:pt-14 sm:pb-12
                          md:px-14 md:pt-18 md:pb-16
                          lg:px-20 lg:pt-20 lg:pb-20">

        {/* School building photo — change HERO_IMAGE at the top of the file */}
        <img
          src={HERO_IMAGE}
          alt="Miracle Minds School"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-20"
        />

        {/* diagonal grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,white 0,white 1px,transparent 1px,transparent 12px)" }}
        />

        {/* dark gradient so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2557]/90 via-[#0f2557]/60 to-transparent" />

        <div className="relative max-w-5xl mx-auto">
          <p className="flex items-center gap-2 uppercase font-medium text-blue-200 mb-4
                         text-[10px] tracking-[2.5px]
                         sm:text-[11px] sm:tracking-[3px] sm:mb-5">
            <span className="block h-[1.5px] bg-[#c55a3f] shrink-0 w-6 sm:w-8" />
            Miracle Minds Primary School
          </p>
          <h1 className="font-serif font-bold leading-snug mb-3
                          text-[28px]
                          sm:text-4xl sm:leading-tight sm:mb-4
                          md:text-5xl md:mb-5">
            Contact Us
          </h1>
          <p className="text-blue-100 font-light
                         text-[13px] leading-[1.75]
                         sm:text-[15px] sm:leading-relaxed sm:max-w-lg
                         md:text-base md:max-w-xl">
            We're here to help. Reach out with any questions about admissions,
            school life, or anything else on your mind.
          </p>
          <div className="bg-[#c55a3f] rounded-full mt-6 sm:mt-8
                           w-10 h-[3px] sm:w-12 sm:h-1" />
        </div>
      </section>

      {/* ── Two-column body ── */}
      <section className="max-w-5xl mx-auto
                           px-4 pt-8 pb-14
                           sm:px-8 sm:pt-12 sm:pb-20
                           md:px-12 md:pt-14
                           lg:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">

          {/* ── Left: Contact Info + Map ── */}
          <div className="flex flex-col gap-5">

            {/* Info card */}
            <div className="bg-white rounded-xl p-5 sm:p-6 md:p-7">
              <p className="uppercase font-medium text-[#c55a3f] mb-1
                             text-[10px] tracking-[2.5px] sm:text-[11px]">
                Reach us
              </p>
              <h2 className="font-serif font-bold text-[#0f2557] mb-5
                              text-[18px] sm:text-xl md:text-2xl">
                Contact Information
              </h2>

              <div className="flex flex-col gap-5">

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-red-50 flex items-center justify-center shrink-0
                                   w-9 h-9 sm:w-10 sm:h-10">
                    <MapPin className="text-[#c55a3f] w-[18px] h-[18px] sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-[#0f2557] mb-0.5
                                   text-[13px] sm:text-sm">School Address</p>
                    <p className="text-[#6b6b80] leading-[1.65] text-[12.5px] sm:text-[13px]">
                      Miracle Minds – The School of Excellence<br />
                      Andhra Pradesh, India
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-blue-50 flex items-center justify-center shrink-0
                                   w-9 h-9 sm:w-10 sm:h-10">
                    <Phone className="text-[#0f2557] w-[18px] h-[18px] sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-[#0f2557] mb-0.5
                                   text-[13px] sm:text-sm">Phone</p>
                    <p className="text-[#6b6b80] text-[12.5px] sm:text-[13px]">
                      <a href="tel:9849140520"
                         className="hover:text-[#c55a3f] transition-colors">
                        9849140520
                      </a>
                      {" / "}
                      <a href="tel:9063614513"
                         className="hover:text-[#c55a3f] transition-colors">
                        9063614513
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-red-50 flex items-center justify-center shrink-0
                                   w-9 h-9 sm:w-10 sm:h-10">
                    <Mail className="text-[#c55a3f] w-[18px] h-[18px] sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-[#0f2557] mb-0.5
                                   text-[13px] sm:text-sm">Email</p>
                    <p className="text-[#6b6b80] text-[12.5px] sm:text-[13px]">
                      <a href="mailto:info@miracleminds.school"
                         className="hover:text-[#c55a3f] transition-colors">
                        info@miracleminds.school
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-blue-50 flex items-center justify-center shrink-0
                                   w-9 h-9 sm:w-10 sm:h-10">
                    <svg className="text-[#0f2557] w-[18px] h-[18px] sm:w-5 sm:h-5"
                         fill="none" stroke="currentColor" strokeWidth="1.75"
                         viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" d="M12 7v5l3 3" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[#0f2557] mb-0.5
                                   text-[13px] sm:text-sm">School Hours</p>
                    <p className="text-[#6b6b80] text-[12.5px] sm:text-[13px]">
                      Monday – Friday: 7:30 AM – 4:00 PM
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl overflow-hidden
                             h-[200px] sm:h-[220px] md:h-[240px]">
              <iframe
                title="School location map"
                loading="lazy"
                className="w-full h-full border-0"
                src="https://www.google.com/maps?q=Andhra+Pradesh,India&output=embed"
              />
            </div>

          </div>

          {/* ── Right: Contact Form ── */}
          <div className="bg-white rounded-xl p-5 sm:p-6 md:p-7">
            <p className="uppercase font-medium text-[#c55a3f] mb-1
                           text-[10px] tracking-[2.5px] sm:text-[11px]">
              Write to us
            </p>
            <h2 className="font-serif font-bold text-[#0f2557] mb-1
                            text-[18px] sm:text-xl md:text-2xl">
              Send Us a Message
            </h2>
            <p className="text-[#6b6b80] text-[12.5px] sm:text-[13px] mb-5">
              We'll get back to you within one working day.
            </p>

            {sent && (
              <div className="mb-5 rounded-lg bg-green-50 border border-green-200
                               text-green-700 px-4 py-3 text-[13px]">
                ✓ Thank you! Your message has been sent.
              </div>
            )}

            <form onSubmit={onSubmit} className="flex flex-col gap-4">

              <Field label="Full Name" error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  maxLength={100}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200
                             text-[13.5px] text-[#1a1a2e] placeholder:text-[#aaa]
                             focus:outline-none focus:border-[#0f2557]
                             focus:ring-2 focus:ring-[#0f2557]/10 transition"
                />
              </Field>

              <Field label="Phone Number" error={errors.phone}>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  maxLength={20}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200
                             text-[13.5px] text-[#1a1a2e] placeholder:text-[#aaa]
                             focus:outline-none focus:border-[#0f2557]
                             focus:ring-2 focus:ring-[#0f2557]/10 transition"
                />
              </Field>

              <Field label="Message" error={errors.message}>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  maxLength={1000}
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200
                             text-[13.5px] text-[#1a1a2e] placeholder:text-[#aaa]
                             focus:outline-none focus:border-[#0f2557]
                             focus:ring-2 focus:ring-[#0f2557]/10 transition resize-none"
                />
              </Field>

              <button
                type="submit"
                className="w-full mt-1 py-3 rounded-full
                           bg-[#c55a3f] hover:bg-[#a8472e] active:scale-[0.98]
                           text-white font-semibold text-[13.5px] sm:text-sm
                           transition-all duration-200"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </section>

    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-[12.5px] sm:text-[13px] font-medium
                         text-[#0f2557] mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-[11.5px] text-[#c55a3f]">{error}</p>
      )}
    </div>
  );
}