import React, { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'About Us', href: 'about' },
    { name: 'Services', href: 'services' },
    { name: 'Sectors', href: 'sectors' },
  ];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <style>
        {`
          @keyframes pulse-soft {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-pulse-soft {
            animation: pulse-soft 2s infinite ease-in-out;
          }
        `}
      </style>

      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 w-full h-20 bg-white text-gray-900 flex items-center justify-between px-6 md:px-12 z-[100] border-b border-gray-200/60 shadow-sm">
        
        {/* Logo */}
        <Link to="/" onClick={(e) => scrollToSection(e, 'home')}>
          <div className="text-2xl font-black tracking-tighter cursor-pointer uppercase">
            Logo<span className="text-[#1871C9]">.</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden min-[992px]:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={`#${link.href}`} 
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-[11px] uppercase tracking-[0.2em] font-bold hover:text-[#1871C9] transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
          
          {/* Combined Contact & WhatsApp CTA */}
          <li>
            <a 
              href="https://wa.me/yournumber" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1871C9] text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#145da5] transition-all rounded-sm shadow-md group"
            >
              <MessageCircle size={16} className="text-green-400 animate-pulse-soft fill-green-400" />
              Contact Us
            </a>
          </li>
        </ul>

        {/* Mobile View: Integrated CTA + Menu */}
        <div className="flex min-[992px]:hidden items-center gap-4">
          <a 
            href="https://wa.me/yournumber" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#1871C9] text-white text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-md"
          >
            <MessageCircle size={14} className="text-green-400 fill-green-400" />
            Contact
          </a>

          <button onClick={() => setIsOpen(true)} className="p-2 text-[#1871C9]">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-[80%] bg-white z-[120] p-10 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end mb-12">
          <button onClick={() => setIsOpen(false)} className="text-[#1871C9]">
            <X size={32} />
          </button>
        </div>

        <ul className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={`#${link.href}`} 
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-2xl font-bold text-gray-900 hover:text-[#1871C9] tracking-tight"
              >
                {link.name}
              </a>
            </li>
          ))}
          {/* Sidebar CTA */}
          <li>
            <a 
              href="https://wa.me/+919810238083" 
              className="flex items-center gap-3 text-2xl font-bold text-[#1871C9] tracking-tight"
            >
              <MessageCircle size={28} className="text-green-500 fill-green-500" />
              Contact Us
            </a>
          </li>
        </ul>

        <div className="mt-auto border-t border-gray-100 pt-10">
          <p className="text-[#1871C9] text-xs font-bold uppercase tracking-widest mb-2">Legal Excellence</p>
          <p className="text-gray-500 text-sm italic">Trusted Advisors for Complex Disputes.</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;