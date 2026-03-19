import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Use the ID of the sections you want to scroll to
  const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'About Us', href: 'about' },
    { name: 'Our Services', href: 'services' },
    { name: 'Sectors', href: 'sectors' },
    { name: 'Contact Us', href: 'contact' },
  ];

  // Smooth Scroll Function
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset for the fixed navbar height (h-20 = 80px)
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
    setIsOpen(false); // Close mobile menu after clicking
  };

  return (
    <>
      {/* Main Navbar */} 
      <nav className="fixed top-0 left-0 w-full h-20 bg-[#071525] text-white flex items-center justify-between px-6 md:px-12 z-[100] border-b border-white/10">
        
        {/* Logo */}
        <Link to="/" onClick={(e) => scrollToSection(e, 'home')}>
          <div className="text-2xl font-black tracking-tighter cursor-pointer uppercase">
            Logo<span className="text-[#E2B13C]">.</span>
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
        </ul>

        {/* Hamburger Icon */}
        <div className="min-[992px]:hidden">
          <button 
            onClick={() => setIsOpen(true)} 
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-[#E2B13C]"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-[110] transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-[75%] sm:w-[50%] bg-zinc-950 z-[120] p-10 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] border-l border-white/10 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end mb-16">
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-[#E2B13C]"
          >
            <X size={32} />
          </button>
        </div>

        <ul className="flex flex-col gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={`#${link.href}`} 
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-2xl font-bold text-white hover:text-[#E2B13C] block transition-all tracking-tight"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t border-white/5 pt-10">
          <p className="text-[#E2B13C] text-xs font-bold uppercase tracking-widest mb-2">Legal Excellence</p>
          <p className="text-zinc-500 text-sm italic">Trusted Advisors for Complex Disputes.</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;  