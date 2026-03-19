import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Scale, Lock, FileText, Globe, Info, AlertCircle, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-24 px-6 md:px-12 lg:px-24 relative font-sans text-zinc-400">
      {/* Aesthetic Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1871C9]/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1871C9]/10 text-[#1871C9] text-xs font-bold uppercase tracking-widest mb-6 border border-[#1871C9]/20">
            <Shield size={14} /> Official Policy
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
            Privacy <span className="text-[#1871C9] italic font-light">Policy</span>
          </h1>
          <p className="text-zinc-500 uppercase tracking-[0.2em] text-xs font-semibold">
            Terms of General Site Usage
          </p>
          <div className="h-1 w-20 bg-[#1871C9] mx-auto mt-8" />
        </motion.div>

        {/* Introduction */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 rounded-3xl shadow-sm mb-12 border-l-4 border-l-[#1871C9] backdrop-blur-sm"
        >
          <p className="text-lg leading-relaxed italic text-zinc-300">
            Case Matters and its affiliates is committed to protecting your privacy and has provided this policy ("Policy") to familiarize you with the manner in which it collects, uses, shares and discloses your information that is collected through <a href="https://www.casematters.in/" className="text-[#1871C9] hover:text-[#1871C9]/80 underline transition-colors">https://www.casematters.in/</a> and associated mobile applications (the "Website").
          </p>
        </motion.div>

        {/* Detailed Points */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Section 1 & 2: Governance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: 1, text: "The terms of the Policy provided herein govern your use of the Website and any content provided, accessed or distributed in the Website. For our client confidentiality obligations and associated references, please refer to our terms of engagement." },
              { id: 2, text: "This Policy shall be construed to be provided in compliance with the Information Technology Act 2000 and the rules framed thereunder (as amended from time to time) ('IT Act')." }
            ].map((item) => (
              <motion.div key={item.id} variants={itemVariants} className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-xl shadow-sm hover:border-zinc-700 transition-all">
                <span className="text-[#1871C9] font-serif font-bold text-lg mr-2">{item.id}.</span>
                <span className="text-zinc-400 leading-relaxed text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Section 3: Information Collection */}
          <motion.div variants={itemVariants} className="p-8 md:p-10 bg-[#1871C9] text-white rounded-3xl shadow-xl">
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
              <FileText className="text-white" /> 3. Collection of Personal Information
            </h2>
            <p className="mb-6 opacity-90 text-sm">During the use of the Website we may collect the following types of information:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm opacity-90">
              <p>• <strong>(i) Contact info:</strong> Name, job title, addresses, phone/fax, and email.</p>
              <p>• <strong>(ii) Business info:</strong> Project data, client instructions, and payment records.</p>
              <p>• <strong>(iii) Security:</strong> Website passwords or protected service credentials.</p>
              <p>• <strong>(iv) Public Data:</strong> Credit agencies and integrity databases.</p>
              <p>• <strong>(v) Legal:</strong> Litigation history relevant for compliance/antitrust.</p>
              <p>• <strong>(vi) Health:</strong> Disability or dietary needs for events (Consent based).</p>
              <p>• <strong>(vii) Recruitment:</strong> Qualifications and experience for applications.</p>
              <p>• <strong>(viii/ix) Others:</strong> User preferences and premises visit details.</p>
            </div>
          </motion.div>

          {/* Sections 4 to 9: Confidentiality & Methods */}
          <div className="space-y-4">
            {[
              { id: 4, text: "Includes membership of professional trade associations, personal health data, and details of any criminal records where relevant." },
              { id: 5, text: "Your Personal Information will be kept confidential to the maximum possible extent. Sensitive data is protected under Indian laws." },
              { id: 6, text: "Comments, blogs, or messages on public sections are considered published content and NOT personal information." },
              { id: 7, text: "We collect data when you browse, make enquiries, attend seminars, or offer services to us." },
              { id: 8, text: "Data may be collected from third parties, government agencies, or credit reporting agencies." },
              { id: 9, text: "Providing personal data is entirely voluntary with no detrimental effects if you choose not to consent." }
            ].map((item) => (
              <motion.div key={item.id} variants={itemVariants} className="flex gap-4 p-5 bg-zinc-900/40 border border-zinc-800 rounded-xl items-start">
                <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-[#1871C9] font-bold text-xs flex-shrink-0">{item.id}</div>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Section 10: Permitted Purposes */}
          <motion.div variants={itemVariants} className="p-8 md:p-12 bg-zinc-900 border border-zinc-800 rounded-3xl">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">10. Permitted Purposes</h2>
            <p className="text-sm text-zinc-500 mb-6 italic underline decoration-[#1871C9]/30">Case Matters does not sell or rent Personal Information. Usage includes:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-400 uppercase tracking-tight">
              <li className="flex gap-2"><span className="text-[#1871C9] font-bold">(i)</span> Access verification & experience enhancement</li>
              <li className="flex gap-2"><span className="text-[#1871C9] font-bold">(ii)</span> Providing legal advice & technology solutions</li>
              <li className="flex gap-2"><span className="text-[#1871C9] font-bold">(iii)</span> Relationship management & billing</li>
              <li className="flex gap-2"><span className="text-[#1871C9] font-bold">(iv)</span> Legal compliance & Anti-money laundering</li>
              <li className="flex gap-2"><span className="text-[#1871C9] font-bold">(v)</span> Analysis of communication & services</li>
              <li className="flex gap-2"><span className="text-[#1871C9] font-bold">(vi)</span> Security of IT systems & premises</li>
              <li className="flex gap-2"><span className="text-[#1871C9] font-bold">(x)</span> Regulatory audits globally</li>
              <li className="flex gap-2"><span className="text-[#1871C9] font-bold">(xii)</span> Court orders & legal defense</li>
            </ul>
          </motion.div>

          {/* Points 11 to 21: Processing & Sharing */}
          <div className="space-y-4">
             <div className="bg-[#1871C9]/5 border border-[#1871C9]/20 p-6 rounded-2xl">
                <h3 className="font-bold text-white mb-2 uppercase text-xs tracking-widest">11 - 14. Consent & Legal Grounds</h3>
                <p className="text-sm text-zinc-400">We process data based on client instructions, legal obligations, or express consent for marketing and newsletters. You may opt-out of marketing at any time.</p>
             </div>

             <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl">
                <h3 className="font-bold text-white mb-2 uppercase text-xs tracking-widest">15 - 17. Disclosure & Sharing</h3>
                <p className="text-sm text-zinc-400">Information may be shared between Case Matters entities, with clients during service provision, with fraud prevention agencies, or when required by courts and regulators.</p>
             </div>

             <div className="bg-zinc-800 text-zinc-300 p-6 rounded-2xl">
                <h3 className="font-bold text-[#1871C9] mb-2 uppercase text-xs tracking-widest">18 - 21. Security & Force Majeure</h3>
                <p className="text-sm opacity-80">We use mandated IT Act 2011 security measures. Case Matters is not responsible for data loss due to 'Force Majeure' events (Acts of God, hacking, computer crashes beyond reasonable control).</p>
             </div>
          </div>

          {/* Section 22 to 29: User Rights & Contact */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-sm">
                <AlertCircle className="text-[#1871C9] mb-4" />
                <h4 className="font-serif font-bold text-white text-xl mb-3">Your Data Rights</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  (24-27) You have the right to review, modify, or delete your Sensitive Personal Information. Withdrawal of consent may lead to discontinuation of certain services.
                </p>
            </div>
            <div className="p-8 bg-zinc-900/20 border border-zinc-800 rounded-3xl backdrop-blur-sm">
                <Mail className="text-[#1871C9] mb-4" />
                <h4 className="font-serif font-bold text-white text-xl mb-3">Feedback & Concerns</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  (28-29) For concerns regarding protection of your Personal Information or the Policy, contact us at:
                </p>
                <a href="mailto:casematters.info@gmail.com" className="text-[#1871C9] font-bold block mt-4 break-all hover:text-[#1871C9]/80 transition-colors">casematters.info@gmail.com</a>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Text */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-20 text-center border-t border-zinc-900 pt-10">
          <p className="text-xs text-zinc-600 uppercase tracking-widest mb-4">Case Matters LLP • DLF Almeda, Gurgaon</p>
          <p className="text-[10px] text-zinc-700 max-w-2xl mx-auto">
            © 2026 Case Matters. All rights reserved. This policy is subject to modification based on legal requirements.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;