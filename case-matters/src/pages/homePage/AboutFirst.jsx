import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';
import expertImage from '../../assets/homeAssets/expert-abrivation.png'

gsap.registerPlugin(ScrollTrigger, useGSAP);

const contentMotion = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.45 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
};

const AboutFirst = () => {
  const container = useRef(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray('.panel-wrapper');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    panels.forEach((panel, i) => {
      if (i === 0) return;
      tl.fromTo(panel, { yPercent: 100 }, { yPercent: 0, ease: 'none' });
    });
  }, { scope: container });

  // Lightweight particles per panel (sits above photo, below text)
  useEffect(() => {
    const root = container.current;
    if (!root) return;

    const layers = root.querySelectorAll('[data-panel-particles]');
    const cleanups = [];

    layers.forEach((layer) => {
      let raf = 0;
      const scene = new THREE.Scene();
      scene.background = null;
      scene.fog = new THREE.FogExp2(0xe8f0fa, 0.035);

      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
      camera.position.set(0, 0.2, 5);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      layer.appendChild(renderer.domElement);

      const n = 420;
      const geom = new THREE.BufferGeometry();
      const pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 12;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 7;
      }
      geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        color: 0x5a9fe0,
        size: 0.045,
        transparent: true,
        opacity: 0.32,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });
      const points = new THREE.Points(geom, mat);
      scene.add(points);

      const resize = () => {
        const rect = layer.getBoundingClientRect();
        const w = Math.max(1, rect.width);
        const h = Math.max(1, rect.height);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      resize();
      const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
      ro?.observe(layer);

      let t = 0;
      const loop = () => {
        raf = requestAnimationFrame(loop);
        t += 0.005;
        points.rotation.y = t * 0.07;
        points.rotation.x = Math.sin(t * 0.3) * 0.06;
        renderer.render(scene, camera);
      };
      loop();

      cleanups.push(() => {
        cancelAnimationFrame(raf);
        ro?.disconnect();
        geom.dispose();
        mat.dispose();
        renderer.dispose();
        if (layer.contains(renderer.domElement)) {
          layer.removeChild(renderer.domElement);
        }
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes about-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .about-accent-glow {
            animation: about-float 5s ease-in-out infinite;
          }
        `}
      </style>

      <div
        id="about"
        ref={container}
        className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#eef6ff] to-[#dcecff] font-sans"
      >
        {/* Global light overlays (peeks at panel edges / pin gutters) */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-white/85 via-transparent to-white/35" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,_rgba(24,113,201,0.18),_transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_bottom_right,_rgba(88,166,255,0.1),_transparent_45%)]" />

        {/* --- Panel 1 --- */}
        <div className="panel-wrapper absolute inset-0 z-10 h-full w-full overflow-hidden">
          <div className="absolute inset-0 h-full w-full">
            <img
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
              alt="Legal Background"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-black/38 to-black/62" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(24,113,201,0.2),_transparent_58%)]" />
            <div className="absolute inset-0 backdrop-blur-[1.5px]" />
          </div>

          <div
            data-panel-particles
            className="pointer-events-none absolute inset-0 z-[5] mix-blend-screen"
            aria-hidden
          />

          <section className="relative z-20 flex h-screen w-full flex-col items-center justify-center px-6 text-center">
            <motion.div className="z-20 max-w-4xl" {...contentMotion}>
              <h1 className="text-5xl font-black leading-none tracking-tight text-white drop-shadow-md md:text-7xl lg:text-8xl">
                Why Choose <span className="text-[#8bc5ff]">Case Matters?</span>
              </h1>

              <p className="mx-auto mt-8 max-w-3xl text-base font-medium leading-relaxed text-white/90 md:text-lg lg:text-xl">
                Decades of expertise in arbitration, contract management, and litigation.
                We transform complex legal challenges into practical, effective commercial solutions.
              </p>

              <div className="about-accent-glow mx-auto mt-10 h-1 w-24 rounded-full bg-gradient-to-r from-[#1871C9] to-[#6BB1F5] shadow-[0_0_18px_rgba(24,113,201,0.45)]" />
            </motion.div>
          </section>
        </div>

        {/* --- Panel 2 --- */}
        <div className="panel-wrapper absolute inset-0 z-20 h-full w-full overflow-hidden">
          <div className="absolute inset-0 h-full w-full">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
              alt="Strategic Planning"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-black/38 to-black/62" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(24,113,201,0.2),_transparent_58%)]" />
            <div className="absolute inset-0 backdrop-blur-[1px]" />
          </div>

          <div
            data-panel-particles
            className="pointer-events-none absolute inset-0 z-[5] mix-blend-screen"
            aria-hidden
          />

          <section className="relative z-20 flex h-screen w-full flex-col items-center justify-center border-t border-white/15 px-6 text-center shadow-[0_-40px_80px_rgba(0,0,0,0.12)]">
            <motion.div className="z-10 max-w-4xl" {...contentMotion}>
              <h2 className="text-5xl font-black leading-tight tracking-tight text-white drop-shadow-md md:text-8xl">
                Strategic <span className="text-[#8bc5ff]">Prevention</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/90 md:text-xl">
                Legal support goes beyond resolving disputes—it’s about preventing them. Through robust
                contract advisory and risk assessment, we minimize your exposure before conflicts arise.
              </p>
            </motion.div>
          </section>
        </div>

        {/* --- Panel 3 --- */}
        <div className="panel-wrapper absolute inset-0 z-30 h-full w-full overflow-hidden">
          <div className="absolute inset-0 h-full w-full">
            <img src={expertImage} className="h-full w-full object-cover" alt="Arbitration Gavel" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-black/42 to-black/68" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(24,113,201,0.22),_transparent_58%)]" />
          </div>
          <div
            data-panel-particles
            className="pointer-events-none absolute inset-0 z-[5] mix-blend-screen"
            aria-hidden
          />

          <section className="relative z-20 flex h-screen w-full flex-col items-center justify-center px-6 text-center shadow-[0_-40px_80px_rgba(0,0,0,0.2)]">
            <motion.div className="z-10 max-w-5xl" {...contentMotion}>
              <h2 className="text-5xl font-black leading-tight tracking-tight text-white drop-shadow-md md:text-8xl">
                Expert <span className="text-[#8bc5ff]">Arbitration</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-white/90 md:text-xl">
                We guide clients through private dispute resolution with strategic clarity. From claim
                preparation to final enforcement, we manage the entire process with diligence and
                confidentiality.
              </p>
              <motion.div
                className="mt-12 flex justify-center"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  type="button"
                  className="w-fit rounded-full bg-gradient-to-r from-[#1871C9] to-[#5FA9F4] px-6 py-3 font-black tracking-wider text-sm text-white shadow-xl shadow-blue-900/25 transition-all hover:from-[#145da5] hover:to-[#1871C9] md:px-12 md:py-5 md:text-xl md:tracking-widest"
                >
                  Consult an Expert
                </button>
              </motion.div>
            </motion.div>
          </section>
        </div>
      </div>
    </>
  );
};
export default AboutFirst;