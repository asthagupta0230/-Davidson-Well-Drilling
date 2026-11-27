import { useEffect } from "react";
import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";
import ServicesHero from "../components/services/ServicesHero.jsx";
import ServiceSection from "../components/services/ServiceSection.jsx";
import ServiceCTA from "../components/services/ServiceCTA.jsx";
import { detailedServices } from "../data/services.js";

export default function Services() {
  useEffect(() => {
    document.title =
      "Services | Davidson Well Drilling, Inc. — Water Wells, Pumps & Geothermal";
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#102A40]">
      <Navbar variant="solid" />
      <main>
        <ServicesHero />
        {detailedServices.map((service) => (
          <ServiceSection key={service.id} service={service} />
        ))}
        <ServiceCTA />
      </main>
      <Footer />
    </div>
  );
}
