import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';
import expertImage from '../../assets/homeAssets/expert-abrivation.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const contentMotion = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const AboutFirst = () => {
  const container = useRef(null);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;
    const offset = 80;
    const top = contactSection.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  // MAIN ANIMATION LOGIC
  useGSAP(() => {
    const panels = gsap.utils.toArray('.panel-wrapper');
    
    // Create the timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: '+=250%', // Shortened end for faster overall section transition
        scrub: 0.3,    // Reduced from 1 to 0.5 for snappier response
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animate panels 2 and 3 over the first one
    panels.forEach((panel, i) => {
      if (i === 0) return;
      tl.fromTo(
        panel,
        { yPercent: 100, clipPath: 'inset(0% 0% 0% 0%)' },
        { yPercent: 0, ease: 'none' },
        i - 1 // Aligns the start of this animation with the progress of the timeline
      );
    });

  }, { scope: container });

  // REFRESH TRIGGER ON LOAD (Prevents sticking/wrong heights)
  useEffect(() => {
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);
    // Extra refresh after short delay to catch late renders
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    
    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timer);
    };
  }, []);

  // LIGHTWEIGHT PARTICLES (Optimized for performance)
  useEffect(() => {
    const root = container.current;
    if (!root || window.innerWidth < 768) return; // Disable on small mobile for performance

    const layers = root.querySelectorAll('[data-panel-particles]');
    const cleanups = [];

    layers.forEach((layer) => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      renderer.setPixelRatio(1); // Force 1 for speed
      layer.appendChild(renderer.domElement);

      const n = 150; // Reduced count for speed
      const geom = new THREE.BufferGeometry();
      const pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 12;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 7;
      }
      geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ color: 0x5a9fe0, size: 0.05, transparent: true, opacity: 0.3 });
      const points = new THREE.Points(geom, mat);
      scene.add(points);

      const resize = () => {
        const rect = layer.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height);
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
      };
      
      resize();
      window.addEventListener('resize', resize);

      let raf;
      const animate = () => {
        points.rotation.y += 0.002;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };
      animate();

      cleanups.push(() => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(raf);
        geom.dispose();
        mat.dispose();
        renderer.dispose();
      });
    });

    return () => cleanups.forEach(fn => fn());
  }, []);

  return (
    <>
      <div
        id="about"
        ref={container}
        className="relative w-full h-screen overflow-hidden bg-[#0a1118]"
      >
        {/* --- Panel 1 --- */}
        <div className="panel-wrapper absolute inset-0 z-10 h-full w-full overflow-hidden">
          <div className="absolute inset-0 h-full w-full">
            <img
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
              alt="Legal"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div data-panel-particles className="absolute inset-0 z-[5]" />
          <section className="relative z-20 flex h-screen items-center justify-center px-6 text-center">
            <motion.div {...contentMotion}>
              <h1 className="text-5xl font-black text-white md:text-8xl">
                Why Choose <span className="text-[#8bc5ff]">Case Matters?</span>
              </h1>
              <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
              Decades of expertise in arbitration, contract management, and litigation. We transform complex legal challenges into practical, effective commercial solutions.
              </p>
            </motion.div>
          </section>
        </div>

        {/* --- Panel 2 --- */}
        <div className="panel-wrapper absolute inset-0 z-20 h-full w-full overflow-hidden">
          <div className="absolute inset-0 h-full w-full">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
              alt="Strategic"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <section className="relative z-20 flex h-screen items-center justify-center px-6 text-center">
            <motion.div {...contentMotion}>
              <h2 className="text-5xl font-black text-white md:text-8xl">
                Strategic <span className="text-[#8bc5ff]">Prevention</span>
                <p className="font-semibold mt-6 text-lg text-white/90 max-w-2xl mx-auto ">
                Legal support goes beyond resolving disputes—it’s about preventing them. Through robust contract advisory and risk assessment, we minimize your exposure before conflicts arise.
                </p>
              </h2>
            </motion.div>
          </section>
        </div>

        {/* --- Panel 3 --- */}
        <div className="panel-wrapper absolute inset-0 z-30 h-full w-full overflow-hidden">
          <div className="absolute inset-0 h-full w-full">
            <img src={expertImage} className="h-full w-full object-cover" alt="Expert" />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <section className="relative z-20 flex h-screen items-center justify-center px-6 text-center">
            <motion.div {...contentMotion}>
              <h2 className="text-5xl font-black text-white md:text-8xl">
                Expert <span className="text-[#8bc5ff]">Arbitration</span>
                <p className="font-semibold mt-6 text-lg text-white/90 max-w-2xl mx-auto">
                We guide clients through private dispute resolution with strategic clarity. From claim preparation to final enforcement, we manage the entire process with diligence and confidentiality.
                </p>
              </h2>
              <button
                onClick={scrollToContact}
                className="mt-8 rounded-full bg-blue-600 px-10 py-4 text-xl font-bold text-white transition-transform hover:scale-105"
              >
                Consult an Expert
              </button>
            </motion.div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutFirst;