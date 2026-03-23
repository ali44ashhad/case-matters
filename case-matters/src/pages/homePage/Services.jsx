import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef();
  const stackRef = useRef();

  const services = [
    { id: "arbitration", title: "Arbitration", desc: "Private dispute resolution through structured proceedings, offering confidentiality and procedural efficiency.", path: "/services/arbitration" },
    { id: "construction", title: "Construction & Infrastructure Disputes", desc: "Advisory and representation in project-related disputes, focused on protecting contractual entitlements.", path: "/services/construction" },
    { id: "contract-advisory", title: "Contract Advisory & Risk Management", desc: "Drafting, review, and interpretation of contracts, with strategic advice on rights and obligations.", path: "/services/contract-advisory" },
    { id: "claims-management", title: "Contract and Claims Management", desc: "End-to-end claims support, including claim preparation, evidence collation, and strategy.", path: "/services/contract-claim" },
    { id: "employment", title: "Employment Advisory & Compliance", desc: "Advisory services relating to employment contracts, HR policies, and statutory compliance.", path: "/services/employement" },
    { id: "startup-law", title: "Startup Law & Compliance", desc: "Legal support for startups and founders, covering business structuring and regulatory compliance.", path: "/services/startup" },
    { id: "litigation", title: "Civil & Business Litigation", desc: "Representation before courts in civil and commercial disputes including stakeholder conflicts.", path: "/services/civil" }
  ];

  useGSAP(() => {
    const cards = gsap.utils.toArray('.service-card');
    let mm = gsap.matchMedia();

    // Desktop Only Stacking (>= 768px)
    mm.add("(min-width: 768px)", () => {
      cards.forEach((card, index) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: `top ${100 + index * 30}px`,
            endTrigger: containerRef.current,
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    // Mobile Animations Only (No Pinning)
    mm.add("(max-width: 767px)", () => {
      cards.forEach((card) => {
        gsap.fromTo(card, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section id="services" ref={containerRef} className="bg-white py-20 md:py-32 px-6 md:px-20 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-24 space-y-4">
          <h2 className="text-[#1871C9] uppercase tracking-[0.2em] text-[10px] md:text-sm font-bold">
            Our Services
          </h2>
          <p className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tighter leading-tight">
            From contracts to courtrooms - we cover it all.
          </p>
        </div>

        {/* The Cards Container */}
        <div ref={stackRef} className="relative space-y-6 md:space-y-10 pb-10 md:pb-32">
          {services.map((service, index) => (
            <Link 
              to={service.path} 
              key={service.id}
              className="service-card block relative w-full group"
            >
              {/* Changed rounded-3xl to rounded-xl for slight rounding */}
              <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50/50 p-6 md:p-12 backdrop-blur-sm transition-all duration-500 group-hover:border-[#1871C9]/30 group-hover:bg-gray-100 shadow-lg group-hover:shadow-2xl">
                
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1871C9] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
                  <div className="flex-1 space-y-3 md:space-y-4">
                    <span className="text-[#1871C9] font-mono text-sm md:text-lg font-bold">0{index + 1}</span>
                    <h3 className="text-xl md:text-3xl font-bold text-gray-900 group-hover:text-[#1871C9] transition-colors tracking-tight">
                      {service.title}
                    </h3> 
                    <p className="text-gray-600 text-sm md:text-lg leading-relaxed max-w-3xl">
                      {service.desc}
                    </p>
                  </div>
                  
                  {/* Icon */}
                  <div className="h-12 w-12 md:h-16 md:w-16 rounded-lg border border-gray-200 flex items-center justify-center group-hover:bg-[#1871C9] group-hover:border-[#1871C9] transition-all duration-500">
                    <svg 
                      className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-white transition-colors" 
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;