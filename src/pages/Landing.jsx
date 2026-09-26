import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import Features from "../components/landing/Features";
import TeamSection from "../components/landing/TeamSection";
import PrivacySection from "../components/landing/PrivacySection";
import Footer from "../components/landing/Footer";

function Landing() {
  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#171717]">
      <Navbar />

      <main>
        <Hero />

        <HowItWorks />

        <Features />

        <TeamSection />

        <PrivacySection />
      </main>

      <Footer />
    </div>
  );
}

export default Landing;