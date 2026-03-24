import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Gavel, FileText, Users, Rocket, Building2 } from 'lucide-react';
import service2 from '../assets/services/service2.png';
import services4 from '../assets/services/services4.jpg';

const ServicePage = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: "arbitration",
      title: "Arbitration",
      desc: "Private dispute resolution through structured proceedings, offering confidentiality and procedural efficiency.",
      path: "/services/arbitration",
      icon: <ShieldCheck size={24} />,
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "construction",
      title: "Construction Disputes",
      desc: "Advisory and representation in project-related disputes, focused on protecting contractual entitlements.",
      path: "/services/construction",
      icon: <Building2 size={24} />,
      image: service2
    },
    {
      id: "contract-advisory",
      title: "Contract Advisory",
      desc: "Drafting, review, and interpretation of contracts with strategic advice on rights and obligations.",
      path: "/services/contract-advisory",
      icon: <Gavel size={24} />,
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "claims-management",
      title: "Claims Management",
      desc: "End-to-end claims support, including claim preparation, evidence collation, and correspondence strategy.",
      path: "/services/contract-claim",
      icon: <FileText size={24} />,
      image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "employment",
      title: "Employment Law",
      desc: "Advisory services relating to employment contracts, HR policies, and workplace regulations.",
      path: "/services/employement",
      icon: <Users size={24} />,
      image: services4
    },
    {
      id: "startup-law",
      title: "Startup Law",
      desc: "Modern legal support for founders, covering business structuring and regulatory compliance.",
      path: "/services/startup",
      icon: <Rocket size={24} />,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      
      {/* --- HERO SECTION (Increased Height & Tri-color Gradient) --- */}
      <section className="relative w-full min-h-[70vh] md:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
  
  {/* THE GRADIENT: TOP-LEFT TO BOTTOM-RIGHT FLOW */}
  {/* Black (top-left) -> Blue (middle) -> White (bottom-right) */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-[#1871c9]/90 to-white" />
  
  {/* Blue Glow overlay for extra "pop" in the center */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1871c9]/20 via-transparent to-transparent opacity-50" />

  {/* Subtle texture overlay for premium feel */}
  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />

  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="relative z-10 text-center px-6 max-w-4xl"
  >
    <motion.span 
      initial={{ opacity: 0, letterSpacing: "0.1em" }}
      animate={{ opacity: 1, letterSpacing: "0.4em" }}
      transition={{ duration: 1 }}
      className="text-white/80 font-bold uppercase text-[10px] md:text-xs mb-6 block drop-shadow-sm"
    >
      Excellence in Law
    </motion.span>
    
    <h1 className="text-6xl md:text-9xl font-serif font-bold tracking-tight mb-8 text-white drop-shadow-2xl">
      Services
    </h1>
    
    <p className="text-white/90 text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto font-light drop-shadow-md">
      Specialized legal solutions tailored to navigate complex disputes and protect your interests.
    </p>
    
    {/* Visual divider line to anchor the text */}
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: "80px" }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="h-1 bg-white/40 mx-auto mt-10 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
    />
  </motion.div>
</section>

      {/* --- SECOND SECTION --- */}
      <section className="py-24 px-6 md:px-12 lg:px-24 text-center bg-gray-50">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Our Expertise & Commitment</h2>
          <p className="text-gray-600 text-xl leading-relaxed">
            We provide a comprehensive range of legal services designed to meet the unique needs of our clients. 
            Our team combines deep industry knowledge with strategic legal thinking to deliver results that matter.
          </p>
        </motion.div>
      </section>

      {/* --- SERVICES GRID SECTION (Glowing Blue Borders) --- */}
      <section className="pb-24 px-6 md:px-12 lg:px-24 bg-white">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    {services.map((service, index) => (
      <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }} // Clean lift without shadow
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        onClick={() => navigate(service.path)}
        // THIN GLOWING BORDER: Shadow removed, replaced with a subtle ring/border glow
        className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer flex flex-col border-[1px] border-[#1871c9]/30 ring-1 ring-[#1871c9]/10 hover:border-[#1871c9] hover:ring-[#1871c9]/40"
      >
        {/* Image Header */}
        <div className="h-56 w-full overflow-hidden relative">
          {/* Top-down subtle blue wash on image */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1871c9]/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7 }}
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all"
          />
        </div>

        {/* Card Body */}
        <div className="p-8 flex-grow flex flex-col bg-gradient-to-br from-white via-white to-[#1871c9]/5">
          {/* Icon with glow effect */}
          <div className="mb-4 text-[#1871c9] p-3 bg-[#1871c9]/10 w-fit rounded-xl group-hover:bg-[#1871c9]/20 group-hover:scale-110 transition-all duration-300">
            {service.icon}
          </div>

          <h3 className="text-2xl font-bold mb-4 group-hover:text-[#1871c9] transition-colors">
            {service.title}
          </h3>
          
          <p className="text-gray-600 text-base leading-relaxed mb-8">
            {service.desc}
          </p>
          
          <div className="mt-auto flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#1871c9]">
            Explore Service 
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight size={18} />
            </motion.div>
          </div>
        </div>

        {/* This creates the "Glory" line at the very top of the card on hover */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#1871c9] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    ))}
  </div>
</section>
      
    </div>
  );
};

export default ServicePage;