import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-[#102A40]/12 border-y border-[#102A40]/12">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question} className="py-6">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              className="flex w-full items-start justify-between gap-4 text-left"
            >
              <span className="font-heading text-lg font-bold text-[#102A40] sm:text-xl">
                {item.question}
              </span>
              <span
                className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full transition-colors ${
                  isOpen
                    ? "bg-[#03AFF7] text-white"
                    : "bg-[#F2F8FC] text-[#008FCB]"
                }`}
              >
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>

            {isOpen && (
              <div className="mt-4 pr-10">
                <p className="text-[15px] leading-[1.8] text-[#142B3D]/85">
                  {item.answer}
                </p>
                {item.isDraft && (
                  <span className="mt-2 inline-block rounded bg-[#F2F8FC] px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] text-[#008FCB] uppercase">
                    Draft guidance for company review
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
