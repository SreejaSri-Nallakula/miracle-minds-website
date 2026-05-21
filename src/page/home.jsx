import { Link } from "react-router-dom";
import { GraduationCap, ShieldCheck, Users, Palette, ArrowRight, Star, BookOpen, Award, ChevronLeft, ChevronRight, Images, ClipboardList, CheckCircle, FileText, UserCheck, CalendarCheck } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import CircularGallery from "../components/CircularGallery";

const heroGalleryItems = Object.entries(
  import.meta.glob("../assets/gallery/*.{png,jpg,jpeg,webp,svg}", {
    eager: true,
    import: "default",
  })
)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .slice(0, 8)
  .map(([path, image], index) => ({
    image,
    text: `Gallery ${index + 1}`,
    path,
  }));

/* ── Data ───────────────────────────────────────────────── */
const highlights = [
  { 
    icon: GraduationCap, 
    title: "Quality Education", 
    desc: "Strong basics with modern teaching that builds thinking and curiosity." 
  },
  { 
    icon: ShieldCheck, 
    title: "Safe Environment", 
    desc: "A safe and caring space where every child feels comfortable and confident." 
  },
  { 
    icon: Users, 
    title: "Experienced Teachers", 
    desc: "Supportive teachers who guide every child with care and attention." 
  },
  { 
    icon: Palette, 
    title: "Fun & Creative Activities", 
    desc: "Art, music, sports, and activities that make learning enjoyable." 
  },
];

const updates = [
  { date: "May 28, 2026", msg: "Annual Day celebrations scheduled for June 5, 2026.", icon: Star },
  { date: "May 20, 2026", msg: "Summer holidays begin from June 10. School reopens on July 1.", icon: BookOpen },
  { date: "May 12, 2026", msg: "Admissions open for the 2026–27 academic year. Apply early!", icon: Award },
];



const admissionSteps = [
  {
    icon: FileText,
    step: "Step 1",
    title: "Fill Application Form",
    desc: " Fill out the online application form with your child’s details, previous school information, and parent or guardian details.",
    color: "#1A5BA8",
  },
  {
    icon: CalendarCheck,
    step: "Step 2",
    title: "Schedule Assessment",
    desc: "Book a suitable time for your child’s assessment. Our team will guide you through the process.",
    color: "#E8272A",
  },
  {
    icon: UserCheck,
    step: "Step 3",
    title: "Interview & Visit",
    desc: "Attend a friendly interaction session and take a guided tour of the campus to see Miracle Minds in person.",
    color: "#1A5BA8",
  },
  {
    icon: CheckCircle,
    step: "Step 4",
    title: "Confirmation & Joining",
    desc: "Receive your admission offer, complete fee payment, and collect the welcome kit. Your child's journey begins here!",
    color: "#E8272A",
  },
];

const galleryItems = [
  { label: "Annual Sports Day", category: "Sports", bg: "linear-gradient(135deg, #1A5BA8, #0d3d76)", emoji: "🏆" },
  { label: "Art Exhibition", category: "Creative Arts", bg: "linear-gradient(135deg, #E8272A, #b51e1f)", emoji: "🎨" },
  { label: "Science Fair", category: "STEM", bg: "linear-gradient(135deg, #0d3d76, #1A5BA8)", emoji: "🔬" },
  { label: "Cultural Fest", category: "Culture", bg: "linear-gradient(135deg, #b51e1f, #E8272A)", emoji: "🎭" },
  { label: "Graduation Ceremony", category: "Events", bg: "linear-gradient(135deg, #111827, #1A5BA8)", emoji: "🎓" },
  { label: "Music Concert", category: "Performing Arts", bg: "linear-gradient(135deg, #E8272A, #0d3d76)", emoji: "🎵" },
];

