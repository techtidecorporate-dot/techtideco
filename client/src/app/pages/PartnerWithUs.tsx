import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Building2,
  Phone,
  ChevronDown,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const services = [
  "CRM (Customer Relationship Management)",
  "ERP (Enterprise Resource Planning)",
  "E-Commerce Solutions",
  "HRMS (Human Resource Management System)",
  "Custom Software Development",
];

const budgetRanges = [
  "Less than $1,000",
  "$1,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000+",
];

export default function PartnerWithUs() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log("Form Data Submitted:", formData);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6 p-10 rounded-[3rem] bg-white border border-gray-100 shadow-2xl shadow-[#453abc]/10"
        >
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-poppins font-semibold text-[#191a23]">
            Request Received!
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Thank you for reaching out. Our team will review your project
            details and get back to you within 24 hours.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full py-4 bg-[#453abc] text-white rounded-2xl font-semibold hover:bg-[#362a9a] transition-all shadow-lg shadow-[#453abc]/20"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] pt-32 pb-20">
      {/* Short Hero Section */}
      <section className="relative px-6 md:px-8 mb-16 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-poppins font-medium text-[#191a23] mb-6 leading-tight">
              Let's Build Something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#453abc] to-[#60c3e3]">
                Powerful Together
              </span>
            </h1>
            <p className="text-[#6b7280] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Tell us about your idea and our team will reach out within 24
              hours.
            </p>
          </motion.div>
        </div>

        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#453abc]/5 rounded-full blur-[100px]" />
          <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#60c3e3]/5 rounded-full blur-[100px]" />
        </div>
      </section>

      {/* Form Section */}
      <section className="px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-[3rem] p-8 md:p-16 border border-gray-100 shadow-[0_30px_100px_-20px_rgba(69,58,188,0.08)]"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="space-y-2 group">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-[#453abc] transition-colors">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/20 focus:border-[#453abc] transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2 group">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-[#453abc] transition-colors">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/20 focus:border-[#453abc] transition-all"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div className="space-y-2 group">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-[#453abc] transition-colors">
                    Company Name{" "}
                    <span className="text-gray-400 lowercase italic font-normal">
                      (optional)
                    </span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="TechTide Co."
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/20 focus:border-[#453abc] transition-all"
                    />
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div className="space-y-2 group">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-[#453abc] transition-colors">
                    Phone / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 (300) 123-4567"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/20 focus:border-[#453abc] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-[#453abc] transition-colors">
                  Service Interested In
                </label>
                <div className="relative">
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/20 focus:border-[#453abc] transition-all appearance-none text-gray-600"
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
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-[#453abc] transition-colors">
                  Project Description
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-5 w-5 h-5 text-gray-400" />
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about the project, goals, and any specific requirements..."
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/20 focus:border-[#453abc] transition-all resize-none"
                  />
                </div>
              </div>

              {/* Budget Range */}
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-[#453abc] transition-colors">
                  Budget Range{" "}
                  <span className="text-gray-400 lowercase italic font-normal">
                    (optional)
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {budgetRanges.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, budget: range })
                      }
                      className={`px-3 py-3 text-[10px] md:text-xs font-semibold rounded-xl border transition-all ${
                        formData.budget === range
                          ? "bg-[#453abc] border-[#453abc] text-white shadow-md shadow-[#453abc]/20"
                          : "bg-white border-gray-100 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#453abc] text-white py-5 rounded-[1.5rem] font-poppins font-semibold text-lg hover:bg-[#362a9a] transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-[#453abc]/25 flex items-center justify-center gap-3 group"
                >
                  <span>Request a Callback</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#453abc] to-[#60c3e3] opacity-30" />
    </div>
  );
}
