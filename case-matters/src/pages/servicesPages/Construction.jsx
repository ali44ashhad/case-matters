import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ContactForm from '../homePage/ContactForm';

const Construction = () => {
  const container = useRef();
  const carpetRef = useRef();
  const headingRef = useRef();

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

  useGSAP(() => {
    // Cinematic left-to-right wipe for the heading
    gsap.fromTo(headingRef.current,
      { clipPath: "inset(0 100% 0 0)", x: -30 },
      { 
        clipPath: "inset(0 0% 0 0)", 
        x: 0, 
        duration: 1.5, 
        ease: "expo.out" 
      }
    );
  }, { scope: container });

  return (
    <>
      <section ref={container} className="relative min-h-screen w-full overflow-hidden bg-white font-sans flex items-center pt-20">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop"
          alt="Construction Infrastructure"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        
        {/* Premium Cinematic Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Main Content Grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT BLOCK */}
          <div className="space-y-8">
            <div ref={carpetRef} className="overflow-hidden">
              <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-gray-900 leading-tight">
                Construction & <br />
                <span className="text-[#1871C9]">Infrastructure Disputes.</span>
              </h1>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <p className="text-white text-lg md:text-xl text-gray-700 max-w-xl font-light leading-relaxed">
                  Construction and infrastructure projects involve complex contractual frameworks, multiple stakeholders, and significant financial exposure.
                </p>
                <p className="text-white text-base md:text-lg text-gray-600 max-w-xl border-l-2 border-[#1871C9]/50 pl-6 italic">
                  Disputes in such projects often relate to delays, variations, and payment issues, requiring specialised legal insight and strategic handling.
                </p>
              </div>
              
              {/* <div className="flex flex-wrap gap-4 pt-4">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#145da5" }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-[#1871C9] px-10 py-4 font-bold text-white shadow-[0_0_20px_rgba(24,113,201,0.3)] transition-all uppercase tracking-wider text-sm"
                >
                  Resolve Your Matter
                </motion.button>
                <button className="rounded-full border border-gray-200 bg-gray-200/60 px-10 py-4 font-semibold text-gray-900 backdrop-blur-md hover:bg-gray-200/80 transition-all uppercase tracking-wider text-sm">
                  Practice Areas
                </button>
              </div> */}
            </motion.div>
          </div>

          {/* RIGHT BLOCK */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative group hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] border border-gray-200/60 bg-black/50 backdrop-blur-xl p-10 shadow-2xl">
              <h3 className="text-[#1871C9] text-sm font-bold uppercase tracking-widest mb-6">Critical Risk Factors</h3>
              <div className="space-y-6 text-gray-700">
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { title: 'Project Delays', desc: 'Mitigating time-related liabilities.' },
                      { title: 'Variations', desc: 'Managing scope and cost changes.' },
                      { title: 'Payment Issues', desc: 'Securing contractual entitlements.' },
                      { title: 'Site Constraints', desc: 'Navigating unforeseen conditions.' }
                    ].map((item, idx) => (
                      <motion.div 
                       key={idx}
                        className="p-4 rounded-xl bg-black/50 border border-gray-200/70 transition-colors"
                      >
                        <p className="text-gray-200 font-bold">{item.title}</p>
                        <p className="text-xs text-gray-300">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
              </div>
              
              <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-[#1871C9]/10 blur-[100px] rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Background Jurisprudential Quote */}
        <div className="absolute bottom-10 right-10 opacity-5 pointer-events-none hidden md:block">
          <span className="text-7xl font-serif italic text-gray-300 select-none">"Pacta Sunt Servanda"</span>
        </div>
      </section>

      {/* Second Section: Content Block */}
      <section className="bg-white py-24 px-6 md:px-20 lg:px-32 flex flex-col items-start justify-center min-h-[60vh]">
        <div className="max-w-5xl w-full">
          
          <div ref={headingRef} className="mb-12">
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tighter leading-tight">
              Construction and <br /> 
              <span className="text-[#1871C9]">Infrastructure Disputes</span>
            </h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full relative group p-8 md:p-12 border border-gray-200/60 bg-gray-200/70 backdrop-blur-xl"
          >
            {/* Blue accent line */}
            <div className="absolute left-0 top-1/4 h-1/2 w-[2px] bg-[#1871C9] transition-all duration-500 group-hover:h-full group-hover:top-0" />

            <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-light text-left">
              For Construction and Infrastructure Disputes, Case Matters provides specialized legal insight into the 
              complex contractual frameworks and significant financial exposures inherent in large-scale projects, 
              advising contractors, developers, and stakeholders at every stage of the project lifecycle. We 
              systematically address disputes arising from project delays, variations, and site-related constraints 
              through a <span className="text-[#1871C9] font-medium">documentation-driven and evidence-focused approach</span>, 
              ensuring that claims regarding change of scope, right-of-way availability, or withholding of certified 
              payments are supported by contemporaneous records. When disputes escalate, we deliver strategic 
              representation in arbitration and litigation—from the initiation of proceedings to the enforcement 
              of awards—with a steadfast commitment to achieving <span className="text-gray-900 border-b border-[#1871C9]/50">commercially viable resolutions</span> that 
              safeguard our clients' contractual rights and long-term project interests.
            </p>

           
          </motion.div>
        </div>
      </section>
      
      <ContactForm/>
    </>
  );
};

export default Construction;