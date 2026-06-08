import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ContactForm from '../homePage/ContactForm';
import OtherServicesSection from '../../components/OtherServicesSection';
import { Link } from 'react-router-dom';
import arbitrationImage from '../../assets/homeAssets/arbritation-left.jpeg';

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
    <section ref={container} className="pt-24 sm:pt-28 relative min-h-screen w-full overflow-hidden bg-white font-sans flex items-center py-12 lg:py-16">
      {/* 1. Fully Responsive Background Image */}
      <img
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
        alt="Legal Firm Architecture"
        className="absolute inset-0 h-full w-full object-cover"
      />
      
      {/* 2. Premium Cinematic Overlay */}
      <div className="absolute inset-0 bg-black/60 md:bg-black/50" />

      {/* 3. Main Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT BLOCK: Content & GSAP Animation */}
        <div className="space-y-4 order-1 lg:order-1">
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
            <div className="space-y-3">
              <p className="text-gray-200 text-base md:text-xl font-light leading-relaxed">
                Arbitration is a private and efficient dispute resolution mechanism that allows parties to resolve disputes outside the traditional court system. It offers confidentiality, procedural flexibility, and faster resolution when compared to conventional litigation.
              </p>
              <p className="text-gray-200 text-base md:text-xl font-light leading-relaxed">
                We advise and represent clients at every stage of the arbitration process, right from drafting and invoking arbitration clauses to conducting proceedings and enforcing arbitral awards. Our approach is strategic and evidence-driven, ensuring that disputes are resolved fairly while safeguarding commercial interests. Arbitration is particularly effective for commercial, contractual, construction, and infrastructure-related disputes where time, cost, and business continuity are critical considerations.
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT BLOCK: Adjusted height rules and added targeted down-shifting layout rules */}
        <motion.div 
          initial={{ opacity: 0, x: window?.innerWidth < 1024 ? 0 : 50, y: window?.innerWidth < 1024 ? 30 : 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative group block order-2 lg:order-2 mt-6 lg:mt-0 lg:translate-y-12 w-full max-w-[550px] mx-auto"
        >
          {/* Capped maximum height constraints across layout states */}
          <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-gray-200/40 aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/5] max-h-[480px] md:max-h-[540px] shadow-2xl">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              src={arbitrationImage} 
              className="h-full w-full object-cover"
              alt="Professional Advisory"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            {/* Floating Glass Stat Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-4 md:p-5 rounded-xl md:rounded-2xl bg-gray-200/80 border border-gray-200/50 backdrop-blur-lg"
            >
              <p className="text-[#1871C9] text-xs md:text-sm font-bold uppercase tracking-widest">Global Expertise</p>
              <p className="text-gray-900 text-[11px] sm:text-xs md:text-sm mt-1 font-medium leading-normal md:leading-relaxed">
                We provide strategic representation in arbitration proceedings, including assistance in initiating arbitration, appointment of tribunals, conduct of proceedings, and enforcement of awards. Throughout the process, we focus on achieving timely, commercially viable resolutions while safeguarding our clients’ contractual rights and project interests.
              </p>
            </motion.div>
          </div>
          
          {/* Background Glow Ornament */}
          <div className="absolute -z-10 -top-10 -right-10 md:-top-16 md:-right-16 w-44 h-44 md:w-64 md:h-64 bg-[#E2B13C]/20 blur-[80px] md:blur-[100px] rounded-full" />
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