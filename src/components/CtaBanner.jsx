import { motion } from "framer-motion";
import PrimaryButton from "./PrimaryButton";
import { reveal } from "../lib/motion";

export default function CtaBanner({ image, imageAlt, title, description, buttonText, buttonTo, dark = true }) {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <motion.div
        {...reveal}
        className={`max-w-container mx-auto rounded-2xl overflow-hidden flex flex-col sm:flex-row items-stretch ${
          dark ? "bg-primary" : "bg-surface"
        }`}
      >
        {image && (
          <div className="sm:w-64 h-40 sm:h-auto overflow-hidden">
            <img src={image} alt={imageAlt} loading="lazy" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-5 px-6 sm:px-10 py-8">
          <div>
            <p className={`text-lg sm:text-xl font-semibold ${dark ? "text-white" : "text-heading"}`}>{title}</p>
            {description && (
              <p className={`mt-1.5 text-sm ${dark ? "text-white/75" : "text-body"}`}>{description}</p>
            )}
          </div>
          {buttonText && (
            <PrimaryButton to={buttonTo} icon="ArrowRight" variant={dark ? "primary" : "dark"} className="shrink-0">
              {buttonText}
            </PrimaryButton>
          )}
        </div>
      </motion.div>
    </section>
  );
}
