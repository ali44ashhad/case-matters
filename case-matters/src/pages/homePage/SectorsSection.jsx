import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SectorsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sectors = [
  {
    title: "Infrastructure & Construction",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    desc: "Advisory and dispute resolution for contractors and developers across roads, railways, and infrastructure projects.",
  },
  {
    title: "Energy, Power & Renewable",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
    desc: "Legal services for power producers and renewable energy developers covering contracts, compliance, and arbitration.",
  },
  {
    title: "Professional Services",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    desc: "Advisory on contracts and dispute resolution for consultancy, advisory, and service-based organizations.",
  },
  {
    title: "Manufacturing & Industrial",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    desc: "Contractual advisory and compliance support for manufacturing entities across operations and supply chains.",
  },
  {
    title: "Corporate & Commercial",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    desc: "Comprehensive legal support on contracts, commercial disputes, and regulatory advisory for businesses.",
  },
  {
    title: "Startups & MSME",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
    desc: "End-to-end legal advisory for startups covering structuring, contracts, funding, and compliance requirements.",
  },
  {
    title: "Financial Services & FinTech",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
    desc: "Regulatory and contractual advisory for financial institutions and fintech companies in evolving markets.",
  },
  {
    title: "Logistics & Supply Chain",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
    desc: "Legal support for logistics contracts, vendor agreements, and dispute resolution in supply chains.",
  },
  {
    title: "Healthcare & Life Sciences",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
    desc: "Advisory for hospitals and healthcare providers covering contracts, employment, and compliance matters.",
  },
  {
    title: "Real Estate & Development",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    desc: "Support for developers and landowners on construction contracts, joint development, and real estate disputes.",
  },]
  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % sectors.length);
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? sectors.length - 1 : prev - 1
    );
  };

  return (
    <section className="py-20 bg-[#f5f5f7] overflow-hidden">
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

          {/* Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-md shadow-lg p-3 rounded-full"
          >
            <ChevronLeft />
          </button>

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
              animate={{ x: `calc(-${currentIndex} * 70% - ${currentIndex} * 1.5rem)` }}
              transition={{ type: "spring", stiffness: 70, damping: 20 }}
            >
              {sectors.map((sector, i) => (
                <motion.div
                  key={i}
                  className="min-w-[70%] md:min-w-[60%] bg-white rounded-3xl overflow-hidden shadow-xl"
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
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-10">
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                      {sector.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
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
