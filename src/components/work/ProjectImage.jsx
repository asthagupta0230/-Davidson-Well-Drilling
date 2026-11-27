import { Maximize2 } from "lucide-react";

export default function ProjectImage({ item, onExpand }) {
  return (
    <article
      className={`work-gallery-card group relative overflow-hidden rounded-[14px] bg-[#102A40] ${item.spanClass}`}
    >
      <button
        type="button"
        onClick={() => onExpand(item)}
        aria-label={`View enlarged image for ${item.title}`}
        className="block w-full text-left"
      >
        <div className={`relative w-full overflow-hidden ${item.aspectClass}`}>
          <img
            src={item.image}
            alt={item.alt}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102A40]/90 via-[#102A40]/25 to-transparent" />
        </div>

        <div className="absolute top-5 right-5 grid size-10 place-items-center rounded-full bg-white/90 text-[#102A40] opacity-0 transition-all duration-300 group-hover:opacity-100">
          <Maximize2 size={16} />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
          <span className="inline-block rounded-[4px] bg-[#03AFF7] px-2.5 py-1 text-[10px] font-extrabold tracking-[0.14em] uppercase">
            {item.category}
          </span>
          <h3 className="mt-3 font-heading text-xl font-extrabold sm:text-2xl">
            {item.title}
          </h3>
          <p className="mt-2 max-w-[520px] text-xs leading-relaxed text-white/85 sm:text-sm">
            {item.description}
          </p>
          <p className="mt-3 text-[10px] font-bold tracking-[0.14em] text-[#8CE0FF] uppercase">
            {item.region}
          </p>
        </div>
      </button>
    </article>
  );
}
