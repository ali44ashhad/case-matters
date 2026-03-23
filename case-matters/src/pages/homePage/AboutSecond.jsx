import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CheckCircle2, Award, Scale, Briefcase, Gavel } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSecond = () => {
  const container = useRef();
  const leftBlock = useRef();
  const rightBlock = useRef();

  const strengths = [
    {
      title: "Extensive Legal Expertise",
      desc: "200+ legal matters handled, managed and advised by our legal experts.",
      icon: <Scale size={28} />,
    },
    {
      title: "Decades of Experience",
      desc: "Over 70 years of combined legal and advisory experience across diverse jurisdictions.",
      icon: <Award size={28} />,
    },
    {
      title: "High-Value Claims",
      desc: "Matters involving high-value claim amounts exceeding ₹350 crores handled with precision.",
      icon: <CheckCircle2 size={28} />,
    },
    {
      title: "Large-Scale Projects",
      desc: "Strategic advisory for high-value projects reaching up to ₹2,000 crores.",
      icon: <Briefcase size={28} />,
    }
  ];

  useGSAP(() => {
    // Left Block: Comes from left (-x) to center (0)
    gsap.fromTo(leftBlock.current, 
      { x: -300, opacity: 0 }, 
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom", // Starts when top of section hits bottom of screen
          end: "top 20%",     // Ends when top of section hits 20% from top
          scrub: 1,           // Smoothly follows scroll up and down
        }
      }
    );

    // Right Block: Comes from right (+x) to center (0)
    gsap.fromTo(rightBlock.current, 
      { x: 300, opacity: 0 }, 
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "top 20%",
          scrub: 1,
        }
      }
    );

    // Wavy Law Icon Animation (Infinite Loop)
    gsap.to(".bg-wave-icon", {
      y: 30,
      rotate: 8,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-white py-20 lg:py-32 overflow-hidden">
      
      {/* Background Wavy Law Icon */}
      <div className="bg-wave-icon absolute top-10 left-[-5%] -z-10 opacity-[0.03] text-[#1871C9] pointer-events-none">
        <Gavel size={500} strokeWidth={1} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Block */}
          <div ref={leftBlock} className="lg:w-1/2 space-y-6">
            <div className="inline-block px-4 py-1 rounded-full bg-[#1871C9]/10 text-[#1871C9] text-xs font-bold uppercase tracking-widest border border-[#1871C9]/20">
              Our Core Strengths
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
              Trusted Legal <br />
              <span className="text-[#1871C9]">Solutions</span>
            </h2>
            <div className="w-20 h-1.5 bg-[#1871C9]" />
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-lg">
              At Case Matters, transparency and consistency are at the core of everything we do — 
              delivering results that truly redefine legal excellence.
            </p>
            <div className="pt-4">
               <button className="px-8 py-4 bg-[#1871C9] text-white font-bold rounded-sm hover:bg-[#145da5] transition-all shadow-lg active:scale-95 uppercase tracking-wider text-sm">
                 Discover Our Practice
              </button>
            </div>
          </div>

          {/* Right Block */}
          <div ref={rightBlock} className="lg:w-1/2 w-full space-y-12">
            {strengths.map((item, index) => (
              <div 
                key={index} 
                className="strength-item flex gap-6 group cursor-default"
              >
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border-2 border-[#1871C9] flex items-center justify-center bg-transparent group-hover:bg-[#1871C9] text-gray-900 group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  {index !== strengths.length - 1 && (
                    <div className="w-[1px] h-full bg-gray-200 group-hover:bg-[#1871C9]/50 transition-colors mt-4" />
                  )}
                </div>

                <div className="pb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#1871C9] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Background EST. Text */}
      <div className="absolute bottom-10 right-[-5%] text-[15rem] font-serif font-bold text-gray-900/[0.03] -z-10 select-none pointer-events-none">
        EST.
      </div>
    </section>
  );
};

export default AboutSecond;