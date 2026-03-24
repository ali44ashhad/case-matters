import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Zap, Briefcase, Factory, Scale, 
  Rocket, Wallet, Truck, HeartPulse, Home,
  ChevronLeft, ChevronRight
} from 'lucide-react';

// Assuming these assets exist in your project structure
import infrastructureImage from '../../assets/homeAssets/infrastructure-image.jpg';
import professionalService from '../../assets/homeAssets/professional-service.jpg';

const SectorsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sectors = [
    { 
      title: "Infrastructure & Construction", 
      icon: <Building2 size={32} />, 
      image: infrastructureImage,
      desc: "Advisory and dispute resolution for contractors and developers across roads, railways, and urban infrastructure projects." 
    },
    { 
      title: "Energy, Power & Renewable", 
      icon: <Zap size={32} />, 
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop",
      desc: "Legal services for power producers and renewable energy developers involving project contracts and arbitration." 
    },
    { 
      title: "Professional Services", 
      icon: <Briefcase size={32} />, 
      image: professionalService,
      desc: "Advisory on contracts and dispute resolution for consultancy, advisory, and service-based organizations." 
    },
    { 
      title: "Manufacturing & Industrial", 
      icon: <Factory size={32} />, 
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
      desc: "Contractual advisory and employment compliance for manufacturing entities across production and supply chain." 
    },
    { 
      title: "Corporate & Commercial", 
      icon: <Scale size={32} />, 
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000&auto=format&fit=crop",
      desc: "Legal support for businesses on contract management, commercial disputes, and employment advisory." 
    },
    { 
      title: "Startups & MSME", 
      icon: <Rocket size={32} />, 
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000&auto=format&fit=crop",
      desc: "End-to-end legal advisory for startups covering business structuring, contracts, and regulatory obligations." 
    },
    { 
      title: "Financial Services & FinTech", 
      icon: <Wallet size={32} />, 
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
      desc: "Contract drafting and regulatory compliance advisory for financial institutions and fintech companies." 
    },
    { 
      title: "Logistics & Supply Chain", 
      icon: <Truck size={32} />, 
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
      desc: "Legal advisory on logistics contracts, service agreements, and arbitration from operational disputes." 
    },
    { 
      title: "Healthcare & Life Sciences", 
      icon: <HeartPulse size={32} />, 
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop",
      desc: "Contractual and employment advisory for hospitals, clinics, and healthcare service providers." 
    },
    { 
      title: "Real Estate & Development", 
      icon: <Home size={32} />, 
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop",
      desc: "Support for developers and landowners involving construction contracts and joint development agreements." 
    }
  ];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % sectors.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + sectors.length) % sectors.length);

  return (
    <section className="relative min-h-screen bg-white flex flex-col justify-center py-20 px-6 md:px-20 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header Section */}
        <div className="mb-12 space-y-4">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[#1871C9] font-bold tracking-[0.3em] uppercase text-xs"
          >
            Industry Verticals
          </motion.p>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900">
            Every Client, Every <span className="text-[#1871C9] italic font-light">Case Matters.</span>
          </h2>
        </div>
    
        {/* Carousel Container */}
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-[#1871C9]/30 via-[#1871C9]/10 to-transparent shadow-[0_10px_40px_rgba(24,113,201,0.05)]">
          
          <div className="overflow-hidden rounded-[15px] relative bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 min-h-[550px]"
              >
                {/* LEFT SIDE: IMAGE BLOCK */}
                <div className="relative h-72 lg:h-auto overflow-hidden bg-gray-100">
                  <motion.img
                    key={`img-${currentIndex}`}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    src={sectors[currentIndex].image}
                    alt={sectors[currentIndex].title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  <div className="absolute bottom-8 left-8 p-5 bg-[#1871C9] text-white rounded-xl shadow-2xl z-20">
                    {sectors[currentIndex].icon}
                  </div>
                </div>
    
                {/* RIGHT SIDE: CONTENT BLOCK WITH TARGETED GRADIENT */}
                <div className="p-10 md:p-16 flex flex-col justify-center relative z-10 bg-gradient-to-br from-[#1871C9]/10 via-white to-white">
                  
                  {/* Internal Branding Elements */}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-[#1871C9] font-serif italic text-3xl font-bold">
                      0{currentIndex + 1}
                    </span>
                    <div className="h-[2px] w-16 bg-gradient-to-r from-[#1871C9] to-transparent" />
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
                    {sectors[currentIndex].title}
                  </h3>
                  
                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10 font-light">
                    {sectors[currentIndex].desc}
                  </p>
    
                  {/* Navigation Footer */}
                  <div className="pt-10 border-t border-[#1871C9]/10 flex items-center justify-between">
                    <span className="text-[#1871C9] text-[10px] uppercase tracking-[0.3em] font-black">
                      Sector Expertise
                    </span>
                    <div className="flex gap-5">
                      <button 
                        onClick={prevSlide} 
                        className="p-4 rounded-full border border-[#1871C9]/20 text-gray-900 hover:bg-[#1871C9] hover:text-white transition-all duration-300"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={nextSlide} 
                        className="p-4 rounded-full border border-[#1871C9]/20 text-gray-900 hover:bg-[#1871C9] hover:text-white transition-all duration-300"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorsCarousel;