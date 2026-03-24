import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  return (
    <div className="w-full py-20 px-6 md:px-10 bg-white font-sans overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#1871C9] font-bold tracking-[0.3em] uppercase mb-4 text-xs">
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
                  className="w-full text-left p-6 md:p-8 flex justify-between items-center gap-4 transition-colors hover:bg-[#1871C9]/5"
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