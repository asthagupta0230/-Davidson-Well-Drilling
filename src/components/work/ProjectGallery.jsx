import { useRef, useState } from "react";
import { X } from "lucide-react";
import { workGalleryItems } from "../../data/services.js";
import ProjectImage from "./ProjectImage.jsx";
import Button from "../common/Button.jsx";
import { useGsapContext } from "../../animations/pageAnimations.js";

const categories = [
  "All",
  "Water Well Drilling",
  "Hydrofracturing",
  "Geothermal Installation",
  "Pump Services",
];

export default function ProjectGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState(null);
  const galleryRef = useRef(null);

  const filteredItems =
    selectedCategory === "All"
      ? workGalleryItems
      : workGalleryItems.filter((item) => item.category === selectedCategory);

  useGsapContext(
    galleryRef,
    ({ gsap, prefersReducedMotion, scope }) => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        scope.querySelectorAll(".work-gallery-card"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    },
    [selectedCategory]
  );

  return (
    <section ref={galleryRef} className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter work by service category"
          className="flex flex-wrap items-center gap-2.5 border-b border-[#102A40]/10 pb-8"
        >
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-5 py-2.5 text-xs font-extrabold transition-colors ${
                  active
                    ? "bg-[#03AFF7] text-white"
                    : "bg-[#F2F8FC] text-[#102A40] hover:bg-[#008FCB] hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Asymmetrical Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {filteredItems.map((item) => (
            <ProjectImage
              key={item.id}
              item={item}
              onExpand={setLightboxItem}
            />
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-[14px] bg-[#F2F8FC] p-9 sm:p-12 lg:flex-row lg:items-center">
          <div>
            <span className="text-[10px] font-bold tracking-[0.18em] text-[#008FCB] uppercase">
              PLANNING YOUR SITE
            </span>
            <h2 className="mt-2 font-heading text-3xl font-extrabold text-[#102A40]">
              Have a Project in Mind?
            </h2>
          </div>
          <Button to="/request-estimate">Request an Estimate</Button>
        </div>
      </div>

      {/* Lightbox Modal for Click-to-Expand */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#102A40]/90 p-4 backdrop-blur-sm sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[920px] overflow-hidden rounded-[14px] bg-white text-[#102A40] shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setLightboxItem(null)}
              aria-label="Close image preview"
              className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-[#102A40] text-white hover:bg-[#03AFF7]"
            >
              <X size={18} />
            </button>

            <img
              src={lightboxItem.image}
              alt={lightboxItem.alt}
              className="max-h-[65vh] w-full object-cover object-center"
            />

            <div className="p-6 sm:p-8">
              <span className="text-[10px] font-bold tracking-[0.16em] text-[#008FCB] uppercase">
                {lightboxItem.category} · {lightboxItem.region}
              </span>
              <h3 className="mt-2 font-heading text-2xl font-extrabold">
                {lightboxItem.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#142B3D]/80">
                {lightboxItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
