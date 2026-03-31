import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion } from "framer-motion"; // Added Framer Motion
import axios from "axios";
import * as THREE from "three";

const Testimonials = () => {
  const scrollRef = useRef(null);
  const canvasContainer = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);

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

  // Subtle 3D particles (light theme) to match other sections
  useEffect(() => {
    if (!canvasContainer.current) return;

    let rafId = 0;
    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0xe8f0fa, 0.02);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 80);
    camera.position.set(0, 0.4, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    canvasContainer.current.appendChild(renderer.domElement);

    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 900;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMat = new THREE.PointsMaterial({
      color: 0x5a9fe0,
      size: 0.02,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    const ambient = new THREE.AmbientLight(0xd0dff0, 0.75);
    scene.add(ambient);

    const resize = () => {
      if (!canvasContainer.current) return;
      const { width, height } = canvasContainer.current.getBoundingClientRect();
      const w = width || window.innerWidth;
      const h = height || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    ro?.observe(canvasContainer.current);

    let t = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      t += 0.006;
      particles.rotation.y = t * 0.05;
      particles.rotation.x = Math.sin(t * 0.25) * 0.06;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro?.disconnect();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
      if (canvasContainer.current?.contains(renderer.domElement)) {
        canvasContainer.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const getVisibleCards = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  useEffect(() => {
    const update = () => setVisibleCards(getVisibleCards());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scrollToIndex = (newIndex) => {
    const container = scrollRef.current;
    if (!container) return;
    
    const cardWidth = container.offsetWidth / visibleCards;
    setCurrentIndex(newIndex);

    gsap.to(container, {
      scrollLeft: newIndex * (cardWidth + 24),
      duration: 0.8,
      ease: "power3.inOut"
    });
  };

  const slide = (direction) => {
    const maxIndex = Math.max(0, testimonials.length - visibleCards);
    let newIndex = currentIndex;
    if (direction === "next") {
      newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    } else if (direction === "prev") {
      newIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    }
    scrollToIndex(newIndex);
  };

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= testimonials.length - visibleCards;

  // Auto carousel (pause on hover)
  useEffect(() => {
    if (loading) return;
    if (isPaused) return;
    if (!testimonials?.length) return;

    const id = setInterval(() => {
      const maxIndex = Math.max(0, testimonials.length - visibleCards);
      const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      scrollToIndex(nextIndex);
    }, 4200);

    return () => clearInterval(id);
  }, [loading, isPaused, testimonials, visibleCards, currentIndex]);

  if (loading) return <div className="py-24 bg-gradient-to-br from-[#ffffff] via-[#eef6ff] to-[#dcecff] text-center text-gray-700 italic">Loading Testimonials...</div>;

  return (
    <section className="relative w-full py-24 overflow-hidden font-sans bg-gradient-to-br from-[#ffffff] via-[#eef6ff] to-[#dcecff]">
      <div ref={canvasContainer} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-white/90 via-transparent to-white/40 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,_rgba(24,113,201,0.22),_transparent_58%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_bottom_right,_rgba(88,166,255,0.14),_transparent_48%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(120deg,_rgba(24,113,201,0.08)_0%,_transparent_42%,_rgba(24,113,201,0.06)_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <p className="text-[#1871C9] font-bold tracking-[0.3em] uppercase mb-4 text-base md:text-lg">
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
              <div className="relative bg-gradient-to-r from-[#EAF4FF] to-white p-4 rounded-full text-[#1871C9]">
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
              <div className="relative bg-gradient-to-r from-[#EAF4FF] to-white p-4 rounded-full text-[#1871C9]">
                <ChevronRight size={24} />
              </div>
            </button>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-6 pb-12 pt-4 px-2"
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
              className="shrink-0 basis-full md:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)] snap-center"
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