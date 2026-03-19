import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import axios from "axios";

const Testimonials = () => {
  const scrollRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data from Backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/all-testimonials`);
        // Accessing the 'data' array from your response structure
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
      scrollLeft: newIndex * (cardWidth + 24), // 24 is gap-6
      duration: 0.8,
      ease: "power3.inOut"
    });
  };

  const visibleCards = getVisibleCards();
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= testimonials.length - visibleCards;

  // Render nothing or a skeleton while loading to prevent GSAP calculation errors
  if (loading) return <div className="py-24 bg-[#09090B] text-center text-white">Loading Testimonials...</div>;

  return (
    <section className="w-full py-24 bg-[#09090B] overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="text-left">
            <p className="text-[#1871C9] font-bold tracking-[0.3em] uppercase mb-4 text-xs">
              Client Success
            </p>
            <h2 className="text-white text-4xl md:text-6xl font-serif font-bold leading-tight">
              What our <span className="text-[#1871C9]">Clients say.</span>
            </h2>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => slide("prev")}
              disabled={isAtStart}
              className={`p-4 rounded-full border transition-all duration-300 ${
                isAtStart 
                ? "opacity-50 text-white border-white/10 cursor-not-allowed" 
                : "border-white/10 bg-[#1871C9] text-black hover:cursor-pointer"
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => slide("next")}
              disabled={isAtEnd}
              className={`p-4 rounded-full border transition-all duration-300 ${
                isAtEnd 
                ? "opacity-50 text-white border-white/10 cursor-not-allowed" 
                : "border-white/10 bg-[#1871C9] text-black hover:cursor-pointer"
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth no-scrollbar gap-6 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((item) => (
            <div
              key={item._id}
              className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.33%-16px)] snap-center"
            >
              <div className="h-full p-10 rounded-sm bg-[#161617] border border-white/10 flex flex-col justify-between hover:border-[#1871C9]/50 transition-all duration-500 group relative">
                
                <Quote className="absolute top-8 right-8 text-[#1871C9] opacity-10 group-hover:opacity-40 transition-opacity" size={40} />

                <div className="space-y-6">
                  {/* Dynamic Rating Stars */}
                  <div className="flex gap-1">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#1871C9">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    ))}
                  </div>

                  {/* Backend Description */}
                  <p className="text-gray-100 text-lg font-light leading-relaxed italic">
                    "{item.description}"
                  </p>
                </div>

                <div className="mt-10 pt-6 border-t border-white/10">
                  {/* Backend Name & Company */}
                  <h4 className="text-[#1871C9] font-bold text-xl">{item.name}</h4>
                  <p className="text-[#1871C9] text-xs uppercase tracking-widest mt-1 font-semibold">
                    {item.companyName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex justify-center gap-2 mt-12 md:hidden">
          {testimonials.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 transition-all duration-300 rounded-full ${currentIndex === i ? 'w-8 bg-[#1871C9]' : 'w-2 bg-white/20'}`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;