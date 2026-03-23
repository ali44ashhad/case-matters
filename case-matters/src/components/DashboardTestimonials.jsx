import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const initialForm = {
  name: "",
  companyName: "",
  rating: 5,
  description: "",
};

const DashboardTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/admin/all-testimonials`, {
        withCredentials: true,
      });
      setTestimonials(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setErrorMsg("Unable to load testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, testimonials]);

  const closeModal = () => {
    setModalOpen(false);
    setIsEditMode(false);
    setEditingId(null);
    setFormData(initialForm);
  };

  const openCreateModal = () => {
    setErrorMsg("");
    setFormData(initialForm);
    setIsEditMode(false);
    setEditingId(null);
    setModalOpen(true);
  };

  const openEditModal = (testimonial) => {
    setErrorMsg("");
    setIsEditMode(true);
    setEditingId(testimonial._id);
    setFormData({
      name: testimonial.name || "",
      companyName: testimonial.companyName || "",
      rating: Number(testimonial.rating) || 5,
      description: testimonial.description || "",
    });
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.description.trim()) {
      setErrorMsg("Name and description are required.");
      return false;
    }
    if (formData.rating < 1 || formData.rating > 5) {
      setErrorMsg("Rating must be between 1 and 5.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validateForm()) return;

    try {
      setSubmitting(true);
      if (isEditMode && editingId) {
        await axios.put(
          `${API_URL}/admin/update-testimonial/${editingId}`,
          formData,
          { withCredentials: true }
        );
      } else {
        await axios.post(`${API_URL}/admin/create-testimonial`, formData, {
          withCredentials: true,
        });
      }
      closeModal();
      fetchTestimonials();
    } catch (error) {
      console.error("Error saving testimonial:", error);
      setErrorMsg(error?.response?.data?.message || "Failed to save testimonial.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this testimonial?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/admin/delete-testimonial/${id}`, {
        withCredentials: true,
      });
      setTestimonials((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      setErrorMsg(error?.response?.data?.message || "Failed to delete testimonial.");
    }
  };

  return (
    <div className="pt-4 md:pt-0 pb-10">
      <header className="mb-8 md:mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-5">
        <div>
          <p className="text-blue-500 font-semibold text-xs uppercase tracking-widest mb-2">
            Admin Panel
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tighter">
            Testimonials
          </h1>
        </div>

        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:justify-end">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 bg-gray-200/80 border border-gray-200/60 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-500 transition-all"
          />
          <button
            type="button"
            onClick={openCreateModal}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/20"
          >
            Create
          </button>
        </div>
      </header>

      {errorMsg && (
        <div className="mb-5 text-sm text-red-300 bg-red-500/10 border border-red-500/30 px-4 py-3 rounded-xl">
          {errorMsg}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence>
            {filteredTestimonials.length > 0 ? (
              filteredTestimonials.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="bg-gray-200/70 border border-gray-200/60 rounded-2xl p-5 shadow-xl"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-gray-900 text-lg font-bold break-words">{item.name}</h3>
                      <p className="text-blue-400 text-sm mt-1 break-words">
                        {item.companyName || "Independent"}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-full px-3 py-1">
                      {item.rating}/5
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm mt-4 leading-relaxed break-words">
                    {item.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <p className="text-[11px] uppercase tracking-wider text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-300 border border-blue-500/40 hover:bg-blue-500/10 transition-all"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-300 border border-red-500/40 hover:bg-red-500/10 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500 font-medium">
                No testimonials found.
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/10 backdrop-blur-sm p-4 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              className="w-full max-w-xl bg-gray-200/80 border border-gray-200/60 rounded-2xl p-6 md:p-7 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-900">
                  {isEditMode ? "Update Testimonial" : "Create Testimonial"}
                </h2>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="moksh Shakya"
                    className="mt-1 w-full bg-gray-200/90 border border-gray-200/60 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="FNA Marketing"
                    className="mt-1 w-full bg-gray-200/90 border border-gray-200/60 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                    Rating (1-5) *
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    className="mt-1 w-full bg-gray-200/90 border border-gray-200/60 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="The legal expertise provided was exceptional..."
                    className="mt-1 w-full bg-gray-200/90 border border-gray-200/60 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-blue-500 resize-none"
                    required
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2.5 text-sm rounded-lg border border-gray-200/60 text-gray-600 hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 text-sm rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  >
                    {submitting ? "Saving..." : isEditMode ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardTestimonials;
