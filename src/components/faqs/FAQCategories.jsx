export default function FAQCategories({ categories, activeId, onSelect }) {
  return (
    <aside aria-label="FAQ categories" className="lg:sticky lg:top-28">
      <span className="block text-[10px] font-bold tracking-[0.18em] text-[#008FCB] uppercase">
        CATEGORIES
      </span>
      <nav className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1.5">
        {categories.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelect(cat.id)}
              className={`rounded-[8px] px-4 py-3 text-left text-xs font-extrabold transition-colors sm:text-sm ${
                isActive
                  ? "bg-[#03AFF7] text-white"
                  : "bg-[#F2F8FC] text-[#102A40] hover:bg-[#008FCB]/10 hover:text-[#008FCB]"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
