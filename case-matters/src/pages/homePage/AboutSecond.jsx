import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';
import { CheckCircle2, Award, Scale, Briefcase, Gavel } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSecond = () => {
  const container = useRef(null);
  const leftBlock = useRef(null);
  const rightBlock = useRef(null);
  const canvasContainer = useRef(null);
  const legalGroupRef = useRef(null);

  const strengths = [
    {
      title: "Extensive Legal Expertise",
      desc: "200+ legal matters handled, managed and advised by our legal experts.",
      icon: <Scale size={28} />,
    },
    {
      title: "Decades of Experience",
      desc: "Over 70 years of combined legal and advisory experience across diverse jurisdictions.",
      icon: <Award size={28} />,
    },
    {
      title: "High-Value Claims",
      desc: "Matters involving high-value claim amounts exceeding ₹350 crores handled with precision.",
      icon: <CheckCircle2 size={28} />,
    },
    {
      title: "Large-Scale Projects",
      desc: "Strategic advisory for high-value projects reaching up to ₹2,000 crores.",
      icon: <Briefcase size={28} />,
    }
  ];

  // Initialize 3D Scene
  useEffect(() => {
    if (!canvasContainer.current) return;

    let rafId = 0;
    let renderer = null;
    let camera = null;
    let scene = null;

    const objectsToDispose = [];
    const geometriesToDispose = [];
    const materialsToDispose = [];

    // Scene setup — transparent so CSS white gradient shows through
    scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0xf2f7ff, 0.02);

    // Camera
    const { width: initialW, height: initialH } = canvasContainer.current.getBoundingClientRect();
    camera = new THREE.PerspectiveCamera(45, (initialW || 1) / (initialH || 1), 0.1, 1000);
    camera.position.set(0, 1.5, 8);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(initialW || window.innerWidth, initialH || window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = false;
    canvasContainer.current.appendChild(renderer.domElement);

    // Lights - soft, subtle (keep content as the hero)
    const ambientLight = new THREE.AmbientLight(0xeaf2ff, 1.0);
    scene.add(ambientLight);
    objectsToDispose.push(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.65);
    mainLight.position.set(2.5, 4.5, 3.5);
    scene.add(mainLight);
    objectsToDispose.push(mainLight);

    const fillLight = new THREE.PointLight(0xcfe3ff, 0.35);
    fillLight.position.set(-2.5, 1.5, 3.5);
    scene.add(fillLight);
    objectsToDispose.push(fillLight);

    // Main 3D Legal Symbol Group
    const legalGroup = new THREE.Group();
    
    // Scales of Justice — subtle, low-contrast background motif
    const symbolMat = new THREE.MeshStandardMaterial({
      color: 0x7fa6d6,
      metalness: 0.15,
      roughness: 0.8,
      transparent: true,
      opacity: 0.55,
      emissive: 0x0b2b4a,
      emissiveIntensity: 0.08,
    });
    materialsToDispose.push(symbolMat);

    // Base + pillar
    const baseGeo = new THREE.CylinderGeometry(1.0, 1.1, 0.22, 40);
    const base = new THREE.Mesh(baseGeo, symbolMat);
    base.position.set(0, -1.05, 0);
    legalGroup.add(base);
    geometriesToDispose.push(baseGeo);
    objectsToDispose.push(base);

    const pillarGeo = new THREE.CylinderGeometry(0.14, 0.16, 2.2, 24);
    const pillar = new THREE.Mesh(pillarGeo, symbolMat);
    pillar.position.set(0, 0.05, 0);
    legalGroup.add(pillar);
    geometriesToDispose.push(pillarGeo);
    objectsToDispose.push(pillar);

    // Top finial
    const finialGeo = new THREE.SphereGeometry(0.18, 18, 18);
    const finial = new THREE.Mesh(finialGeo, symbolMat);
    finial.position.set(0, 1.25, 0);
    legalGroup.add(finial);
    geometriesToDispose.push(finialGeo);
    objectsToDispose.push(finial);

    // Crossbar
    const barGeo = new THREE.BoxGeometry(2.7, 0.12, 0.12);
    const bar = new THREE.Mesh(barGeo, symbolMat);
    bar.position.set(0, 1.05, 0);
    legalGroup.add(bar);
    geometriesToDispose.push(barGeo);
    objectsToDispose.push(bar);

    // Pans
    const panGeo = new THREE.CylinderGeometry(0.42, 0.48, 0.08, 32);
    const panL = new THREE.Mesh(panGeo, symbolMat);
    const panR = new THREE.Mesh(panGeo, symbolMat);
    panL.position.set(-1.1, 0.35, 0);
    panR.position.set(1.1, 0.35, 0);
    legalGroup.add(panL, panR);
    geometriesToDispose.push(panGeo);
    objectsToDispose.push(panL, panR);

    // Chains (lines) - very subtle
    const chainMat = new THREE.LineBasicMaterial({ color: 0x93b6de, transparent: true, opacity: 0.28 });
    materialsToDispose.push(chainMat);
    const chainPtsL = [
      new THREE.Vector3(-1.1, 1.02, 0),
      new THREE.Vector3(-1.1, 0.55, 0),
    ];
    const chainPtsR = [
      new THREE.Vector3(1.1, 1.02, 0),
      new THREE.Vector3(1.1, 0.55, 0),
    ];
    const chainGeoL = new THREE.BufferGeometry().setFromPoints(chainPtsL);
    const chainGeoR = new THREE.BufferGeometry().setFromPoints(chainPtsR);
    const chainL = new THREE.Line(chainGeoL, chainMat);
    const chainR = new THREE.Line(chainGeoR, chainMat);
    legalGroup.add(chainL, chainR);
    geometriesToDispose.push(chainGeoL, chainGeoR);
    objectsToDispose.push(chainL, chainR);
    
    scene.add(legalGroup);
    legalGroupRef.current = legalGroup;
    objectsToDispose.push(legalGroup);
    
    // Floating particle system (dust motes)
    const particleCount = 700;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i*3] = (Math.random() - 0.5) * 18;
      positions[i*3+1] = (Math.random() - 0.5) * 8;
      positions[i*3+2] = (Math.random() - 0.5) * 12 - 5;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xa9c6ea,
      size: 0.022,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    });
    const particleSystem = new THREE.Points(particlesGeo, particleMat);
    scene.add(particleSystem);
    geometriesToDispose.push(particlesGeo);
    materialsToDispose.push(particleMat);
    objectsToDispose.push(particleSystem);
    
    // Animation variables
    let time = 0;
    
    // Animation loop
    function animate() {
      rafId = requestAnimationFrame(animate);
      time += 0.006;

      legalGroup.rotation.y = Math.sin(time * 0.18) * 0.08;
      legalGroup.rotation.x = Math.sin(time * 0.12) * 0.03;
      legalGroup.position.y = -0.1 + Math.sin(time * 0.55) * 0.04;

      particleSystem.rotation.y = time * 0.012;
      particleSystem.rotation.x = Math.sin(time * 0.08) * 0.06;
      
      renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
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
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
      if (canvasContainer.current && renderer.domElement) {
        canvasContainer.current.removeChild(renderer.domElement);
      }

      geometriesToDispose.forEach((g) => g?.dispose?.());
      materialsToDispose.forEach((m) => m?.dispose?.());
      objectsToDispose.forEach((o) => {
        if (o && typeof o === "object") {
          scene?.remove?.(o);
        }
      });

      renderer?.dispose?.();
    };
  }, []);

  // GSAP Animations
  useGSAP(() => {
    // Set initial states for cinematic entrance
    gsap.set(leftBlock.current, { x: -400, opacity: 0, rotationY: -12 });
    gsap.set(rightBlock.current, { x: 400, opacity: 0, rotationY: 12 });
    
    // Scroll-triggered entrance for left and right blocks
    ScrollTrigger.create({
      trigger: container.current,
      start: "top 85%",
      end: "top 25%",
      scrub: 1.2,
      onUpdate: (self) => {
        const prog = self.progress;
        gsap.set(leftBlock.current, { 
          x: -400 + (prog * 400), 
          opacity: prog, 
          rotationY: -12 + (prog * 12) 
        });
        gsap.set(rightBlock.current, { 
          x: 400 - (prog * 400), 
          opacity: prog, 
          rotationY: 12 - (prog * 12) 
        });
      }
    });
    
    // Staggered entrance for strength items
    const items = gsap.utils.toArray('.strength-item-3d');
    gsap.fromTo(items, 
      { y: 60, opacity: 0, scale: 0.92 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.12,
        ease: "back.out(0.6)",
        scrollTrigger: {
          trigger: rightBlock.current,
          start: "top 75%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        }
      }
    );
    
    // Button subtle pulse animation
    const btn = container.current?.querySelector?.('.btn-cinematic');
    if (btn) {
      gsap.to(btn, {
        scale: 1.03,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        boxShadow: "0 0 20px rgba(24,113,201,0.7)",
      });
    }
    
    // Parallax effect for 3D group on scroll
    ScrollTrigger.create({
      trigger: container.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
      onUpdate: (self) => {
        if (legalGroupRef.current) {
          legalGroupRef.current.position.y = (self.progress * 0.3);
        }
      }
    });
    
  }, { scope: container });
  
  return (
    <section 
      ref={container} 
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#eef6ff] to-[#dcecff]"
    >
      <style>
        {`
          @keyframes floatSlow {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-14px); }
            100% { transform: translateY(0px); }
          }
          .animate-float-slow {
            animation: floatSlow 7s ease-in-out infinite;
          }
        `}
      </style>
      {/* 3D Canvas Background */}
      <div ref={canvasContainer} className="absolute inset-0 z-0 pointer-events-none" />
      
      {/* Overlay Gradients for Depth (light) */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-white/90 via-transparent to-white/40 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,_rgba(24,113,201,0.22),_transparent_58%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_bottom_right,_rgba(88,166,255,0.14),_transparent_48%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(120deg,_rgba(24,113,201,0.08)_0%,_transparent_42%,_rgba(24,113,201,0.06)_100%)] pointer-events-none" />
      
      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Block - Cinematic Text Section */}
          <div ref={leftBlock} className="lg:w-1/2 space-y-6 will-change-transform">
            <div className="inline-block px-5 py-1.5 rounded-full bg-[#1871C9]/10 text-[#1871C9] text-base md:text-lg font-bold uppercase tracking-widest border border-[#1871C9]/25 backdrop-blur-sm">
            Our Core Strengths
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight text-gray-900">
              Trusted Legal <br />
              <span className="bg-gradient-to-r from-[#1871C9] via-[#3d8fdf] to-[#145da5] bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <div className="w-24 h-[3px] bg-gradient-to-r from-[#1871C9] to-transparent" />
            <p className="text-gray-800 font-semibold text-lg md:text-xl leading-relaxed max-w-lg font-light tracking-wide">
              At Case Matters, transparency and consistency are at the core of everything we do — 
              delivering results that truly redefine legal excellence.
            </p>
            <div className="pt-5">
              <button className="btn-cinematic px-8 py-4 rounded-full bg-gradient-to-r from-[#1871C9] via-[#3d8fdf] to-[#1a60b0] text-white font-bold uppercase tracking-wider text-sm shadow-2xl transition-all duration-300 hover:shadow-[0_20px_35px_-8px_rgba(24,113,201,0.6)] hover:scale-105 active:scale-95">
                Discover Our Practice ✦
              </button>
            </div>
          </div>
          
          {/* Right Block - Strengths with 3D Cards */}
          <div ref={rightBlock} className="lg:w-1/2 w-full space-y-5 will-change-transform">
            {strengths.map((item, index) => (
              <div 
                key={index} 
                className="strength-item-3d group transition-all duration-500 p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-[#1871C9]/15 hover:border-[#1871C9]/45 hover:translate-x-2 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-900/10"
              >
                <div className="flex gap-5 items-start">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1871C9]/25 to-[#1871C9]/5 flex items-center justify-center border border-[#1871C9]/40 shadow-md group-hover:shadow-[0_0_15px_rgba(24,113,201,0.35)] transition-all duration-300">
                      <div className="text-[#1871C9] group-hover:text-[#145da5] transition-colors">
                        {item.icon}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#1871C9] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed group-hover:text-gray-700 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background EST. Text - Cinematic Depth */}
      <div className="absolute bottom-8 right-6 text-[11rem] lg:text-[18rem] font-serif font-black text-gray-900/[0.04] select-none pointer-events-none z-0">
        EST.
      </div>
      
      {/* Floating Scale Icon Animation (Subtle overlay) */}
      <div className="absolute top-24 left-[-6%] opacity-[0.028] text-[#1871C9] pointer-events-none z-0 animate-float-slow">
        <Scale size={360} strokeWidth={0.8} />
      </div>
    </section>
  );
};

export default AboutSecond;