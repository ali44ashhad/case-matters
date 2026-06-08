import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ContactForm from '../homePage/ContactForm';
import OtherServicesSection from '../../components/OtherServicesSection';

const StartUp = () => {
  const container = useRef();
  const carpetRef = useRef();

  useGSAP(() => {
    // Left-to-right "Carpet Unroll" for the heading
    gsap.fromTo(carpetRef.current,
      { clipPath: "inset(0 100% 0 0)", x: -50, skewX: 10 },
      { 
        clipPath: "inset(0 0% 0 0)", 
        x: 0, 
        skewX: 0, 
        duration: 2, 
        ease: "expo.out",
        delay: 0.2 
      }
    );
  }, { scope: container });

  return (
   <>
    <section
      ref={container}
      className="relative min-h-screen w-full overflow-hidden bg-white font-sans flex items-center pt-24 pb-12 lg:pt-20 lg:pb-0"
    >
      {/* 1. Background Image - Modern, architectural/tech-vibe for startups */}
      <img
        src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2000&auto=format&fit=crop"
        alt="Modern Startup Environment"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      {/* 2. Cinematic Overlay */}
      <div className="absolute inset-0 bg-black/65 md:bg-black/50" />

      {/* 3. Main Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* LEFT BLOCK: Content & Text Animations */}
        <div className="space-y-6 md:space-y-8 order-1 lg:order-1">
          <div ref={carpetRef} className="overflow-hidden">
            <p className="text-[#1871C9] font-bold tracking-[0.2em] uppercase mb-2 md:mb-3 text-xs md:text-sm">
              Venture Support
            </p>
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight lg:leading-[1.1]">
              MSME / Startup Law<br />
              <span className="text-[#1871C9]">& Compliance.</span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-gray-200 text-base md:text-xl leading-relaxed font-light">
                Early-stage businesses face unique legal challenges. We assist founders with 
                <span className="text-white font-medium"> legal structuring, contractual documentation, and regulatory requirements.</span>
              </p>
              
              <p className="text-gray-300 text-sm md:text-base leading-relaxed border-l-2 border-[#1871C9]/50 pl-5 italic max-w-lg">
                Our services support growth while ensuring compliance, helping you focus on building your venture with confidence.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/all-services">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#145da5" }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-[#1871C9] px-8 py-3.5 text-xs md:text-sm font-bold text-white shadow-[0_10px_20px_rgba(24,113,201,0.2)] transition-all uppercase tracking-wider"
                >
                  Launch Securely
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* RIGHT BLOCK: Dynamic Info Cards - Fully Responsive Wrapper */}
        <motion.div
          initial={{ opacity: 0, x: window?.innerWidth < 1024 ? 0 : 40, y: window?.innerWidth < 1024 ? 30 : 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative space-y-4 md:space-y-5 block order-2 lg:order-2 mt-4 lg:mt-0"
        >
          {/* Card 1 */}
          <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-white/10 bg-black/50 p-6 md:p-8 backdrop-blur-lg group hover:border-white/20 transition-all">
            <h3 className="text-[#1871C9] text-xs font-black uppercase tracking-[0.2em] mb-2 md:mb-3">
              Scalable Infrastructure
            </h3>
            <p className="text-gray-200 text-sm md:text-base leading-relaxed">
              We provide clear, commercially sensible advice tailored to the evolving 
              needs of startups and emerging enterprises.
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-white/10 bg-black/50 p-6 md:p-8 group backdrop-blur-lg hover:border-white/20 transition-all">
            <p className="text-gray-200 text-sm md:text-base leading-relaxed relative z-10">
              From legal structuring to complex regulatory navigation, we manage the risk 
              so you can manage the innovation.
            </p>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1871C9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Background Glow Ornament */}
          <div className="absolute -z-10 -bottom-10 -right-10 w-44 h-44 md:w-64 md:h-64 bg-[#1871C9]/10 blur-[80px] md:blur-[100px] rounded-full" />
        </motion.div>
      </div>

      {/* 4. Background Quote */}
      <div className="absolute bottom-10 right-10 opacity-5 pointer-events-none hidden md:block">
        <span className="text-6xl lg:text-8xl font-serif italic text-gray-300 select-none">
          "Res Ipsa Loquitur"
        </span>
      </div>
    </section>
    
    <ContactForm/>
    <OtherServicesSection currentPath="/services/startup" />
   </>
  );
};

export default StartUp;