import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ContactForm from '../homePage/ContactForm';
import { Link } from 'react-router-dom';

const ContractAdvisory = () => {
    const container = useRef();
    const carpetRef = useRef();

    useGSAP(() => {
        // Left-to-right "Carpet Unroll" for the specialized heading
        gsap.fromTo(carpetRef.current,
            { clipPath: "inset(0 100% 0 0)", x: -50, skewX: 10 },
            {
                clipPath: "inset(0 0% 0 0)",
                x: 0,
                skewX: 0,
                duration: 2,
                ease: "expo.out",
                delay: 0.2
            }
        );
    }, { scope: container });

    return (
        <>
          <section
    ref={container}
    className="relative min-h-screen w-full overflow-hidden bg-white font-sans flex items-center pt-20"
>
    {/* Background Image */}
    <img
        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000&auto=format&fit=crop"
        alt="Legal Contract Review"
        className="absolute inset-0 h-full w-full object-cover"
    />

    {/* Cinematic Overlay */}
    <div className="absolute inset-0 bg-black/50" />

    {/* Main Content */}
    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-6">

            <div ref={carpetRef} className="overflow-hidden">
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                    Contract Advisory <br />
                    <span className="text-[#1871C9]">& Risk Management</span>
                </h1>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-4"
            >
                <p className="text-white text-base md:text-lg text-gray-700 max-w-lg leading-relaxed">
                    We assist in drafting, reviewing, and interpreting agreements to
                    ensure clarity and protect your commercial interests.
                </p>

                <p className="text-white text-sm text-gray-600 border-l-2 border-[#1871C9]/50 pl-4 italic max-w-lg">
                    Strategic legal guidance designed to reduce contractual risk.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                    <Link to="/all-services">
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#145da5" }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-full bg-[#1871C9] px-7 py-3 text-sm font-semibold text-white shadow-md"
                    >
                        view services
                    </motion.button>
                    </Link>
                    
                </div>
            </motion.div>
        </div>

        {/* RIGHT CARDS */}
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative space-y-4 hidden lg:block"
        >
            <div className="relative overflow-hidden rounded-2xl border border-gray-200/60 bg-black/60 p-6 backdrop-blur-lg">
                <h3 className="text-[#1871C9] text-xs font-bold uppercase tracking-widest mb-2">
                    Strategic Safeguards
                </h3>

                <p className="text-white text-gray-700 text-sm leading-relaxed">
                    We identify contractual risks and structure agreements that clearly
                    allocate responsibilities between parties.
                </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-gray-200/20 bg-black/60 p-6 group  transition">
                <p className="text-white text-gray-700 text-sm leading-relaxed">
                    From drafting to dispute stages, we guide clients to make informed
                    legal and commercial decisions.
                </p>

                <div className="absolute inset-0 bg-gradient-to-br from-[#1871C9]/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>

            {/* Decorative Glow */}
            <div className="absolute -z-10 -top-16 -right-16 w-48 h-48 bg-[#1871C9]/10 blur-[90px] rounded-full" />
        </motion.div>
    </div>

    {/* Background Quote */}
    <div className="absolute bottom-6 right-6 opacity-5 pointer-events-none hidden md:block">
        <span className="text-5xl md:text-7xl font-serif italic text-gray-300 select-none">
            "Verba Ita Sunt Intelligenda"
        </span>
    </div>
</section>

            <ContactForm />
        </>
    );
};

export default ContractAdvisory;