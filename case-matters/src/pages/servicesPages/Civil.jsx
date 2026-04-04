import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ContactForm from '../homePage/ContactForm';
import OtherServicesSection from '../../components/OtherServicesSection';
import { Link } from 'react-router-dom';

const Civil = () => {
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
 <section ref={container} className="relative min-h-screen w-full overflow-hidden bg-white font-sans flex items-center pt-20">
      {/* 1. Fully Responsive Background Image */}
      <img
        src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2000&auto=format&fit=crop"
        alt="Law Court Interior"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      
      {/* 2. Premium Cinematic Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* 3. Main Content Grid */}
      <div className="relative z-10 w-full mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT BLOCK: Content & GSAP Animation */}
        <div className="space-y-8">
          <div ref={carpetRef} className="overflow-hidden">
            <h1 className="text-white text-4xl md:text-6xl lg:text-6xl font-extrabold tracking-tighter text-gray-900 leading-tight">
              Civil, Commercial & <br />
              <span className="text-[#1871C9]">Business Litigation.</span>
            </h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-white text-lg md:text-xl text-gray-700 max-w-xl font-light leading-relaxed">
                We represent clients before courts and tribunals in a wide range of civil, commercial, and personal disputes. From pre-litigation advisory and drafting to trial and appellate representation, we handle matters with diligence and precision.
              </p>
              <p className="text-white text-base md:text-lg text-gray-600 max-w-xl border-l-2 border-white pl-6 italic">
                Our focus remains on protecting business interests while aiming for commercially viable outcomes that minimise disruption and risk.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/all-services">
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#145da5" }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-[#1871C9] px-10 py-4 font-bold text-white shadow-[0_0_20px_rgba(24,113,201,0.3)] transition-all"
              >
                View Services
              </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* RIGHT BLOCK: High-Value Representation Details */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative group hidden lg:block"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-gray-200/60 bg-black/60 backdrop-blur p-10 shadow-2xl">
            <h3 className="text-[#1871C9] text-sm font-bold uppercase tracking-widest mb-6">Dispute Resolution Strategy</h3>
            <div className="space-y-6 text-gray-700">
               <p className="text-gray-200 text-sm leading-relaxed">
                 We assist businesses in resolving conflicts involving:
               </p>
               <ul className="space-y-3">
                 {['Shareholders & Partners', 'Vendors & Customers', 'Key Stakeholders'].map((item, idx) => (
                   <li key={idx} className="flex items-center gap-3 text-gray-200 font-medium">
                     <span className="h-1.5 w-1.5 rounded-full bg-[#1871C9]" /> {item}
                   </li>
                 ))}
               </ul>
               <p className="text-white text-sm leading-relaxed pt-4 border-t border-gray-200">
                 Representation across Courts and Arbitral Tribunals with comprehensive negotiated settlement assistance.
               </p>
            </div>
            
            {/* Background Glow Ornament */}
            <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-[#1871C9]/10 blur-[100px] rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* 4. Fixed Jurisprudential Quote Background */}
      <div className="absolute bottom-10 right-10 opacity-5 pointer-events-none hidden md:block">
        <span className="text-7xl font-serif italic text-gray-300 select-none">"Ubi Jus Ibi Remedium"</span>
      </div>
    </section>
    <ContactForm/>
    <OtherServicesSection currentPath="/services/civil" />
   </>
  );
};

export default Civil;