import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Gavel, ShieldAlert, Copyright, Globe, Info, Link as LinkIcon, Mail } from 'lucide-react';

const TermsAndConditions = () => {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
  };

  const itemVars = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-24 px-6 md:px-12 lg:px-24 relative font-sans text-zinc-400">
      {/* Background Aesthetic Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1871C9]/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1871C9]/10 text-[#1871C9] text-xs font-bold uppercase tracking-widest mb-6 border border-[#1871C9]/20">
            <Gavel size={14} /> Legal Framework
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
            Terms & <span className="text-[#1871C9] italic font-light">Conditions</span>
          </h1>
          <div className="h-1 w-20 bg-[#1871C9] mx-auto mt-8" />
        </motion.div>

        {/* 1-3. Introduction & BCI Compliance */}
        <motion.div variants={containerVars} initial="hidden" animate="visible" className="space-y-8">
          <motion.div variants={itemVars} className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl shadow-sm border-l-4 border-l-[#1871C9] backdrop-blur-sm">
            <h3 className="text-[#1871C9] font-bold uppercase text-xs tracking-widest mb-4">1-3. Website Operator & Acceptance</h3>
            <p className="text-sm leading-relaxed mb-4 text-zinc-300">
              1. This website is operated by <strong>Case Matters</strong>. References to "Case Matters" are to the legal entities that comprise Case Matters.
            </p>
            <p className="text-sm leading-relaxed mb-4 font-semibold text-[#1871C9]">
              2. The Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner.
            </p>
            <p className="text-sm leading-relaxed text-zinc-400">
              3. By accessing this website (www.casematters.in), you are deemed to accept these terms and conditions and confirm that you are seeking information relating to Case Matters of your own accord and that there has been no form of solicitation, advertisement or inducement by Case Matters or its members.
            </p>
          </motion.div>

          {/* 4-10. Disclaimers & Changes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVars} className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-[#1871C9]/10 rounded-lg text-[#1871C9]">
                    <Info size={20} />
                 </div>
                 <h4 className="font-serif font-bold text-white">4-5. Informational Nature</h4>
              </div>
              <p className="text-xs leading-relaxed text-zinc-500">
                Content is for informational purposes only and not legal advice. Case Matters is not liable for actions taken based on this site. You may access other sites with different terms via this website.
              </p>
            </motion.div>
            <motion.div variants={itemVars} className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-[#1871C9]/10 rounded-lg text-[#1871C9]">
                    <Globe size={20} />
                 </div>
                 <h4 className="font-serif font-bold text-white">6-8. Amendments & Laws</h4>
              </div>
              <p className="text-xs leading-relaxed text-zinc-500">
                Terms may change without notice. Information is provided "as is" and can become out of date. Legal content relates only to the specified laws, which may differ from your local laws.
              </p>
            </motion.div>
          </div>

          {/* 9-10. Liability */}
          <motion.div variants={itemVars} className="p-8 bg-[#1871C9] text-white rounded-3xl shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10"><ShieldAlert size={100} /></div>
             <h3 className="text-xl font-serif font-bold mb-4 relative z-10">9-10. Limitation of Liability</h3>
             <p className="text-sm opacity-90 leading-relaxed relative z-10 max-w-2xl">
               Case Matters shall not be liable directly or indirectly in contract, tort, equity or otherwise for any damage whatsoever in connection with this website, use of content, or hyperlinked sites, including loss of profits, data, or business revenue. This disclaimer is not restricted by warnings elsewhere.
             </p>
          </motion.div>

          {/* 11-15. Intellectual Property */}
          <motion.div variants={itemVars} className="p-8 md:p-12 bg-zinc-900/40 border border-zinc-800 rounded-3xl shadow-sm">
            <h3 className="text-white font-serif font-bold text-2xl mb-6 flex items-center gap-3">
              <Copyright className="text-[#1871C9]" /> 11-15. Intellectual Property Rights
            </h3>
            <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
              <p>11. This website is copyright property of Case Matters. Access is for personal, non-commercial use only. You may not adapt, reproduce, store, or commercialise any part without written permission.</p>
              <p>12-13. All rights, including design rights, patents, trade marks, and source codes are reserved. Trade marks (Marks) displayed are proprietary to their respective owners.</p>
              <p>14-15. No licence is granted for use of any trade marks. You may not remove or obscure any proprietary rights notices.</p>
            </div>
          </motion.div>

          {/* 16-18. External Links */}
          <motion.div variants={itemVars} className="p-8 bg-[#1871C9]/5 border border-[#1871C9]/20 rounded-3xl flex flex-col md:flex-row gap-8 items-start backdrop-blur-sm">
            <div className="p-4 bg-[#1871C9] text-white rounded-2xl shadow-lg shadow-[#1871C9]/20"><LinkIcon size={24} /></div>
            <div>
              <h3 className="text-white font-serif font-bold text-xl mb-3">16-18. Linked Websites</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Links are for convenience only. Case Matters does not endorse or assume responsibility for the contents of any linked site. You may not link to any part of this website without prior written consent. Case Matters has no control over or rights in those linked websites.
              </p>
            </div>
          </motion.div>

          {/* 19-20. Privacy & Communication */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVars} className="p-6 bg-zinc-900/20 border border-zinc-800 rounded-2xl">
              <h4 className="font-bold text-[#1871C9] uppercase text-[10px] tracking-widest mb-3">19. Privacy Integration</h4>
              <p className="text-xs text-zinc-500">These terms incorporate and should be read together with the Case Matters Privacy Policy.</p>
            </motion.div>
            <motion.div variants={itemVars} className="p-6 bg-zinc-900/20 border border-zinc-800 rounded-2xl">
              <h4 className="font-bold text-[#1871C9] uppercase text-[10px] tracking-widest mb-3">20. Electronic Messages</h4>
              <p className="text-xs text-zinc-500">Expressing interest grants consent for Case Matters to send commercial electronic messages to provided addresses.</p>
            </motion.div>
          </div>

          {/* Governing Law & Jurisdiction */}
          <motion.div 
            variants={itemVars}
            className="mt-12 p-10 rounded-3xl bg-zinc-900 border border-zinc-800 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 p-8 opacity-5"><Scale size={120} className="text-[#1871C9]" /></div>
            <h3 className="text-2xl font-serif font-bold mb-4 relative z-10 text-white">Governing Law & <span className="text-[#1871C9]">Jurisdiction</span></h3>
            <p className="text-zinc-400 text-sm max-w-3xl mx-auto relative z-10 leading-relaxed italic">
              "These terms and conditions and any dispute arising shall be governed by and construed in accordance with Indian law and the courts of Mumbai shall have exclusive jurisdiction to resolve any disputes."
            </p>
          </motion.div>

          {/* Final Footer Text */}
          <motion.div variants={itemVars} className="text-center pt-10 border-t border-zinc-900">
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-2">Case Matters LLP • DLF Almeda, Gurgaon</p>
            <p className="text-[10px] text-zinc-700">© 2026 Case Matters. All Rights Reserved.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;  