import { useEffect } from "react";
import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";
import EstimateHero from "../components/estimate/EstimateHero.jsx";
import ContactInformation from "../components/estimate/ContactInformation.jsx";
import EstimateForm from "../components/estimate/EstimateForm.jsx";

export default function RequestEstimate() {
  useEffect(() => {
    document.title =
      "Request an Estimate | Davidson Well Drilling, Inc. — (706) 754-6033";
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#102A40]">
      <Navbar variant="solid" />
      <main>
        <EstimateHero />

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
            <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <ContactInformation />
              </div>

              <div className="lg:col-span-7">
                <EstimateForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
