import Icon from "./Icon";

export default function SectionTitle({
  icon,
  title,
  align = "left",
  size = "md",
  ornament = false,
  className = "",
}) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  const sizeClass = size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl";

  if (ornament) {
    return (
      <div className={`flex flex-col ${alignClass} gap-2 ${className}`}>
        <div className="flex items-center gap-3">
          <span className="text-secondary text-lg" aria-hidden="true">
            &#8672;
          </span>
          <h2 className={`${sizeClass} font-semibold text-heading`}>{title}</h2>
          <span className="text-secondary text-lg" aria-hidden="true">
            &#8674;
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${alignClass} gap-2 ${className}`}>
      <div className="flex items-center gap-2.5">
        {icon && (
          <span className="text-secondary">
            <Icon name={icon} className="w-5 h-5" />
          </span>
        )}
        <h2 className={`${sizeClass} font-semibold text-heading`}>{title}</h2>
      </div>
      <span className="h-[3px] w-14 bg-secondary rounded-full" />
    </div>
  );
}
