import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ContactForm from '../homePage/ContactForm';
import OtherServicesSection from '../../components/OtherServicesSection';
import { Link } from 'react-router-dom';

const Arbitration = () => {
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
    <section ref={container} className="pt-30 relative min-h-screen w-full overflow-hidden bg-white font-sans flex items-center">
      {/* 1. Fully Responsive Background Image */}
      <img
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
        alt="Legal Firm Architecture"
        className="absolute inset-0 h-full w-full object-cover"
      />
      
      {/* 2. Premium Cinematic Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 3. Main Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT BLOCK: Content & GSAP Animation */}
        <div className="space-y-4">
          <div ref={carpetRef} className="overflow-hidden">
            <h1 className="text-[#1871C9] text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[0.9]">
              Arbitration  
            </h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="space-y-6"
          >
            <div className="space-y-3 ">
              <p className="text-gray-200 text-lg md:text-xl font-light leading-relaxed">
                Arbitration is a private and efficient dispute resolution mechanism that allows parties to resolve disputes outside the traditional court system. It offers confidentiality, procedural flexibility, and faster resolution when compared to conventional litigation.
              </p>
              <p className="text-gray-200 text-lg md:text-xl font-light leading-relaxed">
                We advise and represent clients at every stage of the arbitration process, right from drafting and invoking arbitration clauses to conducting proceedings and enforcing arbitral awards. Our approach is strategic and evidence-driven, ensuring that disputes are resolved fairly while safeguarding commercial interests. Arbitration is particularly effective for commercial, contractual, construction, and infrastructure-related disputes where time, cost, and business continuity are critical considerations.
              </p>
            </div>
            
            {/* <div className="flex flex-wrap gap-4">
              <Link to="/all-services">
              <motion.button 
                 whileTap={{ scale: 0.95 }}
                className="rounded-full bg-[#1871C9] hover:cursor-pointer hover:bg-[#1871C9]/80 px-10 py-4 font-bold text-zinc-950 shadow-[0_0_20px_rgba(24,113,201,0.3)] transition-all"
              >
                Our Practice
              </motion.button>
              </Link>
              
            </div> */}
          </motion.div>
        </div>

        {/* RIGHT BLOCK: Framer Motion Image Card */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative group hidden lg:block"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-gray-200/60 aspect-[4/5] shadow-2xl">
            <motion.img 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.8 }}
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop" 
              className="h-full w-full object-cover"
              alt="Professional Advisory"
            />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Floating Glass Stat Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-gray-200/70 border border-gray-200/60 backdrop-blur-xl"
            >
              <p className="text-[#1871C9] text-sm font-bold uppercase tracking-widest">Global Expertise</p>
              <p className="text-gray-900 text-lg mt-1 font-medium">Over 70 years of combined legal experience.</p>
            </motion.div>
          </div>
          
          {/* Background Glow Ornament */}
          <div className="absolute -z-10 -top-20 -right-20 w-64 h-64 bg-[#E2B13C]/20 blur-[100px] rounded-full" />
        </motion.div>
      </div>

      {/* 4. Fixed Jurisprudential Quote Background */}
      <div className="absolute bottom-10 right-10 opacity-5 pointer-events-none hidden md:block">
        <span className="text-8xl font-serif italic text-gray-300 select-none">"Lex Est Dictamen Rationis"</span>
      </div>
    </section>
    
    <ContactForm/>
    <OtherServicesSection currentPath="/services/arbitration" />
   </>
  );
};

export default Arbitration;