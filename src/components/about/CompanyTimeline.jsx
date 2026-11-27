export default function CompanyTimeline() {
  const milestones = [
    {
      year: "1973",
      label: "ESTABLISHED",
      title: "Davidson Well Drilling, Inc. Founded",
      detail:
        "Began serving property owners with fresh water well drilling and dependable groundwater solutions.",
    },
    {
      year: "50+ YRS",
      label: "REGIONAL CONTINUITY",
      title: "Northeast Georgia & Upstate South Carolina",
      detail:
        "Decades of continuous field experience working in the bedrock formations and water tables of our two-state region.",
    },
    {
      year: "TODAY",
      label: "FULL-SCOPE CAPABILITIES",
      title: "Water Wells, Pumps, Hydrofracturing & Geothermal Loops",
      detail:
        "Providing fresh water well drilling, pump service, hydrofracturing, vertical ground loop drilling, and downhole installation.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <span className="text-[10px] font-bold tracking-[0.18em] text-[#03AFF7] uppercase">
          HERITAGE &amp; CONTINUITY
        </span>
        <h2 className="mt-3 font-heading text-[clamp(30px,3.5vw,46px)] font-extrabold leading-[1.1] text-[#102A40]">
          Grounded in Verified Experience.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-[#102A40]/12 pt-10 lg:grid-cols-3">
          {milestones.map((item) => (
            <div key={item.year} className="relative">
              <span className="text-[10px] font-bold tracking-[0.18em] text-[#008FCB] uppercase">
                {item.label}
              </span>
              <p className="mt-2 font-heading text-4xl font-extrabold tracking-[-0.04em] text-[#03AFF7]">
                {item.year}
              </p>
              <h3 className="mt-4 font-heading text-xl font-bold text-[#102A40]">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-[1.8] text-[#142B3D]/80">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
