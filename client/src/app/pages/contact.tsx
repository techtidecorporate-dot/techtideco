import React, { useState } from "react";
import { Mail, MapPin, Phone, Send, Users, Zap } from "lucide-react";
import { contactAPI } from "@/api";

import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactAPI.create({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyEmail = (e: React.MouseEvent, content: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(content);
    toast.success("Email copied to clipboard!");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      content: "techtidecorporate@gmail.com",
      link: "mailto:techtidecorporate@gmail.com",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      content: "+92 324 7991484",
      link: "tel:+92 324 7991484",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      content: "G3 heaven mall, zaraar shaheed road, lahore",
      link: "https://www.google.com/maps/place/HEAVEN+MALL/@31.5488578,74.3987883,606m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3919055e3dbd05d5:0x6c7f09044264f7e!8m2!3d31.5488578!4d74.4013632!16s%2Fg%2F11hbfkzn6l?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoASAFQAw%3D%3D",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef2f7] mt-10">
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 md:py-44 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#453abc]/10 rounded-full blur-[80px] md:blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#60c3e3]/10 rounded-full blur-[80px] md:blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 text-center">
          <p className="font-poppins text-transparent bg-clip-text bg-gradient-to-r from-[#453abc] to-[#60c3e3] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Get In Touch
          </p>
          <h1 className="text-4xl md:text-7xl font-poppins font-medium text-[#191a23] mb-6 leading-tight md:leading-[1.1]">
            Let's Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#453abc] to-[#60c3e3]">
              Amazing
            </span>
          </h1>
          <p className="text-[#6b7280] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? We'd love to hear about it. Send us a
            message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 -mt-6 md:-mt-12 mb-12 md:mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.link}
              onClick={(e) => {
                if (info.title === "Email Us") {
                  handleCopyEmail(e, info.content);
                }
              }}
              className="bg-white rounded-2xl border border-gray-100 p-8 shadow-md hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#453abc] to-[#60c3e3] flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg">
                {info.icon}
              </div>
              <h3 className="text-[#191a23] font-poppins font-semibold mb-2 text-lg">
                {info.title}
              </h3>
              <p className="text-[#6b7280] text-sm leading-relaxed">
                {info.content}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-poppins font-semibold text-[#191a23] mb-3">
              Send us a Message
            </h2>
            <p className="text-[#6b7280] text-sm md:text-base mb-8 leading-relaxed">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-poppins font-medium text-[#191a23] ml-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc] focus:border-transparent transition-all font-inter text-sm"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-poppins font-medium text-[#191a23] ml-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc] focus:border-transparent transition-all font-inter text-sm"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-poppins font-medium text-[#191a23] ml-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc] focus:border-transparent transition-all font-inter text-sm"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-poppins font-medium text-[#191a23] ml-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc] focus:border-transparent transition-all font-inter text-sm"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-poppins font-medium text-[#191a23] ml-1">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc] focus:border-transparent transition-all font-inter text-sm"
                  placeholder="How can we help you?"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#191a23] ml-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-4 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc] focus:border-transparent transition-all resize-none font-inter text-sm"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#453abc] to-[#60c3e3] text-white px-8 py-4.5 rounded-xl font-poppins font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <Send className="w-5 h-5" />}
              </button>
            </form>
          </div>

          {/* Map/Info Section */}
          <div className="space-y-6 md:space-y-8">
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl p-8 md:p-10">
              <h3 className="text-xl md:text-2xl font-poppins font-semibold text-[#191a23] mb-6">
                Why Choose TechTide?
              </h3>
              <div className="space-y-6">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#453abc]/5 flex items-center justify-center text-[#453abc] flex-shrink-0 shadow-sm">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-[#191a23] mb-1">
                      Fast Response Time
                    </h4>
                    <p className="text-[#6b7280] text-sm leading-relaxed">
                      We respond to all inquiries within 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#453abc]/5 flex items-center justify-center text-[#453abc] flex-shrink-0 shadow-sm">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-[#191a23] mb-1">
                      Expert Team
                    </h4>
                    <p className="text-[#6b7280] text-sm leading-relaxed">
                      Work with experienced professionals
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#191a23] bg-gradient-to-br from-[#191a23] via-[#453abc]/10 to-[#191a23] rounded-[2rem] p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#453abc]/10 rounded-full blur-[80px]" />
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-poppins font-semibold mb-6">
                  Office Hours
                </h3>
                <div className="space-y-4 text-gray-300">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-sm">Monday - Saturday</span>
                    <span className="font-semibold text-white">
                      11:00 AM - 7:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-sm">Friday</span>
                    <span className="font-semibold text-white">
                      3:00 PM - 7:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Sunday</span>
                    <span className="font-semibold text-[#60c3e3]">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
