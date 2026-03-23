import React from 'react';
import { motion } from 'framer-motion';

const LegalDisclaimer = () => {
  const points = [
    {
      title: "No Attorney-Client Relationship",
      content: "The use of this website, and the sending or receipt of information through this site, does not create an attorney-client relationship. Communication with our firm through this website may not be considered privileged or confidential."
    },
    {
      title: "Not Legal Advice",
      content: "The materials on this website are for informational purposes only and are not legal advice. You should not act or rely on any information on this website without seeking the advice of a competent attorney licensed to practice in your jurisdiction."
    },
    {
      title: "Outcome Disclaimer",
      content: "Prior results and case studies described on this site do not guarantee a similar outcome. Every case is unique and depends on a variety of factors including the facts of the case and the applicable law."
    },
    {
      title: "Third-Party Links",
      content: "This website may contain links to third-party resources. These links are provided as citations and aids to help you identify other internet resources that may be of interest, and are not intended to state or imply that we sponsor or are affiliated with those sites."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-600 font-sans selection:bg-amber-600 selection:text-white">
      
      {/* Animated Hero Header */}
      <header className="relative py-24 px-6 text-center border-b border-gray-200 overflow-hidden">
        {/* Animated Background Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-600 via-transparent to-transparent pointer-events-none"
        />
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-gray-900">
            Legal <span className="text-amber-600">Disclaimer.</span>
          </h1>
          <p className="mt-4 text-gray-600 tracking-[0.4em] uppercase text-xs md:text-sm font-bold">
            Notice of Information & Liability Limits
          </p>
        </motion.div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20">
        
        {/* Central Warning Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 p-8 bg-gray-200/70 border-l-4 border-amber-600 rounded-r-2xl"
        >
          <p className="text-gray-900 text-lg italic leading-relaxed font-light">
            "Your use of this website is subject to the following terms. By remaining on this platform, you acknowledge that no legal counsel is being provided."
          </p>
        </motion.div>

        {/* Disclaimer Points */}
        <div className="space-y-12">
          {points.map((point, index) => (
            <motion.section 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <h2 className="text-gray-900 text-xl font-bold uppercase tracking-widest mb-4 flex items-center group-hover:text-amber-500 transition-colors">
                <span className="text-amber-600 mr-3 text-sm">0{index + 1}</span>
                {point.title}
              </h2>
              <p className="leading-relaxed border-l border-gray-200 pl-6 ml-2">
                {point.content}
              </p>
            </motion.section>
          ))}
        </div>

        {/* Final Affirmation */}
       

      </main>
 
    </div>
  );
};

export default LegalDisclaimer;