import { useState, useEffect } from "react";
import svgPaths from "../../../imports/svg-1oa7ppovsq";
import imgVector from "@/assets/brand-logo-dark.svg";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/services", label: "Services", isRoute: true },
  { href: "/blog", label: "Blog", isRoute: true },
  { href: "/ourteam", label: "Our team", isRoute: true },
  { href: "/career", label: "Career", isRoute: true },
  { href: "/contact", label: "Contact Us", isRoute: true },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Force white background on all pages except landing
  const shouldBeTransparent = isLandingPage && !isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-300 ease-in-out ${
        shouldBeTransparent
          ? "bg-transparent py-4"
          : "bg-white/90 backdrop-blur-md shadow-md py-3"
      }`}
    >
      <div className="flex-shrink-0">
        <Link to="/" className="flex items-center">
          <img
            alt="TechTide Icon"
            className="h-8 md:h-10 w-auto"
            src={imgVector}
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-10">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={index}
              to={item.href}
              className={`relative font-inter py-1 transition-all duration-300 group ${
                isActive
                  ? shouldBeTransparent
                    ? "text-white font-medium"
                    : "text-[#453abc] font-medium"
                  : shouldBeTransparent
                  ? "text-white/80 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#453abc] to-[#60c3e3] transition-all duration-300 ${
                  isActive
                    ? "w-full opacity-100"
                    : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                }`}
              />
            </Link>
          );
        })}
      </div>

      <div className="hidden lg:block">
        <Link
          to="/signin"
          className="relative px-7 py-2.5 rounded-lg font-medium text-white 
               transition-all duration-300 
               hover:-translate-y-0.5 active:translate-y-0 
               shadow-[0_10px_30px_-10px_rgba(69,58,188,0.6)]
               hover:shadow-[0_18px_45px_-16px_rgba(96,195,227,0.8)]
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#60c3e3]"
          style={{
            background:
              "linear-gradient(95deg, rgb(69, 58, 188) 0%, rgb(96, 195, 227) 100%)",
          }}
        >
          <span className="absolute inset-0 rounded-lg bg-white/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
          <span className="relative z-10">Sign in</span>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className={`lg:hidden p-2 rounded-lg transition-colors ${
          shouldBeTransparent
            ? "text-white hover:bg-white/10"
            : "text-gray-900 hover:bg-gray-100"
        }`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-[60px] md:top-[70px] bg-white z-40 lg:hidden transition-all duration-300 transform ${
          isMobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex flex-col p-8 gap-6 h-full overflow-y-auto">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={index}
                to={item.href}
                className={`text-2xl font-poppins font-medium p-2 transition-colors ${
                  isActive ? "text-[#453abc]" : "text-gray-800"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <hr className="border-gray-100 my-4" />
          <Link
            to="/signin"
            className="w-full py-4 rounded-xl text-center text-white font-poppins font-medium shadow-lg"
            style={{
              background:
                "linear-gradient(95deg, rgb(69, 58, 188) 0%, rgb(96, 195, 227) 100%)",
            }}
          >
            Sign in
          </Link>

          <div className="mt-auto pt-8">
            <p className="text-gray-400 text-sm mb-4">
              Connecting you to the future of technology.
            </p>
            <div className="flex gap-4">{/* Social icons could go here */}</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
