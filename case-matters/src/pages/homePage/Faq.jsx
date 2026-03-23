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

      // GSAP Animation: Selects all children with the 'faq-item' class
      gsap.fromTo(
        el.querySelectorAll(".faq-item"),
        { 
          opacity: 0, 
          x: -100 // Start 100px to the left
        },
        {
          opacity: 1,
          x: 0, // Slide to original position
          duration: 0.8,
          stagger: 0.2, // Stagger effect between items
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%", // Starts when the top of the container hits 80% of the viewport
            toggleActions: "play none none none", // Plays once
          },
        }
      );

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }, []);

    return (
<div className="w-full sm:pt-10 pb-10 px-6 md:px-10 bg-white font-sans">
  <div className="max-w-4xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-gray-900 text-4xl md:text-5xl font-extrabold tracking-tight">
        Frequently Asked <span className="text-[#1871C9]">Questions</span>
      </h2>
      <div className="w-20 h-1 bg-[#1871C9] mx-auto mt-4 rounded-full" />
    </motion.div>

    <div ref={containerRef} className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="faq-item group border border-[#1871C9]/10 rounded-xl bg-gray-200/70 overflow-hidden transition-colors hover:border-[#1871C9]/30"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full text-left p-6 flex justify-between items-start gap-4"
          >
            <span className={`font-semibold text-lg md:text-xl transition-colors duration-300 ${active === index ? "text-[#1871C9]" : "text-gray-600"}`}>
              {faq.question}
            </span>

            <span className={`flex-shrink-0 mt-1 w-6 h-6 flex items-center justify-center rounded-full border transition-all duration-300 ${active === index ? "bg-[#1871C9] border-[#1871C9] rotate-180" : "bg-transparent border-gray-200/60"}`}>
              {active === index ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7L6 3L10 7" stroke="#09090b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 5L6 9L10 5" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) }
            </span>
          </button>

          <AnimatePresence>
            {active === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed text-base md:text-lg border-t border-gray-200/60 pt-4">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>  
  </div>
</div>
    );
  };

  export default Faq;