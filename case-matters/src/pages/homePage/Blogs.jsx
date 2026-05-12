import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import legalRiskImage from '../../assets/homeAssets/legal-risk.png'
import clausesImage from '../../assets/homeAssets/clauses.webp'
import constituteImage from '../../assets/homeAssets/constitute.jpg'
import oportunityImage from '../../assets/homeAssets/oportunity.webp'

// Import your local assets here
// import employementImage from '../../assets/homeAssets/employement.jpg'

gsap.registerPlugin(ScrollTrigger);

const blogs = [
  {
    id: 1,
    category: "DELAY CLAIMS",
    title: "What must a contractor establish in a delay claim?",
    excerpt: "Understanding the shift towards institutional arbitration in global markets.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop",
    backContent: [
      "Occurrence of delay and its cause (employer / third-party / force majeure)",
      "Impact on project timeline (link between delay event and completion)",
      "Proper records (hindrance register, site diaries, DPR/MPR, correspondence)",
      "Project schedules (baseline vs actual)",
      "Timely delay notices as per contract",
      "Entitlement to EOT (Extension of Time)"
    ]
  },
  {
    id: 2,
    category: "STARTUP MISTAKES",
    title: "What common mistakes should startups avoid?",
    excerpt: "Common pitfalls in early-stage legal structuring and how to avoid them.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop",
    backContent: [
      "Not having a founder/shareholder agreement",
      "Ignoring regulatory and statutory compliance",
      "Poorly drafted contracts with vendors/employees",
      "Lack of IP protection (trademark, ownership rights)",
      "Mixing personal and business finances"

    ]

  },
  {
    id: 3,
    category: "EMPLOYMENT",
    title: "What should employers focus on ?",
    excerpt: "A deep dive into recent statutory changes affecting the modern workforce.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop",
    backContent: [
      "Compliance with updated labour codes (wages, social security, OSH)",
      "Proper employment contracts and policies",
      "Timely payment of wages and statutory benefits",
      "Maintenance of employment records and registers"
    ]
  },
  {
    id: 4,
    category: "CONTRACT LAW",
    title: "How can contractual risk be minimized?",
    excerpt: "How precise drafting can save businesses from future litigation.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
    backContent: [
      "Clearly define roles, responsibilities, and deliverables",
      "Include strong indemnity and liability clauses",
      "Provide for risk-sharing mechanisms",
      "Ensure proper documentation and communication"
    ]
  },
  {
    id: 5,
    category: "PROVING CLAIMS",
    title: "How to Prove Loss of Profit, Business Opportunity & Goodwill",
    excerpt: "Establishing clear evidence and financial proof to justify claims of business losses.",
    image: oportunityImage,
    backContent: [
      "Actual breach or wrongful act",
      "Direct link between breach and financial loss",
      "Reasonable basis for quantification of damages",
      "Financial statements and projections",
      "Past performance records",
      "Market data and expert reports",
      "Correspondence / evidence showing loss of opportunity"
    ]
  },
  {
    id: 6,
    category: "RISK & COST",
    title: "When can risk and cost be claimed ?",
    excerpt: "Identifying conditions under which additional costs due to breach can be recovered.",
    image: legalRiskImage,
    backContent: [
      "When the employer gets work completed through another contractor due to default",
      "When additional cost is incurred due to breach by the other party",
      "Valid termination or breach should be established",
      "Actual additional cost incurred",
      "Proper documentation of expenditure"
    ]
  },
  {
    id: 7,
    category: "Change of Scope of Work",
    title: " What constitutes change of scope?",
    excerpt: "Understanding what qualifies as a variation beyond the original contractual obligations.",
    image: constituteImage,
    backContent: [
      "Additional work beyond original contract",
      "Modification in design, quantity, or specifications",
      "Instruction or approval by employer/authority",
      "Execution of additional work",
      "Entitlement to payment under contract"
    ]
  },
  {
    id: 8,
    category: "Contract Drafting",
    title: "What key clauses must be carefully drafted?",
    excerpt: "Highlighting essential contract clauses that prevent disputes and ensure clarity.",
    image: clausesImage,
    backContent: [
      "Scope of Work & Change of Scope",
      "Payment terms & milestones",
      "Indemnity & limitation of liability",
      "Dispute resolution",
      "Termination rights"
    ]
  },

];

const Blogs = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const canvasContainer = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  useEffect(() => {
    if (!canvasContainer.current) return;

    let rafId = 0;
    const scene = new THREE.Scene();
    scene.background = null;
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 80);
    camera.position.set(0, 0.4, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
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
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    const resize = () => {
      if (!canvasContainer.current) return;
      const { width, height } = canvasContainer.current.getBoundingClientRect();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    resize();
    window.addEventListener("resize", resize);

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
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
    };
  }, []);

  return (
    <section id="blogs" ref={sectionRef} className="relative w-full py-8 sm:py-16 md:py-24 overflow-hidden font-sans bg-gradient-to-br from-[#ffffff] via-[#eef6ff] to-[#dcecff]">
      <div ref={canvasContainer} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Background Overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-white/90 via-transparent to-white/40 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,_rgba(24,113,201,0.22),_transparent_58%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-5 sm:mb-10 md:mb-16">
          <h2 className="text-gray-900 text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight">
            Latest <span className="text-[#1871C9]">Legal Insights</span>
          </h2>
          <p className="text-gray-600 mt-2 sm:mt-3 md:mt-4 max-w-2xl text-sm sm:text-base md:text-lg font-light">
          Stay updated with our latest thoughts on arbitration, compliance, employment, and corporate law.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 [perspective:1000px]">
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="group relative h-[320px] sm:h-[360px] lg:h-[400px] w-full cursor-pointer"
            >
              {/* Corner highlights (Only visible on hover) */}
              <div className="pointer-events-none absolute inset-0 z-20">
                <span className="absolute left-3 top-3 h-7 w-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="absolute left-0 top-0 h-[2px] w-full bg-[#1871C9]" />
                  <span className="absolute left-0 top-0 h-full w-[2px] bg-[#1871C9]" />
                </span>
                <span className="absolute right-3 bottom-3 h-7 w-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="absolute right-0 bottom-0 h-[2px] w-full bg-[#1871C9]" />
                  <span className="absolute right-0 bottom-0 h-full w-[2px] bg-[#1871C9]" />
                </span>
              </div>

              {/* Inner container for 3D effect */}
              <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                {/* FRONT SIDE */}
                <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xl">
                  <div className="relative h-40 sm:h-44 lg:h-48 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-[#1871C9] text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {blog.category}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <h3 className="text-gray-900 text-base sm:text-lg font-bold leading-tight mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                {/* BACK SIDE (Updated Content) */}
                {/* BACK SIDE (Updated Content) */}
                <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#1871C9] rounded-2xl flex flex-col items-center justify-center p-6 text-center shadow-2xl">
                  <h3 className="text-white text-lg font-black uppercase tracking-widest mb-4">
                    {blog.category}
                  </h3>
                  <div className="w-8 h-[1px] bg-white/40 mb-4" />

                  <div className="flex-grow flex flex-col justify-center w-full">
                    {Array.isArray(blog.backContent) ? (
                      <ul className="space-y-2">
                        {blog.backContent.map((item, idx) => (
                          <li key={idx} className="flex items-start text-left text-white text-[11px] sm:text-xs leading-tight">
                            <span className="mr-2 mt-1 h-1 w-1 shrink-0 rounded-full bg-white/60" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-white text-[11px] sm:text-sm leading-relaxed">
                        {blog.backContent}
                      </p>
                    )}
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