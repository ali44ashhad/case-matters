import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion } from "framer-motion"; // Added Framer Motion
import axios from "axios";

const Testimonials = () => {
  const scrollRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/all-testimonials`);
        setTestimonials(response.data.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const slide = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    
    const visibleCards = getVisibleCards();
    const cardWidth = container.offsetWidth / visibleCards;
    
    let newIndex = currentIndex;
    if (direction === "next" && currentIndex < testimonials.length - visibleCards) {
      newIndex = currentIndex + 1;
    } else if (direction === "prev" && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }

    setCurrentIndex(newIndex);

    gsap.to(container, {
      scrollLeft: newIndex * (cardWidth + 24),
      duration: 0.8,
      ease: "power3.inOut"
    });
  };

  const visibleCards = getVisibleCards();
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= testimonials.length - visibleCards;

  if (loading) return <div className="py-24 bg-white text-center text-gray-700 italic">Loading Testimonials...</div>;

  return (
    <section className="w-full py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <p className="text-[#1871C9] font-bold tracking-[0.3em] uppercase mb-4 text-xs">
              Client Success
            </p>
            <h2 className="text-gray-900 text-4xl md:text-6xl font-serif font-bold leading-tight">
              What our <span className="text-[#1871C9]">Clients say.</span>
            </h2>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={() => slide("prev")}
              disabled={isAtStart}
              className={`relative p-[1.5px] rounded-full overflow-hidden transition-all duration-300 ${
                isAtStart ? "opacity-30" : "hover:shadow-[0_0_15px_rgba(24,113,201,0.4)] active:scale-90"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#1871C9] to-[#6BB1F5]" />
              <div className="relative bg-white p-4 rounded-full text-[#1871C9]">
                <ChevronLeft size={24} />
              </div>
            </button>

            <button 
              onClick={() => slide("next")}
              disabled={isAtEnd}
              className={`relative p-[1.5px] rounded-full overflow-hidden transition-all duration-300 ${
                isAtEnd ? "opacity-30" : "hover:shadow-[0_0_15px_rgba(24,113,201,0.4)] active:scale-90"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#1871C9] to-[#6BB1F5]" />
              <div className="relative bg-white p-4 rounded-full text-[#1871C9]">
                <ChevronRight size={24} />
              </div>
            </button>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth no-scrollbar gap-6 pb-12 pt-4 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }} // Card lifts on hover
              className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.33%-16px)] snap-center"
            >
              <div className="relative p-[2px] h-full rounded-xl transition-all duration-500 group hover:shadow-[0_15px_35px_-10px_rgba(24,113,201,0.4)]">
                
                {/* The Border Layer */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#1871C9] via-[#6BB1F5] to-[#1871C9]/20" />
                
                {/* Inner Card */}
                <div className="relative h-full p-10 rounded-[10px] bg-white flex flex-col justify-between z-10">
                  
                  <Quote className="absolute top-8 right-8 text-[#1871C9] opacity-10 group-hover:opacity-30 group-hover:rotate-12 transition-all duration-500" size={40} />

                  <div className="space-y-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < (item.rating || 5) ? "#1871C9" : "#E5E7EB"}>
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                      ))}
                    </div>

                    <p className="text-gray-700 text-lg font-light leading-relaxed italic">
                      "{item.description}"
                    </p>
                  </div>

                  <div className="mt-10 pt-6 border-t border-gray-100">
                    <h4 className="text-[#1871C9] font-bold text-xl">{item.name}</h4>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mt-1 font-semibold">
                      {item.companyName}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {testimonials.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 transition-all duration-300 rounded-full ${currentIndex === i ? 'w-8 bg-[#1871C9]' : 'w-2 bg-gray-300'}`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;