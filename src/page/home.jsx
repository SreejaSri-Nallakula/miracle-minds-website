import { Link } from "react-router-dom";
import { GraduationCap, ShieldCheck, Users, Palette, ArrowRight } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";

const highlights = [
  { icon: GraduationCap, title: "Quality Education", desc: "A strong academic foundation built on modern teaching methods." },
  { icon: ShieldCheck, title: "Safe Environment", desc: "A secure, caring campus where every child feels at home." },
  { icon: Users, title: "Experienced Teachers", desc: "Dedicated educators passionate about every child's growth." },
  { icon: Palette, title: "Fun & Creative Activities", desc: "Art, music, sports and more — learning beyond textbooks." },
];

const updates = [
  { date: "May 28, 2025", msg: "Annual Day celebrations scheduled for June 5, 2025." },
  { date: "May 20, 2025", msg: "Summer holidays begin from June 10. School reopens on July 1." },
  { date: "May 12, 2025", msg: "Admissions open for the 2025–26 academic year. Apply early!" },
];

export function HomePage() {
  return (
    <>
      <section className="bg-brand-gradient text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 25%, white 1.5px, transparent 1.5px), radial-gradient(circle at 85% 75%, white 1px, transparent 1px)",
            backgroundSize: "50px 50px, 30px 30px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-up">
            <span className="inline-block bg-white/15 backdrop-blur px-3 py-1 rounded-full text-sm font-medium mb-5">Admissions Open 2025</span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Welcome to Miracle Minds</h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">The School of Excellence — Building Bright Futures</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/admissions" className="inline-flex items-center gap-2 rounded-full bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-6 py-3 shadow-card transition-colors">
                Explore Admissions <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-white text-white font-semibold px-6 py-3 hover:bg-white hover:text-brand-blue transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center animate-fade-up">
            <SchoolIllustration />
          </div>
        </div>
      </section>

      <section className="py-16 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((h) => (
            <div key={h.title} className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all border-t-4 border-brand-red">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">
                <h.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">{h.title}</h3>
              <p className="text-sm text-ink/70 leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <SectionHeading eyebrow="About Us" title="Where Every Child Shines" />
            <p className="mt-5 text-ink/75 leading-relaxed">
              At Miracle Minds, we believe every child carries a spark of brilliance. Our holistic approach blends academic excellence with creativity, character, and curiosity — giving young learners the foundation to dream big and achieve more.
            </p>
            <Link to="/about" className="inline-flex items-center gap-1 mt-5 text-brand-red font-semibold hover:gap-2 transition-all">
              Learn More About Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex justify-center">
            <SchoolIllustration />
          </div>
        </div>
      </section>

      <section className="py-16 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Latest Updates" />
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {updates.map((u, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-card border-l-4 border-brand-blue hover:shadow-card-hover transition-shadow">
                <p className="text-xs uppercase tracking-wider font-semibold text-brand-blue">{u.date}</p>
                <p className="mt-2 text-ink leading-relaxed">{u.msg}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Glimpses of School Life" />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-card group">
                <div className="w-full h-full bg-brand-gradient flex items-center justify-center text-white font-semibold text-sm group-hover:scale-110 transition-transform duration-500">
                  Photo {i}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/gallery" className="inline-flex items-center gap-2 rounded-full bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold px-6 py-3 shadow-card transition-colors">
              View Full Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function SchoolIllustration() {
  return (
    <svg viewBox="0 0 320 240" className="w-full max-w-md drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="80" width="240" height="130" rx="10" fill="#fff" />
      <polygon points="40,80 160,20 280,80" fill="#E8272A" />
      <rect x="140" y="120" width="40" height="90" fill="#1A5BA8" />
      <rect x="65" y="120" width="50" height="40" fill="#1A5BA8" rx="3" />
      <rect x="205" y="120" width="50" height="40" fill="#1A5BA8" rx="3" />
      <rect x="65" y="170" width="50" height="40" fill="#1A5BA8" rx="3" />
      <rect x="205" y="170" width="50" height="40" fill="#1A5BA8" rx="3" />
      <circle cx="160" cy="55" r="8" fill="#fff" />
      <polygon points="160,45 162,52 169,52 163,57 166,64 160,60 154,64 157,57 151,52 158,52" fill="#FFD54A" />
      <rect x="155" y="195" width="10" height="15" fill="#fff" />
    </svg>
  );
}
