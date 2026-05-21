import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LogoBadge } from "./LogoBadge";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/admissions", label: "Admissions" },
  { to: "/facilities", label: "Facilities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <LogoBadge size="xl" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-brand-red" : "text-ink/80 hover:text-brand-red"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/admissions"
            className="inline-flex items-center rounded-full bg-brand-red text-white text-sm font-semibold px-4 py-2 hover:bg-brand-red-dark transition-colors shadow-card"
          >
            Admissions Open 2026
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          type="button"
          className="lg:hidden p-2 rounded-full shadow-sm border border-border"
          style={{
            background: "#ffffff",
            backgroundColor: "#ffffff",
            backgroundImage: "none",
            color: "#1A5BA8",
            opacity: 1,
            WebkitAppearance: "none",
            appearance: "none",
            boxShadow: "0 6px 16px rgba(26, 91, 168, 0.14)",
          }}
          onClick={() => setOpen(true)}
        >
          <Menu className="w-6 h-6" style={{ color: "#1A5BA8" }} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-9999 lg:hidden transition ${open ? "visible" : "invisible"}`}
        aria-hidden={!open}
      >
        <div
          className={`fixed inset-0 bg-black/45 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`fixed right-0 top-0 h-dvh w-[min(88vw,20rem)] overflow-y-auto bg-white shadow-2xl border-l border-border p-6 flex flex-col gap-4 transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
          style={{ background: "#ffffff", backgroundColor: "#ffffff", backgroundImage: "none", opacity: 1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <LogoBadge size="lg" />
            <button onClick={() => setOpen(false)} aria-label="Close" className="p-2 rounded-full border border-border bg-white shadow-sm" style={{ background: "#ffffff", backgroundColor: "#ffffff", backgroundImage: "none", opacity: 1 }}>
              <X className="w-5 h-5 text-brand-blue" />
            </button>
          </div>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-base font-medium ${isActive ? "text-brand-red" : "text-ink hover:text-brand-red"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/admissions"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex justify-center items-center rounded-full bg-brand-red text-white text-sm font-semibold px-4 py-2.5"
          >
            Admissions Open 2026
          </Link>
        </aside>
      </div>
    </header>
  );
}
