import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";
import FAQHero from "../components/faqs/FAQHero.jsx";
import FAQCategories from "../components/faqs/FAQCategories.jsx";
import FAQAccordion from "../components/faqs/FAQAccordion.jsx";
import Button from "../components/common/Button.jsx";
import { faqCategories } from "../data/faqs.js";
import { companyInfo } from "../data/navigation.js";

export default function FAQs() {
  const [activeCategoryId, setActiveCategoryId] = useState(faqCategories[0].id);

  useEffect(() => {
    document.title =
      "FAQs | Davidson Well Drilling, Inc. — Water Well & Geothermal Questions";
  }, []);

  const currentCategory =
    faqCategories.find((c) => c.id === activeCategoryId) || faqCategories[0];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#102A40]">
      <Navbar variant="solid" />
      <main>
        <FAQHero />

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <FAQCategories
                  categories={faqCategories}
                  activeId={activeCategoryId}
                  onSelect={setActiveCategoryId}
                />
              </div>

              <div className="lg:col-span-8">
                <div className="mb-6">
                  <span className="text-[10px] font-bold tracking-[0.18em] text-[#03AFF7] uppercase">
                    CATEGORY
                  </span>
                  <h2 className="mt-1 font-heading text-2xl font-extrabold text-[#102A40] sm:text-3xl">
                    {currentCategory.label}
                  </h2>
                </div>

                <FAQAccordion
                  key={currentCategory.id}
                  items={currentCategory.items}
                />
              </div>
            </div>

            {/* FAQ Closing Section */}
            <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-[14px] bg-[#F2F8FC] p-9 sm:p-12 lg:flex-row lg:items-center">
              <div>
                <h2 className="font-heading text-3xl font-extrabold text-[#102A40]">
                  Still Have Questions?
                </h2>
                <p className="mt-2 text-sm text-[#142B3D]/80 sm:text-base">
                  Get in touch with Davidson Well Drilling at{" "}
                  <a
                    href={companyInfo.phoneHref}
                    className="font-bold text-[#008FCB] hover:underline"
                  >
                    {companyInfo.phoneDisplay}
                  </a>{" "}
                  or request an estimate online.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button to="/request-estimate">Request an Estimate</Button>
                <a
                  href={companyInfo.phoneHref}
                  className="inline-flex items-center gap-2 rounded-[6px] border border-[#102A40]/15 bg-white px-5 py-3.5 text-xs font-extrabold text-[#102A40] hover:border-[#03AFF7]"
                >
                  <Phone size={15} className="text-[#03AFF7]" />
                  {companyInfo.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
