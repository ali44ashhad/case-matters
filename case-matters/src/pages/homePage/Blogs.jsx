import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import employementImage from '../../assets/homeAssets/employement.jpg'

gsap.registerPlugin(ScrollTrigger);

const blogs = [
  {
    id: 1,
    category: "Legal Insights",
    title: "Delay Claims in Construction & Infrastructure Projects: What Contractors Must Prove",
    excerpt: "Understanding the shift towards institutional arbitration in global markets.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Startup Law",
    title: "Top 5 Compliance Mistakes Founders Make",
    excerpt: "Common pitfalls in early-stage legal structuring and how to avoid them.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Employment",
    title: "New Labor Regulations: What Employers Need to Know",
    excerpt: "A deep dive into recent statutory changes affecting the modern workforce.",
    image: employementImage,
  },
  {
    id: 4,
    category: "Contract Law",
    title: "The Art of Risk Mitigation in Contracts",
    excerpt: "How precise drafting can save businesses from future litigation.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
  },
];

const Blogs = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth Entry: Sliding up with a slight 3D tilt
      gsap.fromTo(
        cardRefs.current,
        { 
          y: 80,
          opacity: 0,
          scale: 0.9,
          rotateX: -15
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1.2,
          ease: "expo.out", 
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%", 
            toggleActions: "play none none reverse", 
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="blogs" ref={sectionRef} className="w-full py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-gray-900 text-4xl md:text-5xl font-extrabold tracking-tight">
            Latest <span className="text-[#1871C9]">Legal Insights</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl text-lg font-light">
            Stay updated with our latest thoughts on arbitration, compliance, and corporate law.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 [perspective:1000px]">
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="group relative h-[400px] w-full cursor-pointer"
            >
              {/* Inner container for 3D effect */}
              <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* FRONT SIDE */}
                <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] bg-gray-200 border border-gray-200/60 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-[#1871C9] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      {blog.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-gray-900 text-xl font-bold leading-tight group-hover:text-[#1871C9] transition-colors duration-300">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                {/* BACK SIDE (Shown on Hover) */}
                <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#1871C9] rounded-2xl flex items-center justify-center p-8 shadow-2xl">
                   <div className="text-center">
                      <h3 className="text-white text-2xl font-black uppercase tracking-widest">
                        {blog.category}
                      </h3>
                      <div className="w-12 h-1 bg-white/30 mx-auto mt-4" />
                   </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;