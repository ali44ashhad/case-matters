import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Arbitration',
    message: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: 'success', message: data.message });
        setFormData({ name: '', phone: '', email: '', subject: 'Arbitration', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch (error) {
      setStatus({ type: 'error', message: "Something went wrong. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-white pt-0 md:pt-24 pb-24 px-6 md:px-20 overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E2B13C]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#1871C9]/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* LEFT SIDE: Contact Information */}
        <div className="space-y-8 md:space-y-12 pt-0"> {/* Removed mobile padding here */}
          <motion.div variants={itemVariants} className="space-y-4">
            <p className='text-gray-600 text-sm'>One Month Free Advisory and Consulting Retainership for Start-Ups, Small and Medium Construction Companies - <a href="mailto:casematters.info@gmail.com" className='text-[#1871C9]'>casematters.info@gmail.com</a></p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tighter leading-tight">
              Request a free <br /> consultation
            </h1>
            <p className="text-gray-600 text-lg max-w-md font-light">
              Our experts are ready to provide the precision and results your legal matters require.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <p className="text-[#1871C9] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Email Us</p>
                <a href="mailto:casematters.info@gmail.com" className="text-gray-900 text-lg hover:text-[#E2B13C] transition-colors">casematters.info@gmail.com</a>
              </div>
              <div>
                <p className="text-[#1871C9] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Call Us</p>
                <a href="tel:+919810238083" className="text-gray-900 text-lg hover:text-[#E2B13C] transition-colors">+91 9810238083</a>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[#1871C9] font-bold text-[10px] uppercase tracking-[0.2em] mb-4">Office Hours</p>
              <div className="text-gray-700 space-y-1 text-sm">
                <p className="font-bold text-gray-900">Mon - Sat: <span className="font-normal opacity-70 ml-2">10am - 8pm</span></p>
                <p className="font-bold text-gray-900">Sunday: <span className="font-normal opacity-70 ml-2">10am - 5pm</span></p>
              </div>
            </div>
          </motion.div>

          {/* Slightly rounded (xl) instead of 2xl */}
          <motion.div variants={itemVariants} className="p-6 rounded-xl border border-gray-200/70 bg-gray-50/50 backdrop-blur-sm">
            <p className="text-[#1871C9] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Visit Our Office</p>
            <p className="text-gray-900 text-lg leading-relaxed">DLF Almeda, Sector 73, SPR Road, <br /> Gurgaon - 122101</p>
          </motion.div>
        </div>

        {/* RIGHT SIDE: The Form */}
        <motion.div 
          variants={itemVariants}
          className="relative p-8 md:p-12 rounded-xl bg-gray-50/80 border border-gray-200/70 backdrop-blur-2xl shadow-xl"
        > {/* Changed rounded-[2.5rem] to rounded-xl */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Full Name</label>
                <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="John Doe" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 focus:outline-none focus:border-[#1871C9] transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Phone Number</label>
                <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+91 00000 00000" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 focus:outline-none focus:border-[#1871C9] transition-all" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Email Address</label>
              <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="example@email.com" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 focus:outline-none focus:border-[#1871C9] transition-all" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Subject</label>
              <select name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 focus:outline-none focus:border-[#1871C9] appearance-none">
                <option value="Arbitration">Arbitration</option>
                <option value="Construction Disputes">Construction Disputes</option>
                <option value="Contract Advisory">Contract Advisory</option>
                <option value="Other Legal Matters">Other Legal Matters</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Message</label>
              <textarea required name="message" value={formData.message} onChange={handleChange} rows="3" placeholder="Describe your situation..." className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 focus:outline-none focus:border-[#1871C9] transition-all resize-none"></textarea>
            </div>

            {status.message && (
              <p className={`text-xs font-medium p-3 rounded-lg ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {status.message}
              </p>
            )}

            <motion.button 
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-lg bg-[#1871C9] hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-widest transition-all shadow-lg disabled:opacity-50"
            >
              {loading ? "Sending..." : "Submit Request"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactForm;