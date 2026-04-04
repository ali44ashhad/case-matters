import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Gavel, FileText, Users, Rocket, Building2, Landmark } from 'lucide-react';
import service2 from '../assets/services/service2.png';
import services4 from '../assets/services/services4.jpg';

const ALL_SERVICES = [
  {
    id: 'arbitration',
    path: '/services/arbitration',
    title: 'Arbitration',
    desc: 'Private dispute resolution through structured proceedings, offering confidentiality and procedural efficiency.',
    icon: <ShieldCheck size={24} />,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'construction',
    path: '/services/construction',
    title: 'Construction & Infrastructure Disputes',
    desc: 'Advisory and representation in project-related disputes, focused on protecting contractual entitlements.',
    icon: <Building2 size={24} />,
    image: service2,
  },
  {
    id: 'contract-advisory',
    path: '/services/contract-advisory',
    title: 'Contract Advisory & Risk Management',
    desc: 'Drafting, review, and interpretation of contracts, with strategic advice on rights and obligations.',
    icon: <Gavel size={24} />,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'claims-management',
    path: '/services/contract-claim',
    title: 'Contract and Claims Management',
    desc: 'End-to-end claims support, including claim preparation, evidence collation, and strategy.',
    icon: <FileText size={24} />,
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'employment',
    path: '/services/employement',
    title: 'Employment Advisory & Compliance',
    desc: 'Advisory services relating to employment contracts, HR policies, and statutory compliance.',
    icon: <Users size={24} />,
    image: services4,
  },
  {
    id: 'startup-law',
    path: '/services/startup',
    title: 'Startup Law & Compliance',
    desc: 'Legal support for startups and founders, covering business structuring and regulatory compliance.',
    icon: <Rocket size={24} />,
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'litigation',
    path: '/services/civil',
    title: 'Civil & Business Litigation',
    desc: 'Representation before courts in civil and commercial disputes including stakeholder conflicts.',
    icon: <Landmark size={24} />,
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800',
  },
];

const OtherServicesSection = ({ currentPath }) => {
  const navigate = useNavigate();

  const others = useMemo(
    () => ALL_SERVICES.filter((s) => s.path !== currentPath),
    [currentPath]
  );

  if (others.length === 0) return null;

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <p className="text-[#1871c9] font-bold uppercase tracking-[0.28em] text-xs md:text-sm mb-3">
            Explore further
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Other services we offer
          </h2>
          <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
            Browse the rest of our practice areas and find the support that fits your matter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {others.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              viewport={{ once: true }}
              onClick={() => navigate(service.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(service.path);
                }
              }}
              className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer flex flex-col border border-[#1871c9]/30 ring-1 ring-[#1871c9]/10 hover:border-[#1871c9] hover:ring-[#1871c9]/40 outline-none focus-visible:ring-2 focus-visible:ring-[#1871c9] focus-visible:ring-offset-2"
            >
              <div className="h-52 w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1871c9]/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all"
                />
              </div>

              <div className="p-7 flex-grow flex flex-col bg-gradient-to-br from-white via-white to-[#1871c9]/5">
                <div className="mb-3 text-[#1871c9] p-3 bg-[#1871c9]/10 w-fit rounded-xl group-hover:bg-[#1871c9]/20 group-hover:scale-110 transition-all duration-300">
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-[#1871c9] transition-colors text-left">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 text-left flex-grow">
                  {service.desc}
                </p>

                <div className="mt-auto flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#1871c9]">
                  View service
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <ArrowRight size={16} />
                  </motion.div>
                </div>
              </div>

              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#1871c9] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherServicesSection;
