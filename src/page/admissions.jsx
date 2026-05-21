import { Check, Phone } from "lucide-react";
import { PageHero } from "../components/PageHero";

const steps = [
  { n: 1, title: "Fill Inquiry Form", desc: "Submit a quick online or in-person inquiry to begin your child's admission journey." },
  { n: 2, title: "Submit Required Documents", desc: "Provide the documents listed below at the school office or via email." },
  { n: 3, title: "Receive Confirmation", desc: "Our team will review your application and confirm your child's admission." },
];

const docs = [
  "Birth Certificate (copy)",
  "Previous school report card (if applicable)",
  "Transfer Certificate (for transfers)",
  "Passport-size photographs (4)",
  "Parent ID proof",
  "Address proof",
];

export function AdmissionsPage() {
  return (
    <>
      <PageHero title="Join the Miracle Minds Family" subtitle="A simple, transparent admissions process designed with families in mind." />

      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Our Admission Process</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.n} className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-red text-white font-extrabold text-2xl mx-auto flex items-center justify-center shadow-card">
                {s.n}
              </div>
              <h3 className="mt-5 font-bold text-lg">{s.title}</h3>
              <p className="mt-2 text-ink/70 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-bg-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-6">Required Documents</h3>
          <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
            <ul className="grid sm:grid-cols-2 gap-3">
              {docs.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="mt-0.5 w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="text-ink/80">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-brand-blue/5 border border-brand-blue/20 p-6 md:p-8">
          <h3 className="text-xl font-bold text-brand-blue mb-2">Eligibility & Age Groups</h3>
          <p className="text-ink/80 leading-relaxed">
            We welcome students from <strong>Nursery (age 3+)</strong> through <strong>Class 5 (age 10–11)</strong>. Age criteria are calculated as of June 1 of the admission year. Please contact our office for specific class eligibility.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-brand-red text-white p-8 md:p-12 text-center shadow-card">
            <h3 className="text-3xl md:text-4xl font-extrabold mb-3">Ready to Enroll?</h3>
            <p className="text-white/90 mb-6 text-lg">Speak with our admissions team today.</p>
            <a href="tel:9849140520" className="inline-flex items-center gap-2 rounded-full bg-white text-brand-red font-bold px-6 py-3 hover:bg-bg-light transition-colors">
              <Phone className="w-5 h-5" /> Call Now: 9849140520
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
