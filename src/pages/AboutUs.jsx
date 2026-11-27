import { useEffect } from "react";
import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";
import AboutHero from "../components/about/AboutHero.jsx";
import CompanyStory from "../components/about/CompanyStory.jsx";
import CompanyTimeline from "../components/about/CompanyTimeline.jsx";
import ServiceArea from "../components/about/ServiceArea.jsx";
import CompanyValues from "../components/about/CompanyValues.jsx";

export default function AboutUs() {
  useEffect(() => {
    document.title =
      "About Us | Davidson Well Drilling, Inc. — Serving Our Region Since 1973";
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#102A40]">
      <Navbar variant="solid" />
      <main>
        <AboutHero />
        <CompanyStory />
        <CompanyTimeline />
        <ServiceArea />
        <CompanyValues />
      </main>
      <Footer />
    </div>
  );
}
