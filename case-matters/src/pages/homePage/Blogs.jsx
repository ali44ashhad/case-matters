import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import employementImage from '../../assets/homeAssets/employement.jpg'
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const blogs = [
  {
    id: 1,
    category: "Legal Insights",
    title: "Delay Claims in Construction & Infrastructure Projects: What Contractors Must Prove",
    excerpt: "Understanding the shift towards institutional arbitration in global markets.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Startup Law",
    title: "Top 5 Compliance Mistakes Founders Make",
    excerpt: "Common pitfalls in early-stage legal structuring and how to avoid them.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Employment",
    title: "New Labor Regulations: What Employers Need to Know",
    excerpt: "A deep dive into recent statutory changes affecting the modern workforce.",
    image: employementImage,
  },
  {
    id: 4,
    category: "Contract Law",
    title: "The Art of Risk Mitigation in Contracts",
    excerpt: "How precise drafting can save businesses from future litigation.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
  },
];

const Blogs = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const canvasContainer = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth Entry: Sliding up with a slight 3D tilt
      gsap.fromTo(
        cardRefs.current,
        { 
          y: 80,
          opacity: 0,
          scale: 0.9,
          rotateX: -15
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1.2,
          ease: "expo.out", 
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%", 
            toggleActions: "play none none reverse", 
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Subtle 3D particles background (light theme)
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
      opacity: 0.18,
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

  return (
    <section id="blogs" ref={sectionRef} className="relative w-full py-8 sm:py-16 md:py-24 overflow-hidden font-sans bg-gradient-to-br from-[#ffffff] via-[#eef6ff] to-[#dcecff]">
      <div ref={canvasContainer} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-white/90 via-transparent to-white/40 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,_rgba(24,113,201,0.22),_transparent_58%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_bottom_right,_rgba(88,166,255,0.14),_transparent_48%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(120deg,_rgba(24,113,201,0.08)_0%,_transparent_42%,_rgba(24,113,201,0.06)_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-5 sm:mb-10 md:mb-16">
          <h2 className="text-gray-900 text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight">
            Latest <span className="text-[#1871C9]">Legal Insights</span>
          </h2>
          <p className="text-gray-600 mt-2 sm:mt-3 md:mt-4 max-w-2xl text-sm sm:text-base md:text-lg font-light">
            Stay updated with our latest thoughts on arbitration, compliance, and corporate law.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 [perspective:1000px]">
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="group relative h-[320px] sm:h-[360px] lg:h-[400px] w-full cursor-pointer"
            >
              {/* Corner highlights */}
              <div className="pointer-events-none absolute inset-0 z-20">
                <span className="absolute left-3 top-3 h-7 w-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[#1871C9] to-transparent drop-shadow-[0_0_10px_rgba(24,113,201,0.55)]" />
                  <span className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#1871C9] to-transparent drop-shadow-[0_0_10px_rgba(24,113,201,0.55)]" />
                </span>
                <span className="absolute right-3 top-3 h-7 w-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="absolute right-0 top-0 h-[2px] w-full bg-gradient-to-l from-[#1871C9] to-transparent drop-shadow-[0_0_10px_rgba(24,113,201,0.55)]" />
                  <span className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#1871C9] to-transparent drop-shadow-[0_0_10px_rgba(24,113,201,0.55)]" />
                </span>
                <span className="absolute left-3 bottom-3 h-7 w-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-[#1871C9] to-transparent drop-shadow-[0_0_10px_rgba(24,113,201,0.55)]" />
                  <span className="absolute left-0 bottom-0 h-full w-[2px] bg-gradient-to-t from-[#1871C9] to-transparent drop-shadow-[0_0_10px_rgba(24,113,201,0.55)]" />
                </span>
                <span className="absolute right-3 bottom-3 h-7 w-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="absolute right-0 bottom-0 h-[2px] w-full bg-gradient-to-l from-[#1871C9] to-transparent drop-shadow-[0_0_10px_rgba(24,113,201,0.55)]" />
                  <span className="absolute right-0 bottom-0 h-full w-[2px] bg-gradient-to-t from-[#1871C9] to-transparent drop-shadow-[0_0_10px_rgba(24,113,201,0.55)]" />
                </span>
              </div>
              {/* Inner container for 3D effect */}
              <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* FRONT SIDE */}
                <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] bg-gray-200 border border-gray-200/60 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="relative h-40 sm:h-44 lg:h-48 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#1871C9] text-white text-[11px] sm:text-sm md:text-lg font-black uppercase tracking-[0.22em] sm:tracking-widest px-2.5 sm:px-3 py-1 rounded-full">
                      {blog.category}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 lg:p-6 space-y-2.5 sm:space-y-3">
                    <h3 className="text-gray-900 text-base sm:text-lg lg:text-xl font-bold leading-tight group-hover:text-[#1871C9] transition-colors duration-300">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-[12px] sm:text-sm line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                {/* BACK SIDE (Shown on Hover) */}
                <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#1871C9] rounded-2xl flex items-center justify-center p-5 sm:p-8 shadow-2xl">
                   <div className="text-center">
                      <h3 className="text-white text-lg sm:text-2xl font-black uppercase tracking-widest">
                        {blog.category}
                      </h3>
                      <div className="w-12 h-1 bg-white/30 mx-auto mt-4" />
                   </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;