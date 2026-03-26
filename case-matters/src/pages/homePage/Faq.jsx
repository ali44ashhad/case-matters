import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What types of disputes can be resolved through arbitration?",
    answer: "Arbitration can resolve a wide range of commercial, contractual, construction, infrastructure, shareholder, partnership, and service-related disputes where parties have agreed to submit their differences to arbitration.",
  },
  {
    question: "Is an arbitration clause mandatory for initiating arbitration?",
    answer: "Yes. Arbitration typically requires a written arbitration clause or agreement between the parties. However, even in the absence of such a clause, parties can mutually agree to arbitrate after a dispute arises.",
  },
  {
    question: "How long does the arbitration process usually take?",
    answer: "Timelines vary, but institutional and statutory frameworks often prescribe completion within 12–18 months, depending on complexity, the tribunal’s schedule, and procedural conduct of parties.",
  },
  {
    question: "Can you review or draft contracts for individuals and businesses?",
    answer: "Yes. We provide comprehensive contract drafting, vetting, negotiation, and advisory services for individuals, corporates, start-ups, and commercial entities.",
  },
  {
    question: "Do you assist with regulatory and compliance requirements?",
    answer: "Yes. We advise on statutory compliance, corporate governance, commercial transactions, licensing, and regulatory approvals across various sectors.",
  },
  {
    question: "How do I know which legal remedy is appropriate for my case?",
    answer: "We begin with a detailed consultation to understand your facts, review your documents, assess risk, and advise the most effective legal strategy tailored to your objectives.",
  },
  {
    question: "What documents should I bring for my first consultation?",
    answer: "All relevant agreements, correspondence, notices, invoices, payment records, and any prior legal documents relating to your matter.",
  },
  {
    question: "How do you handle recovery matters?",
    answer: "We assist in recovery of outstanding dues through legal notices, arbitration, commercial suits, summary suits, insolvency proceedings under the IBC, and negotiation of settlements.",
  },
  {
    question: "Can I schedule a consultation before engaging your services?",
    answer: "Yes. You may request an initial consultation to discuss your matter, after which we guide you on the next steps and litigation strategy.",
  },
  {
    question: "Do you offer online consultations or virtual hearings support?",
    answer: "Yes, we conduct online meetings and assist clients in preparing for virtual arbitration hearings, document filings, and digital case management.",
  },
];

const Faq = () => {
  const [active, setActive] = useState(null);
  const containerRef = useRef(null);
  const canvasContainer = useRef(null);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  useEffect(() => {
    const el = containerRef.current;

    gsap.fromTo(
      el.querySelectorAll(".faq-item"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Subtle 3D particles background (light theme)
  useEffect(() => {
    if (!canvasContainer.current) return;

    let rafId = 0;
    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0xe8f0fa, 0.02);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 80);
    camera.position.set(0, 0.4, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    canvasContainer.current.appendChild(renderer.domElement);

    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 900;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMat = new THREE.PointsMaterial({
      color: 0x5a9fe0,
      size: 0.02,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    const ambient = new THREE.AmbientLight(0xd0dff0, 0.75);
    scene.add(ambient);

    const resize = () => {
      if (!canvasContainer.current) return;
      const { width, height } = canvasContainer.current.getBoundingClientRect();
      const w = width || window.innerWidth;
      const h = height || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    ro?.observe(canvasContainer.current);

    let t = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      t += 0.006;
      particles.rotation.y = t * 0.05;
      particles.rotation.x = Math.sin(t * 0.25) * 0.06;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro?.disconnect();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
      if (canvasContainer.current?.contains(renderer.domElement)) {
        canvasContainer.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full py-20 px-6 md:px-10 font-sans overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#eef6ff] to-[#dcecff]">
      <div ref={canvasContainer} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-white/90 via-transparent to-white/40 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,_rgba(24,113,201,0.22),_transparent_58%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_bottom_right,_rgba(88,166,255,0.14),_transparent_48%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(120deg,_rgba(24,113,201,0.08)_0%,_transparent_42%,_rgba(24,113,201,0.06)_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#1871C9] font-bold tracking-[0.3em] uppercase mb-4 text-base md:text-lg">
            Assistance & Support
          </p>
          <h2 className="text-gray-900 text-4xl md:text-5xl font-serif font-bold tracking-tight leading-tight">
            Frequently Asked <span className="text-[#1871C9]">Questions</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#1871C9] to-[#6BB1F5] mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* FAQ Accordion List */}
        <div ref={containerRef} className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              
              {/* PERMANENT GRADIENT BACKGROUND APPLIED HERE */}
              <div 
                className={`rounded-xl border transition-all duration-500 overflow-hidden bg-gradient-to-br from-[#E6F2FF] via-white to-white ${
                  active === index 
                  ? "border-[#1871C9]/40 shadow-lg" 
                  : "border-gray-200 shadow-sm hover:border-[#1871C9]/30"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className={`w-full text-left p-6 md:p-8 flex justify-between items-center gap-4 transition-all ${
                    active === index
                      ? "bg-gradient-to-r from-[#1871C9]/10 via-[#DCEEFF]/70 to-transparent"
                      : "hover:bg-gradient-to-r hover:from-[#1871C9]/8 hover:via-[#EAF4FF] hover:to-transparent"
                  }`}
                >
                  <span className={`font-bold text-lg md:text-xl transition-colors duration-300 ${
                    active === index ? "text-[#1871C9]" : "text-gray-700"
                  }`}>
                    {faq.question}
                  </span>

                  {/* Circular Icon Toggle */}
                  <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-500 ${
                    active === index 
                    ? "bg-[#1871C9] border-[#1871C9] text-white rotate-180" 
                    : "bg-white border-gray-200 text-gray-400"
                  }`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>

                <AnimatePresence>
                  {active === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      {/* Answer area with transparent background to show the card's gradient */}
                      <div className="px-6 md:px-8 pb-8 text-gray-600 leading-relaxed text-base md:text-lg border-t border-[#1871C9]/10 pt-6">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>  

        {/* Help Link */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Have more questions? <span className="text-[#1871C9] font-bold cursor-pointer hover:underline">Contact our legal team.</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Faq;