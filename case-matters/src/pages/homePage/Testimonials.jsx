import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import axios from "axios";

const GAP = 24;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cardWidth, setCardWidth] = useState(500);

  // ✅ Responsive width handler
  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 640) {
        setCardWidth(window.innerWidth * 0.85); // mobile
      } else if (window.innerWidth < 1024) {
        setCardWidth(window.innerWidth * 0.65); // tablet
      } else {
        setCardWidth(600); // desktop bigger center
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/all-testimonials`
        );
        setTestimonials(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const next = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  if (loading) return <div className="py-20 text-center">Loading...</div>;

  return (
    <section className="py-20 bg-[#f5f5f7] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center">

        <h2 className="text-4xl md:text-6xl font-semibold text-gray-900 mb-12">
          What our Clients say
        </h2>

        <div className="relative">

          {/* Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-3 rounded-full"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-3 rounded-full"
          >
            <ChevronRight />
          </button>

          {/* VIEWPORT */}
          <div className="overflow-hidden">

            <motion.div
              className="flex gap-6"
              animate={{
                x: `calc(50% - ${cardWidth / 2}px - ${
                  currentIndex * (cardWidth + GAP)
                }px)`
              }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            >
              {testimonials.map((item, index) => (
                <motion.div
                  key={item._id}
                  style={{ width: cardWidth }}
                  className="flex-shrink-0 bg-white rounded-3xl shadow-xl p-6 md:p-10 relative"
                  animate={{
                    scale: index === currentIndex ? 1 : 0.85,
                    opacity: index === currentIndex ? 1 : 0.4,
                    filter:
                      index === currentIndex
                        ? "blur(0px) brightness(1)"
                        : "blur(5px) brightness(0.7)",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Quote className="absolute top-6 right-6 text-[#1871C9] opacity-10" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill={
                          i < (item.rating || 5)
                            ? "#1871C9"
                            : "#E5E7EB"
                        }
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-gray-700 text-base md:text-lg italic leading-relaxed text-center">
                    "{item.description}"
                  </p>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t text-center">
                    <h4 className="text-[#1871C9] font-bold text-lg">
                      {item.name}
                    </h4>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">
                      {item.companyName}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 w-2.5 rounded-full cursor-pointer ${
                  i === currentIndex ? "bg-black" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Note */}
          <p className="text-xs text-gray-500 mt-6">
            Names and identifying details have been modified to protect client confidentiality
          </p>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;