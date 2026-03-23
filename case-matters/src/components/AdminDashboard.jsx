import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardTestimonials from "./DashboardTestimonials";

const AdminDashboard = ({ setAdminAuth }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("leads");
  const navigate = useNavigate();

  const themeBlue = "#3B82F6"; 

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/all-users`,
          { withCredentials: true }
        );
        setUsers(res.data?.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  /* ================= FIXED LOGOUT LOGIC ================= */
  const handleLogout = async () => {
    try {
      // 1. Try hitting the API (Using POST as it's standard for logout, change to GET if your backend strictly uses GET)
      await axios.post(`${import.meta.env.VITE_API_URL}/admin/logout`, {}, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Server-side logout failed, performing client-side logout:", error);
    } finally {
      // 2. Hamesha cleanup karein chahe API chale ya na chale
      localStorage.removeItem("isCaseMattersAdmin");
      
      if (typeof setAdminAuth === "function") {
        setAdminAuth(false);
      }
      
      // 3. Redirect to login
      navigate("/admin-login");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col md:flex-row pt-20">
      
      {/* SIDEBAR - Fixed on Desktop */}
      <div className="pt-10 w-full md:w-64 bg-gray-200/70 border-b md:border-b-0 md:border-r border-gray-200/60 p-6 md:p-8 flex flex-col justify-between md:fixed md:h-screen top-0 left-0 z-50">
        <div>
          <h2 style={{ color: themeBlue }} className="text-xl font-bold tracking-widest uppercase mb-6 md:mb-10">
            Case Matters
          </h2>
          <nav className="space-y-4">
            <button
              type="button"
              onClick={() => setActiveSection("leads")}
              className={`w-full text-left font-medium px-4 py-3 rounded-xl border-l-4 transition-all ${
                activeSection === "leads"
                  ? "text-gray-900 bg-blue-500/10 border-blue-500 shadow-lg shadow-blue-500/5"
                  : "text-gray-700 bg-gray-200/50 border-transparent hover:border-blue-500/40 hover:bg-gray-200/70"
              }`}
            >
              Leads / Queries
            </button>
            <button
              type="button"
              onClick={() => setActiveSection("testimonials")}
              className={`w-full text-left font-medium px-4 py-3 rounded-xl border-l-4 transition-all ${
                activeSection === "testimonials"
                  ? "text-gray-900 bg-blue-500/10 border-blue-500 shadow-lg shadow-blue-500/5"
                  : "text-gray-700 bg-gray-200/50 border-transparent hover:border-blue-500/40 hover:bg-gray-200/70"
              }`}
            >
              Create Testimonial
            </button>
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="group flex items-center gap-3 px-4 py-3 mt-6 md:mt-0 text-gray-500 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all duration-300 border border-transparent hover:border-red-500/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-bold uppercase tracking-widest text-xs">Logout</span>
        </button>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 md:ml-64 p-4 md:p-12 overflow-y-auto">
        {activeSection === "leads" ? (
          <>
            <header className="mb-8 md:mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pt-4 md:pt-0">
              <div>
                <p className="text-blue-500 font-semibold text-xs uppercase tracking-widest mb-2">Admin Panel</p>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tighter">User Enquiries</h1>
              </div>
              
              <div className="w-full lg:w-80 flex flex-col items-end gap-3">
                <input 
                  type="text"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-200/80 border border-gray-200/60 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-500 transition-all"
                />
                <div className="text-gray-600 text-[10px] font-medium tracking-wider uppercase">
                  Results: <span className="text-blue-500 font-bold">{filteredUsers.length}</span> / {users.length}
                </div>
              </div>
            </header>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 pb-10">
                <AnimatePresence mode='popLayout'>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={user._id}
                        className="relative group bg-gray-200/70 border border-gray-200/60 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 hover:bg-gray-200/80 transition-all shadow-2xl overflow-hidden"
                      >
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 relative z-10">
                          
                          {/* Identity */}
                          <div className="lg:col-span-3 space-y-3">
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Client</p>
                              <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight break-words">{user.name}</h3>
                            </div>
                            <div className="space-y-1">
                              <p className="text-blue-400 text-sm font-medium truncate">{user.email}</p>
                              <p className="text-gray-600 text-sm">{user.phone}</p>
                            </div>
                          </div>

                          {/* Subject & Date */}
                          <div className="lg:col-span-3 space-y-4 lg:border-l lg:border-gray-200/60 lg:pl-8">
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Subject</p>
                              <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-[11px] font-bold border border-blue-500/20">
                                {user.subject || "General Inquiry"}
                              </span>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Received</p>
                              <p className="text-gray-600 text-xs uppercase tracking-wider font-medium">
                                {new Date(user.createdAt).toLocaleDateString('en-IN', {
                                  day: '2-digit', month: 'short', year: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>

                          {/* Message */}
                          <div className="lg:col-span-6 lg:border-l lg:border-gray-200/60 lg:pl-8">
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3">Enquiry Details</p>
                            <div className="bg-gray-200/60 rounded-2xl p-4 border border-gray-200/60">
                              <p className="text-gray-700 text-sm leading-relaxed italic">
                                "{user.message}"
                              </p>
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-32 text-gray-500 font-medium">
                      No enquiries found.
                    </div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </>
        ) : (
          <DashboardTestimonials />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;