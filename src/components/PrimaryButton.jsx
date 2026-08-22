import { Link } from "react-router-dom";
import Icon from "./Icon";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 hover:-translate-y-0.5 hover:shadow-lg";

const variants = {
  primary: "bg-secondary text-white hover:bg-secondary-dark",
  outline: "bg-transparent text-white border border-white/70 hover:bg-white/10",
  outlineDark: "bg-transparent text-primary border border-primary/40 hover:bg-primary hover:text-white",
  dark: "bg-primary text-white hover:bg-primary-light",
  gold: "bg-gold text-primary-dark hover:bg-gold-dark hover:text-white",
};

export default function PrimaryButton({
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  icon,
  iconPosition = "right",
  className = "",
  children,
  ...props
}) {
  const classes = `${base} ${variants[variant] || variants.primary} ${className}`;
  const content = (
    <>
      {icon && iconPosition === "left" && <Icon name={icon} className="w-4 h-4" />}
      <span>{children}</span>
      {icon && iconPosition === "right" && <Icon name={icon} className="w-4 h-4" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {content}
    </button>
  );
}
