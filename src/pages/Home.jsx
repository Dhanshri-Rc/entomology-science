import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import herobg from "../assets/img/homebg.png";
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

 
  Files,
 
 
 
  
  UsersRound,
  FileText,
  Microscope,
} from "lucide-react";
import aboutButterfly from "../assets/img/home2.png";

import coverimg from "../assets/img/home3.png";

import bgcta from "../assets/img/homecta.png";

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
    icon: FileText,
    value: "Scopus",
    label: "Indexed Journals",
  },
];

const heroWrap = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const statsCardAnim = {
  hidden: { opacity: 0, x: 30, scale: 0.98 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

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
    icon: Presentation,
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
    icon: Leaf,
    title: "Agricultural Entomology\n& Pest Management",
  },
  {
    icon: Earth,
    title: "Insect Ecology &\nConservation",
  },
  {
    icon: Microscope,
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
    icon: Bug,
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
    icon: Bug,
    date: "31 July 2026",
    label: "Abstract Submission\nDeadline",
  },
  {
    icon: CalendarDays,
    date: "10 August 2026",
    label: "Notification of\nAcceptance",
  },
  {
    icon: FileCheck2,
    date: "30 August 2026",
    label: "Full Paper Submission\nDeadline",
  },
  {
    icon: Bug,
    date: "10 November 2026",
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
function HeroButton({ to, children, icon: Icon, variant = "green" }) {
  const styles = {
    green: `
      border border-[#8fa83b]
      text-white
      bg-[linear-gradient(180deg,#688c2d_0%,#52761e_50%,#3f5e12_100%)]
      shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_22px_rgba(0,0,0,0.22)]
      hover:bg-[linear-gradient(180deg,#769a36_0%,#5d8325_50%,#496a17_100%)]
      hover:border-[#b4ca62]
    `,
    yellow: `
      border border-[#e4b14c]
      text-[#29350f]
      bg-[linear-gradient(180deg,#ffd875_0%,#efc15a_50%,#db9f39_100%)]
      shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_22px_rgba(0,0,0,0.18)]
      hover:bg-[linear-gradient(180deg,#ffe189_0%,#f5c866_50%,#e2a643_100%)]
      hover:border-[#f0c96b]
      hover:text-white/95
    `,
    outline: `
      border border-white/70
      text-white
      bg-white/[0.04]
      backdrop-blur-sm
      hover:bg-white
      hover:text-[#17330f]
    `,
  };

  return (
    <Link
      to={to}
      className={`
        group relative inline-flex items-center justify-center gap-2.5
        rounded-[8px] px-5 py-[11px] text-[12px] font-semibold
        transition-all duration-300 ease-out
        hover:-translate-y-[2px] active:translate-y-0
        min-h-[44px]
        ${styles[variant]}
      `}
    >
      <span
        className="
          pointer-events-none absolute inset-y-0 -left-[40%] w-[28%]
          skew-x-[-18deg] bg-white/12 blur-[2px]
          transition-all duration-700 group-hover:left-[120%]
        "
      />
      <span className="relative z-10">{children}</span>
      <Icon
        className="relative z-10 h-[15px] w-[15px] transition-transform duration-300 group-hover:translate-x-[3px]"
        strokeWidth={2}
      />
    </Link>
  );
}


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
        max-w-[1150px]
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
    <main className="w-full overflow-hidden bg-white lg:py-16 md:py-14 sm:py-12 py-10">
      {/* =====================================================
          HERO SECTION
      ===================================================== */}

<section className="relative isolate overflow-hidden bg-[#06250b] py-4">
  {/* Background image */}
  <motion.div
    initial={{ scale: 1.05 }}
    animate={{ scale: 1 }}
    transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
    className="
      absolute inset-0 -z-30 bg-cover bg-no-repeat

      bg-[position:72%_center]
      sm:bg-[position:69%_center]
      md:bg-[position:67%_center]
      lg:bg-[position:64%_center]
      xl:bg-center

      max-[480px]:bg-[position:70%_center]
      max-[380px]:bg-[position:68%_center]
    "
    style={{
      backgroundImage: `url(${herobg})`,
    }}
  />
  <div
    className="
      absolute inset-0 -z-20
      bg-[linear-gradient(90deg,rgba(3,30,8,0.92)_0%,rgba(4,36,10,0.80)_38%,rgba(4,36,10,0.48)_68%,rgba(3,30,8,0.25)_100%)]

      lg:hidden

      max-[640px]:bg-[linear-gradient(90deg,rgba(3,30,8,0.94)_0%,rgba(4,36,10,0.86)_45%,rgba(4,36,10,0.60)_75%,rgba(3,30,8,0.38)_100%)]

      max-[480px]:bg-[linear-gradient(90deg,rgba(3,30,8,0.95)_0%,rgba(4,36,10,0.88)_52%,rgba(4,36,10,0.68)_78%,rgba(3,30,8,0.45)_100%)]
    "
  />
  <div
    className="
      relative mx-auto w-full max-w-[1180px]
      px-4
      sm:px-6
      md:px-6
      lg:px-6

      max-[360px]:px-3
    "
  >
    <div
      className="
        grid min-h-[640px] w-full min-w-0 grid-cols-1 gap-8
        pt-10 pb-14

        sm:min-h-[600px] sm:pt-11

        md:min-h-[560px]

        lg:min-h-[490px]
        lg:grid-cols-[minmax(0,1fr)_190px]
        lg:items-center
        lg:gap-12
        lg:pt-8
        lg:pb-16

        max-[480px]:min-h-0
        max-[480px]:gap-7
        max-[480px]:pt-8
        max-[480px]:pb-10

        max-[360px]:gap-6
        max-[360px]:pt-7
        max-[360px]:pb-8
      "
    >
      {/* Left content */}
      <motion.div
        variants={heroWrap}
        initial="hidden"
        animate="show"
        className="
          relative z-10
          w-full min-w-0 max-w-[680px]
        "
      >
        <motion.p
          variants={heroItem}
          className="
            mb-2
            text-[13px]
            font-medium
            text-white/95

            sm:text-[14px]
            lg:text-[15px]

            max-[360px]:text-[12px]
          "
        >
          International Conference on
        </motion.p>

        <motion.h1
          variants={heroItem}
          className="
            max-w-[680px]
            break-words
            text-[31px]
            font-semibold
            leading-[1.13]
            tracking-[-1px]
            text-white

            sm:text-[40px]
            md:text-[40px]
            lg:text-[40px]
            xl:text-[42px]

            max-[480px]:text-[31px]
            max-[400px]:text-[29px]
            max-[360px]:text-[27px]
          "
        >
          Entomology:
        </motion.h1>

        <motion.h1
          variants={heroItem}
          className="
            mt-1
            max-w-[680px]
            break-words
            text-[31px]
            font-medium
            leading-[1.13]
            tracking-[-1px]
            text-white

            sm:text-[34px]
            md:text-[36px]
            lg:text-[38px]
            xl:text-[38px]

            max-[480px]:text-[29px]
            max-[400px]:text-[27px]
            max-[360px]:text-[25px]
          "
        >
          Science for a Sustainable Future
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="
            mt-3
            max-w-full
            text-[15px]
            font-medium
            text-[#b7d264]

            sm:text-[16px]
            lg:text-[18px]

            max-[400px]:text-[14px]
            max-[360px]:text-[13.5px]
          "
        >
          Exploring Diversity, Innovation and Impact
        </motion.p>

        <motion.div
          variants={heroItem}
          className="
            mt-5
            flex
            min-w-0
            flex-wrap
            items-center
            gap-y-2
            text-[11px]
            font-medium
            text-white/95

            sm:text-[12.5px]

            max-[480px]:gap-x-3
            max-[400px]:items-start
            max-[400px]:gap-y-3
          "
        >
          <div
            className="
              flex min-w-0 items-center gap-2 pr-4
              sm:pr-3

              max-[400px]:w-full
              max-[400px]:pr-0
            "
          >
            <CalendarDays
              className="h-[18px] w-[18px] shrink-0 text-[#b7d264]"
              strokeWidth={1.8}
            />
            <span className="min-w-0">
              10 – 12 November 2026
            </span>
          </div>

          <span className="hidden h-6 w-px bg-white/40 sm:block" />

          <div
            className="
              flex min-w-0 items-center gap-2
              sm:px-3

              max-[400px]:w-full
              max-[400px]:px-0
            "
          >
            <MapPin
              className="h-[18px] w-[18px] shrink-0 text-[#b7d264]"
              strokeWidth={1.8}
            />
            <span className="min-w-0">
              New Delhi
            </span>
          </div>

          <span className="hidden h-6 w-px bg-white/40 md:block" />

          <div
            className="
              flex min-w-0 items-center gap-2
              md:pl-3

              max-[400px]:w-full
              max-[400px]:pl-0
            "
          >
            <Globe2
              className="h-[18px] w-[18px] shrink-0 text-[#b7d264]"
              strokeWidth={1.8}
            />
            <span className="min-w-0">
              Hybrid Conference
            </span>
          </div>
        </motion.div>

        <motion.p
          variants={heroItem}
          className="
            mt-5
            max-w-[480px]
            text-[13.5px]
            leading-[1.85]
            text-white/90

            max-[480px]:max-w-full
            max-[400px]:text-[13px]
            max-[360px]:text-[12.5px]
            max-[360px]:leading-[1.75]
          "
        >
          A global platform for researchers, academicians and industry
          professionals to exchange knowledge and advance entomological
          science for a sustainable world.
        </motion.p>

        <motion.div
          variants={heroItem}
          className="
            mt-6
            flex
            w-full
            min-w-0
            flex-wrap
            gap-3

            max-[400px]:gap-2.5
          "
        >
          <HeroButton
            to="/submit-paper"
            icon={Send}
            variant="green"
          >
            Submit Your Paper
          </HeroButton>

          <HeroButton
            to="/call-for-papers"
            icon={ArrowRight}
            variant="yellow"
          >
            View Important Dates
          </HeroButton>
        </motion.div>
      </motion.div>

      {/* Desktop stats card */}
      <motion.aside
        variants={statsCardAnim}
        initial="hidden"
        animate="show"
        className="
          hidden overflow-hidden
          rounded-[14px]
          border border-[#7f993d]/35
          bg-[linear-gradient(180deg,rgba(4,42,12,0.88)_0%,rgba(3,35,9,0.82)_100%)]
          px-4 py-3
          backdrop-blur-[8px]
          shadow-[0_18px_40px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.04)]

          lg:block
        "
      >
        {heroStats.map((stat, index) => {
          const StatIcon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              whileHover={{ x: 4 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 22,
              }}
              className={`
                group flex min-h-[68px] items-center gap-3 px-[2px]

                ${
                  index !== heroStats.length - 1
                    ? "border-b border-white/[0.07]"
                    : ""
                }
              `}
            >
              <div
                className="
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  text-[#bbd86c]
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:text-[#d5ea87]
                "
              >
                <StatIcon
                  className="h-[28px] w-[28px]"
                  strokeWidth={1.5}
                />
              </div>

              <div className="min-w-0">
                <p className="text-[18px] font-semibold leading-none text-white">
                  {stat.value}
                </p>

                <p className="mt-1 text-[10.5px] leading-[1.2] text-white/90">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.aside>

      {/* Mobile / tablet stats */}
      <motion.div
        variants={heroWrap}
        initial="hidden"
        animate="show"
        className="
          relative z-10
          grid w-full min-w-0
          grid-cols-2 gap-2
          rounded-[12px]
          border border-[#849b46]/25
          bg-[#052b0c]/80
          p-3
          backdrop-blur-md
          shadow-[0_12px_30px_rgba(0,0,0,0.15)]

          lg:hidden

          max-[360px]:grid-cols-1
          max-[360px]:p-2.5
        "
      >
        {heroStats.map((stat) => {
          const StatIcon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              variants={heroItem}
              whileHover={{ y: -2 }}
              className="
                flex min-h-[64px] min-w-0
                items-center gap-2.5
                rounded-[9px]
                border border-white/[0.05]
                bg-white/[0.04]
                px-3 py-2
                transition-all duration-300
                hover:bg-white/[0.07]

                max-[400px]:px-2.5
                max-[380px]:gap-2
              "
            >
              <StatIcon
                className="
                  h-6 w-6 shrink-0
                  text-[#bad56a]

                  max-[380px]:h-5
                  max-[380px]:w-5
                "
                strokeWidth={1.5}
              />

              <div className="min-w-0">
                <p
                  className="
                    break-words
                    text-[12px]
                    font-semibold
                    text-white
                  "
                >
                  {stat.value}
                </p>

                <p
                  className="
                    mt-[2px]
                    break-words
                    text-[7px]
                    leading-[1.3]
                    text-white/65
                  "
                >
                  {stat.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </div>
</section>

    {/* HERO HIGHLIGHTS / FEATURES STRIP */}

<section className="relative z-30 bg-transparent">

  <div
    className="
      mx-auto
      w-full
      max-w-[1180px]
      px-4
      sm:px-6
    
    "
  >
    <motion.div
      initial={{
        opacity: 0,
        y: 28,
        scale: 0.985,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        -mt-[38px]

        grid
        grid-cols-2

        overflow-hidden

        rounded-[18px]

        border
        border-[#e4e7df]

        bg-[linear-gradient(180deg,#ffffff_0%,#fdfefc_100%)]

        shadow-[0_12px_30px_rgba(25,53,22,0.10),0_2px_5px_rgba(0,0,0,0.03)]

        sm:grid-cols-3

        lg:-mt-[50px]
        lg:grid-cols-6

        xl:rounded-[19px]
      "
    >
      {highlights.map((item, index) => {
        const HighlightIcon = item.icon;

        return (
          <motion.div
            key={item.label}
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.065,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -4,
            }}
            className={`
              group
              relative

              flex
              min-h-[118px]
              cursor-default
              flex-col
              items-center
              justify-center

              px-3
              py-[18px]

              text-center

              transition-colors
              duration-300

              hover:bg-[linear-gradient(180deg,#ffffff_0%,#f6f9f3_100%)]

              sm:min-h-[115px]
              sm:px-4
              sm:py-[20px]

              lg:min-h-[112px]
              lg:px-4
              lg:py-[12px]

           

              ${
                /* Mobile: vertical divider between 2 columns */
                index % 2 !== 0
                  ? "border-l border-[#e0e5dc]"
                  : ""
              }

              ${
                /* Mobile rows */
                index >= 2
                  ? "border-t border-[#e0e5dc]"
                  : ""
              }

              ${
                /* Tablet = 3 columns */
                index % 3 !== 0
                  ? "sm:border-l sm:border-[#e0e5dc]"
                  : "sm:border-l-0"
              }

              ${
                index >= 3
                  ? "sm:border-t sm:border-[#e0e5dc]"
                  : "sm:border-t-0"
              }

              ${
                /* Desktop = reference layout: only vertical dividers */
                index > 0
                  ? "lg:border-l lg:border-[#dde2d9]"
                  : "lg:border-l-0"
              }

              lg:border-t-0
            `}
          >
            {/* =================================================
                HOVER BACKGROUND GLOW
            ================================================= */}

            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-x-[15%]
                bottom-0
                h-[45%]

                bg-[radial-gradient(ellipse_at_bottom,rgba(92,127,68,0.09)_0%,transparent_70%)]

                opacity-0

                transition-opacity
                duration-300

                group-hover:opacity-100
              "
            />

            {/* =================================================
                ICON
            ================================================= */}

            <motion.div
              className="
                relative
                z-10

                mb-[10px]

                flex
                h-[32px]
                w-[30px]
                items-center
                justify-center

                text-[#3f6a35]

                sm:h-[34px]
                sm:w-[30px]

                lg:mb-[11px]
                lg:h-[33px]
                lg:w-[32px]
              "
            >
              <HighlightIcon
                strokeWidth={1.35}
                className="
                  h-[34px]
                  w-[34px]

                  transition-all
                  duration-300
                  ease-out

                  group-hover:scale-[1.12]
                  group-hover:text-[#6f963e]

                  sm:h-[36px]
                  sm:w-[36px]

                  lg:h-[39px]
                  lg:w-[39px]
                "
              />
            </motion.div>

            {/* =================================================
                LABEL
            ================================================= */}

            <p
              className="
                relative
                z-10

                whitespace-pre-line

                text-[12px]
                font-semibold
                leading-[1.42]
                tracking-[-0.2px]

                text-[#1e301d]

                transition-colors
                duration-300

                group-hover:text-[#466b37]

                sm:text-[13px]

                lg:text-[13px]
                lg:leading-[1.45]

              
              "
            >
              {item.label}
            </p>

            {/* =================================================
                SMALL HOVER LINE
            ================================================= */}

            <span
              aria-hidden="true"
              className="
                absolute
                bottom-0
                left-1/2

                h-[2px]
                w-0

                -translate-x-1/2

                rounded-full

                bg-[linear-gradient(90deg,#7b9e48,#4f773c)]

                transition-all
                duration-300

                group-hover:w-[38%]
              "
            />
          </motion.div>
        );
      })}
    </motion.div>
  </div>
</section>


     {/* =========================================================
    ABOUT THE CONFERENCE
========================================================= */}

<section className="relative bg-white py-[30px] sm:py-[34px] lg:py-[39px]">
  <PageContainer>
    <div
      className="
        grid
        grid-cols-1
        items-center
        gap-[24px]

        md:gap-[28px]

        lg:grid-cols-[0.99fr_1.10fr]
        lg:gap-[38px]

       
      "
    >
      {/* =====================================================
          LEFT CONTENT
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          x: -28,
          y: 8,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative"
      >
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.08,
          }}
          className="flex items-center gap-[10px]"
        >
          <motion.div
            whileHover={{
              rotate: -12,
              scale: 1.12,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 16,
            }}
            className="flex shrink-0 items-center justify-center"
          >
            <Leaf
              className="
                h-[20px]
                w-[20px]
                fill-[#65953b]
                text-[#65953b]

                sm:h-[21px]
                sm:w-[21px]
              "
              strokeWidth={1.6}
            />
          </motion.div>

          <h2
            className="
              text-[22px]
              font-semibold
              leading-tight
              tracking-[-0.3px]
              text-[#182819]

              sm:text-[22px]

              lg:text-[24px]
            "
          >
            About the Conference
          </h2>
        </motion.div>

        {/* Paragraph 1 */}

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: 0.13,
          }}
          className="
            mt-[14px]
            max-w-[480px]
text-justify
            text-[12px]
            font-normal
            leading-[1.68]
            tracking-[-0.06px]
            text-[#101310]

            sm:text-[12.5px]

            lg:text-[13px]

            xl:text-[13.5px]
          "
        >
          The International Conference on Entomology brings together leading
          experts, researchers and practitioners to discuss the latest
          advancements in entomological research and its applications in a
          rapidly changing world.
        </motion.p>

        {/* Paragraph 2 */}

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: 0.18,
          }}
          className="
            mt-[13px]
            max-w-[480px]
            text-justify
            text-[12px]
            font-normal
            leading-[1.68]
            tracking-[-0.06px]
            text-[#101310]

            sm:text-[12.5px]

            lg:text-[13px]

            xl:text-[13.5px]
          "
        >
          This conference aims to foster collaboration, share innovative ideas
          and inspire solutions for the challenges impacting insects,
          ecosystems and human well-being.
        </motion.p>

        {/* =====================================================
            BUTTON
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 14,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: 0.23,
          }}
          className="mt-[19px]"
        >
          <Link
            to="/about"
            className="
              group
              relative

              inline-flex
              min-h-[40px]
              items-center
              justify-between
              gap-[16px]

              overflow-hidden

              rounded-[6px]

              border
              border-[#71953b]

              bg-[linear-gradient(180deg,#6d963a_0%,#5c872e_46%,#4d761f_100%)]

              px-[18px]
              py-[10px]

              text-[13px]
              font-medium
              tracking-[-0.05px]
              text-white

              shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_5px_12px_rgba(54,91,28,0.16)]

              transition-all
              duration-300
              ease-out

              hover:-translate-y-[2px]
              hover:border-[#8caf4d]
              hover:bg-[linear-gradient(180deg,#79a342_0%,#679337_46%,#568126_100%)]
              hover:shadow-[0_8px_19px_rgba(58,91,30,0.24)]

              active:translate-y-0

              sm:min-w-[267px]
              sm:text-[13px]
            "
          >
            {/* Hover shine */}

            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-y-0
                -left-[35%]
                w-[28%]
                -skew-x-[20deg]
                bg-white/10
                blur-[2px]

                transition-all
                duration-700

                group-hover:left-[120%]
              "
            />

            <span className="relative z-10">
              Learn More About the Conference
            </span>

            <ArrowRight
              className="
                relative
                z-10

                h-[16px]
                w-[16px]
                shrink-0

                text-white

                transition-transform
                duration-300

                group-hover:translate-x-[4px]
              "
              strokeWidth={1.8}
            />
          </Link>
        </motion.div>
      </motion.div>

      {/* =====================================================
          RIGHT BUTTERFLY IMAGE
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          x: 32,
          scale: 0.985,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.75,
          delay: 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          group
          relative

          h-[220px]
          w-full

          overflow-hidden

          rounded-[7px]

          bg-[#58783b]

          shadow-[0_5px_15px_rgba(21,51,16,0.08)]

          sm:h-[285px]

          md:h-[320px]

          lg:h-[264px]

          xl:h-[275px]
        "
      >
        {/* Butterfly Image */}

        <img
        src={aboutButterfly}
          alt="Monarch butterfly resting on white flowers"
          loading="lazy"
          className="
            h-full
            w-full
    

         

            transition-transform
            duration-[1100ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]

            group-hover:scale-[1.045]
          "
        />

     

        {/* ===================================================
            BOTTOM CAPTION
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 14,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.3,
          }}
          className="
            absolute

            bottom-[11px]
            left-[13px]
            right-[13px]

            flex
            min-h-[56px]
            items-center
            gap-[13px]

            overflow-hidden

            rounded-[7px]

            border
            border-white/[0.04]

            bg-[linear-gradient(90deg,rgba(3,43,11,0.95)_0%,rgba(4,48,12,0.91)_55%,rgba(3,41,10,0.93)_100%)]

            px-[19px]
            py-[9px]

            shadow-[0_5px_15px_rgba(0,0,0,0.14)]

            backdrop-blur-[5px]

            transition-all
            duration-300

            group-hover:bottom-[14px]
            group-hover:bg-[linear-gradient(90deg,rgba(4,48,12,0.97)_0%,rgba(5,55,14,0.94)_55%,rgba(3,44,11,0.96)_100%)]

            sm:left-[14px]
            sm:right-[14px]

            lg:min-h-[55px]
          "
        >
          {/* Leaf Icon */}

          <motion.div
            whileHover={{
              rotate: -8,
              scale: 1.08,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 17,
            }}
            className="
              flex
              h-[32px]
              w-[32px]
              shrink-0
              items-center
              justify-center
            "
          >
            <Leaf
              className="
                h-[29px]
                w-[29px]
                text-[#a6c769]

                transition-colors
                duration-300

                group-hover:text-[#bbd77c]
              "
              strokeWidth={1.25}
            />
          </motion.div>

          {/* Caption text */}

          <div className="min-w-0">
            <p
              className="
                text-[10px]
                font-semibold
                leading-[1.3]
                tracking-[-0.12px]
                text-white

                sm:text-[11px]

                lg:text-[11px]

                xl:text-[14.5px]
              "
            >
              Entomology for People, Planet and Prosperity
            </p>

            <p
              className="
                mt-[3px]
                text-[8px]
                font-normal
                leading-tight
                text-white/75

                sm:text-[8.5px]

                lg:text-[13px]
              "
            >
              Research. Innovate. Sustain.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </PageContainer>
</section>

      {/* =====================================================
          CONFERENCE THEMES
      ===================================================== */}

 

<section
  className="
    relative
    overflow-hidden
    bg-white
    pb-[30px]
    pt-[14px]
    sm:pb-[34px]
    sm:pt-[18px]
    lg:pb-[30px]
    lg:pt-[25px]
  "
>
  <PageContainer>
    <div className="mx-auto w-full max-w-[1110px]">

      {/* =====================================================
          SECTION HEADING
      ====================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          mb-[15px]
          flex
          items-center
          justify-center
          gap-[16px]
          sm:gap-[20px]
        "
      >
        {/* LEFT LEAF */}

        <motion.div
          initial={{ opacity: 0, x: -10, rotate: -15 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: 0.12,
          }}
          whileHover={{
            x: -3,
            rotate: -8,
          }}
          className="flex items-center"
        >
          <Leaf
            className="
              h-[22px]
              w-[30px]
              -rotate-[105deg]
              fill-[#587d3b]
              text-[#587d3b]
              sm:h-[24px]
              sm:w-[32px]
            "
            strokeWidth={1.2}
          />
        </motion.div>

        {/* TITLE */}

        <h2
          className="
            text-center
            text-[22px]
            font-semibold
            leading-none
            tracking-[-0.35px]
            text-[#172719]

            sm:text-[22px]
            lg:text-[24px]
          "
        >
          Conference Themes
        </h2>

        {/* RIGHT LEAF */}

        <motion.div
          initial={{ opacity: 0, x: 10, rotate: 15 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: 0.12,
          }}
          whileHover={{
            x: 3,
            rotate: 8,
          }}
          className="flex items-center"
        >
          <Leaf
            className="
              h-[22px]
              w-[30px]
              rotate-[75deg]
              fill-[#587d3b]
              text-[#587d3b]
              sm:h-[24px]
              sm:w-[32px]
            "
            strokeWidth={1.2}
          />
        </motion.div>
      </motion.div>

      {/* =====================================================
          THEMES GRID
      ====================================================== */}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.12,
        }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.065,
            },
          },
        }}
        className="
          grid
          grid-cols-1
          gap-[11px]

          min-[430px]:grid-cols-2
          min-[430px]:gap-[12px]
mt-12
          md:grid-cols-4
          md:gap-x-[12px]
          md:gap-y-[12px]
        "
      >
        {themes.map((theme, index) => {
          const ThemeIcon = theme.icon;

          return (
            <motion.div
              key={theme.title}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                  scale: 0.975,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.52,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              whileHover={{
                y: -4,
                scale: 1.012,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 22,
              }}
              className="
                group
                relative

                flex
                min-h-[82px]
                cursor-default
                items-center

                gap-[15px]

                overflow-hidden

                rounded-[8px]

                border
                border-[#e1e5dc]

                bg-[linear-gradient(180deg,#fdfefb_0%,#fafbf7_100%)]

                px-[18px]
                py-[15px]

                shadow-[0_2px_7px_rgba(38,67,31,0.025)]

                transition-[border-color,box-shadow,background-color]
                duration-300

                hover:border-[#cbd6c3]

                hover:bg-[linear-gradient(180deg,#ffffff_0%,#f7faf4_100%)]

                hover:shadow-[0_10px_25px_rgba(37,68,30,0.095)]

                sm:min-h-[84px]

                md:min-h-[87px]
                md:px-[18px]

                lg:min-h-[88px]
                lg:px-[16px]
              "
            >
              {/* subtle green hover glow */}

              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -left-[30px]
                  top-1/2

                  h-[80px]
                  w-[80px]

                  -translate-y-1/2

                  rounded-full

                  bg-[#77995c]/0
                  blur-[22px]

                  transition-all
                  duration-500

                  group-hover:bg-[#77995c]/10
                "
              />

              {/* ICON */}

              <motion.span
                className="
                  relative
                  z-10

                  flex
                  h-[40px]
                  w-[40px]
                  shrink-0
                  items-center
                  justify-center

                  text-[#4f7043]

                  sm:h-[48px]
                  sm:w-[48px]
                "
              >
                <ThemeIcon
                  className="
                    h-[32px]
                    w-[32px]

                    transition-all
                    duration-300

                    group-hover:scale-[1.10]
                    group-hover:text-[#668b48]

                    sm:h-[34px]
                    sm:w-[34px]
                  "
                  strokeWidth={1.4}
                />
              </motion.span>

              {/* TEXT */}

              <p
                className="
                  relative
                  z-10

                  whitespace-pre-line

                  text-[11px]
                  font-semibold
                  leading-[1.35]
                  tracking-[-0.18px]

                  text-[#1d2e20]

                  transition-colors
                  duration-300

                  group-hover:text-[#42633a]

                  sm:text-[11.5px]

                  md:text-[12px]

                  lg:text-[13px]
                "
              >
                {theme.title}
              </p>

              {/* bottom hover accent */}

              <span
                aria-hidden="true"
                className="
                  absolute
                  bottom-0
                  left-1/2

                  h-[2px]
                  w-0

                  -translate-x-1/2

                  bg-[linear-gradient(90deg,transparent,#769653,transparent)]

                  transition-all
                  duration-400

                  group-hover:w-[60%]
                "
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* =====================================================
          VIEW AIMS & SCOPE BUTTON
      ====================================================== */}

      {/* <motion.div
        initial={{
          opacity: 0,
          y: 12,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.55,
          delay: 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          mt-[8px]
          flex
          justify-center
          sm:mt-[36px]
        "
      >
        <Link
          to="/aim-scope"
          className="
            group
            relative

            inline-flex
            min-h-[32px]
            min-w-[168px]

            items-center
            justify-center

            overflow-hidden

            rounded-[5px]

            border-[1.5px]
            border-[#527148]

            bg-[linear-gradient(180deg,#ffffff_0%,#fafcf8_100%)]

            px-[17px]
            py-[6px]

            text-[10px]
            font-semibold
            leading-none
            tracking-[-0.08px]

            text-[#203222]

            shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_5px_rgba(44,71,36,0.08)]

            transition-all
            duration-300
            ease-out

            hover:-translate-y-[2px]
            hover:border-[#48693d]

            hover:bg-[linear-gradient(180deg,#63863e_0%,#527531_48%,#426325_100%)]

            hover:text-white

            hover:shadow-[0_7px_16px_rgba(47,77,36,0.18)]

            active:translate-y-0

            sm:min-w-[170px]
            sm:text-[10.5px]
          "
        >
         

          <span
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              inset-y-0
              -left-[40%]

              w-[30%]

              -skew-x-[20deg]

              bg-white/20

              transition-all
              duration-700

              group-hover:left-[120%]
            "
          />

          <span className="relative z-10">
            View Aims &amp; Scope
          </span>
        </Link>
      </motion.div> */}
    </div>
  </PageContainer>
</section>

    

    {/* =========================================================
    IMPORTANT DATES + PUBLICATION PARTNER
========================================================= */}

<section
  className="
    relative
    bg-white
    pb-[26px]
    pt-[8px]
    sm:pb-[30px]
    sm:pt-[5px]
    lg:pb-[20px]
  "
>
  <PageContainer>
    <div
      className="
        mx-auto
        grid
        w-full
        max-w-[1110px]
        grid-cols-1
        gap-[14px]

        lg:grid-cols-[0.96fr_1.04fr]
        lg:gap-[26px]

        xl:grid-cols-[0.95fr_1.05fr]
      "
    >
      {/* =====================================================
          IMPORTANT DATES CARD
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          x: -28,
          y: 12,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          y: -2,
        }}
        className="
          group/card

          overflow-hidden

          rounded-[9px]

          border
          border-[#dfe4da]

          bg-[linear-gradient(180deg,#fdfefb_0%,#fafbf8_100%)]

          px-[10px]
          pb-[10px]
          pt-[11px]

          shadow-[0_3px_11px_rgba(34,62,28,0.035)]

          transition-all
          duration-300

          hover:border-[#d2dacd]
          hover:shadow-[0_9px_24px_rgba(32,64,28,0.075)]

          sm:px-[12px]
          sm:pb-[12px]
          sm:pt-[13px]
        "
      >
        {/* ===================================================
            HEADER
        ==================================================== */}

        <div
          className="
            mb-[10px]
            flex
            items-center
            justify-between
            gap-3

            px-[4px]
            sm:px-[5px]
          "
        >
          <div className="flex items-center gap-[9px]">
            <CalendarDays
              className="
                h-[24px]
                w-[24px]
                text-[#466b3d]
              "
              strokeWidth={1.5}
            />

            <h3
              className="
                text-[14px]
                font-semibold
                leading-none
                tracking-[-0.2px]
                text-[#1c301f]

                sm:text-[17px]
              "
            >
              Important Dates
            </h3>
          </div>

          {/* View all dates */}

          <Link
            to="/call-for-papers"
            className="
              group/link

              inline-flex
              items-center
              gap-[6px]

              border-b
              border-[#45653f]

              pb-[1px]

              text-[9px]
              font-medium
              leading-none
               hover:text-[#2d472d]

              transition-all
              duration-300

              hover:border-[#72944c]
             text-[#668a44]

              sm:text-[11.5px]
            "
          >
            <span>View All Dates</span>

            <ArrowRight
              className="
                h-[12px]
                w-[12px]

                transition-transform
                duration-300

                group-hover/link:translate-x-[3px]
              "
              strokeWidth={1.8}
            />
          </Link>
        </div>

        {/* ===================================================
            INNER DATES PANEL
        ==================================================== */}

        <div
          className="
            overflow-hidden
mt-6
            rounded-[7px]

            border
            border-[#e5e8e2]

            bg-white

            shadow-[0_2px_7px_rgba(28,54,24,0.02)]
          "
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.07,
                  delayChildren: 0.08,
                },
              },
            }}
            className="
              grid
              grid-cols-2

              sm:grid-cols-4
            "
          >
            {importantDates.map((item, index) => {
              const DateIcon = item.icon;

              return (
                <motion.div
                  key={`${item.date}-${item.label}`}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 15,
                    },

                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.48,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  className={`
                    group/date
                    relative

                    flex
                    min-h-[126px]
                    cursor-default
                    flex-col
                    items-center
                    justify-start

                    px-[7px]
                    pb-[12px]
                    pt-[14px]

                    text-center

                    transition-colors
                    duration-300

                    hover:bg-[#f8faf6]

                    sm:min-h-[129px]
                    sm:px-[4px]

                    ${
                      index % 2 !== 0
                        ? "border-l border-[#e2e6df]"
                        : ""
                    }

                    ${
                      index >= 2
                        ? "border-t border-[#e2e6df] sm:border-t-0"
                        : ""
                    }

                    ${
                      index > 0
                        ? "sm:border-l sm:border-[#e2e6df]"
                        : "sm:border-l-0"
                    }
                  `}
                >
                  {/* subtle hover glow */}

                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-x-[20%]
                      top-0
                      h-[45px]

                      bg-[radial-gradient(circle_at_top,rgba(91,125,73,0.10)_0%,transparent_70%)]

                      opacity-0

                      transition-opacity
                      duration-300

                      group-hover/date:opacity-100
                    "
                  />

                  {/* Icon */}

                  <DateIcon
                    className="
                      relative
                      z-10

                      mb-[11px]

                      h-[30px]
                      w-[30px]

                      text-[#547a49]

                      transition-all
                      duration-300

                      group-hover/date:scale-110
                      group-hover/date:text-[#6a914f]
                    "
                    strokeWidth={1.35}
                  />

                  {/* Date */}

                  <p
                    className="
                      relative
                      z-10

                      whitespace-nowrap

                      text-[10px]
                      font-semibold
                      leading-tight
                      tracking-[-0.12px]

                      text-[#203122]

                      sm:text-[10px]

                      lg:text-[9.5px]

                      xl:text-[11px]
                    "
                  >
                    {item.date}
                  </p>

                  {/* Description */}

                  <p
                    className="
                      relative
                      z-10

                      mt-[8px]

                      whitespace-pre-line

                      text-[9px]
                      font-normal
                      leading-[1.45]

                      text-[#545e54]

                      sm:text-[10px]
                    "
                  >
                    {item.label}
                  </p>

                  {/* bottom hover accent */}

                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-0
                      left-1/2

                      h-[2px]
                      w-0

                      -translate-x-1/2

                      bg-[linear-gradient(90deg,transparent,#749655,transparent)]

                      transition-all
                      duration-300

                      group-hover/date:w-[58%]
                    "
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* =====================================================
          PUBLICATION PARTNER CARD
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          x: 28,
          y: 12,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.72,
          delay: 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          y: -2,
        }}
        className="
          group/publication

          rounded-[9px]

          border
          border-[#dfe4da]

          bg-[linear-gradient(180deg,#fdfefb_0%,#fafbf8_100%)]

          px-[14px]
          pb-[12px]
          pt-[12px]

          shadow-[0_3px_11px_rgba(34,62,28,0.035)]

          transition-all
          duration-300

          hover:border-[#d1dacb]
          hover:shadow-[0_9px_24px_rgba(32,64,28,0.075)]

          sm:px-[16px]
        "
      >
        {/* Header */}

        <div
          className="
            mb-[9px]
            flex
            items-center
            gap-[9px]
          "
        >
          <BookOpen
            className="
              h-[24px]
              w-[24px]
              text-[#456b3c]
            "
            strokeWidth={1.45}
          />

          <h3
            className="
              text-[14px]
              font-semibold
              leading-none
              tracking-[-0.2px]
              text-[#1c301f]

              sm:text-[17px]
            "
          >
            Publication Partner
          </h3>
        </div>

        {/* ===================================================
            PUBLICATION CONTENT
        ==================================================== */}

        <div
          className="
            flex
            flex-col
            gap-[15px]

            min-[440px]:flex-row
            min-[440px]:items-start

            sm:gap-[18px]
          "
        >
          {/* =================================================
              JOURNAL COVER
          ================================================== */}

          <motion.div
         
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="
              group/cover
              relative

              mx-auto
              w-[105px]
              shrink-0

              overflow-hidden

              rounded-[3px]

              bg-[#10220d]

              shadow-[0_5px_13px_rgba(0,0,0,0.16)]

              min-[440px]:mx-0

              sm:w-[110px]
            "
          >
            <img
              src={coverimg}
              alt="Journal of Entomological Research cover"
              loading="lazy"
              className="
                h-[147px]
                w-full

                object-cover

                transition-transform
                duration-[750ms]
                ease-out


                sm:h-[152px]
              "
            />

            {/* subtle cover hover overlay */}

            <span
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0

                bg-white/0

                transition-colors
                duration-300

                group-hover/cover:bg-white/[0.025]
              "
            />
          </motion.div>

          {/* =================================================
              JOURNAL DETAILS
          ================================================== */}

          <div className="min-w-0 flex-1">
            {/* Journal name */}

            <motion.p
              initial={{
                opacity: 0,
                y: 8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.18,
              }}
              className="
                text-[15px]
                font-semibold
                leading-[1.28]
                tracking-[-0.25px]

                text-[#17301c]

                sm:text-[15px]
                lg:text-[16px]
                xl:text-[16px]
              "
            >
              Journal of Entomological Research
            </motion.p>

            {/* =================================================
                SCOPUS BADGE
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: 0.22,
              }}
              className="mt-[9px]"
            >
              <span
                className="
                  group/badge

                  inline-flex
                  items-center
              

                  rounded-[4px]

                  border
                  border-[#41652f]

                  bg-[linear-gradient(180deg,#426c26_0%,#31581b_100%)]

                  px-[9px]
                  py-[5px]

                  text-[10px]
                  font-semibold
                  leading-none

                  text-white

                  shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_2px_5px_rgba(43,75,26,0.12)]

                  transition-all
                  duration-300

                  hover:border-[#698d45]
                  hover:bg-[linear-gradient(180deg,#507d30_0%,#3a6520_100%)]
                "
              >
              

                Scopus Indexed
              </span>
            </motion.div>

            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.26,
              }}
              className="
                mt-[10px]

                max-w-[390px]

                text-[9px]
                font-normal
                leading-[1.65]
                tracking-[-0.02px]

                text-[#3d483e]

                sm:text-[9.5px]

                lg:text-[9px]

                xl:text-[11.5px]
              "
            >
              Selected high-quality papers will be recommended for publication
              in the Journal of Entomological Research and other reputed Scopus
              indexed journals.
            </motion.p>

            {/* =================================================
                PUBLICATION LINK
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 6,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.3,
              }}
              className="mt-[3px]"
            >
              <Link
                to="/publication"
                className="
                  group/more

                  inline-flex
                  items-center
                  gap-[6px]

                  border-b
                  border-[#557650]

                  pb-[1px]

                  text-[8.5px]
                  font-medium
                  leading-none

                  hover:text-[#355536]

                  transition-all
                  duration-300

                  hover:border-[#789d55]
                  text-[#658d49]

                  sm:text-[11px]
                "
              >
                <span>Learn more about publication</span>

                <ArrowRight
                  className="
                    h-[11px]
                    w-[11px]

                    transition-transform
                    duration-300

                    group-hover/more:translate-x-[4px]
                  "
                  strokeWidth={1.8}
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  </PageContainer>
</section>

      

   {/* =========================================================
    SUBMIT PAPER CTA
========================================================= */}

<section
  className="
    relative
    w-full
    overflow-hidden
    bg-white
    pt-[4px]
  "
>
  <PageContainer>
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
        scale: 0.985,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -2,
      }}
      className="
        group
        relative
        mx-auto
        w-full
        min-w-0
        max-w-[1110px]

        overflow-hidden
        rounded-[7px]

        border
        border-[#315632]/20

        bg-[#07350d]
        bg-cover
        bg-center
        bg-no-repeat

        shadow-[0_6px_18px_rgba(13,52,17,0.10)]

        transition-all
        duration-300

        hover:shadow-[0_10px_28px_rgba(13,52,17,0.16)]

        min-h-[108px]

        sm:min-h-[119px]

        lg:min-h-[128px]
      "
      style={{
        backgroundImage: `url(${bgcta})`,
      }}
    >
      {/* Mobile overlay */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          bg-[linear-gradient(90deg,rgba(3,35,8,0.63)_0%,rgba(3,39,8,0.80)_48%,rgba(3,39,8,0.72)_100%)]

          sm:hidden
        "
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10

          flex
          min-h-[128px]
          w-full
          min-w-0
          flex-col
          items-center
          justify-center

          px-[20px]
          py-[13px]

          text-center

          sm:min-h-[106px]
          sm:items-start
          sm:pl-[39%]
          sm:pr-[20%]
          sm:text-left

          md:pl-[40%]
          md:pr-[19%]

          lg:min-h-[108px]
          lg:pl-[40%]
          lg:pr-[18%]

          xl:pl-[40.5%]

          max-[480px]:px-[18px]
          max-[400px]:px-[15px]
          max-[360px]:px-[12px]
          max-[340px]:px-[10px]
        "
      >
        {/* TEXT */}

        <motion.p
          initial={{
            opacity: 0,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.12,
          }}
          className="
            w-full
            min-w-0
            max-w-[410px]

            text-[11px]
            font-medium
            leading-[1.35]
            tracking-[-0.12px]
            text-white/90

            sm:text-[11px]

            md:text-[11.5px]

            lg:text-[14.5px]

            max-[360px]:text-[10.5px]
            max-[340px]:text-[10px]
          "
        >
          Be a part of advancing entomological science
          <br className="hidden sm:block" />
          and building a sustainable future.
        </motion.p>

        {/* ===================================================
            CTA BUTTON
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 9,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="
            mt-[8px]
            flex
            w-full
            min-w-0
            justify-center

            sm:justify-start
          "
        >
          <Link
            to="/submit-paper"
            className="
              group/button
              relative
              mt-1

              inline-flex
              min-h-[34px]
              max-w-full
              items-center
              justify-center

              gap-[12px]

              overflow-hidden

              rounded-[4px]

              border
              border-[#7ea843]

              bg-[linear-gradient(180deg,#79a743_0%,#659331_48%,#567f25_100%)]

              px-[17px]
              py-[7px]

              text-center
              text-[11px]
              font-semibold
              leading-none
              tracking-[-0.04px]

              text-white

              shadow-[inset_0_1px_0_rgba(224,243,181,0.20),0_4px_11px_rgba(5,30,8,0.18)]

              transition-all
              duration-300
              ease-out

              hover:-translate-y-[2px]

              hover:border-[#9abd5a]

              hover:bg-[linear-gradient(180deg,#88b450_0%,#72a23c_48%,#608c2d_100%)]

              hover:shadow-[inset_0_1px_0_rgba(240,250,210,0.30),0_7px_17px_rgba(5,30,8,0.23)]

              active:translate-y-0

              sm:min-w-[213px]
              sm:text-[11.5px]

              lg:min-h-[35px]
              lg:px-[18px]
              lg:text-[12px]

              max-[360px]:gap-[9px]
              max-[360px]:px-[14px]
              max-[340px]:gap-[7px]
              max-[340px]:px-[11px]
              max-[340px]:text-[10.5px]
            "
          >
            {/* animated shine */}

            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-y-0
                -left-[38%]

                w-[28%]

                -skew-x-[20deg]

                bg-white/12

                blur-[1px]

                transition-all
                duration-700

                group-hover/button:left-[120%]
              "
            />

            <span className="relative z-10 whitespace-nowrap">
              Submit Your Paper Today
            </span>

            <ArrowRight
              className="
                relative
                z-10

                h-[14px]
                w-[14px]
                shrink-0

                text-white

                transition-transform
                duration-300

                group-hover/button:translate-x-[4px]

                lg:h-[15px]
                lg:w-[15px]

                max-[340px]:h-[13px]
                max-[340px]:w-[13px]
              "
              strokeWidth={1.9}
            />
          </Link>
        </motion.div>
      </div>

      {/* subtle hover highlight */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          bg-white/0

          transition-colors
          duration-500

          group-hover:bg-white/[0.012]
        "
      />
    </motion.div>
  </PageContainer>
</section>
    </main>
  );
}