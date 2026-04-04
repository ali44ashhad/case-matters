import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Scale, ShieldCheck, Gavel } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AboutFirst from './AboutFirst';
import AboutSecond from './AboutSecond';
import Services from './Services';
import Faq from './Faq';
import LawExpandingLayout from './LawExpandingLayout';
import Blogs from './Blogs';
import Testimonials from './Testimonials';
import ContactForm from './ContactForm';
import bgVideo from '../../assets/homeAssets/hero-video.mp4';
import SectorsSection from './SectorsSection';

const SECTION_SCROLL_OFFSET = 80;

const Home = () => {
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (location.pathname !== '/') return;
    const id = location.hash.replace(/^#/, '');
    if (!id) return;
    const run = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - SECTION_SCROLL_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    };
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(run);
    });
    return () => cancelAnimationFrame(raf);
  }, [location.pathname, location.hash]);

  const contents = [
    { 
      id: 1,
      title: "Contract and Claims Management",
      desc: "End-to-end claims support, including claim preparation, evidence collation, correspondence strategy, and systematic record management.",
      icon: <Scale className="text-[#1871C9]" size={32} />
    },
    {
      id: 2,
      title: "Arbitration",
      desc: "Private dispute resolution through structured proceedings, offering confidentiality, procedural efficiency, and enforceable outcomes.",
      icon: <ShieldCheck className="text-[#1871C9]" size={32} />
    },
    {
      id: 3,
      title: "Contract Advisory & Risk Management",
      desc: "Drafting, review, and interpretation of contracts, coupled with strategic advice on rights and effective allocation of contractual risks.",
      icon: <Gavel className="text-[#1871C9]" size={32} />
    },
    {
      id: 4,
      title: "Employment Advisory & Compliance",
      desc: "Advisory services relating to employment contracts, HR policies, workplace regulations, and ongoing statutory compliance requirements.",
      icon: <Gavel className="text-[#1871C9]" size={32} />
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % contents.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [contents.length]);


  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 80; // Navbar ki height (h-20)
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <section id="home" className="relative w-full h-screen bg-white overflow-hidden">
        {/* --- BACKGROUND VIDEO --- */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover "
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
          {/* Radial Overlay */}
          <div className="absolute inset-0 bg-black/50 md:bg-black/60" />
          
        </div>

        {/* --- CONTENT LAYER --- */}
        <div className="relative z-10 h-full w-full flex items-center justify-center px-4 sm:px-6 md:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-6xl flex flex-col items-center text-center space-y-4 sm:space-y-6 md:space-y-8"
            >
              {/* Badge & Icon */}
              <div className="flex flex-col items-center gap-3">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="p-1.5 sm:p-2 md:p-3 bg-gray-200/60 backdrop-blur-sm rounded-full border border-gray-200/80"
                >
                  {contents[currentIndex].icon}
                </motion.div>
                <span className="text-[#1871C9] font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] md:tracking-[0.3em] text-sm sm:text-base md:text-lg">
                  Legal Excellence
                </span>
              </div>
              
              {/* FIXED HEADING: Responsive sizes to prevent overflow */}
              <h1 className="text-white w-full text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 leading-[1.18] sm:leading-[1.2] md:leading-[1.1] tracking-tight px-1 sm:px-2">
                {contents[currentIndex].title}
              </h1>
              
              {/* Description */}
              <p className="text-white text-xs sm:text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-light px-2 sm:px-4">
                {contents[currentIndex].desc}
              </p>
              
              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
                <button onClick={scrollToContact} className="px-7 sm:px-8 md:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-[#1871C9] to-[#5FA9F4] text-white font-bold rounded-sm hover:from-[#145da5] hover:to-[#1871C9] transition-all uppercase text-[10px] md:text-xs tracking-widest shadow-xl shadow-blue-900/25 active:scale-95 cursor-pointer">
                  Consultation Now
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- SCROLL INDICATOR --- */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-5 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-blue-500 to-transparent" />
        </motion.div>
      </section>

      {/* Sections Below */}
      <AboutSecond />
      <Services />
      <AboutFirst />
      <SectorsSection />
      <ContactForm id="contact" />
      <LawExpandingLayout />
      <Testimonials />
      <Blogs />
      <Faq />     
    </>
  );
};

export default Home;