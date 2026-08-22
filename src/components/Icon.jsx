import * as Icons from "lucide-react";

export default function Icon({ name, className = "w-6 h-6", ...props }) {
  const LucideIcon = Icons[name];
  if (!LucideIcon) return null;
  return <LucideIcon className={className} {...props} aria-hidden="true" />;
}
