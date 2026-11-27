import { MapPin, Phone } from "lucide-react";
import { companyInfo } from "../../data/navigation.js";

export default function ContactInformation() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] font-bold tracking-[0.18em] text-[#008FCB] uppercase">
          DIRECT CONTACT
        </span>
        <h2 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-[#102A40]">
          Speak Directly With Davidson Well Drilling.
        </h2>
        <p className="mt-4 text-[15px] leading-[1.8] text-[#142B3D]/80">
          Share your property location and service requirements using the form,
          or call our office directly to discuss your well drilling, pump,
          hydrofracturing, or geothermal project.
        </p>
      </div>

      <div className="space-y-5 border-y border-[#102A40]/12 py-7">
        <div className="flex items-start gap-3.5">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#F2F8FC] text-[#008FCB]">
            <Phone size={18} />
          </span>
          <div>
            <span className="block text-[10px] font-bold tracking-[0.16em] text-[#102A40]/60 uppercase">
              TELEPHONE
            </span>
            <a
              href={companyInfo.phoneHref}
              className="mt-1 inline-block font-heading text-xl font-extrabold text-[#102A40] transition-colors hover:text-[#03AFF7]"
            >
              {companyInfo.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#F2F8FC] text-[#008FCB]">
            <MapPin size={18} />
          </span>
          <div>
            <span className="block text-[10px] font-bold tracking-[0.16em] text-[#102A40]/60 uppercase">
              SERVICE REGION
            </span>
            <p className="mt-1 font-heading text-base font-bold text-[#102A40]">
              Northeast Georgia &amp; Upstate South Carolina
            </p>
          </div>
        </div>
      </div>

      {/* Small Technical Borehole Illustration */}
      <div className="rounded-[12px] bg-[#F2F8FC] p-6">
        <span className="block text-[10px] font-bold tracking-[0.16em] text-[#008FCB] uppercase">
          DAVIDSON WELL DRILLING, INC. · EST. 1973
        </span>
        <svg
          viewBox="0 0 360 90"
          fill="none"
          className="mt-4 w-full"
          aria-hidden="true"
        >
          <line x1="0" y1="24" x2="360" y2="24" stroke="#102A40" strokeWidth="1.5" />
          <path d="M180 10 V82" stroke="#03AFF7" strokeWidth="2.5" strokeDasharray="5 4" />
          <path d="M180 46 L130 38 M180 62 L230 52" stroke="#008FCB" strokeWidth="1.8" />
          <circle cx="180" cy="24" r="5" fill="#03AFF7" />
        </svg>
      </div>
    </div>
  );
}
