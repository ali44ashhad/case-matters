import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';
import civilRightsImage from '../../assets/homeAssets/civil-rights.webp'
import familyLawImage from '../../assets/homeAssets/family-law.jpg'
import criminalJusticeImage from '../../assets/homeAssets/criminal-justice.jpg'
import propertyLawImage from '../../assets/homeAssets/property-law.jpg'

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LawExpandingLayout = () => {
  const containerRef = useRef(null);
  const blocksRef = useRef([]);
  const canvasContainer = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    const buildTimeline = (opts) => {
      const { directions, scrollEnd, textScale } = opts;
      gsap.set(".center-text", { scale: 0.4, opacity: 0 });
      gsap.set(blocksRef.current, { x: 0, y: 0, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: scrollEnd,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        blocksRef.current,
        {
          x: (i) => directions[i].x,
          y: (i) => directions[i].y,
          rotation: (i) => directions[i].r,
          opacity: 0,
          scale: 0.5,
          duration: 1,
          stagger: 0.05,
          ease: "power2.inOut",
        },
        0
      ).to(
        ".center-text",
        {
          scale: textScale,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        0.1
      );
    };

    // Mobile: smaller motion + less scroll so it feels app-sized
    mm.add("(max-width: 639px)", () => {
      buildTimeline({
        scrollEnd: "+=130%",
        textScale: 1.05,
        directions: [
          { x: -150, y: -125, r: -14 },
          { x: 155, y: -135, r: 14 },
          { x: -165, y: 130, r: -10 },
          { x: 170, y: 138, r: 12 },
        ],
      });
    });

    // Tablet: medium scatter
    mm.add("(min-width: 640px) and (max-width: 1023px)", () => {
      buildTimeline({
        scrollEnd: "+=170%",
        textScale: 1.12,
        directions: [
          { x: -280, y: -230, r: -20 },
          { x: 285, y: -255, r: 20 },
          { x: -305, y: 235, r: -12 },
          { x: 320, y: 265, r: 16 },
        ],
      });
    });

    // Desktop: full effect
    mm.add("(min-width: 1024px)", () => {
      buildTimeline({
        scrollEnd: "+=200%",
        textScale: 1.2,
        directions: [
          { x: -500, y: -400, r: -25 },
          { x: 500, y: -450, r: 25 },
          { x: -550, y: 400, r: -15 },
          { x: 580, y: 450, r: 20 },
        ],
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

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
      opacity: 0.14,
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

  const lawBlocks = [
    { title: "Effective Remedies", img: civilRightsImage },
    { title: "Legal Clarity", img: familyLawImage },
    { title: "Dispute Resolution", img: criminalJusticeImage },
    { title: "Proof & Precision", img: propertyLawImage },
  ];

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#ffffff] via-[#eef6ff] to-[#dcecff]">
      <div ref={canvasContainer} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-white/90 via-transparent to-white/40 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,_rgba(24,113,201,0.22),_transparent_58%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_bottom_right,_rgba(88,166,255,0.14),_transparent_48%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(120deg,_rgba(24,113,201,0.08)_0%,_transparent_42%,_rgba(24,113,201,0.06)_100%)] pointer-events-none" />
      
      {/* 1. TEXT LAYER (Behind Blocks) */}
      <div className="center-text absolute z-10 text-center pointer-events-none px-3 sm:px-4 max-w-[92vw] sm:max-w-none mx-auto left-0 right-0">
        <h1 className="text-gray-900 text-3xl sm:text-5xl md:text-[12rem] font-black uppercase leading-[0.9] sm:leading-[0.85] md:leading-[0.8] tracking-tighter">
          Justice <br />
          <span className="text-[#1871C9]">Defined.</span>
        </h1>
        <p className="mt-3 sm:mt-5 md:mt-8 text-gray-600 text-[9px] sm:text-[10px] md:text-xl uppercase tracking-[0.32em] sm:tracking-[0.42em] md:tracking-[0.5em] font-light leading-snug">
        Every Client, Every Case Matters
        </p>
      </div>

      {/* 2. BLOCKS LAYER (On Top) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        {lawBlocks.map((block, i) => (
          <div
            key={i}
            ref={(el) => (blocksRef.current[i] = el)}
            className="absolute w-[9.25rem] h-[11.5rem] sm:w-56 sm:h-72 md:w-64 md:h-80 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200/60 pointer-events-auto shadow-sm sm:shadow-none"
          >
            <img src={block.img} alt={block.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-5 md:p-6">
              <h3 className="text-white font-bold uppercase text-[11px] sm:text-sm md:text-lg italic leading-tight">
                {block.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Background Overlay */}
      {/* <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-200 via-transparent to-transparent" /> */}
    </div>
  );
};

export default LawExpandingLayout;