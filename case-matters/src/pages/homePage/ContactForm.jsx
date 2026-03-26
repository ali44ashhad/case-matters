import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const ContactForm = () => {
  const canvasContainer = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Arbitration',
    message: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: 'success', message: data.message });
        setFormData({ name: '', phone: '', email: '', subject: 'Arbitration', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch (error) {
      setStatus({ type: 'error', message: "Something went wrong. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

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
      opacity: 0.16,
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
    <section id="contact" className="relative pt-0 md:pt-24 pb-24 px-6 md:px-20 overflow-hidden font-sans bg-gradient-to-br from-[#ffffff] via-[#eef6ff] to-[#dcecff]">
      <div ref={canvasContainer} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-white/90 via-transparent to-white/40 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,_rgba(24,113,201,0.22),_transparent_58%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_bottom_right,_rgba(88,166,255,0.14),_transparent_48%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(120deg,_rgba(24,113,201,0.08)_0%,_transparent_42%,_rgba(24,113,201,0.06)_100%)] pointer-events-none" />

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E2B13C]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#1871C9]/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* LEFT SIDE: Contact Information */}
        <div className="space-y-8 md:space-y-12 pt-0"> {/* Removed mobile padding here */}
          <motion.div variants={itemVariants} className="space-y-4">
            <p className='text-gray-600 text-sm'>One Month Free Advisory and Consulting Retainership for Start-Ups, Small and Medium Construction Companies - <a href="mailto:casematters.info@gmail.com" className='text-[#1871C9]'>casematters.info@gmail.com</a></p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tighter leading-tight">
              Request a free <br /> consultation
            </h1>
            <p className="text-gray-600 text-lg max-w-md font-light">
              Our experts are ready to provide the precision and results your legal matters require.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <p className="text-[#1871C9] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Email Us</p>
                <a href="mailto:casematters.info@gmail.com" className="text-gray-900 text-lg hover:text-[#E2B13C] transition-colors">casematters.info@gmail.com</a>
              </div>
              <div>
                <p className="text-[#1871C9] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Call Us</p>
                <a href="tel:+919810238083" className="text-gray-900 text-lg hover:text-[#E2B13C] transition-colors">+91 9810238083</a>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[#1871C9] font-bold text-[10px] uppercase tracking-[0.2em] mb-4">Office Hours</p>
              <div className="text-gray-700 space-y-1 text-sm">
                <p className="font-bold text-gray-900">Mon - Sat: <span className="font-normal opacity-70 ml-2">10am - 8pm</span></p>
                <p className="font-bold text-gray-900">Sunday: <span className="font-normal opacity-70 ml-2">10am - 5pm</span></p>
              </div>
            </div>
          </motion.div>

          {/* Slightly rounded (xl) instead of 2xl */}
          <motion.div variants={itemVariants} className="p-6 rounded-xl border border-gray-200/70 bg-gray-50/50 backdrop-blur-sm">
            <p className="text-[#1871C9] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Visit Our Office</p>
            <p className="text-gray-900 text-lg leading-relaxed">DLF Almeda, Sector 73, SPR Road, <br /> Gurgaon - 122101</p>
          </motion.div>
        </div>

        {/* RIGHT SIDE: The Form */}
        <motion.div 
          variants={itemVariants}
          className="relative p-8 md:p-12 rounded-xl bg-gray-50/80 border border-gray-200/70 backdrop-blur-2xl shadow-xl"
        > {/* Changed rounded-[2.5rem] to rounded-xl */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Full Name</label>
                <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="John Doe" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 focus:outline-none focus:border-[#1871C9] transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Phone Number</label>
                <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+91 00000 00000" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 focus:outline-none focus:border-[#1871C9] transition-all" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Email Address</label>
              <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="example@email.com" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 focus:outline-none focus:border-[#1871C9] transition-all" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Subject</label>
              <select name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 focus:outline-none focus:border-[#1871C9] appearance-none">
                <option value="Arbitration">Arbitration</option>
                <option value="Construction Disputes">Construction Disputes</option>
                <option value="Contract Advisory">Contract Advisory</option>
                <option value="Other Legal Matters">Other Legal Matters</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Message</label>
              <textarea required name="message" value={formData.message} onChange={handleChange} rows="3" placeholder="Describe your situation..." className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 focus:outline-none focus:border-[#1871C9] transition-all resize-none"></textarea>
            </div>

            {status.message && (
              <p className={`text-xs font-medium p-3 rounded-lg ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {status.message}
              </p>
            )}

            <motion.button 
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-lg bg-gradient-to-r from-[#1871C9] to-[#5FA9F4] hover:from-[#145da5] hover:to-[#1871C9] text-white font-bold text-sm uppercase tracking-widest transition-all shadow-lg shadow-blue-900/25 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Submit Request"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactForm;