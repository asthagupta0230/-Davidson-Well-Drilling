import { useEffect } from "react";
import Hero from "../components/home/Hero/Hero.jsx";
import Introduction from "../components/home/Introduction/Introduction.jsx";
import ServicesShowcase from "../components/home/ServicesShowcase/ServicesShowcase.jsx";
import Process from "../components/home/Process/Process.jsx";
import WhyDavidson from "../components/home/WhyDavidson/WhyDavidson.jsx";
import FeaturedHighlights from "../components/home/FeaturedHighlights/FeaturedHighlights.jsx";
import WorkPreview from "../components/home/WorkPreview/WorkPreview.jsx";
import Testimonials from "../components/home/Testimonials/Testimonials.jsx";
import FinalCTA from "../components/home/FinalCTA/FinalCTA.jsx";
import Footer from "../components/common/Footer.jsx";

export default function Home() {
  useEffect(() => {
    document.title =
      "Davidson Well Drilling, Inc. | Water Well & Geothermal Solutions Since 1973";
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#102A40]">
      <Hero />
      <Introduction />
      <ServicesShowcase />
      <Process />
      <WhyDavidson />
      <FeaturedHighlights />
      <WorkPreview />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
