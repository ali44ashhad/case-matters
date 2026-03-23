import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import civilRightsImage from '../../assets/homeAssets/civil-rights.webp'
import familyLawImage from '../../assets/homeAssets/family-law.jpg'
import criminalJusticeImage from '../../assets/homeAssets/criminal-justice.jpg'
import propertyLawImage from '../../assets/homeAssets/property-law.jpg'

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LawExpandingLayout = () => {
  const containerRef = useRef(null);
  const blocksRef = useRef([]);

  useGSAP(() => {
    gsap.set(".center-text", { scale: 0.4, opacity: 0 });
    
    // Blocks start clustered in the center
    gsap.set(blocksRef.current, { x: 0, y: 0, scale: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", 
        scrub: 1, // Smoothly follows scroll
        pin: true,
        anticipatePin: 1,
      }
    });

    const directions = [
      { x: -500, y: -400, r: -25 }, // Top Left
      { x: 500, y: -450, r: 25 },  // Top Right
      { x: -550, y: 400, r: -15 }, // Bottom Left
      { x: 580, y: 450, r: 20 },   // Bottom Right
    ];

    // 2. Animate Blocks & Text together
    tl.to(blocksRef.current, {
      x: (i) => directions[i].x,
      y: (i) => directions[i].y,
      rotation: (i) => directions[i].r,
      opacity: 0,
      scale: 0.5,
      duration: 1,
      stagger: 0.05, // Slight delay between each block for "shatter" effect
      ease: "power2.inOut"
    }, 0)
    .to(".center-text", {
      scale: 1.2, // The "Zoom In" effect
      opacity: 1,
      duration: 1.2,
      ease: "power2.out"
    }, 0.1); // Starts slightly after blocks begin moving

  }, { scope: containerRef });

  const lawBlocks = [
    { title: "Effective Remedies", img: civilRightsImage },
    { title: "Legal Clarity", img: familyLawImage },
    { title: "Dispute Resolution", img: criminalJusticeImage },
    { title: "Proof & Precision", img: propertyLawImage },
  ];

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center">
      
      {/* 1. TEXT LAYER (Behind Blocks) */}
      <div className="center-text absolute z-10 text-center pointer-events-none px-4">
        <h1 className="text-gray-900 text-6xl md:text-[12rem] font-black uppercase leading-[0.8] tracking-tighter">
          Justice <br />
          <span className="text-[#1871C9]">Defined.</span>
        </h1>
        <p className="mt-8 text-gray-600 text-xs md:text-xl uppercase tracking-[0.5em] font-light">
        Every Client, Every Case Matters
        </p>
      </div>

      {/* 2. BLOCKS LAYER (On Top) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        {lawBlocks.map((block, i) => (
          <div
            key={i}
            ref={(el) => (blocksRef.current[i] = el)}
            className="absolute w-64 h-80 rounded-2xl overflow-hidden border border-gray-200/60 pointer-events-auto"
          >
            <img src={block.img} alt={block.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-white font-bold uppercase text-lg italic">
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