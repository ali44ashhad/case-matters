import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Zap, Briefcase, Factory, Scale, 
  Rocket, Wallet, Truck, HeartPulse, Home,
  ChevronLeft, ChevronRight
} from 'lucide-react';
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
    <section className="relative min-h-screen bg-zinc-950 flex flex-col justify-center py-20 px-6 md:px-20 overflow-hidden font-sans">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1871C9]/5 blur-[120px] rounded-full pointer-events-none" />
      
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
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">
            Every Client, Every <span className="text-[#1871C9] italic font-light">Case Matters.</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900/10 backdrop-blur-md shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]"
              >
                {/* LEFT SIDE: IMAGE BLOCK */}
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <motion.img
                    key={`img-${currentIndex}`}
                    initial={{ scale: 1.2, filter: "grayscale(100%)" }}
                    animate={{ scale: 1, filter: "grayscale(0%)" }}
                    transition={{ duration: 1.5 }}
                    src={sectors[currentIndex].image}
                    alt={sectors[currentIndex].title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent lg:via-zinc-950/20" />
                  
                  {/* Floating Icon Over Image */}
                  <div className="absolute bottom-8 left-8 p-4 bg-[#1871C9] text-white rounded-2xl shadow-2xl">
                    {sectors[currentIndex].icon}
                  </div>
                </div>

                {/* RIGHT SIDE: CONTENT BLOCK */}
                <div className="p-10 md:p-16 flex flex-col justify-center bg-zinc-900/40">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[#1871C9] font-serif italic text-2xl">0{currentIndex + 1}</span>
                    <div className="h-px w-12 bg-zinc-800" />
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    {sectors[currentIndex].title}
                  </h3>
                  
                  <p className="text-zinc-400 text-lg leading-relaxed mb-8 font-light">
                    {sectors[currentIndex].desc}
                  </p>

                  <div className="pt-8 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] font-bold">Sector Expertise</span>
                    <div className="flex gap-4">
                      <button onClick={prevSlide} className="p-3 rounded-full border border-zinc-700 text-white hover:bg-[#1871C9] hover:border-[#1871C9] transition-all">
                        <ChevronLeft size={20} />
                      </button>
                      <button onClick={nextSlide} className="p-3 rounded-full border border-zinc-700 text-white hover:bg-[#1871C9] hover:border-[#1871C9] transition-all">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Quotes Accent */}
        {/* <div className="mt-16 text-center max-w-3xl mx-auto opacity-40">
           <p className="text-zinc-400 italic text-sm">
             "Judiciary is the guardian of civilized life." — Dr. A.P.J. Abdul Kalam
           </p>
        </div> */}
      </div>
    </section>
  );
};

export default SectorsCarousel;