import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ContactForm from '../homePage/ContactForm';
import contractClaimImage from '../../assets/homeAssets/contract-claim.jpg';

const ContractClaim = () => {
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

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
          alt="Legal Firm Architecture"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />

        {/* Content Grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-6">

            <div ref={carpetRef} className="overflow-hidden">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Contract & Claims <br />
                <span className="text-[#1871C9]">Management</span>
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="space-y-5"
            >
              <p className="text-base md:text-lg text-zinc-300 max-w-xl leading-relaxed">
                Effective claims management requires meticulous preparation, documentation, and legal strategy. We provide comprehensive support in the preparation and prosecution of contractual and commercial claims.
              </p>

              <p className="text-sm md:text-base text-zinc-400 max-w-xl border-l-2 border-[#1871C9]/50 pl-5 italic">
                Our services include identifying entitlement, structuring claims, analysing evidence, managing correspondence, and maintaining detailed records to support claims or defences in negotiations, arbitration, or litigation.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#145da5" }} // Darker shade for hover
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-[#1871C9] px-8 py-3 font-semibold text-white shadow-lg transition" // Text color changed to white for contrast
                >
                  Claims Advisory
                </motion.button>

                <button className="rounded-full border border-white/20 bg-white/5 px-8 py-3 font-medium text-white backdrop-blur-md hover:bg-white/10 transition">
                  Legal Consultation
                </button>
              </div>
            </motion.div>
          </div>

          {/* RIGHT IMAGE CARD */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative group hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">

              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8 }}
                src={contractClaimImage}
                className="h-full w-full object-contain"
                alt="Claims Management"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />


            </div>

            {/* Glow */}
            <div className="absolute -z-10 -top-20 -right-20 w-64 h-64 bg-[#1871C9]/20 blur-[100px] rounded-full" />
          </motion.div>

        </div>

        {/* Background Quote */}
        <div className="absolute bottom-10 right-10 opacity-5 pointer-events-none hidden md:block">
          <span className="text-7xl font-serif italic text-white select-none">
            "Lex Est Dictamen Rationis"
          </span>
        </div>

      </section>

      <ContactForm />
    </>
  );
};

export default ContractClaim;