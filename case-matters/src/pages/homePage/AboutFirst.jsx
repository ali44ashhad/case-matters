import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, ShieldCheck, Award, Landmark } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import expertImage from '../../assets/homeAssets/expert-abrivation.png'

// const highlights = [
//     { icon: <Scale size={24} />, title: "Expert Litigation" },
//     { icon: <ShieldCheck size={24} />, title: "Risk Advisory" },
//     { icon: <Award size={24} />, title: "Certified Excellence" },
//     { icon: <Landmark size={24} />, title: "Corporate Law" },
//   ];



gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutFirst = () => {
    const container = useRef(null);

    useGSAP(() => {
        const panels = gsap.utils.toArray('.panel-wrapper');

        // GSAP Timeline for Stacking Effect
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "+=300%",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            }
        });

        panels.forEach((panel, i) => {
            if (i === 0) return; // Base layer stays put
            tl.fromTo(panel,
                { yPercent: 100 },
                { yPercent: 0, ease: "none" }
            );
        });
    }, { scope: container });

    return (
        <>
{/* <section className="relative bg-zinc-950 py-20 lg:py-32 px-6 overflow-hidden">
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E2B13C]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
         <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-[#E2B13C] uppercase tracking-[0.3em] text-sm font-bold flex items-center gap-3">
              <span className="w-12 h-[1px] bg-[#E2B13C]"></span>
              Legal & Advisory Excellence
            </h2>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              Case Matters: Tailored <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E2B13C] to-[#c4921d]">
                Outcome-Oriented Solutions.
              </span>
            </h1>
          </div>

          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
            We bring decades of experience across arbitration, contract management, and litigation. 
            By combining deep subject-matter expertise with a structured, detail-driven approach, 
            we ensure every case is supported by strong factual and legal foundations.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            {highlights.map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-white/80">
                <div className="text-[#E2B13C]">{item.icon}</div>
                <span className="text-sm md:text-base font-medium uppercase tracking-wide">{item.title}</span>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <button className="group relative px-8 py-4 bg-[#E2B13C] text-black font-bold uppercase tracking-widest text-xs transition-all hover:bg-white overflow-hidden">
              <span className="relative z-10">Consult Our Experts</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        </motion.div>

         <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
           <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1200" 
              alt="Case Matters Legal Office" 
              className="w-full h-[400px] md:h-[600px] object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
          </div>

           <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-10 z-20 hidden md:block p-8 bg-zinc-900 border border-[#E2B13C]/30 shadow-2xl rounded-xl"
          >
            <p className="text-[#E2B13C] text-4xl font-serif font-bold italic leading-none">Decades</p>
            <p className="text-white/60 text-xs uppercase tracking-widest mt-2">Of Specialized <br /> Legal Experience</p>
          </motion.div>

           <div className="absolute -top-6 -right-6 w-full h-full border-2 border-[#E2B13C]/20 rounded-2xl z-0 pointer-events-none"></div>
        </motion.div>

      </div>
    </section> */}
        
        <div id="about" ref={container} className="relative w-full h-screen overflow-hidden bg-white font-sans">

             <div className="panel-wrapper absolute inset-0 z-10 w-full h-full overflow-hidden">
   <div className="absolute inset-0 w-full h-full">
    <img 
      src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop" 
      alt="Legal Background"
      className="w-full h-full object-cover"
    />
     <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
  </div>

  <section className="relative h-screen w-full flex flex-col items-center justify-center text-gray-900 text-center px-6">
    <div className="max-w-4xl z-20">
      <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
        Why Choose <span className="text-[#1871C9]">Case Matters?</span>
      </h1>
      
      <p className="mt-8 text-gray-200 text-base md:text-lg lg:text-xl uppercase tracking-[0.2em] font-medium max-w-3xl mx-auto leading-relaxed">
        Decades of expertise in arbitration, contract management, and litigation. 
        We transform complex legal challenges into practical, effective commercial solutions.
      </p>

       <div className="mt-10 w-24 h-1 bg-[#1871C9] mx-auto rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
    </div>
  </section>
</div>

 <div className="panel-wrapper absolute inset-0 z-20 w-full h-full overflow-hidden">
    <div className="absolute inset-0 w-full h-full">
        <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover" 
            alt="Strategic Planning"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
    </div>
    <section className="relative h-screen w-full flex flex-col items-center justify-center text-gray-900 text-center px-6 border-t border-gray-200/60 shadow-[0_-50px_100px_rgba(0,0,0,0.08)]">
        <div className="max-w-4xl z-10">
            <h2 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter leading-tight">
                Strategic <span className="text-[#1871C9]">Prevention</span>
            </h2>
            <p className="mt-6 text-gray-200 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                Legal support goes beyond resolving disputes—it’s about preventing them. Through robust contract advisory and risk assessment, we minimize your exposure before conflicts arise.
            </p>
        </div>
    </section>
</div>

{/* --- THIRD SECTION: DISPUTE RESOLUTION --- */}
<div className="panel-wrapper absolute inset-0 z-30 w-full h-full overflow-hidden">
    <div className="absolute inset-0 w-full h-full">
        <img 
            src={expertImage} 
            className="w-full h-full object-cover" 
            alt="Arbitration Gavel"
        />
        <div className="absolute inset-0 bg-black/70" />
    </div>
    <section className="relative h-screen w-full flex flex-col items-center justify-center text-zinc-900 text-center px-6 shadow-[0_-50px_100px_rgba(0,0,0,0.4)]">
        <div className="max-w-5xl z-10">
            <h2 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter leading-tight">
                Expert <span className="text-[#1871C9]">Arbitration</span>
            </h2>
            <p className="text-gray-200 mt-6 text-lg md:text-xl font-semibold max-w-2xl mx-auto leading-relaxed">
                We guide clients through private dispute resolution with strategic clarity. From claim preparation to final enforcement, we manage the entire process with diligence and confidentiality.
            </p>
            <div className="mt-12">
            <button className="w-fit md:w-auto px-6 py-3 md:px-12 md:py-5 bg-[#1871C9] text-white rounded-full font-black text-sm md:text-xl hover:scale-105 transition-all active:scale-95 shadow-xl md:shadow-2xl uppercase tracking-wider md:tracking-widest">
  Consult an Expert
</button>
            </div>
        </div>
    </section>
</div>

{/* --- FOURTH SECTION: DISCIPLINED LITIGATION --- */}


        </div>


        {/* <div className="w-full flex justify-center">
      <div className="relative w-full aspect-video">
        <video
          className="w-full h-full object-cover pointer-events-none"
          src={homeVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </div> */}
        </>
    );
};

export default AboutFirst;