import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Scale, ShieldCheck, Gavel, FileText, Users, Rocket, Building2 } from 'lucide-react';
import service2 from '../assets/services/service2.png'
import services4 from '../assets/services/services4.jpg'


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
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1871c9]/25 to-gray-100 opacity-60" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <span className="text-[#1871c9] font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
            Excellence in Law
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6">
            Services
          </h1>
          <p className="text-gray-600 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            Specialized legal solutions tailored to navigate complex disputes and protect your interests.
          </p>
        </motion.div>
      </section>

      {/* --- SECOND SECTION: HEADING & PARA --- */}
      <section className="py-20 px-6 md:px-12 lg:px-24 text-center bg-gray-200/50">
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">Our Expertise & Commitment</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We provide a comprehensive range of legal services designed to meet the unique needs of our clients. 
            From structured arbitration to complex construction disputes, our team combines deep industry 
            knowledge with strategic legal thinking to deliver results that matter. We believe in proactive 
            risk management and dedicated advocacy.
          </p>
        </motion.div>
      </section>

      {/* --- SERVICES GRID SECTION --- */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => navigate(service.path)}
              className="group relative bg-gray-200/70 border border-gray-200/70 rounded-2xl overflow-hidden hover:border-[#1871c9]/50 transition-all duration-500 cursor-pointer flex flex-col"
            >
              {/* Image Header */}
              <div className="h-48 w-full overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
              </div>

              {/* Card Body */}
              <div className="p-8 flex-grow flex flex-col">
                <div className="mb-4 text-[#1871c9] p-2 bg-[#1871c9]/10 w-fit rounded-lg">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#1871c9] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>
                
                <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1871c9]">
                  Explore Service <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA --- */}
     
    </div>
  );
};

export default ServicePage;