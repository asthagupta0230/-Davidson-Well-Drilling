import { companyInfo } from "../../data/navigation.js";

export default function CompanyStory() {
  return (
    <section className="border-t border-[#102A40]/10 bg-[#F2F8FC] py-24">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="text-[10px] font-bold tracking-[0.18em] text-[#008FCB] uppercase">
              COMPANY IDENTITY
            </span>
            <h2 className="mt-3 font-heading text-[clamp(30px,3.5vw,46px)] font-extrabold leading-[1.1] text-[#102A40]">
              Over Five Decades of Focused Subsurface Work.
            </h2>
          </div>

          <div className="space-y-5 text-[15px] leading-[1.85] text-[#142B3D]/85 sm:text-base lg:col-span-7">
            <p>
              Founded in 1973, Davidson Well Drilling, Inc. has built its
              reputation on dependable water solutions and specialized field
              execution. Property owners across Northeast Georgia and Upstate
              South Carolina rely on our team for self-contained water systems
              and clean geothermal ground heat exchange.
            </p>
            <p>
              Our work spans the full lifecycle of subsurface water and thermal
              wells—from initial fresh water well drilling and vertical ground
              loop drilling to hydrofracturing, downhole installation, and
              ongoing pump service.
            </p>

            {/* Verified Core Focus List */}
            <div className="mt-8 border-t border-[#102A40]/12 pt-6">
              <span className="block text-[10px] font-bold tracking-[0.18em] text-[#008FCB] uppercase">
                VERIFIED BUSINESS FOCUS
              </span>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {companyInfo.coreServicesList.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-[#03AFF7]/35 bg-white px-4 py-1.5 text-xs font-bold text-[#102A40]"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
