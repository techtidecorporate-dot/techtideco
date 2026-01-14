import { useState } from "react";
import { Send, Users } from "lucide-react";
import { contactAPI } from "@/api";
import { toast } from "sonner";

export function SupportSection() {
  const [formData, setFormData] = useState({
    firstName: "",
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
        name: formData.firstName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({
        firstName: "",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="support"
      className="relative bg-gradient-to-b from-white to-gray-50 py-24 overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-[#453abc]/10 to-[#60c3e3]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-[#60c3e3]/10 to-[#453abc]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-[#191a23] text-3xl md:text-5xl font-poppins font-medium mb-4">
            Our Premium{" "}
            <span
              className="bg-clip-text"
              style={{
                WebkitTextFillColor: "transparent",
                backgroundImage:
                  "linear-gradient(95.6204deg, rgb(69, 58, 188) 0%, rgb(96, 195, 227) 103.41%)",
              }}
            >
              Support
            </span>
          </h2>
          <p className="text-[#6b7280] text-base md:text-lg max-w-2xl mx-auto">
            Leave a message here and we will get back to you as soon as
            possible.
          </p>
        </div>

        <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <div className="bg-gray-100 rounded-[2rem] shadow-xl md:p-8 border border-gray-100">
            <h3 className="text-[#191a23] text-2xl font-poppins font-medium mb-6">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700 ml-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc] focus:border-transparent transition-all"
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 ml-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc] focus:border-transparent transition-all"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700 ml-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc] focus:border-transparent transition-all"
                    placeholder="+92 000 0000000"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-gray-700 ml-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc] focus:border-transparent transition-all"
                    placeholder="How can we help?"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700 ml-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc] focus:border-transparent transition-all resize-none"
                  placeholder="Tell us more about your project goals..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundImage:
                    "linear-gradient(93.1835deg, rgb(69, 58, 188) 0%, rgb(96, 195, 227) 103.41%)",
                }}
              >
                <span className="text-white font-poppins font-medium">
                  {loading ? "Sending..." : "Send Message"}
                </span>
                {!loading && <Send className="w-5 h-5 text-white" />}
              </button>
            </form>
          </div>

          {/* Information Column */}
          <div className="space-y-6 md:space-y-4 p-0 md:p-4">
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl p-6 md:p-6">
              <h3 className="text-xl md:text-2xl font-poppins font-semibold text-[#191a23] mb-6">
                Why Choose TechTide?
              </h3>
              <div className="space-y-6">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#453abc]/5 flex items-center justify-center text-[#453abc] flex-shrink-0 shadow-sm">
                    <Send className="w-6 h-6 rotate-[-45deg]" />
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
                    <span className="text-sm font-medium">
                      Monday - Saturday
                    </span>
                    <span className="font-semibold text-white">
                      11:00 AM - 7:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-sm font-medium">Friday</span>
                    <span className="font-semibold text-white">
                      3:00 PM - 7:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Sunday</span>
                    <span className="font-semibold text-[#60c3e3]">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
