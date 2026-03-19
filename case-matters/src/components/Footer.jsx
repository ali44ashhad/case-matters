import React from 'react';

const Footer = () => {
  const practiceAreas = [
    { name: "Arbitration", href: "/services/arbitration" },
    { name: "Construction and Infrastructure Disputes ", href: "/services/construction" },
    { name: "Contract Advisory & Risk Management", href: "/services/contract-advisory" },
    { name: "Contract and Claims Management ", href: "/services/contract-claim" },
    { name: "Employment Advisory & Compliance", href: "/services/employement" },
    { name: "Startup Law & Compliance ", href: "/services/startup" },
    { name: "Civil, Commercial and Business Litigation", href: "/services/civil" }

  ];

  const usefulLinks = [
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "Services", href: "#service" },
    { name: "Our Blog", href: "#blogs" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/policies/privacy-policy" },
    { name: "Terms & Conditions", href: "/policies/terms-and-conditions" },
  ];

  return (
    <footer className="relative w-full bg-zinc-950 pt-20 pb-10 px-6 md:px-20 overflow-hidden text-zinc-400">
      
      {/* Background Jurisprudential Quote - Integrated & Fixed */}
      <div className="absolute top-10 right-10 opacity-5 pointer-events-none select-none">
        <p className="text-6xl md:text-8xl font-serif italic text-white leading-tight">
          "Justice delayed is <br /> justice denied."
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-white text-2xl font-bold tracking-tighter">
              CASE <span className="text-[#1871C9]">MATTERS</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-xs">
              Delivering practical and effective legal solutions with deep subject-matter expertise across complex commercial and construction disputes.
            </p>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="text-[#1871C9] font-semibold uppercase tracking-widest text-xs mb-6">
              Practice Areas
            </h3>
            <ul className="space-y-3">
              {practiceAreas.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-sm transition-all duration-300 hover:text-[#1871C9] hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-[#1871C9] font-semibold uppercase tracking-widest text-xs mb-6">
              Useful Links
            </h3>
            <ul className="space-y-3">
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-sm transition-all duration-300 hover:text-[#1871C9] hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h3 className="text-[#1871C9] font-semibold uppercase tracking-widest text-xs mb-6">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-sm transition-all duration-300 hover:text-[#1871C9] hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wider uppercase">
          <p>© Case Matters Legal Services. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
            <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
          </div>
        </div>
      </div>
      
      {/* Aesthetic Mustard Accent Line */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#E2B13C] to-transparent opacity-30" />
    </footer>
  );
};

export default Footer;