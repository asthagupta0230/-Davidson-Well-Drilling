import { MapPin, Phone } from "lucide-react";
import { companyInfo } from "../../data/navigation.js";

export default function ServiceArea() {
  return (
    <section className="bg-[#102A40] py-24 text-white">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="text-[10px] font-bold tracking-[0.18em] text-[#03AFF7] uppercase">
              SERVICE REGION
            </span>
            <h2 className="mt-3 font-heading text-[clamp(30px,3.5vw,46px)] font-extrabold leading-[1.1] text-white">
              Proudly Serving Northeast Georgia &amp; Upstate South Carolina.
            </h2>
            <p className="mt-5 text-[15px] leading-[1.8] text-white/85">
              Subsurface geology changes from county to county. Working across
              Northeast Georgia and Upstate South Carolina since 1973 gives our
              crew practical familiarity with regional rock formations and
              aquifer conditions.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {companyInfo.serviceRegions.map((region) => (
                <div
                  key={region}
                  className="border-l-2 border-[#03AFF7] pl-4"
                >
                  <MapPin size={18} className="text-[#03AFF7]" />
                  <h3 className="mt-2 font-heading text-lg font-bold text-white">
                    {region}
                  </h3>
                  <p className="mt-1 text-xs text-white/75">
                    Well drilling, pump service &amp; geothermal loops
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href={companyInfo.phoneHref}
                className="inline-flex items-center gap-2 text-sm font-extrabold text-[#8CE0FF] hover:text-white"
              >
                <Phone size={16} />
                Call {companyInfo.phoneDisplay} to confirm service for your site
              </a>
            </div>
          </div>

          {/* Clean Regional Coordinate Graphic */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[14px] border border-white/15 bg-[#142B3D] p-8 sm:p-10">
              <svg
                viewBox="0 0 480 320"
                fill="none"
                className="w-full"
                aria-label="Northeast Georgia and Upstate South Carolina regional service graphic"
              >
                <circle
                  cx="240"
                  cy="160"
                  r="130"
                  stroke="#03AFF7"
                  strokeOpacity="0.3"
                  strokeDasharray="5 5"
                />
                <circle
                  cx="240"
                  cy="160"
                  r="85"
                  stroke="#03AFF7"
                  strokeOpacity="0.5"
                />
                {/* Connecting Regional Line */}
                <line
                  x1="155"
                  y1="185"
                  x2="325"
                  y2="135"
                  stroke="#03AFF7"
                  strokeWidth="2.5"
                />
                <circle cx="155" cy="185" r="8" fill="#03AFF7" />
                <circle cx="325" cy="135" r="8" fill="#FFFFFF" />

                <text x="95" y="215" fill="#FFFFFF" fontSize="13" fontWeight="800">
                  NORTHEAST GEORGIA
                </text>
                <text x="255" y="115" fill="#8CE0FF" fontSize="13" fontWeight="800">
                  UPSTATE SOUTH CAROLINA
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
