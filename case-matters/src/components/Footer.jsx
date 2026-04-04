import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react'; // Added icons for better UX

const Footer = () => {
  const practiceAreas = [
    { name: "Arbitration", href: "/services/arbitration" },
    { name: "Construction and Infrastructure Disputes", href: "/services/construction" },
    { name: "Contract Advisory & Risk Management", href: "/services/contract-advisory" },
    { name: "Contract and Claims Management", href: "/services/contract-claim" },
    { name: "Employment Advisory & Compliance", href: "/services/employement" },
    { name: "Startup Law & Compliance", href: "/services/startup" },
    { name: "Civil, Commercial and Business Litigation", href: "/services/civil" }
  ];

  const usefulLinks = [
    { name: "About Us", href: "/" },
    { name: "Contact", href: "/" },
    { name: "Services", href: "/" },
    { name: "Our Blog", href: "/" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/policies/privacy-policy" },
    { name: "Terms & Conditions", href: "/policies/terms-and-conditions" },
  ];

  return (
    <footer className="relative w-full bg-gradient-to-r from-[#1871C9] to-[#0A2E52] pt-10 sm:pt-16 md:pt-20 pb-8 sm:pb-10 px-4 sm:px-6 md:px-20 overflow-hidden text-blue-100/80">
      
      {/* Background Jurisprudential Quote */}
      <div className="hidden sm:block absolute top-10 right-10 opacity-10 pointer-events-none select-none">
        <p className="text-5xl md:text-8xl font-serif italic text-white leading-tight">
          "Justice delayed is <br /> justice denied."
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          
          {/* Brand & Contact Column */}
          <div className="space-y-5 sm:space-y-6">
            <h2 className="text-white text-2xl sm:text-3xl font-bold tracking-tighter">
              CASE <span className="text-[#E2B13C]">MATTERS</span>
            </h2>
            <p className="text-[13px] sm:text-sm leading-relaxed max-w-xs text-blue-100/70">
              Delivering practical and effective legal solutions with deep subject-matter expertise across complex commercial and construction disputes.
            </p>
            
            {/* Contact Info Section */}
            <div className="space-y-3 sm:space-y-4 pt-4 border-t border-white/10 max-w-xs">
              <a href="mailto:suhail.singh@casematters.in" className="flex items-center gap-3 hover:text-white transition-colors group">
                <Mail size={16} className="text-[#E2B13C]" />
                <span className="text-[13px] sm:text-sm break-all">suhail.singh@casematters.in</span>
              </a>
              
              <a href="tel:+919810238083" className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone size={16} className="text-[#E2B13C]" />
                <span className="text-[13px] sm:text-sm">+91 9810238083</span>
              </a>
              
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#E2B13C] mt-1 shrink-0" />
                <p className="text-[13px] sm:text-sm leading-relaxed">
                  DLF Almeda, Sector 73, SPR Road, <br /> Gurgaon – 122101
                </p>  
              </div>
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="text-[#E2B13C] font-semibold uppercase tracking-widest text-xs mb-6">
              Practice Areas
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {practiceAreas.map((item, index) => (
                <li key={index}>
                  <Link to={item.href} className="text-[13px] sm:text-sm transition-all duration-300 hover:text-white hover:translate-x-1 inline-block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-[#E2B13C] font-semibold uppercase tracking-widest text-xs mb-6">
              Useful Links
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-[13px] sm:text-sm transition-all duration-300 hover:text-white hover:translate-x-1 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[#E2B13C] font-semibold uppercase tracking-widest text-xs mb-6">
              Legal
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-[13px] sm:text-sm transition-all duration-300 hover:text-white hover:translate-x-1 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-16 md:mt-20 pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-[10px] tracking-[0.2em] sm:tracking-widest uppercase text-blue-100/50 text-center md:text-left">
          <p className="leading-relaxed">© {new Date().getFullYear()} Case Matters Legal Services. All rights reserved.</p>
          <div className="flex gap-5 sm:gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
            <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
          </div>
        </div>
      </div>
      
      {/* Aesthetic Mustard Accent Line */}
      <div className="absolute bottom-0 left-0 h-1 sm:h-1.5 w-full bg-[#E2B13C]" />
    </footer>
  );
};

export default Footer;