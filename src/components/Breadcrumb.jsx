import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-sm text-white/80">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-white/50" aria-hidden="true" />}
            {item.path && !isLast ? (
              <Link to={item.path} className="hover:text-accent-light transition-colors duration-300">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-accent-light font-medium" : ""}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
