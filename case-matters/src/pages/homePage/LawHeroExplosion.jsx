import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LawHeroExplosion = () => {
  const containerRef = useRef(null);
  const blocksRef = useRef([]);

  useGSAP(() => {
    // Timeline linked to scroll progress
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // How long the scroll effect lasts
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Explosion directions for 4 blocks
    // 0: Top-Left, 1: Top-Right, 2: Bottom-Left, 3: Bottom-Right
    const directions = [
      { x: -400, y: -300, rotate: -20 },
      { x: 400, y: -350, rotate: 20 },
      { x: -450, y: 300, rotate: -15 },
      { x: 480, y: 350, rotate: 15 },
    ];

    blocksRef.current.forEach((block, i) => {
      tl.to(block, {
        x: directions[i].x,
        y: directions[i].y,
        rotation: directions[i].rotate,
        scale: 0.7,
        opacity: 0.3,
        ease: "power2.out"
      }, 0); // All blocks move simultaneously
    });

    // Center text animation
    tl.fromTo(".main-title", 
      { scale: 0.8, opacity: 0.5 },
      { scale: 1.2, opacity: 1, ease: "power2.out" }, 
      0
    );

  }, { scope: containerRef });

  const blocks = [
    { title: "Civil Rights", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600" },
    { title: "Corporate Law", img: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=600" },
    { title: "Criminal Defense", img: "https://images.unsplash.com/photo-1453945619913-79ec89a82c51?q=80&w=600" },
    { title: "Estate Planning", img: "https://images.unsplash.com/photo-1560513825-99d1b0d873d8?q=80&w=600" },
  ];

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center">
      
      {/* Central Legal Heading */}
      <div className="main-title relative z-50 text-center pointer-events-none px-6">
        <h1 className="text-gray-900 text-6xl md:text-[8rem] font-black uppercase leading-[0.85] tracking-tighter">
          Justice <br />
          <span className="text-amber-600">Unified.</span>
        </h1>
        <p className="mt-8 text-gray-600 text-xs md:text-sm uppercase tracking-[0.5em] font-semibold">
          Defending Liberty • Protecting Assets • Defining Truth
        </p>
      </div>

      {/* Floating Interactive Blocks */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {blocks.map((block, i) => (
          <div
            key={i}
            ref={(el) => (blocksRef.current[i] = el)}
            className={`absolute w-56 h-72 md:w-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl border border-gray-200/60 pointer-events-auto transition-transform duration-500 hover:z-[60]
              ${i === 0 ? '-translate-x-48 -translate-y-36' : ''}
              ${i === 1 ? 'translate-x-48 -translate-y-48' : ''}
              ${i === 2 ? '-translate-x-64 translate-y-36' : ''}
              ${i === 3 ? 'translate-x-64 translate-y-48' : ''}
            `}
          >
            {/* Background Image */}
            <img src={block.img} alt={block.title} className="w-full h-full object-cover grayscale-[30%]" />
            
            {/* Content Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-gray-100/30 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-gray-900 font-black uppercase text-xl tracking-tight leading-none">
                {block.title.split(' ')[0]} <br />
                <span className="text-amber-500">{block.title.split(' ')[1]}</span>
              </h3>
              <div className="w-8 h-[2px] bg-amber-600 mt-3" />
            </div>
          </div>
        ))}
      </div>

      {/* Subtle Background Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
    </div>
  );
};

export default LawHeroExplosion;