import { Link } from "@tanstack/react-router";
import { useState } from "react";
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
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <LogoBadge size="md" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-ink/80 hover:text-brand-red transition-colors"
              activeProps={{ className: "text-brand-red" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/admissions"
            className="inline-flex items-center rounded-full bg-brand-red text-white text-sm font-semibold px-4 py-2 hover:bg-brand-red-dark transition-colors shadow-card"
          >
            Admissions Open 2025
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden p-2 rounded-md hover:bg-muted"
          onClick={() => setOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition ${open ? "visible" : "invisible"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-6 flex flex-col gap-4 transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between mb-4">
            <LogoBadge size="sm" />
            <button onClick={() => setOpen(false)} aria-label="Close" className="p-2 rounded hover:bg-muted">
              <X className="w-5 h-5" />
            </button>
          </div>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-ink hover:text-brand-red"
              activeProps={{ className: "text-brand-red" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/admissions"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex justify-center items-center rounded-full bg-brand-red text-white text-sm font-semibold px-4 py-2.5"
          >
            Admissions Open 2025
          </Link>
        </aside>
      </div>
    </header>
  );
}
