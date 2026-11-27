export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  light = false,
  className = "",
}) {
  const isCenter = align === "center";

  return (
    <div
      className={`${isCenter ? "mx-auto max-w-[700px] text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] uppercase sm:text-[11px] ${
            light ? "text-[#8CE0FF]" : "text-[#008FCB]"
          }`}
        >
          <span
            className={`h-px w-6 ${light ? "bg-[#03AFF7]" : "bg-[#03AFF7]"}`}
          />
          <span>{eyebrow}</span>
          {isCenter && (
            <span
              className={`h-px w-6 ${light ? "bg-[#03AFF7]" : "bg-[#03AFF7]"}`}
            />
          )}
        </div>
      )}

      <h2
        className={`mt-4 font-heading text-[clamp(32px,3.8vw,54px)] font-extrabold leading-[1.08] tracking-[-0.035em] ${
          light ? "text-white" : "text-[#102A40]"
        }`}
      >
        {title}{" "}
        {highlight && (
          <span className="text-[#03AFF7]">{highlight}</span>
        )}
      </h2>

      {description && (
        <p
          className={`mt-5 text-[15px] leading-[1.8] sm:text-base ${
            isCenter ? "mx-auto max-w-[580px]" : "max-w-[560px]"
          } ${light ? "text-white/85" : "text-[#142B3D]/80"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
