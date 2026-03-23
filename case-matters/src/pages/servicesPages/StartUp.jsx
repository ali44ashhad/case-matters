import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ContactForm from '../homePage/ContactForm';

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
  className="relative min-h-screen w-full overflow-hidden bg-white font-sans flex items-center pt-20"
>
  {/* 1. Background Image - Updated to a modern, architectural/tech-vibe for startups */}
  <img
    src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2000&auto=format&fit=crop"
    alt="Modern Startup Environment"
    className="absolute inset-0 h-full w-full object-cover opacity-80"
  />

  {/* 2. Cinematic Overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* 3. Main Content Grid */}
  <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12">

    {/* LEFT BLOCK: Content & Text Animations */}
    <div className="space-y-8">
      <div ref={carpetRef} className="overflow-hidden">
        <p className="text-[#1871C9] font-bold tracking-[0.2em] uppercase mb-3 text-xs md:text-sm">
          Venture Support
        </p>
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-semibold tracking-tight text-gray-900 leading-[1.1]">
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
          <p className="text-white text-lg md:text-xl text-gray-700 max-w-xl leading-relaxed font-light">
            Early-stage businesses face unique legal challenges. We assist founders with 
            <span className="text-white font-medium"> legal structuring, contractual documentation, and regulatory requirements.</span>
          </p>
          
          <p className="text-white text-base text-gray-600 max-w-lg leading-relaxed border-l-2 border-white
           pl-5 italic">
            Our services support growth while ensuring compliance, helping you focus on building your venture with confidence.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
         <Link to="/all-services">
         <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#145da5" }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-[#1871C9] px-8 py-4 text-sm font-bold text-white shadow-[0_10px_20px_rgba(24,113,201,0.2)] transition-all"
          >
            Launch Securely
          </motion.button>
         </Link>

        </div>
      </motion.div>
    </div>

    {/* RIGHT BLOCK: Dynamic Info Cards */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
      className="relative space-y-5 hidden lg:block"
    >
      {/* Card 1 */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200/60 bg-black/20 p-8 backdrop-blur group hover:border-gray-200 transition-all">
        <h3 className="text-[#1871C9] text-xs font-black uppercase tracking-[0.2em] mb-3">
          Scalable Infrastructure
        </h3>
        <p className="text-white text-gray-700 text-sm md:text-base leading-relaxed">
          We provide clear, commercially sensible advice tailored to the evolving 
          needs of startups and emerging enterprises.
        </p>
      </div>

      {/* Card 2 */}
      <div className="relative overflow-hidden rounded-2xl border border-[#1871C9]/20 bg-black/20 p-8 group backdrop-blur hover:bg-gray-200/80 transition-all">
        <p className="text-white text-gray-700 text-sm md:text-base leading-relaxed relative z-10">
          From legal structuring to complex regulatory navigation, we manage the risk 
          so you can manage the innovation.
        </p>
        <div className="absolute inset-0 bg-gradient-to-br from-[#1871C9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Background Glow Ornament */}
      <div className="absolute -z-10 -bottom-20 -right-10 w-64 h-64 bg-[#1871C9]/10 blur-[100px] rounded-full" />
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
   </>
  );
};

export default StartUp;