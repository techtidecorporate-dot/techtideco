import imgVector from "@/assets/brand-logo-dark.svg";
import { Link } from "react-router-dom";
import {
  FaLinkedinIn,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import { toast } from "sonner";

const footerLinks = {
  quicklinks: [
    { label: "Services", href: "/services" },
    { label: "Our Team", href: "/ourteam" },
    { label: "Careers", href: "/career" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    "Web Development",
    "Mobile Apps",
    "Digital Marketing",
    "Cloud Solutions",
  ],
  legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export function Footer() {
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("techtidecorporate@gmail.com");
    toast.success("Email copied to clipboard!");
  };

  return (
    <footer className="bg-gray-900 text-white pt-8 md:pt-6 pb-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <Link to="/">
                <img
                  src={imgVector}
                  className="h-8 md:h-10 w-auto"
                  alt="TechTide Corporate LLP Logo – TechTide Co. Software & Digital Solutions Company"
                  title="TechTide Corporate LLP | TechTide Co."
                  loading="eager"
                  decoding="async"
                />
              </Link>
            </div>
            <p className="text-gray-400 text-sm mt-6 max-w-md mx-auto md:mx-0 leading-relaxed">
              Building technology and investing in tomorrow's Pakistan. We
              create innovative digital solutions that empower businesses and
              communities.
            </p>

            {/* Social Links */}
            <div className="flex justify-center md:justify-start gap-4 mt-8">
              <a
                href="#"
                onClick={handleCopyEmail}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#EA4335] flex items-center justify-center transition-all hover:-translate-y-1"
              >
                <FaEnvelope className="text-white w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/techtideco/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#453abc] flex items-center justify-center transition-all hover:-translate-y-1"
              >
                <FaLinkedinIn className="text-white w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/techtidecorporatellp/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#c13584] flex items-center justify-center transition-all hover:-translate-y-1"
              >
                <FaInstagram className="text-white w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:col-span-3 gap-8 text-left">
            <div>
              <h4 className="text-white font-poppins font-medium mb-6">
                Quick Links
              </h4>
              <ul className="space-y-4">
                {footerLinks.quicklinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="flex flex-col">
              <h4 className="text-white font-poppins font-medium mb-6">
                Services
              </h4>
              <ul className="space-y-4 mb-6">
                <li>
                  <a
                    href="/services/crm"
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    CRM (Customer Management)
                  </a>
                </li>
                <li>
                  <a
                    href="/services/erp"
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    ERP (Business Portal)
                  </a>
                </li>
                <li>
                  <a
                    href="/services/ecommerce"
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    E-Commerce Solutions
                  </a>
                </li>
                <li>
                  <a
                    href="/services/hrms"
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    HRMS (HR Management)
                  </a>
                </li>
              </ul>
              <a
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-all w-fit"
              >
                <span>Explore More</span>
                <FaArrowRight size={14} className="text-[#453abc]" />
              </a>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-white font-poppins font-medium mb-6">
                Contact
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FaEnvelope className="text-[#453abc] " />
                  <a
                    href="#"
                    onClick={handleCopyEmail}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    techtidecorporate@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <FaPhone className="text-[#453abc] mt-1" />
                  <a
                    href="tel:+923247991484"
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    +92 324 7991484
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-[#453abc] mt-1 flex-shrink-0" />
                  <span className="text-gray-400 text-sm leading-relaxed">
                    G3 heaven mall zaraar
                    <br />
                    shaheed road lahore
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/5 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-poppins font-medium mb-2">
                Subscribe to our Newsletter
              </h3>
              <p className="text-gray-400 text-sm">
                Stay updated with our latest news and offers
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#453abc] transition-all"
              />
              <button
                className="px-8 py-3 rounded-xl font-medium text-white transition-all hover:shadow-[0_10px_30px_-5px_rgba(69,58,188,0.4)] hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  backgroundImage:
                    "linear-gradient(93.1835deg, rgb(69, 58, 188) 0%, rgb(96, 195, 227) 103.41%)",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm text-center">
            © 2024 TechTideCo. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {footerLinks.legal.map((link, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-500 text-xs hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
