import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Gavel, ShieldAlert, Copyright, Globe, Info, Link as LinkIcon, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-white py-24 px-6 md:px-12 lg:px-24 relative font-sans text-gray-600">
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
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6">
            Terms & <span className="text-[#1871C9] italic font-light">Conditions</span>
          </h1>
          <div className="h-1 w-20 bg-[#1871C9] mx-auto mt-8" />
        </motion.div>

        {/* 1-3. Introduction & BCI Compliance */}
        <motion.div variants={containerVars} initial="hidden" animate="visible" className="space-y-8">
          {/* Full terms text (as provided) */}
          <motion.div variants={itemVars} className="p-6 sm:p-8 md:p-12 bg-gray-200/70 border border-gray-200/60 rounded-3xl shadow-sm">
            <ol className="space-y-4 text-sm leading-relaxed text-gray-700 list-decimal pl-5">
              <li>This website is operated by Case Matters. References to " Case Matters " are to the legal entities that comprise Case Matters.</li>
              <li>The Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner.</li>
              <li>By accessing this website (www.casematters.in), including the whole or any part of the web pages located at the website, layout of this website; individual elements of this website's design; underlying code elements of the website; or text, sounds, graphics, animated elements or any other content of this website and associated mobile applications (collectively, “Website”), you are deemed to accept the following terms and conditions and acknowledge and confirm that you are seeking information relating to Case Matters of your own accord and that there has been no form of solicitation, advertisement or inducement by Case Matters or its members.</li>
              <li>The content of this website is for informational purposes only and should not be interpreted as soliciting or advertisement. No material/information provided on this website should be construed as legal advice. Case Matters shall not be liable for consequences of any action taken by relying on the material/information provided on this website.</li>
              <li>As you browse through this website you may access other websites that are subject to different terms of use. When using these other sites, you will be bound by the terms and conditions posted on those websites.</li>
              <li>Case Matters may change these terms of use at any time without notice. Any amendment will be effective immediately. You are encouraged to periodically visit this page to review the Terms and Conditions and any changes thereto. Discontinuing use of the Website will not affect the applicability of the Terms and Conditions to your prior uses of the Website.</li>
              <li>Case Matters makes no representations about the suitability, reliability, timeliness, comprehensiveness and accuracy of the information, services and other content contained on this website. The content on this website is provided by Case Matters in good faith on an "as is" basis for general information purposes only and is not intended to constitute or substitute legal or other professional advice. It should be noted that such information can rapidly become out of date. You must make your own assessment of the information and rely on it wholly at your own risk. Case Matters may, from time to time, change or add to this website without notice. However, we do not undertake to keep this website updated. Case Matters is not liable to you or anyone else if errors occur in the information on this website or if that information is not up-to-date.</li>
              <li>Legal content on this website relates only to the law or laws it is specified to apply to, and that law may be different from your law.</li>
              <li>Case Matters shall not be liable directly or indirectly in contract, tort, equity or otherwise for any damage whatsoever in connection with this website, use of content provided on this website or any other website hyperlinked from the Website, including any direct, indirect, special, incidental or consequential damage (including but not limited to loss of profits, interest, data, business revenue, anticipated savings, business or goodwill).</li>
              <li>This general disclaimer is not restricted or modified by any specific warnings and disclaimers elsewhere on this website.</li>
              <li>This website is copyright property of Case Matters, and all rights are reserved. You are provided with access to it only for your personal and non-commercial use. You may not, in any form or by any means: (i) adapt, reproduce, store, distribute, transmit, print, display, perform, publish or create derivative works from any part of this website; or (ii) commercialise any information, products or services obtained from any part of this website, without our written permission.</li>
              <li>All rights in this website and the content on this website including copyright, design rights, patents, inventions, knowhow, database rights, trade marks, source codes and any other intellectual property rights in any of the foregoing are reserved to Case Matters and/or their content and technology providers.</li>
              <li>All trade names, trade marks, service marks and other product and service names and logos (the "Marks") displayed on the website are proprietary to their respective owners and are protected by applicable trade mark and copyright laws. These Marks may be registered or unregistered marks of Case Matters or others.</li>
              <li>Nothing contained on the website should be construed as granting any licence or right of use of any other person's or entity's trade mark which is displayed on this website without their express permission.</li>
              <li>You may not remove, change or obscure the Marks or any notices of proprietary rights on any content of this website.</li>
              <li>This website may contain links to other websites solely for your convenience only and may not remain current or be maintained. Case Matters does not endorse, recommend or approve of any information, products or services referred to on such linked sites and assumes no responsibility for the contents of any other website to which this website offers links.</li>
              <li>You may not link the homepage or any other parts of this website without prior written consent from Case Matters.</li>
              <li>Unless stated otherwise on this website, Case Matters has: (i) no relationship with the owners or operators of those linked website; and (ii) no control over or rights in those linked website.</li>
              <li>These terms of use incorporate, and should be read together with, the Case Matters Privacy Policy (available at Privacy Policy)</li>
              <li>If you express interest in products or services through your use of this website, you consent to Case Matters sending commercial electronic messages (including messages about Case Matters products and services and the products and services of third parties) to electronic addresses which you have provided to Case Matters or for which you or your employer (or your employer's related bodies corporate) are the relevant electronic account holder.</li>
              <li>These terms and conditions and any dispute, controversy, proceedings or claim of whatever nature arising out of or in any way relating to these terms and conditions shall be governed by and construed in accordance with Indian law and the courts of Mumbai shall have exclusive jurisdiction to resolve any disputes between us relating to these terms and conditions.</li>
            </ol>
          </motion.div>
          {/* Governing Law & Jurisdiction */}
          <motion.div 
            variants={itemVars}
            className="mt-12 p-10 rounded-3xl bg-gray-200/70 border border-gray-200/60 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 p-8 opacity-5"><Scale size={120} className="text-[#1871C9]" /></div>
            <h3 className="text-2xl font-serif font-bold mb-4 relative z-10 text-gray-900">Governing Law & <span className="text-[#1871C9]">Jurisdiction</span></h3>
            <p className="text-gray-600 text-sm max-w-3xl mx-auto relative z-10 leading-relaxed italic">
              "These terms and conditions and any dispute arising shall be governed by and construed in accordance with Indian law and the courts of Mumbai shall have exclusive jurisdiction to resolve any disputes."
            </p>
          </motion.div>
          {/* Final Footer Text */}
          <motion.div variants={itemVars} className="text-center pt-10 border-t border-gray-200">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Case Matters LLP • DLF Almeda, Gurgaon</p>
            <p className="text-[10px] text-gray-600">© 2026 Case Matters. All Rights Reserved.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
export default TermsAndConditions;  