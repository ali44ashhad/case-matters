import React, { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/homeAssets/CM-logo.png';

const NAV_OFFSET = 80;

const scrollToId = (id) => {
  const element = document.getElementById(id);
  if (!element) return;
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top: elementPosition - NAV_OFFSET,
    behavior: 'smooth',
  });
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'About Us', href: 'about' },
    { name: 'Services', href: 'services' },
    { name: 'Sectors', href: 'sectors' },
  ];

  const handleSectionNav = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: `#${id}` });
      return;
    }
    scrollToId(id);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      return;
    }
    scrollToId('home');
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
        <Link to="/" onClick={handleLogoClick}>
          <div className="text-2xl font-black tracking-tighter cursor-pointer uppercase text-[#1871C9]">
            <img src={logo} alt="Logo" className='h-12 w-12 object-contain' />
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden min-[992px]:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={`/#${link.href}`} 
                onClick={(e) => handleSectionNav(e, link.href)}
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
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1871C9] to-[#5FA9F4] text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-md shadow-blue-900/20 hover:from-[#145da5] hover:to-[#1871C9] transition-all"
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
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Sidebar Content */}
      <div 
        className={`fixed top-0 right-0 h-full w-[80%] sm:w-[320px] bg-white z-[120] p-8 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <div className="h-10 w-10">
            <img src={logo} alt="Logo" className="h-full w-full object-contain" />
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-[#1871C9] transition-colors p-1">
            <X size={26} />
          </button>
        </div>

        {/* Updated Links Style */}
        <ul className="flex flex-col gap-5">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={`/#${link.href}`} 
                onClick={(e) => handleSectionNav(e, link.href)}
                className="block text-lg font-medium text-gray-800 hover:text-[#1871C9] transition-colors py-1.5 border-b border-gray-50"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a 
              href="https://wa.me/yournumber" 
              className="flex items-center gap-3 text-base font-semibold text-[#1871C9] tracking-tight mt-2"
            >
              <div className="p-2.5 bg-green-50 rounded-full">
                <MessageCircle size={20} className="text-green-500 fill-green-500" />
              </div>
              Chat with an Expert
            </a>
          </li>
        </ul>

        <div className="mt-auto pt-6">
          <div className="p-5 bg-gradient-to-br from-[#1871C9] to-[#0F4A81] rounded-xl text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-70">Legal Excellence</p>
            <p className="text-xs font-light leading-relaxed opacity-90">Trusted Advisors for Complex Disputes.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;