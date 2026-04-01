import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Zap, Briefcase, Factory, Scale, 
  Rocket, Wallet, Truck, HeartPulse, Home,
} from 'lucide-react';
import * as THREE from 'three';

// Assuming these assets exist in your project structure
import infrastructureImage from '../../assets/homeAssets/infrastructure-image.jpg';
import professionalService from '../../assets/homeAssets/professional-service.jpg';

const SectorsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loopReady, setLoopReady] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const canvasContainer = useRef(null);

  const sectors = [
    { 
      title: "Infrastructure & Construction",  
      image: infrastructureImage,
      desc: "Advisory and dispute resolution for contractors and developers across roads, railways, and urban infrastructure projects." 
    },
    { 
      title: "Energy, Power & Renewable",  
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop",
      desc: "Legal services for power producers and renewable energy developers involving project contracts and arbitration." 
    },
    { 
      title: "Professional Services",  
      image: professionalService,
      desc: "Advisory on contracts and dispute resolution for consultancy, advisory, and service-based organizations." 
    },
    { 
      title: "Manufacturing & Industrial",  
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
      desc: "Contractual advisory and employment compliance for manufacturing entities across production and supply chain." 
    },
    { 
      title: "Corporate & Commercial",  
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000&auto=format&fit=crop",
      desc: "Legal support for businesses on contract management, commercial disputes, and employment advisory." 
    },
    { 
      title: "Startups & MSME",  
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000&auto=format&fit=crop",
      desc: "End-to-end legal advisory for startups covering business structuring, contracts, and regulatory obligations." 
    },
    { 
      title: "Financial Services & FinTech",  
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
      desc: "Contract drafting and regulatory compliance advisory for financial institutions and fintech companies." 
    },
    { 
      title: "Logistics & Supply Chain",   
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
      desc: "Legal advisory on logistics contracts, service agreements, and arbitration from operational disputes." 
    },
    { 
      title: "Healthcare & Life Sciences",  
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop",
      desc: "Contractual and employment advisory for hospitals, clinics, and healthcare service providers." 
    },
    { 
      title: "Real Estate & Development",  
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop",
      desc: "Support for developers and landowners involving construction contracts and joint development agreements." 
    }
  ];

  // Auto carousel
  useEffect(() => {
    if (isPaused) return;
    if (!loopReady) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4200);
    return () => clearInterval(id);
  }, [isPaused, loopReady]);

  // Start from the middle copy for seamless looping
  useEffect(() => {
    const len = sectors.length;
    if (!len) return;
    setLoopReady(false);
    requestAnimationFrame(() => {
      setCurrentIndex(len);
      setLoopReady(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Seamless wrap: jump back by 1 length (no visible change)
  useEffect(() => {
    if (!loopReady) return;
    const len = sectors.length;
    if (!len) return;

    // when we reach the end of the duplicated track, jump back into the middle copy
    if (currentIndex >= len * 2 - 1) {
      setIsJumping(true);
      setCurrentIndex((prev) => prev - len);
      requestAnimationFrame(() => setIsJumping(false));
    }
  }, [currentIndex, loopReady, sectors.length]);

  // Subtle 3D particles (light theme) to match other sections
  useEffect(() => {
    if (!canvasContainer.current) return;

    const isSmallScreen =
      typeof window !== 'undefined' &&
      typeof window.matchMedia !== 'undefined' &&
      window.matchMedia('(max-width: 639px)').matches;

    let rafId = 0;
    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0xe8f0fa, 0.02);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 80);
    camera.position.set(0, 0.4, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    canvasContainer.current.appendChild(renderer.domElement);

    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = isSmallScreen ? 520 : 900;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMat = new THREE.PointsMaterial({
      color: 0x5a9fe0,
      size: isSmallScreen ? 0.017 : 0.02,
      transparent: true,
      opacity: isSmallScreen ? 0.16 : 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    const ambient = new THREE.AmbientLight(0xd0dff0, 0.75);
    scene.add(ambient);

    const key = new THREE.PointLight(0x1871c9, isSmallScreen ? 0.55 : 0.7, 50);
    key.position.set(2.2, 2, 3);
    scene.add(key);

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

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
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

  return (
    <section className="relative flex flex-col justify-center py-7 sm:py-16 md:py-20 px-4 sm:px-6 md:px-20 overflow-hidden font-sans bg-gradient-to-br from-[#ffffff] via-[#eef6ff] to-[#dcecff]">
      {/* 3D Canvas Background */}
      <div ref={canvasContainer} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Light overlays to match AboutSecond */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-white/90 via-transparent to-white/40 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,_rgba(24,113,201,0.22),_transparent_58%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_bottom_right,_rgba(88,166,255,0.14),_transparent_48%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(120deg,_rgba(24,113,201,0.08)_0%,_transparent_42%,_rgba(24,113,201,0.06)_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header Section */}
        <div className="mb-5 sm:mb-10 md:mb-12 space-y-2 sm:space-y-3 md:space-y-4">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[#1871C9] font-bold tracking-[0.28em] sm:tracking-[0.3em] uppercase text-sm sm:text-lg md:text-xl lg:text-2xl"
          >
            Industry Verticals
          </motion.p>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">
            Every Client, Every <span className="text-[#1871C9] italic font-light">Case Matters.</span>
          </h2>
        </div>
    
        {/* Carousel Container */}
        <div
          className="relative p-[1px] rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#1871C9]/30 via-[#1871C9]/10 to-transparent shadow-[0_10px_40px_rgba(24,113,201,0.07)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          <div className="overflow-hidden rounded-[15px] relative bg-white/80 backdrop-blur-md border border-[#1871C9]/10">
            {/* Viewport padding makes the next card peek */}
            <div className="w-full overflow-hidden pr-[10%] sm:pr-[14%] md:pr-[18%]">
              <motion.div
                className="flex gap-4 sm:gap-6 md:gap-8"
                animate={{ x: `-${currentIndex * 86}%` }}
                transition={isJumping ? { duration: 0 } : { type: "spring", stiffness: 80, damping: 18 }}
              >
                {[...sectors, ...sectors].map((sector, idx) => (
                  <div
                    key={`${sector.title}-${idx}`}
                    className="shrink-0 w-[86%] lg:w-[84%] min-h-[360px] sm:min-h-[500px] lg:min-h-[550px] grid grid-cols-1 lg:grid-cols-2"
                    aria-hidden={idx !== currentIndex}
                  >
                    {/* LEFT SIDE: IMAGE BLOCK */}
                    <div className="relative h-56 sm:h-72 lg:h-auto overflow-hidden bg-gray-100">
                      <motion.img
                        key={`img-${idx}`}
                        initial={{ scale: 1.06 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.1 }}
                        src={sector.image}
                        alt={sector.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>

                    {/* RIGHT SIDE: CONTENT BLOCK */}
                    <div className="p-4 sm:p-8 md:p-16 flex flex-col justify-center relative z-10 bg-gradient-to-br from-[#1871C9]/10 via-white to-white">
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                        <span className="text-[#1871C9] font-serif italic text-xl sm:text-3xl font-bold">
                          0{(idx % sectors.length) + 1}
                        </span>
                        <div className="h-[2px] w-12 sm:w-16 bg-gradient-to-r from-[#1871C9] to-transparent" />
                      </div>

                      <h3 className="text-xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-6 md:mb-8 tracking-tight leading-tight">
                        {sector.title}
                      </h3>

                      <p className="text-gray-600 text-sm sm:text-lg md:text-xl leading-relaxed mb-5 sm:mb-8 md:mb-10 font-light">
                        {sector.desc}
                      </p>

                      <div className="pt-5 sm:pt-8 md:pt-10 border-t border-[#1871C9]/10 flex items-center justify-between">
                        <span className="text-[#1871C9] text-xs sm:text-sm md:text-lg uppercase tracking-[0.26em] sm:tracking-[0.3em] font-black">
                          Sector Expertise
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SectorsCarousel;