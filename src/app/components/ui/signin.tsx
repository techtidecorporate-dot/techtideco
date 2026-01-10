import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

// Sign In Page Component
export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in:", formData);
    alert("Sign in functionality would be implemented here!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef2f7] font-inter flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#453abc]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#60c3e3]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative w-full max-w-xl">
        {/* Logo Area */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-poppins font-medium text-[#191a23] mb-3 md:mb-4">
            Tech
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#453abc] to-[#60c3e3]">
              Tide
            </span>{" "}
            Co.
          </h1>
          <p className="text-[#6b7280] text-base md:text-lg font-inter">
            Access your premium technology platform
          </p>
        </div>

        {/* Sign In Card */}
        <div className="glass rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/40">
          <div className="mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-poppins font-medium text-[#191a23] mb-2">
              Welcome Back
            </h2>
            <p className="text-[#6b7280] text-xs md:text-sm">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-poppins font-semibold text-[#6b7280] uppercase tracking-widest ml-1">
                Work Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-6 md:px-8 py-4 md:py-5 bg-white/50 border border-gray-200 rounded-2xl text-[#191a23] focus:outline-none focus:ring-2 focus:ring-[#453abc]/20 focus:bg-white transition-all font-inter placeholder:text-gray-400 text-sm md:text-base"
                placeholder="name@company.com"
              />
            </div>

            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center justify-between px-1">
                <label className="block text-[10px] font-poppins font-semibold text-[#6b7280] uppercase tracking-widest">
                  Password
                </label>
                <a
                  href="#"
                  className="text-[10px] md:text-xs font-poppins font-medium text-[#453abc] hover:text-[#191a23] transition-colors"
                >
                  Reset Password?
                </a>
              </div>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-6 md:px-8 py-4 md:py-5 bg-white/50 border border-gray-200 rounded-2xl text-[#191a23] focus:outline-none focus:ring-2 focus:ring-[#453abc]/20 focus:bg-white transition-all font-inter pr-16 placeholder:text-gray-400 text-sm md:text-base"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#191a23] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4.5 h-4.5 md:w-5 md:h-5" />
                  ) : (
                    <Eye className="w-4.5 h-4.5 md:w-5 md:h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 px-1">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="peer h-5 w-5 md:h-6 md:w-6 cursor-pointer appearance-none rounded-lg border-2 border-gray-200 bg-white checked:bg-[#453abc] checked:border-[#453abc] transition-all"
                />
                <svg
                  className="pointer-events-none absolute left-1 top-1 md:left-1.5 md:top-1.5 h-3 w-3 md:w-3 md:h-3 fill-white opacity-0 peer-checked:opacity-100 transition-opacity"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <label
                htmlFor="rememberMe"
                className="text-xs md:text-sm font-inter text-[#6b7280] cursor-pointer select-none"
              >
                Keep me signed in for 30 days
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#453abc] to-[#60c3e3] text-white px-8 py-4.5 md:py-5 rounded-xl font-poppins font-medium shadow-[0_10px_30px_rgba(69,58,188,0.2)] hover:shadow-[0_20px_50px_rgba(69,58,188,0.4)] transition-all hover:-translate-y-1 active:scale-[0.98] text-sm md:text-base"
            >
              Authorize Access
            </button>
          </form>

          <div className="mt-12 text-center pt-10 border-t border-gray-100">
            <p className="text-[#6b7280] text-sm font-inter">
              Don't have an enterprise account?{" "}
              <a
                href="#"
                className="text-[#453abc] hover:text-[#191a23] transition-colors font-semibold"
              >
                Contact Administration
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
