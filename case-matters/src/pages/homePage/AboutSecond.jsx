import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Scale } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger); 

const AboutSecond = () => {
  const container = useRef(null);
  const leftBlock = useRef(null);
  const rightBlock = useRef(null);
  const statRefs = useRef([]);

  const strengths = [
    {
      title: "Extensive Legal Expertise",
      desc: "200+ legal matters handled, managed and advised by our legal experts.",
    },
    {
      title: "Decades of Experience",
      desc: "Over 70 years of combined legal and advisory experience across diverse jurisdictions.",
    },
    {
      title: "High-Value Claims",
      desc: "Matters involving high-value claim amounts exceeding ₹350 crores handled with precision.",
    },
    {
      title: "Large-Scale Projects",
      desc: "Strategic advisory for high-value projects reaching up to ₹2,000 crores.",
    }
  ];

  // GSAP Animations
  useGSAP(() => {
    // Set initial states for cinematic entrance
    gsap.set(leftBlock.current, { x: -400, opacity: 0, rotationY: -12 });
    gsap.set(rightBlock.current, { x: 400, opacity: 0, rotationY: 12 });
    
    // Scroll-triggered entrance for left and right blocks
    ScrollTrigger.create({
      trigger: container.current,
      start: "top 85%",
      end: "top 25%",
      scrub: 1.2,
      onUpdate: (self) => {
        const prog = self.progress;
        gsap.set(leftBlock.current, { 
          x: -400 + (prog * 400), 
          opacity: prog, 
          rotationY: -12 + (prog * 12) 
        });
        gsap.set(rightBlock.current, { 
          x: 400 - (prog * 400), 
          opacity: prog, 
          rotationY: 12 - (prog * 12) 
        });
      }
    });
    
    // Staggered entrance for strength items
    const items = gsap.utils.toArray('.strength-item-3d');
    gsap.fromTo(items, 
      { y: 60, opacity: 0, scale: 0.92 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.12,
        ease: "back.out(0.6)",
        scrollTrigger: {
          trigger: rightBlock.current,
          start: "top 75%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        }
      }
    );

    // Count-up numbers inside the original text (1 -> end) on scroll
    const formatNumber = (n) => new Intl.NumberFormat('en-IN').format(Math.max(1, Math.floor(n)));
    const targets = [200, 70, 350, 2000];

    statRefs.current.forEach((el, index) => {
      const end = targets[index];
      if (!el || !end) return;

      const holder = { value: 1 };
      el.textContent = formatNumber(1);

      gsap.to(holder, {
        value: end,
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = formatNumber(holder.value);
        },
        scrollTrigger: {
          trigger: rightBlock.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    });
    
    // Button subtle pulse animation
    const btn = container.current?.querySelector?.('.btn-cinematic');
    if (btn) {
      gsap.to(btn, {
        scale: 1.03,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        boxShadow: "0 0 20px rgba(24,113,201,0.7)",
      });
    }
  }, { scope: container });
  
  return (
    <section 
      ref={container} 
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#eef6ff] to-[#dcecff]"
    >
      <style>
        {`
          @keyframes floatSlow {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-14px); }
            100% { transform: translateY(0px); }
          }
          .animate-float-slow {
            animation: floatSlow 7s ease-in-out infinite;
          }
          @keyframes prismFloat {
            0%, 100% { transform: translate3d(0, 0, 0) rotateX(18deg) rotateY(-22deg) rotateZ(8deg); }
            50% { transform: translate3d(0, -10px, 0) rotateX(18deg) rotateY(-22deg) rotateZ(8deg); }
          }
          .cm-prism {
            transform-style: preserve-3d;
            animation: prismFloat 7.5s ease-in-out infinite;
            will-change: transform;
          }
        `}
      </style>

      {/* Decorative 3D-ish background element (CSS, no canvas) */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        {/* Big blue prism */}
        <div className="cm-prism absolute -top-28 -right-20 h-[560px] w-[560px] sm:h-[720px] sm:w-[720px] rounded-[3.75rem] opacity-95 [filter:saturate(1.25)] shadow-[0_35px_80px_rgba(24,113,201,0.18)] bg-[conic-gradient(from_210deg_at_55%_45%,_rgba(24,113,201,0.65),_rgba(95,169,244,0.45),_rgba(120,196,255,0.38),_rgba(24,113,201,0.6)),radial-gradient(circle_at_30%_25%,_rgba(255,255,255,0.55),_transparent_58%),radial-gradient(circle_at_70%_70%,_rgba(24,113,201,0.38),_transparent_62%)]" />
        {/* Inner bevel highlight */}
        <div className="absolute -top-28 -right-20 h-[560px] w-[560px] sm:h-[720px] sm:w-[720px] rounded-[3.75rem] opacity-70 bg-[linear-gradient(135deg,_rgba(255,255,255,0.65)_0%,_transparent_42%,_rgba(255,255,255,0.18)_100%)]" />

        {/* Supporting blue orb */}
        <div className="absolute -bottom-28 -left-24 h-[460px] w-[460px] sm:h-[560px] sm:w-[560px] rounded-full opacity-90 bg-[radial-gradient(circle_at_center,_rgba(24,113,201,0.28),_transparent_62%)]" />

        {/* Highlight streak */}
        <div className="absolute right-[-22%] top-[16%] h-24 w-[560px] rotate-12 bg-[linear-gradient(90deg,_transparent,_rgba(255,255,255,0.58),_transparent)] opacity-70 blur-[12px]" />
      </div>
      
      {/* Overlay Gradients for Depth (light) */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-white/85 via-transparent to-white/35 pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_top,_rgba(24,113,201,0.18),_transparent_58%)] pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_bottom_right,_rgba(88,166,255,0.12),_transparent_48%)] pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(120deg,_rgba(24,113,201,0.07)_0%,_transparent_42%,_rgba(24,113,201,0.05)_100%)] pointer-events-none" />
      
      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-16 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-12 lg:gap-16 items-start">
          
          {/* Left Block - Cinematic Text Section */}
          <div ref={leftBlock} className="lg:w-1/2 space-y-5 sm:space-y-6 will-change-transform">
            <div className="inline-block px-4 sm:px-5 py-1.5 rounded-full bg-[#1871C9]/10 text-[#1871C9] text-sm sm:text-base md:text-lg font-bold uppercase tracking-widest border border-[#1871C9]/25 backdrop-blur-sm">
            Our Core Strengths
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight text-gray-900">
              Trusted Legal <br />
              <span className="bg-gradient-to-r from-[#1871C9] via-[#3d8fdf] to-[#145da5] bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <div className="w-20 sm:w-24 h-[3px] bg-gradient-to-r from-[#1871C9] to-transparent" />
            <p className="text-gray-800 font-semibold text-base sm:text-lg md:text-xl leading-relaxed max-w-lg font-light tracking-wide">
              At Case Matters, transparency and consistency are at the core of everything we do — 
              delivering results that truly redefine legal excellence.
            </p>
            <div className="pt-3 sm:pt-5">
              <button className="btn-cinematic px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#1871C9] via-[#3d8fdf] to-[#1a60b0] text-white font-bold uppercase tracking-wider text-[11px] sm:text-sm shadow-2xl transition-all duration-300 hover:shadow-[0_20px_35px_-8px_rgba(24,113,201,0.6)] hover:scale-105 active:scale-95">
                Discover Our Practice ✦
              </button>
            </div>
          </div>
          
          {/* Right Block - Strengths with 3D Cards */}
          <div ref={rightBlock} className="lg:w-1/2 w-full will-change-transform">
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6">
              {strengths.map((item, index) => (
                <div
                  key={index}
                  className="strength-item-3d group relative p-[1.5px] rounded-2xl bg-gradient-to-br from-[#1871C9]/35 via-[#6BB1F5]/20 to-transparent transition-all duration-500 hover:shadow-[0_18px_45px_-18px_rgba(24,113,201,0.45)]"
                >
                  <div className="h-full rounded-[15px] bg-white/75 backdrop-blur-md border border-white/40 p-4 sm:p-5 md:p-6 transition-all duration-500 group-hover:bg-white/90 group-hover:translate-y-[-2px]">
                    <div className="space-y-1.5">
                      {/* Top line: Big coloured number */}
                      {index === 0 && (
                        <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1871C9] leading-tight">
                          <span
                            ref={(el) => {
                              statRefs.current[0] = el;
                            }}
                            className="font-extrabold"
                          >
                            1
                          </span>
                          +
                        </p>
                      )}
                      {index === 1 && (
                        <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1871C9] leading-tight">
                          <span
                            ref={(el) => {
                              statRefs.current[1] = el;
                            }}
                            className="font-extrabold"
                          >
                            1
                          </span>
                          +{" "}
                          <span className="align-baseline text-lg sm:text-xl md:text-2xl">
                            Years
                          </span>
                        </p>
                      )}
                      {index === 2 && (
                        <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1871C9] leading-tight">
                          ₹
                          <span
                            ref={(el) => {
                              statRefs.current[2] = el;
                            }}
                            className="font-extrabold"
                          >
                            1
                          </span>
                          + Cr
                        </p>
                      )}
                      {index === 3 && (
                        <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1871C9] leading-tight">
                          ₹
                          <span
                            ref={(el) => {
                              statRefs.current[3] = el;
                            }}
                            className="font-extrabold"
                          >
                            1
                          </span>
                          + Cr
                        </p>
                      )}

                      {/* Second line: Short label */}
                      {index === 0 && (
                        <p className="text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-gray-700">
                          Matters Delivered
                        </p>
                      )}
                      {index === 1 && (
                        <p className="text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-gray-700">
                          Combined Experience
                        </p>
                      )}
                      {index === 2 && (
                        <p className="text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-gray-700">
                          Claims Managed
                        </p>
                      )}
                      {index === 3 && (
                        <p className="text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-gray-700">
                          Project Exposure
                        </p>
                      )}

                      {/* Third line: Supporting description */}
                      {index === 0 && (
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                          Across arbitration, contracts & disputes.
                        </p>
                      )}
                      {index === 1 && (
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                          Multi-jurisdictional legal expertise.
                        </p>
                      )}
                      {index === 2 && (
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                          High-value disputes handled with precision.
                        </p>
                      )}
                      {index === 3 && (
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                          Advising on large-scale infrastructure & commercial projects.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Background EST. Text - Cinematic Depth */}
      <div className="absolute bottom-6 right-4 text-[7rem] sm:text-[9rem] lg:text-[18rem] font-serif font-black text-gray-900/[0.04] select-none pointer-events-none z-0">
        EST.
      </div>
      
      {/* Floating Scale Icon Animation (Subtle overlay) */}
      <div className="absolute top-16 sm:top-24 left-[-10%] sm:left-[-6%] opacity-[0.024] sm:opacity-[0.028] text-[#1871C9] pointer-events-none z-0 animate-float-slow">
        <Scale size={260} className="sm:hidden" strokeWidth={0.8} />
        <Scale size={360} className="hidden sm:block" strokeWidth={0.8} />
      </div>
    </section>
  );
};

export default AboutSecond;