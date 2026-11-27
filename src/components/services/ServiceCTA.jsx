import Button from "../common/Button.jsx";
import SectionHeading from "../common/SectionHeading.jsx";
import { companyInfo } from "../../data/navigation.js";

export default function ServiceCTA() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-8 rounded-[16px] bg-[#F2F8FC] p-9 sm:p-14 lg:flex-row lg:items-center">
          <SectionHeading
            eyebrow="NEXT STEP"
            title="Looking for the"
            highlight="Right Solution?"
            description={`Speak with Davidson Well Drilling, Inc. at ${companyInfo.phoneDisplay} or request an estimate online for your property in Northeast Georgia or Upstate South Carolina.`}
          />

          <div className="shrink-0">
            <Button to="/request-estimate">Request an Estimate</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
