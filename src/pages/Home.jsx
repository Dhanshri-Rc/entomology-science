import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  Atom,
  BookOpen,
  BookOpenCheck,
  Bug,
  CalendarDays,
  Check,
  Cpu,
  Dna,
  Earth,
  FileCheck2,
  Flower2,
  Globe2,
  Handshake,
  Leaf,
  MailCheck,
  MapPin,
  Mic2,
  Network,
  Presentation,
  Send,
  Sprout,
  Stethoscope,
  Users,
  Wheat,
} from "lucide-react";

/* =========================================================
   COLORS USED TO MATCH REFERENCE
========================================================= */

const COLORS = {
  dark: "#062b0c",
  darker: "#031d08",
  green: "#416d2c",
  green2: "#5f8f34",
  accent: "#94b963",
  light: "#f7f8f4",
  border: "#e4e8df",
  heading: "#1d281d",
  body: "#4b554b",
};

/* =========================================================
   HERO STATISTICS
========================================================= */

const heroStats = [
  {
    icon: Users,
    value: "300+",
    label: "Researchers",
  },
  {
    icon: Presentation,
    value: "50+",
    label: "Expert Speakers",
  },
  {
    icon: Globe2,
    value: "20+",
    label: "Countries",
  },
  {
    icon: BookOpenCheck,
    value: "Scopus",
    label: "Indexed Journals",
  },
];

/* =========================================================
   HIGHLIGHTS
========================================================= */

const highlights = [
  {
    icon: Leaf,
    label: "Diverse\nThemes",
  },
  {
    icon: Network,
    label: "Global\nNetworking",
  },
  {
    icon: Mic2,
    label: "Keynote\nSpeakers",
  },
  {
    icon: BookOpen,
    label: "Scopus Indexed\nPublications",
  },
  {
    icon: Handshake,
    label: "Research\nCollaboration",
  },
  {
    icon: Sprout,
    label: "Sustainable\nImpact",
  },
];

/* =========================================================
   CONFERENCE THEMES
========================================================= */

const themes = [
  {
    icon: Bug,
    title: "Insect Biodiversity\n& Systematics",
  },
  {
    icon: Wheat,
    title: "Agricultural Entomology\n& Pest Management",
  },
  {
    icon: Earth,
    title: "Insect Ecology &\nConservation",
  },
  {
    icon: Stethoscope,
    title: "Medical & Veterinary\nEntomology",
  },
  {
    icon: Dna,
    title: "Molecular Entomology\n& Genomics",
  },
  {
    icon: Atom,
    title: "Insect Physiology &\nBiochemistry",
  },
  {
    icon: Flower2,
    title: "Pollinators &\nEcosystem Services",
  },
  {
    icon: Cpu,
    title: "Emerging Trends &\nTechnologies",
  },
];

/* =========================================================
   IMPORTANT DATES
========================================================= */

const importantDates = [
  {
    icon: FileCheck2,
    date: "31 July 2025",
    label: "Abstract Submission\nDeadline",
  },
  {
    icon: MailCheck,
    date: "10 August 2025",
    label: "Notification of\nAcceptance",
  },
  {
    icon: BookOpenCheck,
    date: "30 August 2025",
    label: "Full Paper Submission\nDeadline",
  },
  {
    icon: Bug,
    date: "10–12 November 2025",
    label: "Conference\nDates",
  },
];

/* =========================================================
   ANIMATION
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 28,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardReveal = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   BUTTON COMPONENT
========================================================= */

