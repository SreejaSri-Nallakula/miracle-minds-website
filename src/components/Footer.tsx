import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Phone } from "lucide-react";
import { LogoBadge } from "./LogoBadge";

export function Footer() {
  return (
    <footer className="bg-footer-blue text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <LogoBadge size="2xl" />
          <p className="mt-4 text-white/80 text-sm leading-relaxed">
            The School of Excellence — nurturing bright, curious, and confident young minds.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/admissions" className="hover:text-white">Admissions</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> 9849140520</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> 9063614513</li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a href="#" aria-label="Facebook" className="p-2 rounded-full bg-white/10 hover:bg-white/20"><Facebook className="w-4 h-4" /></a>
            <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-white/10 hover:bg-white/20"><Instagram className="w-4 h-4" /></a>
            <a href="#" aria-label="YouTube" className="p-2 rounded-full bg-white/10 hover:bg-white/20"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-white/70">
        © 2025 Miracle Minds. All rights reserved.
      </div>
    </footer>
  );
}
