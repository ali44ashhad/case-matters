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

  const maxIndex = sectors.length - 1;

  const next = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <section id="sectors" className="py-12 md:py-20 bg-[#f5f5f7] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900">
            Industry Expertise
          </h2>
          <p className="text-gray-500 mt-2 md:mt-4 text-base md:text-lg">
            Built for modern businesses across sectors
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">

          {/* Left Button - Adjusted vertical alignment to match the image heights */}
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className={`absolute left-2 md:-left-6 top-22 sm:top-32 md:top-48 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-md shadow-lg p-2 md:p-3 rounded-full transition ${
              currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "opacity-100"
            }`}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Right Button - Adjusted vertical alignment to match the image heights */}
          <button
            onClick={next}
            disabled={currentIndex === maxIndex}
            className={`absolute right-2 md:-right-6 top-22 sm:top-32 md:top-48 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-md shadow-lg p-2 md:p-3 rounded-full transition ${
              currentIndex === maxIndex ? "opacity-30 cursor-not-allowed" : "opacity-100"
            }`}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Track Window */}
          <div className="overflow-hidden rounded-2xl md:rounded-3xl">
            <motion.div
              className="flex"
              style={{ gap: "1.5rem" }}
              animate={{
                x: `calc(-${currentIndex} * 100% - ${currentIndex} * 1.5rem)`,
              }}
              transition={{ type: "spring", stiffness: 90, damping: 24 }}
            >
              {sectors.map((sector, i) => (
                <motion.div
                  key={i}
                  className="min-w-full bg-white overflow-hidden shadow-md md:shadow-xl flex flex-col"
                  animate={{
                    scale: i === currentIndex ? 1 : 0.98,
                    opacity: i === currentIndex ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image Element */}
                  <div className="h-44 sm:h-64 md:h-96 overflow-hidden">
                    <img
                      src={sector.image}
                      alt={sector.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text Content Block */}
                  <div className="p-5 sm:p-8 md:p-10 flex-grow">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-2 md:mb-4">
                      {sector.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                      {sector.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 md:mt-8 gap-2">
            {sectors.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 w-2 md:h-2.5 md:w-2.5 rounded-full cursor-pointer transition ${
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