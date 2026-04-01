import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Quote } from "lucide-react";
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
  const [loopReady, setLoopReady] = useState(false);

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

  const getStep = () => {
    const container = scrollRef.current;
    if (!container) return { step: 0, cardWidth: 0, gap: 0 };

    const firstCard = container.querySelector("[data-testimonial-card='true']");
    const cardWidth = firstCard?.getBoundingClientRect?.().width || container.offsetWidth / visibleCards;
    const styles = window.getComputedStyle(container);
    const gapRaw = styles.columnGap || styles.gap || "0px";
    const gap = Number.parseFloat(gapRaw) || 0;
    return { step: cardWidth + gap, cardWidth, gap };
  };

  const scrollToIndex = (newIndex, opts = { instant: false }) => {
    const container = scrollRef.current;
    if (!container) return;

    const { step } = getStep();
    if (!step) return;

    setCurrentIndex(newIndex);

    if (opts.instant) {
      gsap.killTweensOf(container);
      container.scrollLeft = newIndex * step;
      return;
    }

    gsap.to(container, {
      scrollLeft: newIndex * step,
      duration: 0.8,
      ease: "power3.inOut"
    });
  };

  const maxIndex = Math.max(0, testimonials.length - visibleCards);

  // Auto carousel (pause on hover)
  useEffect(() => {
    if (loading) return;
    if (isPaused) return;
    if (!testimonials?.length) return;
    if (!loopReady) return;

    const id = setInterval(() => {
      const len = testimonials.length;
      const next = currentIndex + 1;
      scrollToIndex(next);
    }, 4200);

    return () => clearInterval(id);
  }, [loading, isPaused, testimonials, currentIndex, loopReady]);

  // Ensure alignment after data load / breakpoint change
  useEffect(() => {
    if (loading) return;
    if (!testimonials?.length) return;

    // Setup infinite loop by rendering duplicates and starting at "middle"
    const startAt = testimonials.length; // first item of second copy
    setLoopReady(false);
    // Wait a tick so DOM has cards measured
    requestAnimationFrame(() => {
      scrollToIndex(startAt, { instant: true });
      setLoopReady(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, testimonials.length, visibleCards]);

  // Seamless wrap: when we reach the end of duplicated track, jump back by 1 length instantly
  useEffect(() => {
    if (loading) return;
    if (!loopReady) return;
    const len = testimonials.length;
    if (!len) return;

    if (currentIndex >= len * 2 - visibleCards) {
      // jump back into the middle copy without visual change
      const backTo = currentIndex - len;
      scrollToIndex(backTo, { instant: true });
    }
  }, [currentIndex, loopReady, loading, testimonials.length, visibleCards]);

  if (loading) return <div className="py-8 sm:py-14 md:py-24 bg-gradient-to-br from-[#ffffff] via-[#eef6ff] to-[#dcecff] text-center text-gray-700 italic text-sm">Loading Testimonials...</div>;

  return (
    <section className="relative w-full py-7 sm:py-12 md:py-24 overflow-hidden font-sans bg-gradient-to-br from-[#ffffff] via-[#eef6ff] to-[#dcecff]">
      <div ref={canvasContainer} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-white/90 via-transparent to-white/40 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,_rgba(24,113,201,0.22),_transparent_58%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_bottom_right,_rgba(88,166,255,0.14),_transparent_48%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(120deg,_rgba(24,113,201,0.08)_0%,_transparent_42%,_rgba(24,113,201,0.06)_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-5 sm:mb-10 md:mb-16 gap-3 sm:gap-6 md:gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <p className="text-[#1871C9] font-bold tracking-[0.24em] sm:tracking-[0.28em] md:tracking-[0.3em] uppercase mb-2 sm:mb-3 md:mb-4 text-[11px] sm:text-sm md:text-lg">
              Client Success
            </p>
            <h2 className="text-gray-900 text-2xl sm:text-3xl md:text-6xl font-serif font-bold leading-tight">
              What our <span className="text-[#1871C9]">Clients say.</span>
            </h2>
          </motion.div>
        </div>

        {/* Testimonials Slider */}
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex overflow-x-auto scroll-smooth no-scrollbar gap-3 sm:gap-4 md:gap-6 pb-4 sm:pb-8 md:pb-12 pt-2 sm:pt-3 md:pt-4 px-0.5 sm:px-1 md:px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {[...testimonials, ...testimonials].map((item, index) => (
            <motion.div
              key={`${item._id}-${index}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }} // Card lifts on hover
              data-testimonial-card="true"
              className="shrink-0 basis-[88%] sm:basis-[70%] md:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"
            >
              <div className="relative p-[2px] h-full rounded-xl transition-all duration-500 group hover:shadow-[0_15px_35px_-10px_rgba(24,113,201,0.4)]">
                
                {/* The Border Layer */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#1871C9] via-[#6BB1F5] to-[#1871C9]/20" />
                
                {/* Inner Card */}
                <div className="relative h-full p-4 sm:p-5 md:p-10 rounded-[10px] bg-white flex flex-col justify-between z-10">
                  
                  <Quote className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-8 md:right-8 text-[#1871C9] opacity-10 group-hover:opacity-20 group-hover:rotate-12 transition-all duration-500" size={26} />

                  <div className="space-y-4 md:space-y-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < (item.rating || 5) ? "#1871C9" : "#E5E7EB"}>
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                      ))}
                    </div>

                    <p className="text-gray-700 text-sm sm:text-base md:text-lg font-light leading-relaxed italic">
                      "{item.description}"
                    </p>
                  </div>

                  <div className="mt-5 sm:mt-6 md:mt-10 pt-4 sm:pt-5 md:pt-6 border-t border-gray-100">
                    <h4 className="text-[#1871C9] font-bold text-base sm:text-lg md:text-xl">{item.name}</h4>
                    <p className="text-gray-500 text-[10px] uppercase tracking-[0.22em] sm:tracking-widest mt-1 font-semibold">
                      {item.companyName}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-3 md:hidden">
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