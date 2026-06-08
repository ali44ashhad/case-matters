import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./pages/homePage/Home";
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
import ScrollToTop from "./components/ScrollToTop";
import { motion, AnimatePresence } from 'framer-motion';
import AdminForm from './components/AdminForm';
import AdminDashboard from './components/AdminDashboard';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import ServicePage from './pages/ServicePage';

const App = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const location = useLocation();
  const timerRef = useRef(null);

  useEffect(() => {
    // 1. Force state down whenever route changes
    setShowDisclaimer(false);

    // 2. Kill running timeouts immediately to protect resources
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 3. STRICT CHECK: Run the pop-up timer ONLY if the user is on the root Home route ("/")
    if (location.pathname === "/") {
      const delay = 5000; // 5 seconds wait time for home view

      timerRef.current = setTimeout(() => {
        setShowDisclaimer(true);
      }, delay);
    }

    // Clean up timers on component unmount or subsequent transitions
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [location.pathname]); // Listen exclusively to path location strings

  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (showDisclaimer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showDisclaimer]);

  const handleAccept = () => {
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
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/50 backdrop-blur"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              className="relative max-w-2xl w-full bg-gray-200 border border-[#2795F5]/20 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2795F5] to-transparent" />
              
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-[#2795F5] text-2xl md:text-3xl font-serif font-bold tracking-widest uppercase">
                    Disclaimer
                  </h2>
                  <div className="h-px w-16 bg-[#2795F5] mx-auto mt-2" />
                </div>
                
                <div className="text-gray-600 text-sm md:text-base leading-relaxed text-center space-y-4 max-h-[50vh] overflow-y-auto px-4 custom-scrollbar font-light">
                  <p>
                    The Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner. 
                    By accessing this website, <span className="text-gray-900 font-medium">www.casematters.in</span>, you acknowledge and confirm that you are seeking information relating to Case Matters of your own accord and that there has been no form of solicitation, advertisement or inducement by Case Matters or its members.
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
                    className="px-12 py-4 bg-[#2795F5] text-black font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs transition-all hover:bg-[#62AEF5] active:scale-95 shadow-xl shadow-[#E2B13C]/10"
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