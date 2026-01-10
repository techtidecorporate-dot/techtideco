import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/landing/Footer";
import { Navbar } from "./components/ui/Navbar";
import LandingPage from "./pages/landing";
import TeamPage from "./pages/ourteam";
import ServicesPage from "./pages/services";
import BlogPage from "./pages/blog";
import CareerPage from "./pages/career";
import ContactPage from "./pages/contact";
import SignInPage from "./components/ui/signin";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ourteam" element={<TeamPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
