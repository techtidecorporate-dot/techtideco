import { useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import imgUntitledDesign from "@/assets/review2.png";

export function SupportSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
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
        <div className="text-center mb-12 md:mb-16">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12 border border-gray-100">
            <h3 className="text-[#191a23] text-2xl font-poppins font-medium mb-8">
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
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700 ml-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc] focus:border-transparent transition-all"
                    placeholder="Enter last name"
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
                  rows={4}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc] focus:border-transparent transition-all resize-none"
                  placeholder="Tell us more about your project goals..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3"
                style={{
                  backgroundImage:
                    "linear-gradient(93.1835deg, rgb(69, 58, 188) 0%, rgb(96, 195, 227) 103.41%)",
                }}
              >
                <span className="text-white font-poppins font-medium">
                  Send Message
                </span>
                <Send className="w-5 h-5 text-white" />
              </button>
            </form>
          </div>

          {/* Contact Information & Image */}
          <div className="lg:block hidden">
            <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#453abc]/5 to-[#60c3e3]/5 p-8">
              <img
                alt="Support team member"
                className="w-full h-[450px] object-contain rounded-2xl"
                src={imgUntitledDesign}
              />
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <Mail className="w-5 h-5 text-[#453abc]" />
                  </div>
                  <span className="font-medium">support@techtide.pk</span>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <Phone className="w-5 h-5 text-[#453abc]" />
                  </div>
                  <span className="font-medium">+92 (300) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
