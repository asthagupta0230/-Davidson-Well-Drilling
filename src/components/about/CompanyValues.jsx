import Button from "../common/Button.jsx";
import SectionHeading from "../common/SectionHeading.jsx";

const principles = [
  {
    number: "01",
    title: "Dependable Water Solutions",
    text: "Every borehole, pump assembly, and geothermal loop is installed with long-term reliability in mind.",
  },
  {
    number: "02",
    title: "Technical Expertise",
    text: "Specialized field capabilities spanning fresh water well drilling, hydrofracturing, vertical loop drilling, and downhole installation.",
  },
  {
    number: "03",
    title: "Direct Accountability",
    text: "Clear communication and honest guidance from your initial call through completed installation.",
  },
];

export default function CompanyValues() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="OUR VALUES"
              title="Built on Craft."
              highlight="Guided by Trust."
              description="Our commitment to property owners is rooted in careful site work, proven equipment, and experience since 1973."
            />
          </div>

          <div className="divide-y divide-[#102A40]/12 border-y border-[#102A40]/12 lg:col-span-7">
            {principles.map((p) => (
              <div key={p.number} className="flex items-start gap-5 py-7">
                <span className="font-heading text-2xl font-extrabold text-[#03AFF7]">
                  {p.number}
                </span>
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#102A40]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.75] text-[#142B3D]/80 sm:text-[15px]">
                    {p.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Page Closing CTA */}
        <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-[14px] bg-[#F2F8FC] p-9 sm:p-12 lg:flex-row lg:items-center">
          <div>
            <span className="text-[10px] font-bold tracking-[0.18em] text-[#008FCB] uppercase">
              START A CONVERSATION
            </span>
            <h3 className="mt-2 font-heading text-3xl font-extrabold text-[#102A40]">
              Let&apos;s Talk About Your Project.
            </h3>
          </div>
          <Button to="/request-estimate">Request an Estimate</Button>
        </div>
      </div>
    </section>
  );
}
