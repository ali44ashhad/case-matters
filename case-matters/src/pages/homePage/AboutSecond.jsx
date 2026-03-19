import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CheckCircle2, Award, Scale, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSecond = () => {
  const container = useRef();
  const leftContentRef = useRef();
  const listRef = useRef();

  const strengths = [
    {
      title: "Extensive Legal Expertise",
      desc: "200+ legal matters handled, managed and advised by our legal experts.",
      icon: <Scale className="text-white group-hover:text-white transition-colors" size={28} />,
    },
    {
      title: "Decades of Experience",
      desc: "Over 70 years of combined legal and advisory experience across diverse jurisdictions.",
      icon: <Award className="text-white group-hover:text-white transition-colors" size={28} />,
    },
    {
      title: "High-Value Claims",
      desc: "Matters involving high-value claim amounts exceeding ₹350 crores handled with precision.",
      icon: <CheckCircle2 className="text-white group-hover:text-white transition-colors" size={28} />,
    },
    {
      title: "Large-Scale Projects",
      desc: "Strategic advisory for high-value projects reaching up to ₹2,000 crores.",
      icon: <Briefcase className="text-white group-hover:text-white transition-colors" size={28} />,
    }
  ];

  useGSAP(() => {
    // Reveal Left Content
    gsap.from(leftContentRef.current, {
      opacity: 0,
      x: -50,
      duration: 1,
      scrollTrigger: {
        trigger: leftContentRef.current,
        start: "top 80%",
      }
    });

    // Animate Strength Items with a "Staircase" effect
    const items = listRef.current.querySelectorAll('.strength-item');
    items.forEach((item, index) => {
      gsap.from(item, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
        }
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-[#161617] py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Side: Impactful Heading */}
          <div ref={leftContentRef} className="lg:w-1/2 space-y-6">
            <div className="inline-block px-4 py-1 rounded-full bg-[#1871C9]/10 text-[#1871C9] text-xs font-bold uppercase tracking-widest border border-[#1871C9]/20">
              Our Core Strengths
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
              Trusted Legal <br />
              <span className="text-[#1871C9]">Solutions</span>
            </h2>
            <div className="w-20 h-1.5 bg-[#1871C9]" />
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-lg">
              At Case Matters, transparency and consistency are at the core of everything we do — 
              delivering results that truly redefine legal excellence.
            </p>
            <div className="pt-4">
               <button className="px-8 py-4 bg-[#1871C9] text-white font-bold rounded-sm hover:bg-[#145da5] transition-all shadow-lg active:scale-95 uppercase tracking-wider text-sm">
                 Discover Our Practice
              </button>
            </div>
          </div>

          {/* Right Side: Visual List */}
          <div ref={listRef} className="lg:w-1/2 w-full space-y-12">
            {strengths.map((item, index) => (
              <div 
                key={index} 
                className="strength-item flex gap-6 group cursor-default"
              >
                {/* Number/Icon Column */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border-2 border-[#1871C9] flex items-center justify-center bg-transparent group-hover:bg-[#1871C9] transition-all duration-500 shadow-[0_0_15px_rgba(24,113,201,0.2)]">
                    {item.icon}
                  </div>
                  {index !== strengths.length - 1 && (
                    <div className="w-[1px] h-full bg-zinc-800 group-hover:bg-[#1871C9]/50 transition-colors mt-4" />
                  )}
                </div>

                {/* Text Column */}
                <div className="pb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#1871C9] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 text-sm md:text-base leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Subtle Background Text for Premium Feel */}
      <div className="absolute top-10 right-[-5%] text-[15rem] font-serif font-bold text-white/[0.02] -z-10 select-none pointer-events-none">
        EST.
      </div>
    </section>
  );
};

export default AboutSecond;