/* ── Hooks ──────────────────────────────────────────────── */
function useParallax(speed = 0.12) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let rafId = 0;
    const metrics = { top: 0, height: 0 };

    const measure = () => {
      const rect = el.getBoundingClientRect();
      metrics.top = rect.top + window.scrollY;
      metrics.height = rect.height;
    };

    const update = () => {
      if (!metrics.height) measure();
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      const elementCenter = metrics.top + metrics.height / 2;
      const offset = viewportCenter - elementCenter;
      const isMobile = window.innerWidth < 768;
      const adjustedSpeed = isMobile ? speed * 0.24 : speed;
      el.style.willChange = "transform";
      el.style.transform = `translate3d(0, ${offset * adjustedSpeed}px, 0)`;
      rafId = 0;
    };
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("orientationchange", onScroll, { passive: true });
    measure();
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("orientationchange", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [speed]);
  return ref;
}

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Admissions Card (parallax from LEFT) ───────────────── */
function AdmissionsCard() {
  const [step, setStep] = useState(0);
  const [textRef, textVisible] = useReveal(0.1);
  const parallaxRef = useParallax(-0.07);
  const current = admissionSteps[step];
  const Icon = current.icon;

  return (
    <div className="parallax-row admissions-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "560px", alignItems: "stretch" }}>
      {/* LEFT: text slides in */}
      <div
        ref={textRef}
        style={{
          padding: "72px 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#fff",
          opacity: textVisible ? 1 : 0,
          transform: textVisible ? "translateX(0)" : "translateX(-70px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#E8272A", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
          <ClipboardList size={14} /> Admissions 2026–27
        </span>
        <h2 style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)", fontWeight: 900, color: "#111827", margin: "0 0 12px", lineHeight: 1.15 }}>
          Your Child's Journey<br />Starts Here
        </h2>
        <p style={{ fontSize: "0.95rem", color: "#6B7280", lineHeight: 1.8, margin: "0 0 32px", maxWidth: "400px" }}>
          Joining Miracle Minds is simple. Follow our 4-step process and secure your child's seat in one of the finest schools in the region.
        </p>

        {/* Step card */}
        <div style={{ background: "#F9FAFB", borderRadius: "16px", padding: "24px", borderLeft: `4px solid ${current.color}`, marginBottom: "24px", minHeight: "130px", transition: "all 0.4s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: current.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF" }}>{current.step}</div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "#111827" }}>{current.title}</div>
            </div>
          </div>
          <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.7, margin: 0 }}>{current.desc}</p>
        </div>

        {/* Nav dots + arrows */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #E5E7EB", background: "none", cursor: step === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: step === 0 ? 0.4 : 1, transition: "all 0.2s" }}>
            <ChevronLeft size={16} color="#374151" />
          </button>
          <div style={{ display: "flex", gap: "6px" }}>
            {admissionSteps.map((_, i) => (
              <button key={i} onClick={() => setStep(i)} style={{ width: i === step ? "24px" : "8px", height: "8px", borderRadius: "4px", background: i === step ? "#E8272A" : "#E5E7EB", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />
            ))}
          </div>
          <button onClick={() => setStep(s => Math.min(admissionSteps.length - 1, s + 1))} disabled={step === admissionSteps.length - 1} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #E5E7EB", background: "none", cursor: step === admissionSteps.length - 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: step === admissionSteps.length - 1 ? 0.4 : 1, transition: "all 0.2s" }}>
            <ChevronRight size={16} color="#374151" />
          </button>
          <span style={{ fontSize: "12px", color: "#9CA3AF", marginLeft: "4px" }}>{step + 1} of {admissionSteps.length}</span>
        </div>

        <Link to="/admissions" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#E8272A", color: "#fff", fontWeight: 700, fontSize: "0.9rem", padding: "13px 26px", borderRadius: "50px", textDecoration: "none", width: "fit-content", boxShadow: "0 4px 18px rgba(232,39,42,0.3)", transition: "transform 0.2s, box-shadow 0.2s" }}>
          Apply Now <ArrowRight size={16} />
        </Link>
      </div>

      {/* RIGHT: parallax visual panel */}
      <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #1A5BA8 0%, #0d3d76 100%)", minHeight: "420px" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
        <div ref={parallaxRef} style={{ position: "absolute", inset: "-60px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px", padding: "40px" }}>
          {/* 4 step pills */}
          {admissionSteps.map((s, i) => (
            <button key={i} onClick={() => setStep(i)} style={{ width: "100%", maxWidth: "300px", background: i === step ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)", border: i === step ? "1.5px solid rgba(255,255,255,0.6)" : "1px solid rgba(255,255,255,0.15)", borderRadius: "14px", padding: "14px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "14px", transition: "all 0.3s ease", transform: i === step ? "scale(1.03)" : "scale(1)" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: i === step ? "#fff" : "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {(() => { const SI = s.icon; return <SI size={16} color={i === step ? "#1A5BA8" : "#fff"} />; })()}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.step}</div>
                <div style={{ fontSize: "0.85rem", color: "#fff", fontWeight: 700 }}>{s.title}</div>
              </div>
              {i === step && <ChevronRight size={14} color="rgba(255,255,255,0.7)" style={{ marginLeft: "auto" }} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Gallery Card (parallax from RIGHT) ─────────────────── */
function GalleryCard() {
  const [active, setActive] = useState(0);
  const [textRef, textVisible] = useReveal(0.1);
  const parallaxRef = useParallax(0.07);

  const prev = useCallback(() => setActive(a => (a - 1 + galleryItems.length) % galleryItems.length), []);
  const next = useCallback(() => setActive(a => (a + 1) % galleryItems.length), []);

  const visible3 = [
    galleryItems[(active - 1 + galleryItems.length) % galleryItems.length],
    galleryItems[active],
    galleryItems[(active + 1) % galleryItems.length],
  ];

  return (
    <div className="parallax-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "560px", alignItems: "stretch" }}>
      {/* LEFT: parallax visual */}
      <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #E8272A 0%, #b51e1f 100%)", minHeight: "420px" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
        <div ref={parallaxRef} style={{ position: "absolute", inset: "-60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "100%", maxWidth: "320px", padding: "32px 24px" }}>
            {visible3.map((item, idx) => (
              <div key={idx} onClick={() => { if (idx === 0) prev(); else if (idx === 2) next(); }} style={{ background: idx === 1 ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)", border: idx === 1 ? "1.5px solid rgba(255,255,255,0.55)" : "1px solid rgba(255,255,255,0.12)", borderRadius: "16px", padding: "16px 20px", cursor: idx !== 1 ? "pointer" : "default", display: "flex", alignItems: "center", gap: "14px", transition: "all 0.35s ease", transform: idx === 1 ? "scale(1.04)" : "scale(0.96)", opacity: idx === 1 ? 1 : 0.65 }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>
                  {item.emoji}
                </div>
                <div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.category}</div>
                  <div style={{ fontSize: "0.9rem", color: "#fff", fontWeight: 700, marginTop: "2px" }}>{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: text slides in */}
      <div
        ref={textRef}
        style={{
          padding: "72px 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#fff",
          opacity: textVisible ? 1 : 0,
          transform: textVisible ? "translateX(0)" : "translateX(70px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1A5BA8", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
          <Images size={14} /> School Life & Gallery
        </span>
        <h2 style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)", fontWeight: 900, color: "#111827", margin: "0 0 12px", lineHeight: 1.15 }}>
          Glimpses of Our<br />Vibrant School Life
        </h2>
        <p style={{ fontSize: "0.95rem", color: "#6B7280", lineHeight: 1.8, margin: "0 0 28px", maxWidth: "400px" }}>
          From sports championships to science fairs, cultural festivals to music concerts — life at Miracle Minds is rich, joyful, and full of unforgettable memories.
        </p>

        {/* Active gallery detail */}
        <div style={{ background: "#F9FAFB", borderRadius: "16px", padding: "20px 22px", borderLeft: "4px solid #1A5BA8", marginBottom: "24px", display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: galleryItems[active].bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 }}>
            {galleryItems[active].emoji}
          </div>
          <div>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9CA3AF" }}>{galleryItems[active].category}</div>
            <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111827" }}>{galleryItems[active].label}</div>
          </div>
        </div>

        {/* Nav arrows + dots */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
          <button onClick={prev} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #E5E7EB", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
            <ChevronLeft size={16} color="#374151" />
          </button>
          <div style={{ display: "flex", gap: "6px" }}>
            {galleryItems.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? "24px" : "8px", height: "8px", borderRadius: "4px", background: i === active ? "#1A5BA8" : "#E5E7EB", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />
            ))}
          </div>
          <button onClick={next} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #E5E7EB", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
            <ChevronRight size={16} color="#374151" />
          </button>
          <span style={{ fontSize: "12px", color: "#9CA3AF", marginLeft: "4px" }}>{active + 1} of {galleryItems.length}</span>
        </div>

        <Link to="/gallery" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#1A5BA8", color: "#fff", fontWeight: 700, fontSize: "0.9rem", padding: "13px 26px", borderRadius: "50px", textDecoration: "none", width: "fit-content", boxShadow: "0 4px 18px rgba(26,91,168,0.3)", transition: "transform 0.2s, box-shadow 0.2s" }}>
          View Full Gallery <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────────── */
export function HomePage() {
  const [heroRef, heroVisible] = useReveal(0.01);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body { overflow-x: hidden; }
        .mm-page { font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: clip; touch-action: pan-y; }

        @media (max-width: 768px) {
          .parallax-row {
            grid-template-columns: 1fr !important;
          }
          .parallax-row > div:first-child {
            min-height: 320px !important;
          }
          .admissions-row {
            display: flex !important;
            flex-direction: column-reverse !important;
          }
          .admissions-row > div {
            width: 100% !important;
          }
        }

        .stat-card:hover { transform: translateY(-4px) !important; }
        .highlight-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.10) !important;
        }
        .update-card:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 12px 32px rgba(26,91,168,0.12) !important;
        }
        .cta-btn:hover { transform: translateY(-2px) !important; }
        .hero-shell {
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }
        .hero-kicker {
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.16);
          backdrop-filter: blur(8px);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.5fr);
          gap: 36px;
          align-items: center;
          justify-items: stretch;
        }
        .hero-copy {
          max-width: 520px;
          text-align: left;
          justify-self: start;
        }
        .hero-copy h1 {
          font-size: clamp(2rem, 4.6vw, 4rem);
          line-height: 0.96;
          letter-spacing: -0.04em;
        }
        .hero-copy p {
          font-size: clamp(0.95rem, 1.4vw, 1.05rem);
          line-height: 1.75;
          max-width: 470px;
        }
        .hero-actions {
          display: flex;
          gap: 8px;
          flex-wrap: nowrap;
          margin-top: 16px;
        }
        .hero-visual {
          justify-self: end;
          width: 100%;
          max-width: min(760px, calc(100vw - 72px));
          transform: translateY(-34px);
        }
        .hero-gallery-shell {
          width: 100%;
          height: 500px;
          margin: 0 auto;
        }
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .hero-copy {
            text-align: center !important;
            justify-self: center !important;
          }
          .hero-copy {
            max-width: 100% !important;
          }
          .hero-copy h1,
          .hero-copy p {
            text-align: center !important;
          }
          .hero-visual {
            justify-self: center !important;
            max-width: min(100%, calc(100vw - 32px)) !important;
            width: 100% !important;
            margin-top: 12px;
            transform: translateY(-10px);
          }
          .hero-gallery-shell {
            height: 380px !important;
          }
          .hero-actions {
            flex-wrap: wrap !important;
            gap: 10px !important;
            justify-content: center !important;
          }
          .hero-actions a {
            font-size: 0.76rem !important;
            padding: 9px 12px !important;
            white-space: nowrap !important;
          }
          .hero-shell > div {
            padding: 52px 20px 48px !important;
            max-width: 100% !important;
          }
          .hero-copy h1 { font-size: clamp(1.6rem, 6vw, 2.6rem) !important; }
        }
        @media (max-width: 640px) {
          .hero-copy h1 {
            font-size: clamp(1.5rem, 9vw, 2.1rem) !important;
            line-height: 1.02 !important;
          }
          .hero-copy p {
            font-size: 0.92rem !important;
            line-height: 1.65 !important;
          }
          .hero-kicker {
            font-size: 9px !important;
            padding: 5px 10px !important;
          }
          .hero-actions {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .hero-actions a {
            justify-content: center !important;
            width: 100% !important;
          }
          .hero-gallery-shell {
            height: 320px !important;
          }
        }
      `}</style>

      <div className="mm-page">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="hero-shell" style={{ background: "linear-gradient(135deg, #1A5BA8 0%, #0f477d 52%, #C82326 100%)", color: "#fff", position: "relative", overflow: "hidden", minHeight: "88vh", display: "flex", alignItems: "center" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at top left, rgba(255,255,255,0.10) 0, rgba(255,255,255,0.10) 1px, transparent 1px, transparent 28px)", backgroundSize: "30px 30px", opacity: 0.28, zIndex: 0 }} />
          <div style={{ position: "absolute", top: "-120px", right: "-120px", width: "420px", height: "420px", borderRadius: "50%", background: "rgba(232,39,42,0.16)", filter: "blur(16px)", zIndex: 0 }} />
          <div style={{ position: "absolute", bottom: "-100px", left: "-90px", width: "320px", height: "320px", borderRadius: "50%", background: "rgba(255,255,255,0.07)", filter: "blur(14px)", zIndex: 0 }} />

          <div
            ref={heroRef}
            style={{
              maxWidth: "1240px",
              margin: "0 auto",
              padding: "88px 40px 68px 56px",
              position: "relative",
              zIndex: 1,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 1s ease, transform 1s ease",
            }}
          >
            <div className="hero-grid">
              <div className="hero-copy">
                <span className="hero-kicker" style={{ display: "inline-flex", alignItems: "center", gap: "8px", borderRadius: "999px", padding: "6px 12px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "14px", textTransform: "uppercase" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "999px", background: "#FFD54A" }} />
                  Admissions Open — 2026–27
                </span>

                <h1 style={{ fontWeight: 900, margin: "0 0 16px", textAlign: "left" }}>
                  A brighter start<br />for every child
                </h1>

                <p style={{ color: "rgba(255,255,255,0.80)", margin: 0, textAlign: "left" }}>
                  The School of Excellence with a nurturing environment, strong values, and joyful learning built around each child.
                </p>

                <div className="hero-actions">
                  <Link to="/admissions" className="cta-btn" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#E8272A", color: "#fff", fontWeight: 800, padding: "11px 16px", borderRadius: "999px", textDecoration: "none", fontSize: "0.82rem", boxShadow: "0 10px 24px rgba(232,39,42,0.34)", transition: "transform 0.2s", whiteSpace: "nowrap" }}>
                    Explore Admissions <ArrowRight size={16} />
                  </Link>
                  <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.10)", backdropFilter: "blur(10px)", border: "1.5px solid rgba(255,255,255,0.22)", color: "#fff", fontWeight: 800, padding: "11px 16px", borderRadius: "999px", textDecoration: "none", fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                    Contact Us
                  </Link>
                </div>
              </div>

              <div className="hero-visual">
                <div className="hero-gallery-shell">
                  <CircularGallery
                    items={heroGalleryItems}
                    bend={1}
                    textColor="#ffffff"
                    borderRadius={0.04}
                    scrollSpeed={1}
                    scrollEase={0.02}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", opacity: 0.7 }}>
            <span style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff" }}>Scroll</span>
            <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(255,255,255,0.95), transparent)" }} />
          </div>
        </section>

        {/* ── ADMISSIONS PARALLAX CARD ─────────────────────── */}
        <AdmissionsCard />

        {/* ── GALLERY PARALLAX CARD ────────────────────────── */}
        <GalleryCard />

        {/* ── HIGHLIGHTS ──────────────────────────────────── */}
        <section style={{ padding: "80px 32px", background: "#F9FAFB" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#E8272A" }}>Why Choose Us</span>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: "#111827", margin: "12px 0 0" }}>Everything a Child Needs to Thrive</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
              {highlights.map((h, i) => (
                <div key={i} className="highlight-card" style={{ background: "#fff", borderRadius: "20px", padding: "32px 24px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", borderTop: `4px solid ${i % 2 === 0 ? "#E8272A" : "#1A5BA8"}`, transition: "transform 0.3s, box-shadow 0.3s" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: i % 2 === 0 ? "rgba(232,39,42,0.08)" : "rgba(26,91,168,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                    <h.icon size={24} color={i % 2 === 0 ? "#E8272A" : "#1A5BA8"} />
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", margin: "0 0 10px" }}>{h.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "#6B7280", lineHeight: 1.7, margin: 0 }}>{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── UPDATES ─────────────────────────────────────── */}
        <section style={{ padding: "80px 32px", background: "#fff" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1A5BA8" }}>News & Events</span>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: "#111827", margin: "12px 0 0" }}>Latest Updates</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
              {updates.map((u, i) => (
                <div key={i} className="update-card" style={{ background: "#F9FAFB", borderRadius: "16px", padding: "28px 24px", borderLeft: `5px solid ${i === 0 ? "#E8272A" : "#1A5BA8"}`, transition: "box-shadow 0.3s, transform 0.3s", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: i === 0 ? "rgba(232,39,42,0.1)" : "rgba(26,91,168,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <u.icon size={18} color={i === 0 ? "#E8272A" : "#1A5BA8"} />
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: i === 0 ? "#E8272A" : "#1A5BA8" }}>{u.date}</span>
                  </div>
                  <p style={{ fontSize: "0.95rem", color: "#374151", lineHeight: 1.7, margin: 0 }}>{u.msg}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}