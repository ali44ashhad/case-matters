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
import SectorsSection from './SectorsSection';
import bgVideo from '../../assets/homeAssets/hero-video.mp4';

const SECTION_SCROLL_OFFSET = 80;

const Home = () => {
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const contents = [
    { 
      id: 1,
      title: "Contract and Claims Management",
      desc: "End-to-end claims support, including claim preparation, evidence collation, correspondence strategy, and systematic record management.",
    },
    {
      id: 2,
      title: "Arbitration",
      desc: "Private dispute resolution through structured proceedings, offering confidentiality, procedural efficiency, and enforceable outcomes.",
    },
    {
      id: 3,
      title: "Contract Advisory & Risk Management",
      desc: "Drafting, review, and interpretation of contracts, coupled with strategic advice on rights and effective allocation of contractual risks.",
    },
    {
      id: 4,
      title: "Initial Advisory Retainership",
      desc: "One Month Free Advisory & Consulting Retainership for Start-Ups, Small and Medium Construction Companies - casematters.info@gmail.com",
    },
    {
      id: 5,
      title: "Employment Advisory & Compliance",
      desc: "Advisory services relating to employment contracts, HR policies, workplace regulations, and ongoing statutory compliance requirements.",
    }
  ];

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
    requestAnimationFrame(() => requestAnimationFrame(run));
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % contents.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [contents.length]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offsetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <>
      <section id="home" className="relative w-full h-screen bg-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={bgVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50 md:bg-black/60" />
        </div>

        <div className="relative z-10 h-full w-full flex items-center justify-center px-6 md:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full max-w-6xl flex flex-col items-center text-center space-y-5 sm:space-y-8"
            > 
              {currentIndex === 3 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -z-10 w-64 h-64 bg-[#E2B13C]/15 blur-[120px] rounded-full"
                />
              )}
              
              {/* SLIGHTLY INCREASED HEADING SIZES */}
              <h1 className={`
                w-full font-serif font-bold tracking-tight px-2 transition-all duration-500 leading-[1.1]
                ${currentIndex === 3 
                  ? "text-[#E2B13C] text-4xl sm:text-6xl md:text-7xl lg:text-8xl italic" 
                  : "text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl"}
              `}>
                {contents[currentIndex].title}
              </h1>
              
              {/* SLIGHTLY INCREASED DESCRIPTION SIZES */}
              <p className={`
                leading-relaxed max-w-2xl mx-auto px-4 transition-all duration-500
                ${currentIndex === 3 
                  ? "text-blue-50 text-sm sm:text-lg md:text-xl font-medium bg-white/5 py-3 px-8 rounded-lg backdrop-blur-md border border-white/10" 
                  : "text-white/90 text-xs sm:text-base md:text-lg font-light"}
              `}>
                {contents[currentIndex].desc}
              </p>
              
              <div className="pt-6 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button 
                  onClick={scrollToContact} 
                  className={`
                    px-10 py-4 font-bold rounded-sm transition-all uppercase text-[11px] tracking-[0.2em] active:scale-95 cursor-pointer
                    ${currentIndex === 3 
                      ? "bg-[#E2B13C] text-[#0A2E52] hover:bg-white shadow-xl shadow-[#E2B13C]/20" 
                      : "bg-gradient-to-r from-[#1871C9] to-[#5FA9F4] text-white hover:brightness-110 shadow-blue-900/30"}
                  `}
                >
                  Consult Now
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div 
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-40"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

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