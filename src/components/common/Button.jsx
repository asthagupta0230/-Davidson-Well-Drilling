import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Button({
  to,
  href,
  type = "button",
  onClick,
  variant = "primary",
  children,
  className = "",
  showArrow = true,
  disabled = false,
}) {
  const baseStyles =
    "group inline-flex items-center justify-center gap-2.5 rounded-[6px] px-6 py-3.5 text-xs font-extrabold tracking-[0.04em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#03AFF7] disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "bg-[#03AFF7] text-white hover:-translate-y-0.5 hover:bg-[#008FCB] hover:shadow-[0_14px_30px_rgba(0,143,203,0.28)]",
    white:
      "border border-white bg-white text-[#008FCB] hover:-translate-y-0.5 hover:bg-[#008FCB] hover:text-white hover:shadow-xl hover:shadow-slate-950/20",
    outline:
      "border border-[#102A40]/20 bg-white text-[#102A40] hover:-translate-y-0.5 hover:border-[#03AFF7] hover:text-[#008FCB]",
    outlineLight:
      "border border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10",
  };

  const combined = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={combined}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} onClick={onClick} className={combined}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combined}
    >
      {content}
    </button>
  );
}
