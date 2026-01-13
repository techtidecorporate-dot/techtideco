import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Mail,
  Building2,
  Phone,
  ChevronDown,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { partnerAPI } from "@/api";
import { toast } from "sonner";

interface PartnerWithUsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  "CRM (Customer Relationship Management)",
  "CMS (Customer Management System)",
  "ERP (Enterprise Resource Planning)",
  "E-Commerce / OMS (Order Management System)",
  "HRMS (Human Resource Management System)",
  "Analytics & Reporting System",
  "Billing & Invoice System",
  "User Management & Security System",
  "Support, Ticketing, Booking & Communication System",
  "API & Integration System",
  "Custom Software Development",
];

const budgetRanges = ["<$1k", "$1k-5k", "$5k-10k", "$10k-25k", "$25k+"];

export function PartnerWithUsDrawer({
  isOpen,
  onClose,
}: PartnerWithUsDrawerProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phone: "",
    service: "",
    description: "",
    budget: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.budget) {
      toast.error("Please select a budget range");
      return;
    }
    setLoading(true);
    try {
      await partnerAPI.create(formData);
      setIsSubmitted(true);
      toast.success("Request submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      companyName: "",
      phone: "",
      service: "",
      description: "",
      budget: "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-poppins font-semibold text-[#191a23]">
                  Partner with Us
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Let's build something powerful together
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6 py-10"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-poppins font-semibold text-[#191a23]">
                    Request Received!
                  </h2>
                  <p className="text-gray-500 leading-relaxed max-w-sm">
                    Thank you for reaching out. Our team will review your
                    project details and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={resetAndClose}
                    className="px-8 py-4 bg-[#453abc] text-white rounded-2xl font-semibold hover:bg-[#362a9a] transition-all shadow-lg shadow-[#453abc]/20"
                  >
                    Close Drawer
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 pb-10">
                  <div className="space-y-4">
                    <h3 className="text-lg font-poppins font-semibold text-[#453abc]">
                      Project Details
                    </h3>

                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Enter Full Name"
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/10 focus:border-[#453abc] transition-all text-sm"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter Email"
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/10 focus:border-[#453abc] transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Company Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                          Company
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Enter Company Name"
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/10 focus:border-[#453abc] transition-all text-sm"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                          Phone
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+920000000000"
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/10 focus:border-[#453abc] transition-all text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Service Selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                        Service Interested In
                      </label>
                      <div className="relative">
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <select
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/10 focus:border-[#453abc] transition-all appearance-none text-sm text-gray-600"
                        >
                          <option value="" disabled>
                            Select a service
                          </option>
                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Project Description */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                        Project Description
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                        <textarea
                          name="description"
                          required
                          rows={3}
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Briefly describe your project goals..."
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/10 focus:border-[#453abc] transition-all text-sm resize-none"
                        />
                      </div>
                    </div>

                    {/* Budget Range */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                        Budget Range
                      </label>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                        {budgetRanges.map((range) => (
                          <button
                            key={range}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, budget: range })
                            }
                            className={`py-2 px-1 text-[10px] font-bold rounded-lg border transition-all ${
                              formData.budget === range
                                ? "bg-[#453abc] border-[#453abc] text-white shadow-sm"
                                : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
                            }`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#453abc] text-white py-4 rounded-xl font-poppins font-semibold text-base hover:bg-[#362a9a] transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-[#453abc]/20 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>
                        {loading ? "Submitting..." : "Request a Callback"}
                      </span>
                      {!loading && (
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 md:p-8 bg-gray-50/50 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">
                Or reach us directly at{" "}
                <span className="text-[#453abc] font-semibold">
                  support@techtide.pk
                </span>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
