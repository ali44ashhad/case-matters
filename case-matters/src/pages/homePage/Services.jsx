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
    {
      id: "arbitration",
      title: "Arbitration",
      desc: "Private dispute resolution through structured proceedings, offering confidentiality, procedural efficiency, and enforceable outcomes without prolonged court litigation.",
      path: "/services/arbitration"
    },
    {
      id: "construction",
      title: "Construction & Infrastructure Disputes",
      desc: "Advisory and representation in project-related disputes, focused on protecting contractual entitlements and resolving complex infrastructure issues with precision.",
      path: "/services/construction"
    },
    {
      id: "contract-advisory",
      title: "Contract Advisory & Risk Management",
      desc: "Drafting, review, and interpretation of contracts, coupled with strategic advice on rights, obligations, and effective allocation of contractual risks.",
      path: "/services/contract-advisory"
    },
    {
      id: "claims-management",
      title: "Contract and Claims Management",
      desc: "End-to-end claims support, including claim preparation, evidence collation, correspondence strategy, and systematic record management.",
      path: "/services/contract-claim"
    },
    {
      id: "employment",
      title: "Employment Advisory & Compliance",
      desc: "Advisory services relating to employment contracts, HR policies, workplace regulations, and ongoing statutory compliance requirements.",
      path: "/services/employement"
    },
    {
      id: "startup-law",
      title: "Startup Law & Compliance",
      desc: "Smart and Modern legal support for startups and founders, covering business structuring, documentation, and regulatory compliance at early growth stages.",
      path: "/services/startup"
    },
    {
      id: "litigation",
      title: "Civil & Business Litigation",
      desc: "Representation before courts in civil and commercial disputes, including conflicts involving shareholders, partners, vendors, customers and stakeholders.",
      path: "/services/civil"
    }
  ];

  useGSAP(() => {
    const cards = gsap.utils.toArray('.service-card');
    
    // Create the stacking effect
    cards.forEach((card, index) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: `top ${150 + index * 40}px`, // Cards "catch" at different heights
          endTrigger: containerRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Entrance animation (Fade & Slide)
      gsap.fromTo(card, 
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="services" ref={containerRef} className="bg-zinc-950 py-32 px-6 md:px-20 min-h-screen">
    <div className="max-w-7xl mx-auto">
      
      {/* Header Section */}
      <div className="mb-24 space-y-4">
        <h2 className="text-[#1871C9] uppercase tracking-[0.3em] text-sm font-bold">
          Our Services
        </h2>
        <p className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter">
          From contracts to courtrooms — <br className="hidden md:block"/> we cover it all.
        </p>
      </div>

      {/* The Stacked Cards Container */}
      <div ref={stackRef} className="relative space-y-10 pb-32">
        {services.map((service, index) => (
          <Link 
            to={service.path} 
            key={service.id}
            className="service-card block relative w-full group"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/80 p-8 md:p-12 backdrop-blur-2xl transition-all duration-500 group-hover:border-[#1871C9]/50 group-hover:bg-zinc-800/90 shadow-2xl">
              
              {/* Visual Accent - Now #1871C9 */}
              <div className="absolute top-0 left-0 w-2 h-full bg-[#1871C9] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex-1 space-y-4">
                  {/* Index Number - Now #1871C9 */}
                  <span className="text-[#1871C9] font-mono text-lg">0{index + 1}</span>
                  <h3 className="text-2xl md:text-4xl font-bold text-white group-hover:text-[#1871C9] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-3xl">
                    {service.desc}
                  </p>
                </div>
                
                {/* Circular Button Style Icon - Now #1871C9 on hover */}
                <div className="h-16 w-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#1871C9] group-hover:border-[#1871C9] transition-all duration-500">
                  <svg 
                    className="w-6 h-6 text-white group-hover:text-white transition-colors" 
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