function ButtonLink({
  to,
  children,
  icon: Icon,
  variant = "green",
  className = "",
}) {
  const variants = {
    green:
      "bg-[#6d9c35] text-white border-[#6d9c35] hover:bg-[#547d29] hover:border-[#547d29] shadow-[0_5px_16px_rgba(70,110,43,0.18)]",

    outline:
      "bg-transparent text-white border-white/70 hover:bg-white hover:text-[#173d19]",

    outlineDark:
      "bg-white text-[#294d25] border-[#76936b] hover:bg-[#3f6f2c] hover:text-white hover:border-[#3f6f2c]",
  };

  return (
    <Link
      to={to}
      className={`
        group/button
        inline-flex
        min-h-[40px]
        items-center
        justify-center
        gap-2
        rounded-[5px]
        border
        px-5
        py-[10px]
        text-[12px]
        font-medium
        tracking-[-0.1px]
        transition-all
        duration-300
        ease-out
        hover:-translate-y-[2px]
        active:translate-y-0
        ${variants[variant]}
        ${className}
      `}
    >
      {Icon && (
        <Icon
          className="h-[15px] w-[15px] transition-transform duration-300 group-hover/button:scale-110"
          strokeWidth={1.8}
        />
      )}

      <span>{children}</span>

      {variant === "green" && (
        <ArrowRight
          className="
            h-[14px]
            w-[14px]
            transition-transform
            duration-300
            group-hover/button:translate-x-[3px]
          "
        />
      )}
    </Link>
  );
}

/* =========================================================
   CONTAINER
========================================================= */

