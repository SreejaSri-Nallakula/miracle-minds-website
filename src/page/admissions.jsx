import { Phone } from "lucide-react";

const steps = [
  { n: 1, title: "Fill Inquiry Form",         desc: "Submit a quick online or in-person inquiry to begin your child's admission journey." },
  { n: 2, title: "Submit Required Documents", desc: "Provide the documents listed below at the school office or via email." },
  { n: 3, title: "Receive Confirmation",      desc: "Our team will review your application and confirm your child's admission." },
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
    <div className="min-h-screen bg-[#f4f5f8]">

      {/* ── Hero ── */}
      <section className="relative bg-[#0f2557] text-white overflow-hidden
                          px-5 pt-10 pb-9
                          sm:px-10 sm:pt-14 sm:pb-12
                          md:px-14 md:pt-18 md:pb-16
                          lg:px-20 lg:pt-20 lg:pb-20">
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,white 0,white 1px,transparent 1px,transparent 12px)" }}
        />
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
            Join the Miracle Minds Family
          </h1>
          <p className="text-blue-100 font-light
                         text-[13px] leading-[1.75]
                         sm:text-[15px] sm:leading-relaxed sm:max-w-lg
                         md:text-base md:max-w-xl">
            A simple, transparent admissions process designed with families in mind.
          </p>
          <div className="mt-6 sm:mt-8 flex items-center gap-3">
            <div className="bg-[#c55a3f] rounded-full w-10 h-[3px] sm:w-12 sm:h-1" />
            <a
              href="tel:9849140520"
              className="inline-flex items-center gap-2 rounded-full font-medium
                          bg-white/10 border border-white/20 text-white
                          hover:bg-white/20 transition-colors
                          px-4 py-1.5 text-[12px]
                          sm:px-5 sm:py-2 sm:text-[13px]"
            >
              <Phone className="w-3.5 h-3.5 text-[#c55a3f] sm:w-4 sm:h-4" />
              9849140520
            </a>
          </div>
        </div>
      </section>

      {/* ══ ADMISSION PROCESS ══
          Mobile  : vertical left-dashed-line timeline
          Tablet+ : horizontal stepper with dashed connector, ghost numbers
      */}
      <section className="max-w-5xl mx-auto
                           px-5 pt-8 pb-6
                           sm:px-10 sm:pt-12 sm:pb-8
                           md:px-14 md:pt-14 md:pb-10
                           lg:px-20">

        <p className="uppercase font-semibold text-[#c55a3f] mb-1
                       text-[9px] tracking-[3px] sm:text-[10.5px]">
          How it works
        </p>
        <h2 className="font-serif font-bold text-[#0f2557] mb-8
                        text-[22px] sm:text-2xl sm:mb-10 md:text-3xl md:mb-12">
          Admission Process
        </h2>

        {/* ── MOBILE vertical timeline ── */}
        <div className="relative flex flex-col gap-0 pl-5
                         border-l-2 border-dashed border-[#c55a3f]
                         sm:hidden">
          {steps.map((s) => (
            <div key={s.n} className="relative flex items-start gap-4 pb-8 last:pb-0">
              {/* badge sits on the dashed line */}
              <div className="absolute -left-[21px] w-8 h-8 rounded-full
                               bg-[#0f2557] text-white border-2 border-white
                               ring-2 ring-[#0f2557]
                               flex items-center justify-center
                               font-serif font-bold text-[13px] shrink-0">
                {s.n}
              </div>
              <div className="pl-4">
                <h3 className="font-semibold text-[#0f2557] text-[13.5px] mb-1">
                  {s.title}
                </h3>
                <p className="text-[#6b7080] text-[12px] leading-[1.65]">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── TABLET / DESKTOP horizontal stepper ── */}
        <div className="hidden sm:flex items-start">
          {steps.map((s, i) => (
            <>
              {/* Step */}
              <div key={s.n} className="relative flex flex-col items-center text-center
                                         w-[120px] md:w-[160px] lg:w-[180px] shrink-0">
                {/* Ghost big number behind badge */}
                <span className="absolute -top-5 left-1/2 -translate-x-1/2
                                  font-serif font-black text-[#f0f2f8] leading-none select-none
                                  text-[60px] md:text-[80px] lg:text-[90px]">
                  {s.n}
                </span>
                {/* Badge */}
                <div className="relative z-10
                                 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14
                                 rounded-full bg-[#0f2557] text-white
                                 border-[3px] border-white ring-2 ring-[#0f2557]
                                 flex items-center justify-center
                                 font-serif font-bold
                                 text-[16px] md:text-[19px] lg:text-[22px]">
                  {s.n}
                </div>
                <h3 className="font-semibold text-[#0f2557] mt-3 mb-1.5
                                text-[12.5px] md:text-[13.5px] lg:text-[14.5px]">
                  {s.title}
                </h3>
                <p className="text-[#6b7080] leading-[1.6]
                               text-[11px] md:text-[12px] lg:text-[12.5px]">
                  {s.desc}
                </p>
              </div>

              {/* Dashed connector (not after last step) */}
              {i < steps.length - 1 && (
                <div key={`line-${i}`}
                  className="flex-1 mt-5 md:mt-6 lg:mt-7 h-[2px]"
                  style={{
                    background: "repeating-linear-gradient(90deg,#c55a3f 0,#c55a3f 6px,transparent 6px,transparent 14px)"
                  }} />
              )}
            </>
          ))}
        </div>
      </section>


      {/* ══ REQUIRED DOCUMENTS ══
          Two-tone card: dark navy label panel on the left, numbered list on the right.
      */}
      <section className="max-w-5xl mx-auto
                           px-5 pb-6
                           sm:px-10 sm:pb-8
                           md:px-14 md:pb-10
                           lg:px-20">

        <div className="flex overflow-hidden rounded-xl border border-[#dde1ef]">

          {/* Left dark panel */}
          <div className="bg-[#0f2557] text-white flex flex-col justify-center
                           px-4 py-5 w-[90px] shrink-0
                           sm:px-5 sm:py-6 sm:w-[120px]
                           md:px-6 md:w-[148px]">
            <Phone className="text-[#c55a3f] mb-3 w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            <p className="font-serif font-semibold text-white leading-snug
                           text-[12px] sm:text-[14px] md:text-[15px]">
              Required Documents
            </p>
            <p className="text-[#8fa3c8] mt-1 leading-snug
                           text-[10px] sm:text-[11px]">
              Bring originals & copies
            </p>
          </div>

          {/* Right list */}
          <div className="bg-[#f7f8fc] flex-1 divide-y divide-[#e8eaef]">
            {docs.map((d, i) => (
              <div key={d} className="flex items-center gap-3
                                       px-4 py-2.5
                                       sm:px-5 sm:py-3
                                       md:px-6 md:py-3.5">
                <span className="font-serif font-bold text-[#c55a3f] shrink-0
                                  text-[11px] w-5
                                  sm:text-[12px] sm:w-6
                                  md:text-[13px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[#2a2a3a]
                                  text-[12px] sm:text-[13px] md:text-[13.5px]">
                  {d}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Eligibility ── */}
      <section className="max-w-5xl mx-auto
                           px-4 pt-4 pb-4
                           sm:px-8 sm:pt-5 sm:pb-5
                           md:px-12 md:pt-6 md:pb-6
                           lg:px-6">
        <div className="bg-white rounded-xl overflow-hidden flex">
          <div className="w-1 sm:w-1.5 bg-[#c55a3f] shrink-0" />
          <div className="flex-1 p-5 sm:p-6 md:p-7">
            <div className="rounded-lg bg-red-50 flex items-center justify-center mb-4
                             w-9 h-9 sm:w-10 sm:h-10">
              {/* graduation cap icon */}
              <svg className="text-[#c55a3f] w-[18px] h-[18px] sm:w-5 sm:h-5"
                   fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 3L2 8l10 5 10-5-10-5zM2 8v6M22 8v6M6 10.5v5a6 6 0 0012 0v-5" />
              </svg>
            </div>
            <h3 className="font-serif font-semibold text-[#0f2557] mb-2
                            text-[17px] sm:text-[18px] md:text-xl">
              Eligibility & Age Groups
            </h3>
            <p className="text-[#555568] leading-[1.75]
                           text-[13px] sm:text-sm sm:leading-relaxed">
              We welcome students from{" "}
              <strong className="text-[#0f2557] font-semibold">Nursery (age 3+)</strong>{" "}
              through{" "}
              <strong className="text-[#0f2557] font-semibold">Class 5 (age 10–11)</strong>.
              Age criteria are calculated as of June 1 of the admission year.
              Please contact our office for specific class eligibility.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-5xl mx-auto
                           px-4 pt-4 pb-10
                           sm:px-8 sm:pt-5 sm:pb-12
                           md:px-12 md:pt-6 md:pb-16
                           lg:px-6">
        <div className="relative bg-[#0f2557] rounded-xl overflow-hidden
                         px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">

          {/* Decorative circles */}
          <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full
                           bg-[#c55a3f]/15 pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full
                           bg-white/[0.03] pointer-events-none" />
          {/* Diagonal grid */}
          <div className="absolute inset-0 pointer-events-none opacity-5"
               style={{ backgroundImage: "repeating-linear-gradient(45deg,white 0,white 1px,transparent 1px,transparent 12px)" }} />

          <div className="relative z-10">
            <p className="flex items-center gap-2 uppercase font-medium text-blue-200 mb-3
                           text-[10px] tracking-[2.5px] sm:text-[11px]">
              <span className="block h-[1.5px] bg-[#c55a3f] shrink-0 w-5 sm:w-7" />
              Ready to enroll?
            </p>
            <h3 className="font-serif font-bold text-white mb-2
                            text-[22px] sm:text-[26px] md:text-[30px]">
              Speak with Our Admissions Team
            </h3>
            <p className="text-[#8fa3c8] mb-6 text-[13px] sm:text-[14px]">
              We're happy to guide you through every step of the process.
            </p>
            <a
              href="tel:9849140520"
              className="inline-flex items-center gap-2 rounded-full
                          bg-[#c55a3f] hover:bg-[#a8472e] text-white font-semibold
                          transition-colors
                          px-5 py-2.5 text-[13px] sm:px-6 sm:py-3 sm:text-[14px]"
            >
              <Phone className="w-4 h-4" />
              Call Now: 9849140520
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}