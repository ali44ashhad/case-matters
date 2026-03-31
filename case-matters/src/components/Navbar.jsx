import React, { useState, useEffect } from 'react';
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

      <nav 
        className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-6 md:px-12 z-[100] transition-all duration-500 bg-black/20 backdrop-blur-md border-b border-white/10"
      >
        
        {/* Logo */}
        <Link to="/" onClick={(e) => scrollToSection(e, 'home')}>
          <div className="text-2xl font-black tracking-tighter cursor-pointer uppercase text-[#1871C9]">
            Logo<span className="text-white">.</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden min-[992px]:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={`#${link.href}`} 
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm uppercase tracking-[0.2em] font-bold transition-colors relative group text-gray-100"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#1871C9] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
          
          {/* CTA Button */}
          <li>
            <a 
              href="https://wa.me/yournumber" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#1871C9] to-[#5FA9F4] text-white text-sm uppercase tracking-[0.2em] font-bold hover:from-[#145da5] hover:to-[#1871C9] transition-all rounded-full shadow-lg shadow-blue-500/25 group"
            >
              <MessageCircle size={16} className="text-green-400 animate-pulse-soft fill-green-400" />
              Contact Us
            </a>
          </li>
        </ul>

        {/* Mobile View Toggle */}
        <div className="flex min-[992px]:hidden items-center gap-4">
          <a 
            href="https://wa.me/yournumber" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1871C9] to-[#5FA9F4] text-white text-sm font-bold uppercase tracking-widest rounded-full shadow-md shadow-blue-900/20 hover:from-[#145da5] hover:to-[#1871C9] transition-all"
          >
            <MessageCircle size={14} className="text-green-400 fill-green-400" />
            Contact
          </a>

          <button onClick={() => setIsOpen(true)} className="p-2 text-[#1871C9]">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[110] transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Sidebar Content */}
      <div 
        className={`fixed top-0 right-0 h-full w-[85%] sm:w-[350px] bg-white z-[120] p-10 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-12">
          <div className="text-xl font-black text-[#1871C9]">Logo.</div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-[#1871C9] transition-colors">
            <X size={32} />
          </button>
        </div>

        <ul className="flex flex-col gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={`#${link.href}`} 
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-3xl font-bold text-gray-900 hover:text-[#1871C9] tracking-tight transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a 
              href="https://wa.me/yournumber" 
              className="flex items-center gap-3 text-xl font-bold text-[#1871C9] tracking-tight"
            >
              <div className="p-3 bg-green-50 rounded-full">
                <MessageCircle size={24} className="text-green-500 fill-green-500" />
              </div>
              Chat with an Expert
            </a>
          </li>
        </ul>

        <div className="mt-auto border-t border-gray-100 pt-10">
          <div className="p-6 bg-gradient-to-br from-[#1871C9] to-[#0F4A81] rounded-2xl text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2 opacity-80">Legal Excellence</p>
            <p className="text-sm font-medium leading-relaxed">Trusted Advisors for Complex Disputes.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;