import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Youtube, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PD</span>
              </div>
              <div>
                <div className="text-white font-bold">Prabhakar Dwivedi</div>
                <div className="text-xs text-white/70">Founder & CEO</div>
              </div>
            </div>

            <p className="text-white/80 text-sm leading-relaxed">
              Execution-led leadership across Infrastructure & Technology with 20–25 years of experience.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-4 mt-4">
              <a
                href="https://www.linkedin.com/in/er-prabhakar-dwivedi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#0A66C2] transition"
              >
                <Linkedin size={18} />
              </a>

              <a
                href="https://www.youtube.com/@PrabhakarDwivedi7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-red-600 transition"
              >
                <Youtube size={18} />
              </a>

              <a
                href="https://www.facebook.com/er.prabhakardwivedi7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-blue-500 transition"
              >
                <Facebook size={18} />
              </a>

              <a
                href="https://www.instagram.com/er.prabhakardwivedi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-pink-500 transition"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://x.com/pk_dwivedi7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <span className="text-white font-semibold text-sm mb-4 block">Quick Links</span>
            <div className="space-y-2">
              <Link to="/" className="block text-white/80 hover:text-white text-sm transition-colors">Home</Link>
              <Link to="/about" className="block text-white/80 hover:text-white text-sm transition-colors">About</Link>
              <Link to="/group-companies" className="block text-white/80 hover:text-white text-sm transition-colors">Group Companies</Link>
              <Link to="/contact" className="block text-white/80 hover:text-white text-sm transition-colors">Contact</Link>
              <Link to="/media-kit" className="block text-white/80 hover:text-white text-sm transition-colors">Media Kit</Link>
            </div>
          </div>

          <div>
            <span className="text-white font-semibold text-sm mb-4 block">Sectors</span>
            <div className="space-y-2 text-sm text-white/80">
              <p>Infrastructure & Engineering</p>
              <p>Real Estate Development</p>
              <p>Technology Solutions</p>
              <p>Design & Architecture</p>
              <p>Materials & Testing</p>
            </div>
          </div>

          <div>
            <span className="text-white font-semibold text-sm mb-4 block">Contact</span>
            <div className="space-y-3">

              <div className="flex items-start space-x-3">
                <Mail size={16} className="text-[#d4af37] mt-0.5 shrink-0" />
                <a
                  href="mailto:hello@prabhakardwivedi.in"
                  className="text-white/80 text-sm hover:text-white transition"
                >
                  hello@prabhakardwivedi.in
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <Mail size={16} className="text-[#d4af37] mt-0.5 shrink-0" />
                <a
                  href="mailto:admin@prabhakardwivedi.in"
                  className="text-white/80 text-sm hover:text-white transition"
                >
                  admin@prabhakardwivedi.in
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-[#d4af37] mt-0.5 shrink-0" />
                <span className="text-white/80 text-sm">Pan-India Operations</span>
              </div>

              <a
                href="https://www.linkedin.com/in/er-prabhakar-dwivedi/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-3 hover:opacity-100"
              >
                <Linkedin size={16} className="text-[#d4af37] mt-0.5 shrink-0" />
                <span className="text-white/80 text-sm hover:text-white transition">
                  Connect on LinkedIn
                </span>
              </a>

            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm text-center md:text-left">
              © 2025 Prabhakar Dwivedi. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