function PageContainer({ children, className = "" }) {
  return (
    <div
      className={`
        mx-auto
        w-full
        max-w-[1180px]
        px-4
        sm:px-5
        md:px-6
        lg:px-7
        xl:px-5
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-white">
      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative min-h-[475px] overflow-hidden bg-[#062b0c] sm:min-h-[500px] lg:min-h-[435px]">
        {/* Background image */}

        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            initial={{ scale: 1.07 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 2,
              ease: [0.22, 1, 0.36, 1],
            }}
            src="/images/hero-home-beetle.jpg"
            alt="Green iridescent beetle resting on a leaf"
            className="
              h-full
              w-full
              object-cover
              object-[66%_center]
              sm:object-[65%_center]
              lg:object-center
            "
            loading="eager"
            fetchPriority="high"
          />

          {/* Desktop overlay */}

          <div
            className="
              absolute
              inset-0
              bg-[linear-gradient(90deg,rgba(3,31,8,0.98)_0%,rgba(4,41,11,0.95)_30%,rgba(5,45,10,0.71)_53%,rgba(1,25,5,0.18)_76%,rgba(0,20,5,0.20)_100%)]
            "
          />

          {/* Additional bottom gradient */}

          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#082b0d]/75 to-transparent" />
        </div>

        <PageContainer className="relative z-10">
          <div className="grid min-h-[435px] grid-cols-1 items-center gap-8 pb-14 pt-9 lg:grid-cols-[1fr_205px] lg:gap-12 lg:pb-[67px] lg:pt-7">
            {/* LEFT HERO CONTENT */}

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-[660px]"
            >
              <motion.p
                variants={fadeUp}
                className="mb-[5px] text-[12px] font-medium tracking-[0.1px] text-white/90 sm:text-[13px]"
              >
                International Conference on
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="
                  max-w-[650px]
                  text-[30px]
                  font-semibold
                  leading-[1.12]
                  tracking-[-0.9px]
                  text-white
                  sm:text-[36px]
                  md:text-[39px]
                  lg:text-[42px]
                "
              >
                Entomology:
                <br />
                Science for a Sustainable Future
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="
                  mt-[7px]
                  text-[14px]
                  font-medium
                  tracking-[0.05px]
                  text-[#accb70]
                  sm:text-[15px]
                "
              >
                Exploring Diversity, Innovation and Impact
              </motion.p>

              {/* Date / Location */}

              <motion.div
                variants={fadeUp}
                className="
                  mt-[18px]
                  flex
                  flex-wrap
                  items-center
                  gap-x-[24px]
                  gap-y-3
                  text-[10px]
                  font-medium
                  text-white/95
                  sm:text-[11px]
                "
              >
                <span className="flex items-center gap-[7px]">
                  <CalendarDays
                    className="h-[15px] w-[15px] text-[#a9cc69]"
                    strokeWidth={1.8}
                  />

                  10 – 12 November 2025
                </span>

                <span className="flex items-center gap-[7px]">
                  <MapPin
                    className="h-[15px] w-[15px] text-[#a9cc69]"
                    strokeWidth={1.8}
                  />

                  Washington, DC, USA
                </span>

                <span className="flex items-center gap-[7px]">
                  <Globe2
                    className="h-[15px] w-[15px] text-[#a9cc69]"
                    strokeWidth={1.8}
                  />

                  Hybrid Conference
                </span>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="
                  mt-[17px]
                  max-w-[500px]
                  text-[10px]
                  leading-[1.7]
                  text-white/88
                  sm:text-[11px]
                "
              >
                A global platform for researchers, academicians and industry
                professionals to exchange knowledge and advance entomological
                science for a sustainable world.
              </motion.p>

              {/* Buttons */}

              <motion.div
                variants={fadeUp}
                className="mt-[18px] flex flex-wrap items-center gap-[10px]"
              >
                <ButtonLink to="/submit-paper" icon={Send}>
                  Submit Your Paper
                </ButtonLink>

                <ButtonLink
                  to="/call-for-papers"
                  icon={CalendarDays}
                  variant="outline"
                >
                  View Important Dates
                </ButtonLink>
              </motion.div>
            </motion.div>

            {/* RIGHT STATISTICS CARD */}

            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate="visible"
              className="
                hidden
                w-full
                overflow-hidden
                rounded-[10px]
                border
                border-[#73924f]/40
                bg-[#05280b]/80
                px-[18px]
                py-[17px]
                shadow-[0_15px_40px_rgba(0,0,0,0.16)]
                backdrop-blur-[8px]
                lg:block
              "
            >
              <div>
                {heroStats.map((stat, index) => {
                  const StatIcon = stat.icon;

                  return (
                    <motion.div
                      key={stat.label}
                      whileHover={{
                        x: 4,
                      }}
                      transition={{
                        duration: 0.22,
                      }}
                      className={`
                        group
                        flex
                        cursor-default
                        items-center
                        gap-[12px]
                        py-[10px]
                        ${
                          index !== heroStats.length - 1
                            ? "border-b border-white/[0.08]"
                            : ""
                        }
                      `}
                    >
                      <span
                        className="
                          flex
                          h-[33px]
                          w-[33px]
                          shrink-0
                          items-center
                          justify-center
                          text-[#9bbc62]
                          transition-transform
                          duration-300
                          group-hover:scale-110
                        "
                      >
                        <StatIcon
                          className="h-[25px] w-[25px]"
                          strokeWidth={1.45}
                        />
                      </span>

                      <div>
                        <p className="text-[15px] font-semibold leading-none text-white">
                          {stat.value}
                        </p>

                        <p className="mt-[4px] text-[8px] leading-none text-white/70">
                          {stat.label}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* MOBILE STATS */}

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="
                grid
                grid-cols-2
                gap-[8px]
                rounded-xl
                border
                border-white/15
                bg-[#05280b]/80
                p-3
                backdrop-blur-md
                lg:hidden
              "
            >
              {heroStats.map((stat) => {
                const StatIcon = stat.icon;

                return (
                  <motion.div
                    key={stat.label}
                    variants={cardReveal}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      bg-white/[0.04]
                      px-3
                      py-[10px]
                    "
                  >
                    <StatIcon
                      className="h-5 w-5 shrink-0 text-[#a7c971]"
                      strokeWidth={1.5}
                    />

                    <div>
                      <p className="text-[12px] font-semibold text-white">
                        {stat.value}
                      </p>

                      <p className="text-[8px] text-white/65">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </PageContainer>

        {/* HERO DOTS */}

        <div
          aria-hidden="true"
          className="
            absolute
            bottom-[56px]
            left-1/2
            z-10
            hidden
            -translate-x-1/2
            items-center
            gap-[5px]
            lg:flex
          "
        >
          <span className="h-[9px] w-[9px] rounded-full bg-[#bfd381]" />
          <span className="h-[9px] w-[9px] rounded-full bg-white/80" />
          <span className="h-[9px] w-[9px] rounded-full bg-white/40" />
        </div>
      </section>

      {/* =====================================================
          HIGHLIGHT STRIP
      ===================================================== */}

      <section className="relative z-20">
        <PageContainer>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="
              relative
              -mt-[37px]
              grid
              grid-cols-2
              overflow-hidden
              rounded-[11px]
              border
              border-[#e5e8e1]
              bg-white
              px-2
              py-[14px]
              shadow-[0_8px_23px_rgba(22,57,21,0.10)]
              sm:grid-cols-3
              lg:grid-cols-6
              lg:px-[8px]
              lg:py-[17px]
            "
          >
            {highlights.map((item, index) => {
              const HighlightIcon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  whileHover={{
                    y: -4,
                  }}
                  transition={{
                    duration: 0.24,
                  }}
                  className={`
                    group
                    relative
                    flex
                    min-h-[72px]
                    cursor-default
                    flex-col
                    items-center
                    justify-center
                    px-2
                    py-2
                    text-center

                    ${
                      index % 2 !== 0
                        ? "border-l border-[#e4e8e1] sm:border-l-0"
                        : ""
                    }

                    ${
                      index >= 2
                        ? "border-t border-[#e4e8e1] sm:border-t-0"
                        : ""
                    }

                    ${
                      index > 0
                        ? "lg:border-l lg:border-t-0 lg:border-[#e1e5de]"
                        : "lg:border-0"
                    }
                  `}
                >
                  <HighlightIcon
                    className="
                      mb-[7px]
                      h-[25px]
                      w-[25px]
                      text-[#527644]
                      transition-all
                      duration-300
                      group-hover:scale-110
                      group-hover:text-[#6d983e]
                    "
                    strokeWidth={1.25}
                  />

                  <p
                    className="
                      whitespace-pre-line
                      text-[9px]
                      font-medium
                      leading-[1.35]
                      text-[#202b20]
                      sm:text-[10px]
                    "
                  >
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </PageContainer>
      </section>

      {/* =====================================================
          ABOUT THE CONFERENCE
      ===================================================== */}

      <section className="bg-white pb-[28px] pt-[26px] sm:pt-[35px] lg:pt-[30px]">
        <PageContainer>
          <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-[0.83fr_1.17fr] lg:gap-[31px]">
            {/* ABOUT TEXT */}

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
            >
              <div className="flex items-center gap-[8px]">
                <Leaf
                  className="h-[18px] w-[18px] fill-[#638a4a]/10 text-[#557944]"
                  strokeWidth={1.6}
                />

                <h2 className="text-[14px] font-semibold text-[#1d291d] sm:text-[15px]">
                  About the Conference
                </h2>
              </div>

              <p
                className="
                  mt-[10px]
                  text-[10px]
                  leading-[1.55]
                  text-[#3f493f]
                  sm:text-[10.5px]
                "
              >
                The International Conference on Entomology brings together
                leading experts, researchers and practitioners to discuss the
                latest advancements in entomological research and its
                applications in a rapidly changing world.
              </p>

              <p
                className="
                  mt-[10px]
                  text-[10px]
                  leading-[1.55]
                  text-[#3f493f]
                  sm:text-[10.5px]
                "
              >
                This conference aims to foster collaboration, share innovative
                ideas and inspire solutions for the challenges impacting
                insects, ecosystems and human well-being.
              </p>

              <div className="mt-[15px]">
                <ButtonLink
                  to="/about"
                  className="!min-h-[34px] !px-[15px] !py-[7px] !text-[9px]"
                >
                  Learn More About the Conference
                </ButtonLink>
              </div>
            </motion.div>

            {/* BUTTERFLY IMAGE */}

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
              className="
                group
                relative
                h-[240px]
                overflow-hidden
                rounded-[7px]
                shadow-[0_8px_25px_rgba(22,57,21,0.11)]
                sm:h-[280px]
                lg:h-[267px]
              "
            >
              <img
                src="/images/about-home-butterfly.jpg"
                alt="Monarch butterfly resting on a flower"
                loading="lazy"
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-[900ms]
                  ease-out
                  group-hover:scale-[1.045]
                "
              />

              <div
                className="
                  absolute
                  inset-x-[14px]
                  bottom-[9px]
                  flex
                  items-center
                  gap-[9px]
                  rounded-[7px]
                  bg-[#062c0c]/90
                  px-[14px]
                  py-[10px]
                  backdrop-blur-[5px]
                  transition-transform
                  duration-300
                  group-hover:-translate-y-[2px]
                "
              >
                <Leaf
                  className="h-[23px] w-[23px] shrink-0 text-[#a8c972]"
                  strokeWidth={1.4}
                />

                <div>
                  <p className="text-[9px] font-medium text-white sm:text-[10px]">
                    Entomology for People, Planet and Prosperity
                  </p>

                  <p className="mt-[2px] text-[7.5px] text-white/65 sm:text-[8px]">
                    Research. Innovate. Sustain.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </PageContainer>
      </section>

      {/* =====================================================
          CONFERENCE THEMES
      ===================================================== */}

      <section className="bg-white pb-[27px] pt-[3px]">
        <PageContainer>
          {/* HEADING */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            className="mb-[12px] flex items-center justify-center gap-[16px]"
          >
            <Leaf
              className="h-[21px] w-[21px] -rotate-[100deg] text-[#527a42]"
              strokeWidth={1.3}
            />

            <h2 className="text-[15px] font-semibold text-[#263126]">
              Conference Themes
            </h2>

            <Leaf
              className="h-[21px] w-[21px] rotate-[80deg] text-[#527a42]"
              strokeWidth={1.3}
            />
          </motion.div>

          {/* THEME GRID */}

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            className="
              grid
              grid-cols-1
              gap-[8px]
              xs:grid-cols-2
              sm:grid-cols-2
              md:grid-cols-4
            "
          >
            {themes.map((theme) => {
              const ThemeIcon = theme.icon;

              return (
                <motion.div
                  key={theme.title}
                  variants={cardReveal}
                  whileHover={{
                    y: -4,
                  }}
                  className="
                    group
                    flex
                    min-h-[73px]
                    cursor-default
                    items-center
                    gap-[12px]
                    rounded-[7px]
                    border
                    border-[#e4e6e0]
                    bg-[#fafbf8]
                    px-[13px]
                    py-[10px]
                    shadow-[0_2px_8px_rgba(27,55,27,0.025)]
                    transition-shadow
                    duration-300
                    hover:border-[#cfd9c8]
                    hover:shadow-[0_10px_24px_rgba(42,78,36,0.10)]
                  "
                >
                  <span
                    className="
                      flex
                      h-[31px]
                      w-[31px]
                      shrink-0
                      items-center
                      justify-center
                      text-[#537a49]
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  >
                    <ThemeIcon
                      className="h-[24px] w-[24px]"
                      strokeWidth={1.25}
                    />
                  </span>

                  <p
                    className="
                      whitespace-pre-line
                      text-[9px]
                      font-medium
                      leading-[1.28]
                      text-[#283328]
                      sm:text-[9px]
                    "
                  >
                    {theme.title}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* VIEW AIMS */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            className="mt-[10px] flex justify-center"
          >
            <ButtonLink
              to="/aim-scope"
              variant="outlineDark"
              className="!min-h-[24px] !rounded-[4px] !px-[15px] !py-[4px] !text-[8px]"
            >
              View Aims &amp; Scope
            </ButtonLink>
          </motion.div>
        </PageContainer>
      </section>

      {/* =====================================================
          DATES AND PUBLICATION
      ===================================================== */}

      <section className="bg-white pb-[18px]">
        <PageContainer>
          <div className="grid grid-cols-1 gap-[9px] lg:grid-cols-2">
            {/* IMPORTANT DATES */}

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className="
                rounded-[8px]
                border
                border-[#e1e5de]
                bg-[#fafbf8]
                px-[13px]
                pb-[13px]
                pt-[11px]
                shadow-[0_3px_10px_rgba(29,58,29,0.035)]
              "
            >
              {/* Date heading */}

              <div className="mb-[11px] flex items-center justify-between gap-3">
                <div className="flex items-center gap-[7px]">
                  <CalendarDays
                    className="h-[16px] w-[16px] text-[#507648]"
                    strokeWidth={1.5}
                  />

                  <h3 className="text-[11px] font-semibold text-[#253025]">
                    Important Dates
                  </h3>
                </div>

                <Link
                  to="/call-for-papers"
                  className="
                    group
                    flex
                    items-center
                    gap-[4px]
                    text-[7.5px]
                    font-medium
                    text-[#334e31]
                    transition-colors
                    duration-300
                    hover:text-[#6c963f]
                  "
                >
                  View All Dates

                  <ArrowRight
                    className="
                      h-[10px]
                      w-[10px]
                      transition-transform
                      duration-300
                      group-hover:translate-x-[2px]
                    "
                  />
                </Link>
              </div>

              {/* Dates */}

              <div className="grid grid-cols-2 sm:grid-cols-4">
                {importantDates.map((item, index) => {
                  const DateIcon = item.icon;

                  return (
                    <motion.div
                      key={item.date}
                      whileHover={{
                        y: -3,
                      }}
                      className={`
                        group
                        flex
                        min-h-[87px]
                        cursor-default
                        flex-col
                        items-center
                        justify-start
                        px-[5px]
                        pt-[3px]
                        text-center

                        ${
                          index % 2 !== 0
                            ? "border-l border-[#e0e5dc] sm:border-l"
                            : index !== 0
                              ? "sm:border-l sm:border-[#e0e5dc]"
                              : ""
                        }

                        ${
                          index >= 2
                            ? "mt-3 border-t border-[#e0e5dc] pt-4 sm:mt-0 sm:border-t-0 sm:pt-[3px]"
                            : ""
                        }
                      `}
                    >
                      <DateIcon
                        className="
                          mb-[7px]
                          h-[19px]
                          w-[19px]
                          text-[#5d8153]
                          transition-transform
                          duration-300
                          group-hover:scale-110
                        "
                        strokeWidth={1.35}
                      />

                      <p className="text-[8px] font-semibold leading-tight text-[#344134]">
                        {item.date}
                      </p>

                      <p
                        className="
                          mt-[5px]
                          whitespace-pre-line
                          text-[6.8px]
                          leading-[1.3]
                          text-[#7a8278]
                        "
                      >
                        {item.label}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* PUBLICATION PARTNER */}

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className="
                rounded-[8px]
                border
                border-[#e1e5de]
                bg-[#fafbf8]
                px-[13px]
                pb-[12px]
                pt-[11px]
                shadow-[0_3px_10px_rgba(29,58,29,0.035)]
              "
            >
              <div className="mb-[9px] flex items-center gap-[7px]">
                <BookOpen
                  className="h-[17px] w-[17px] text-[#507648]"
                  strokeWidth={1.5}
                />

                <h3 className="text-[11px] font-semibold text-[#253025]">
                  Publication Partner
                </h3>
              </div>

              <div className="flex items-start gap-[13px]">
                {/* Journal cover */}

                <div className="group relative w-[82px] shrink-0 overflow-hidden rounded-[3px]">
                  <img
                    src="/images/journal-cover.jpg"
                    alt="Journal of Entomological Research cover"
                    loading="lazy"
                    className="
                      h-[113px]
                      w-[82px]
                      object-cover
                      shadow-[0_4px_11px_rgba(0,0,0,0.12)]
                      transition-transform
                      duration-500
                      group-hover:scale-[1.04]
                    "
                  />
                </div>

                {/* Journal information */}

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold leading-tight text-[#243124] sm:text-[11px]">
                    Journal of Entomological Research
                  </p>

                  <span
                    className="
                      mt-[6px]
                      inline-flex
                      items-center
                      gap-1
                      rounded-[2px]
                      bg-[#5b803e]
                      px-[7px]
                      py-[3px]
                      text-[6px]
                      font-medium
                      text-white
                    "
                  >
                    <Check className="h-[7px] w-[7px]" strokeWidth={2} />

                    Scopus Indexed
                  </span>

                  <p
                    className="
                      mt-[6px]
                      max-w-[340px]
                      text-[7.2px]
                      leading-[1.45]
                      text-[#596259]
                      sm:text-[7.5px]
                    "
                  >
                    Selected high-quality papers will be recommended for
                    publication in the Journal of Entomological Research and
                    other reputed Scopus indexed journals.
                  </p>

                  <Link
                    to="/publication"
                    className="
                      group/link
                      mt-[6px]
                      inline-flex
                      items-center
                      gap-[4px]
                      border-b
                      border-[#78906d]
                      pb-[1px]
                      text-[7px]
                      font-medium
                      text-[#405b3e]
                      transition-colors
                      duration-300
                      hover:text-[#6c963f]
                    "
                  >
                    Learn more about publication

                    <ArrowRight
                      className="
                        h-[8px]
                        w-[8px]
                        transition-transform
                        duration-300
                        group-hover/link:translate-x-[2px]
                      "
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </PageContainer>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="bg-white pb-[26px]">
        <PageContainer>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="
              group
              relative
              min-h-[107px]
              overflow-hidden
              rounded-[7px]
              bg-[#0a3b13]
              shadow-[0_7px_18px_rgba(11,55,16,0.12)]
            "
          >
            {/* Ladybug image */}

            <div className="absolute inset-y-0 left-0 w-full sm:w-[39%]">
              <img
                src="/images/cta-ladybug.jpg"
                alt="Ladybug on green vegetation"
                loading="lazy"
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-[1000ms]
                  ease-out
                  group-hover:scale-[1.05]
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-transparent
                  via-[#0a3b13]/20
                  to-[#0a3b13]
                  sm:block
                "
              />
            </div>

            {/* Mobile dark overlay */}

            <div className="absolute inset-0 bg-[#052d0c]/75 sm:hidden" />

            {/* Content */}

            <div
              className="
                relative
                z-10
                flex
                min-h-[107px]
                flex-col
                items-center
                justify-center
                px-5
                py-4
                text-center
                sm:ml-[35%]
              "
            >
              <p
                className="
                  max-w-[440px]
                  text-[10px]
                  font-medium
                  leading-[1.4]
                  text-white
                  sm:text-[11px]
                "
              >
                Be a part of advancing entomological science
                <br className="hidden sm:block" />
                and building a sustainable future.
              </p>

              <Link
                to="/submit-paper"
                className="
                  group/cta
                  mt-[8px]
                  inline-flex
                  items-center
                  gap-[9px]
                  rounded-[4px]
                  bg-[#729c3c]
                  px-[19px]
                  py-[7px]
                  text-[8px]
                  font-medium
                  text-white
                  shadow-[0_4px_12px_rgba(0,0,0,0.12)]
                  transition-all
                  duration-300
                  hover:-translate-y-[2px]
                  hover:bg-[#86ad4e]
                  active:translate-y-0
                "
              >
                Submit Your Paper Today

                <ArrowRight
                  className="
                    h-[10px]
                    w-[10px]
                    transition-transform
                    duration-300
                    group-hover/cta:translate-x-[3px]
                  "
                />
              </Link>
            </div>

            {/* Decorative leaves */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-[15px]
                right-[12px]
                hidden
                h-[95px]
                w-[115px]
                opacity-[0.16]
                md:block
              "
            >
              <Leaf
                className="absolute bottom-[10px] right-[16px] h-[51px] w-[51px] rotate-[30deg] text-[#d7ebad]"
                strokeWidth={0.8}
              />

              <Leaf
                className="absolute bottom-[34px] right-[49px] h-[38px] w-[38px] -rotate-[20deg] text-[#d7ebad]"
                strokeWidth={0.8}
              />

              <Leaf
                className="absolute bottom-[3px] right-[61px] h-[32px] w-[32px] rotate-[55deg] text-[#d7ebad]"
                strokeWidth={0.8}
              />
            </div>
          </motion.div>
        </PageContainer>
      </section>
    </main>
  );
}