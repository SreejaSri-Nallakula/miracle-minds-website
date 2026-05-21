import { Link } from "react-router-dom";
import { Facebook, Instagram, Phone } from "lucide-react";
import { LogoBadge } from "./LogoBadge";

export function Footer() {
  return (
    <footer className="relative bg-footer-blue text-white mt-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,white 0,white 1px,transparent 1px,transparent 12px)" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid md:grid-cols-3 gap-6">
        <div>
          <LogoBadge size="xl" />
          <p className="mt-3 text-white/80 text-sm leading-relaxed">
            The School of Excellence — nurturing bright, curious, and confident young minds.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-base">Quick Links</h4>
          <div className="w-10 h-0.5 bg-[#c55a3f] mb-4" />
          <ul className="space-y-1.5 text-sm text-white/80">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/admissions" className="hover:text-white">Admissions</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-base">Contact</h4>
          <div className="w-10 h-0.5 bg-[#c55a3f] mb-4" />
          <ul className="space-y-1.5 text-sm text-white/80">
            <li>Sathupally, Siddaram Road</li>
            <li>Sathupalli, Khammam-507303</li>
            <li>Telangana</li>
            <li className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> +91 9849140520</li>
            <li className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> +91 9063614513</li>
          </ul>
          <div className="flex gap-3 mt-3">
            <a href="https://www.facebook.com/p/Miracle-Minds-61559548843276/" target="_blank" rel="noreferrer" aria-label="Facebook" className="p-2 rounded-full bg-white/10 hover:bg-white/20"><Facebook className="w-4 h-4" /></a>
            <a href="https://www.instagram.com/miracle_minds_sathupally/" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded-full bg-white/10 hover:bg-white/20"><Instagram className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-base text-white/70">
        © 2026 Miracle Minds. All rights reserved.
      </div>
    </footer>
  );
}
