import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Home from "./pages/homePage/Home";
import { Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";
import Arbitration from "./pages/servicesPages/Arbitration";
import Construction from "./pages/servicesPages/Construction";
import ContractAdvisory from "./pages/servicesPages/ContractAdvisory";
import ContractClaim from "./pages/servicesPages/ContractClaim";
import Employement from "./pages/servicesPages/Employement";
import StartUp from "./pages/servicesPages/StartUp";
import Civil from "./pages/servicesPages/Civil";
import PrivacyPolicy from "./pages/policies/PrivacyPolicy";
import TermsAndConditions from "./pages/policies/TermsAndConditions";
// import LegalDisclaimer from "./pages/policies/LegalDisclaimer";
import ScrollToTop from "./components/ScrollToTop";
import { motion, AnimatePresence } from 'framer-motion';
import AdminForm from './components/AdminForm';
import AdminDashboard from './components/AdminDashboard';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import ServicePage from './pages/ServicePage';

const App = () => {
  // FIX: This function runs ONLY once when the app starts.
  // It checks localStorage immediately to see if the user already accepted.
  const [showDisclaimer, setShowDisclaimer] = useState(() => {
    const isAccepted = localStorage.getItem("casematters_legal_accepted");
    return isAccepted !== "true"; // If not true, show the disclaimer.
  });

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showDisclaimer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showDisclaimer]);

  const handleAccept = () => {
    // Save to localStorage so it persists through refreshes and browser restarts
    localStorage.setItem("casematters_legal_accepted", "true");
    setShowDisclaimer(false);
  };

  return (
    <>
      <ScrollToTop />
      
      <AnimatePresence>
        {showDisclaimer && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-zinc-950/98 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              className="relative max-w-2xl w-full bg-zinc-900 border border-[#E2B13C]/20 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E2B13C] to-transparent" />
              
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-[#E2B13C] text-2xl md:text-3xl font-serif font-bold tracking-widest uppercase">
                    Disclaimer
                  </h2>
                  <div className="h-px w-16 bg-[#E2B13C]/40 mx-auto mt-2" />
                </div>
                
                <div className="text-zinc-400 text-sm md:text-base leading-relaxed text-center space-y-4 max-h-[50vh] overflow-y-auto px-4 custom-scrollbar font-light">
                  <p>
                    The Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner. 
                    By accessing this website, <span className="text-white font-medium">www.casematters.in</span>, you acknowledge and confirm that you are seeking information relating to Case Matters of your own accord and that there has been no form of solicitation, advertisement or inducement by Case Matters or its members.
                  </p>
                  <p>
                    The content of this website is for informational purposes only and should not be interpreted as soliciting or advertisement. 
                    No material/information provided on this website should be construed as legal advice. Case Matters shall not be liable for consequences of any action taken by relying on the material/information provided on this website. 
                    The contents of this website are the intellectual property of Case Matters.
                  </p>
                </div>

                <div className="pt-6 flex justify-center">
                  <button 
                    onClick={handleAccept}
                    className="px-12 py-4 bg-[#E2B13C] text-black font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs transition-all hover:bg-white active:scale-95 shadow-xl shadow-[#E2B13C]/10"
                  >
                    I Accept the Above
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/services/arbitration" element={<Arbitration/>} />
        <Route path="/services/construction" element={<Construction/>} />
        <Route path="/services/contract-advisory" element={<ContractAdvisory/>} />
        <Route path="/services/contract-claim" element={<ContractClaim/>} />
        <Route path="/services/employement" element={<Employement/>} />
        <Route path="/services/startup" element={<StartUp/>} />
        <Route path="/services/civil" element={<Civil/>} />
        <Route path="/policies/privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="/policies/terms-and-conditions" element={<TermsAndConditions/>} />
        <Route path="/admin-login" element={<AdminForm/>} />
        <Route path="/admin-dashboard" element={<AdminProtectedRoute><AdminDashboard/></AdminProtectedRoute>} />
        <Route path="/all-services" element={<ServicePage/>} />
      </Routes>

      <Footer/>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2B13C33; border-radius: 10px; }
      `}} />
    </>
  );
};

export default App;