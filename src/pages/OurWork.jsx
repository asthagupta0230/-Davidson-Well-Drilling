import { useEffect } from "react";
import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";
import WorkHero from "../components/work/WorkHero.jsx";
import ProjectGallery from "../components/work/ProjectGallery.jsx";

export default function OurWork() {
  useEffect(() => {
    document.title =
      "Our Work | Davidson Well Drilling, Inc. — Field Operations & Capabilities";
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#102A40]">
      <Navbar variant="solid" />
      <main>
        <WorkHero />
        <ProjectGallery />
      </main>
      <Footer />
    </div>
  );
}
