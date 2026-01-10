import imgVector from "@/assets/brand-logo-dark.svg";
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

const footerLinks = {
  company: ["About Us", "Our Team", "Careers", "Contact"],
  services: [
    "Web Development",
    "Mobile Apps",
    "Digital Marketing",
    "Cloud Solutions",
  ],
  resources: ["Blog", "Case Studies", "Documentation", "Support"],
  legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 md:pt-20 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <img
                src={imgVector}
                alt="TechTide Logo"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm mt-6 max-w-md mx-auto md:mx-0 leading-relaxed">
              Building technology and investing in tomorrow's Pakistan. We
              create innovative digital solutions that empower businesses and
              communities.
            </p>

            {/* Social Links */}
            <div className="flex justify-center md:justify-start gap-4 mt-8">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#453abc] flex items-center justify-center transition-all hover:-translate-y-1"
              >
                <FaLinkedinIn className="text-white w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#c13584] flex items-center justify-center transition-all hover:-translate-y-1"
              >
                <FaInstagram className="text-white w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#1877f2] flex items-center justify-center transition-all hover:-translate-y-1"
              >
                <FaFacebookF className="text-white w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#1da1f2] flex items-center justify-center transition-all hover:-translate-y-1"
              >
                <FaTwitter className="text-white w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:col-span-3 gap-8 text-left">
            <div>
              <h4 className="text-white font-poppins font-medium mb-6">
                Company
              </h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-poppins font-medium mb-6">
                Services
              </h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#services"
                      className="text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-poppins font-medium mb-6">
                Resources
              </h4>
              <ul className="space-y-4">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/5 pt-12 pb-12">
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
            © {new Date().getFullYear()} TechTide Co. All rights reserved.
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
