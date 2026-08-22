import { motion } from "framer-motion";
import Container from "./Container";
import Breadcrumb from "./Breadcrumb";
import { heroItem } from "../lib/motion";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  description,
  breadcrumb,
  image,
  imageAlt = "",
  compact = false,
  children,
}) {
  return (
    <section className={`relative overflow-hidden bg-primary ${compact ? "py-14 sm:py-16" : "py-16 sm:py-20"}`}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70 z-10" />
        {image && (
          <img
            src={image}
            alt={imageAlt}
            loading="eager"
            className="absolute right-0 top-0 h-full w-1/2 object-cover object-center opacity-90 hidden sm:block"
          />
        )}
      </div>

      <Container className="relative z-20">
        <motion.div {...heroItem(0)} className="mb-4">
          <Breadcrumb items={breadcrumb} />
        </motion.div>

        {eyebrow && (
          <motion.span
            {...heroItem(0.05)}
            className="inline-block bg-secondary/20 text-accent-light text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-md mb-4"
          >
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          {...heroItem(0.1)}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-2xl leading-tight"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p {...heroItem(0.18)} className="mt-3 text-lg sm:text-xl font-medium text-accent-light max-w-2xl">
            {subtitle}
          </motion.p>
        )}

        {description && (
          <motion.p {...heroItem(0.26)} className="mt-4 text-white/85 max-w-xl leading-relaxed">
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div {...heroItem(0.34)} className="mt-6">
            {children}
          </motion.div>
        )}
      </Container>
    </section>
  );
}
