import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import infrastructureImage from "../../assets/homeAssets/sector-infrastructure.jpg";
import manufactureImage from "../../assets/homeAssets/sector-manufacture.png";
import professionalImage from "../../assets/homeAssets/sector-professional.jpg";
import startupImage from "../../assets/homeAssets/sector-startup.jpg";

const SectorsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sectors = [
    {
      title: "Infrastructure & Construction",
      image: infrastructureImage,
      desc: "Advisory and dispute resolution for contractors, concessionaires, developers, and project stakeholders across roads, highways, railways, ports, airports, power, and urban infrastructure projects.",
    },
    {
      title: "Energy, Power & Renewable Sector",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
      desc: "Legal services for power producers, renewable energy developers, and operators involving project contracts and compliance.",
    },
    {
      title: "Professional Services & Consultancy Firm",
      image: professionalImage,
      desc: "Advisory on contracts and dispute resolution for consultancy and service-based organizations.",
    },
    {
      title: "Manufacturing & Industrial Enterprises",
      image: manufactureImage,
      desc: "Contractual advisory and dispute resolution across production and supply chain functions.",
    },
    {
      title: "Corporate & Commercial Enterprises",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
      desc: "Legal support on contract management, commercial disputes, and employment advisory.",
    },
    {
      title: "Startups, MSME & Emerging Businesses",
      image: startupImage,
      desc: "End-to-end legal advisory for startups covering structuring, contracts, and compliance.",
    },
    {
      title: "Financial Services & FinTech",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
      desc: "Regulatory compliance, contracts, and dispute resolution for fintech companies.",
    },
    {
      title: "Logistics, Supply Chain & Transportation",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
      desc: "Legal advisory on logistics contracts and operational disputes.",
    },
    {
      title: "Healthcare & Life Sciences",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
      desc: "Contractual and employment advisory for healthcare providers.",
    },
    {
      title: "Real Estate & Property Development",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      desc: "Legal support for developers, investors, and landowners involving construction contracts, joint-venture / development agreements, service agreements, vendor agreements and commercial dispute resolution.",
    },
  ];

  // ✅ IMPORTANT FIX
  const maxIndex = sectors.length - 1;

  const next = () => {
    setCurrentIndex((prev) =>
      prev < maxIndex ? prev + 1 : prev
    );
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : prev
    );
  };

  return (
    <section id="sectors" className="py-20 bg-[#f5f5f7] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-gray-900">
            Industry Expertise
          </h2>
          <p className="text-gray-500 mt-4 text-lg">
            Built for modern businesses across sectors
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">

          {/* Left Button */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-md shadow-lg p-3 rounded-full"
          >
            <ChevronLeft />
          </button>

          {/* Right Button */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-md shadow-lg p-3 rounded-full"
          >
            <ChevronRight />
          </button>

          {/* Track */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: `calc(-${currentIndex} * 70% - ${currentIndex} * 1.5rem)`
              }}
              transition={{ type: "spring", stiffness: 70, damping: 20 }}
            >
              {sectors.map((sector, i) => (
                <motion.div
                  key={i}
                  className="min-w-[70%] bg-white rounded-3xl overflow-hidden shadow-xl"
                  animate={{
                    scale: i === currentIndex ? 1 : 0.9,
                    opacity: i === currentIndex ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Image */}
                  <div className="h-64 md:h-80 overflow-hidden">
                    <img
                      src={sector.image}
                      alt={sector.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-10">
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                      {sector.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {sector.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {sectors.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 w-2.5 rounded-full cursor-pointer transition ${
                  i === currentIndex ? "bg-black" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SectorsCarousel;