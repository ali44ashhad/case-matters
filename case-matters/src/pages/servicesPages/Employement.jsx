import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ContactForm from '../homePage/ContactForm';
import employementImage from '../../assets/homeAssets/advisory-image.jpg';

const Employement = () => {
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
  <section ref={container} className="pt-30 relative min-h-screen w-full overflow-hidden bg-zinc-950 font-sans flex items-center">
  {/* 1. Fully Responsive Background Image */}
  <img
    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
    alt="Corporate Office Background"
    className="absolute inset-0 h-full w-full object-cover opacity-30"
  />
  
  {/* 2. Premium Cinematic Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent" />

  {/* 3. Main Content Grid */}
  <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
    
    {/* LEFT BLOCK: Content & GSAP Animation */}
    <div className="space-y-8">
      <div ref={carpetRef} className="overflow-hidden">
        <p className="text-[#1871C9] font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base">
          Employment Law
        </p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-[0.95]">
          Advisory & <br />
          <span className="text-[#1871C9]">Compliance.</span>
        </h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="space-y-6"
      >
        <div className="space-y-4">
          <p className="text-lg md:text-xl text-zinc-300 max-w-xl font-light leading-relaxed">
            Employment and labour laws require careful compliance and sensitive handling. We advise organisations and individuals on <span className="text-white font-medium">contracts, HR policies, and statutory obligations.</span>
          </p>
          <p className="text-base md:text-lg text-zinc-400 max-w-xl font-light leading-relaxed">
            Our focus is on preventing disputes through sound legal advice while providing strong representation where disputes arise.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 pt-4">
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#145da5" }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-[#1871C9] px-8 md:px-10 py-4 font-bold text-white shadow-[0_0_20px_rgba(24,113,201,0.3)] transition-all text-sm md:text-base"
          >
            Workforce Solutions
          </motion.button>
          <button className="rounded-full border border-white/20 bg-white/5 px-8 md:px-10 py-4 font-semibold text-white backdrop-blur-md hover:bg-white/10 transition-all text-sm md:text-base">
            Get Legal Guidance
          </button>
        </div>
      </motion.div>
    </div>

    {/* RIGHT BLOCK: Framer Motion Image Card */}
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      className="relative group hidden lg:block"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 aspect-[4/5] shadow-2xl">
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8 }}
          src={employementImage} 
          className="h-full w-full object-cover"
          alt="Employment Consultation"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
        
        {/* Floating Glass Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <p className="text-[#1871C9] text-sm font-bold uppercase tracking-widest">Compliance First</p>
          <p className="text-white text-lg mt-1 font-medium leading-snug">
            Protecting employers and employees through lawful workforce management.
          </p>
        </motion.div>
      </div>
      
      {/* Background Glow Ornament */}
      <div className="absolute -z-10 -top-10 -right-10 w-72 h-72 bg-[#1871C9]/10 blur-[120px] rounded-full" />
    </motion.div>
  </div>

  {/* 4. Fixed Quote Background */}
  <div className="absolute bottom-10 right-10 opacity-5 pointer-events-none hidden md:block">
    <span className="text-7xl lg:text-8xl font-serif italic text-white select-none">"Iustitia Omnibus"</span>
  </div>
</section>
    
    <ContactForm/>
   </>
  );
};

export default Employement;