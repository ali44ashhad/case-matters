import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef();
  const stackRef = useRef();
  const canvasContainer = useRef(null);

  const services = [
    { id: "arbitration", title: "Arbitration", desc: "Private dispute resolution through structured proceedings, offering confidentiality and procedural efficiency.", path: "/services/arbitration" },
    { id: "construction", title: "Construction & Infrastructure Disputes", desc: "Advisory and representation in project-related disputes, focused on protecting contractual entitlements.", path: "/services/construction" },
    { id: "contract-advisory", title: "Contract Advisory & Risk Management", desc: "Drafting, review, and interpretation of contracts, with strategic advice on rights and obligations.", path: "/services/contract-advisory" },
    { id: "claims-management", title: "Contract and Claims Management", desc: "End-to-end claims support, including claim preparation, evidence collation, and strategy.", path: "/services/contract-claim" },
    { id: "employment", title: "Employment Advisory & Compliance", desc: "Advisory services relating to employment contracts, HR policies, and statutory compliance.", path: "/services/employement" },
    { id: "startup-law", title: "Startup Law & Compliance", desc: "Legal support for startups and founders, covering business structuring and regulatory compliance.", path: "/services/startup" },
    { id: "litigation", title: "Civil & Business Litigation", desc: "Representation before courts in civil and commercial disputes including stakeholder conflicts.", path: "/services/civil" }
  ];

  useGSAP(() => {
    const cards = gsap.utils.toArray('.service-card');
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      cards.forEach((card, index) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: `top ${100 + index * 30}px`,
            endTrigger: containerRef.current,
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      cards.forEach((card, index) => {
        // Mobile: keep the same "stacking" feel (lighter offsets)
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: `top ${88 + index * 18}px`,
            endTrigger: containerRef.current,
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  // Lightweight 3D background (particles + subtle grid)
  useEffect(() => {
    if (!canvasContainer.current) return;

    let rafId = 0;
    let renderer = null;
    let camera = null;
    let scene = null;

    const geometriesToDispose = [];
    const materialsToDispose = [];

    scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0xe8f0fa, 0.012);

    const { width: initialW, height: initialH } = canvasContainer.current.getBoundingClientRect();
    camera = new THREE.PerspectiveCamera(55, (initialW || 1) / (initialH || 1), 0.1, 100);
    camera.position.set(0, 0.6, 6.5);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(initialW || window.innerWidth, initialH || window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    canvasContainer.current.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xd0dff0, 0.85);
    scene.add(ambient);

    const key = new THREE.PointLight(0x1871c9, 0.9, 50);
    key.position.set(2.2, 2, 3);
    scene.add(key);

    // Particles
    const particleCount = 1200;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x5a9fe0,
      size: 0.02,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);
    geometriesToDispose.push(particlesGeo);
    materialsToDispose.push(particlesMat);

    // Subtle wire grid plane
    const gridGeo = new THREE.PlaneGeometry(18, 10, 22, 12);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x5a8fc4,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.rotation.x = -Math.PI / 2.7;
    grid.position.set(0, -1.3, -2.6);
    scene.add(grid);
    geometriesToDispose.push(gridGeo);
    materialsToDispose.push(gridMat);

    let t = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      t += 0.006;
      particles.rotation.y = t * 0.08;
      particles.rotation.x = Math.sin(t * 0.35) * 0.08;
      grid.rotation.z = Math.sin(t * 0.25) * 0.02;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!canvasContainer.current) return;
      const { width, height } = canvasContainer.current.getBoundingClientRect();
      const w = width || window.innerWidth;
      const h = height || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
      if (canvasContainer.current && renderer?.domElement) {
        canvasContainer.current.removeChild(renderer.domElement);
      }
      geometriesToDispose.forEach((g) => g?.dispose?.());
      materialsToDispose.forEach((m) => m?.dispose?.());
      renderer?.dispose?.();
    };
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative overflow-hidden py-8 sm:py-16 md:py-32 px-4 sm:px-6 md:px-20 min-h-0 md:min-h-screen bg-gradient-to-br from-[#ffffff] via-[#eef6ff] to-[#dcecff]"
    >
      {/* 3D Canvas Background */}
      <div ref={canvasContainer} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Overlay depth (light — match AboutSecond) */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-white/90 via-transparent to-white/40 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,_rgba(24,113,201,0.22),_transparent_58%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_bottom_right,_rgba(88,166,255,0.14),_transparent_48%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(120deg,_rgba(24,113,201,0.08)_0%,_transparent_42%,_rgba(24,113,201,0.06)_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-6 sm:mb-12 md:mb-24 space-y-2 sm:space-y-3 md:space-y-4">
          <h2 className="text-[#1871C9] uppercase tracking-[0.28em] text-lg md:text-xl lg:text-2xl font-bold">
            Our Services
          </h2>
          <p className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            From contracts to courtrooms — we cover it all.
          </p>
          <div className="w-24 h-[3px] bg-gradient-to-r from-[#1871C9] to-transparent" />
        </div>

        {/* The Cards Container */}
        <div ref={stackRef} className="relative space-y-3 sm:space-y-5 md:space-y-10 pb-4 sm:pb-8 md:pb-32">
          {services.map((service, index) => (
            <Link 
              to={service.path} 
              key={service.id}
              className="service-card block relative w-full group"
            >
              {/* GLOWING GRADIENT BORDER WRAPPER */}
              <div className="relative p-[1.5px] rounded-2xl overflow-hidden transition-all duration-500 bg-gradient-to-r from-[#1871C9] via-[#6BB1F5] to-transparent group-hover:shadow-[0_0_20px_rgba(24,113,201,0.28)]">
                
                {/* Background Inner Card */}
                <div className="relative overflow-hidden rounded-[15px] bg-white/70 backdrop-blur-md border border-[#1871C9]/10 p-5 sm:p-6 md:p-12 transition-all duration-500 group-hover:bg-white/85 group-hover:border-[#1871C9]/20">
                  
                  {/* Hover Accent Bar */}
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#1871C9] to-[#6BB1F5] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
                    <div className="flex-1 space-y-3 md:space-y-4">
                      <span className="text-[#1871C9] font-mono text-xs sm:text-sm md:text-lg font-bold">0{index + 1}</span>
                      <h3 className="text-xl md:text-3xl font-bold text-gray-900 group-hover:text-[#1871C9] transition-colors tracking-tight">
                        {service.title}
                      </h3> 
                      <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">
                        {service.desc}
                      </p>
                    </div>
                    
                    {/* Icon Button */}
                    <div className="h-12 w-12 md:h-16 md:w-16 rounded-xl border border-[#1871C9]/30 bg-white/80 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#1871C9] group-hover:to-[#5FA9F4] group-hover:border-transparent transition-all duration-500 group-hover:shadow-[0_0_14px_rgba(24,113,201,0.35)]">
                      <svg 
                        className="w-5 h-5 md:w-6 md:h-6 text-[#1871C9] group-hover:text-white transition-colors" 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;