import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Leaf,
  FileUp,
  UsersRound,
  Languages,
  ClipboardList,
  Quote,
  Copyright,
  FileText,
  Image as ImageIcon,
  BookOpen,
  FileCheck2,
  CheckCircle2,
  Monitor,
  UploadCloud,
  Mail,
  ClipboardCheck,
  Headphones,
  Download,
  ArrowRight,
} from "lucide-react";

import Icon from "../components/Icon";

import {
  generalGuidelines,
  manuscriptPreparation,
  beforeYouSubmit,
  submissionProcess,
} from "../data/siteData";

import bg from "../assets/img/bghome.png";
import bgcta from "../assets/img/subcta.png";
import bg2 from "../assets/img/sub2.png";

/* =========================================================
   ICONS
========================================================= */

const guidelineIcons = [
  FileUp,
  UsersRound,
  Languages,
  ClipboardList,
  Quote,
  Copyright,
  UsersRound,
];

const preparationIcons = [
  FileText,
  ImageIcon,
  BookOpen,
  FileCheck2,
];

const processIcons = [
  Monitor,
  UploadCloud,
  FileCheck2,
  Mail,
  UsersRound,
  ClipboardCheck,
];

const ease = [0.22, 1, 0.36, 1];

/* =========================================================
   PAGE
========================================================= */

export default function Submission() {
  return (
    <>
      {/* =====================================================
          ONE WIDTH SYSTEM FOR ALL 3 SECTIONS

          Desktop:
          1180px total width
          32px horizontal padding

          Mobile:
          20px

          Small Mobile:
          16px
      ====================================================== */}

      <style>{`
        .submission-page-container {
          width: 100% !important;
          max-width: 1180px !important;

          margin-left: auto !important;
          margin-right: auto !important;

          padding-left: 32px !important;
          padding-right: 32px !important;

          box-sizing: border-box !important;
          min-width: 0 !important;
        }

        @media (max-width: 640px) {
          .submission-page-container {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }

        @media (max-width: 390px) {
          .submission-page-container {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>

      {/* =========================================================
          01. HERO
      ========================================================== */}

      <section
        className="
          group
          relative
          isolate
          w-full
          min-w-0
          overflow-hidden
          bg-[#06250b]

          pt-[70px]
          sm:pt-[140px]
        "
      >
        {/* =====================================================
            HERO BACKGROUND
        ====================================================== */}

        <motion.div
          initial={{
            scale: 1.045,
            opacity: 0.96,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1.8,
            ease,
          }}
          className="
            absolute
            inset-0
            -z-30

            bg-cover
            bg-no-repeat

            bg-[position:69%_center]

            transition-transform
            duration-[1600ms]

            group-hover:scale-[1.012]

            sm:bg-[position:68%_center]
            md:bg-[position:66%_center]
            lg:bg-[position:64%_center]
            xl:bg-center

            max-[480px]:bg-[position:72%_center]
            max-[390px]:bg-[position:74%_center]
          "
          style={{
            backgroundImage: `url(${bg})`,
          }}
        />

        {/* =====================================================
            HERO OVERLAY
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            -z-20

            bg-[linear-gradient(90deg,rgba(2,34,8,0.98)_0%,rgba(3,38,9,0.92)_32%,rgba(3,38,9,0.65)_52%,rgba(3,38,9,0.19)_72%,rgba(3,38,9,0.02)_100%)]

            lg:bg-[linear-gradient(90deg,rgba(2,32,7,0.97)_0%,rgba(2,34,8,0.90)_30%,rgba(2,34,8,0.46)_47%,rgba(2,34,8,0.08)_61%,rgba(2,34,8,0)_72%)]

            max-[640px]:bg-[linear-gradient(90deg,rgba(2,31,7,0.97)_0%,rgba(3,37,9,0.91)_45%,rgba(3,37,9,0.68)_72%,rgba(3,37,9,0.48)_100%)]

            max-[480px]:bg-[linear-gradient(90deg,rgba(2,31,7,0.98)_0%,rgba(3,37,9,0.94)_50%,rgba(3,37,9,0.76)_78%,rgba(3,37,9,0.56)_100%)]
          "
        />

        {/* Bottom depth */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            -z-10

            h-[40%]

            bg-[linear-gradient(180deg,transparent_0%,rgba(1,22,5,0.10)_100%)]
          "
        />

        {/* =====================================================
            EXACT 1180px CONTAINER
        ====================================================== */}

        <div className="submission-page-container">
          <div
            className="
              relative
              z-10

              flex
              min-h-[264px]

              w-full
              min-w-0

              items-start

              pb-[30px]
              pt-[34px]

              sm:pt-[35px]

              lg:pb-[28px]

              max-[640px]:min-h-[270px]

              max-[480px]:min-h-[276px]
              max-[480px]:pt-[30px]

              max-[360px]:min-h-[268px]
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                x: -28,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.72,
                ease,
              }}
              className="
                relative
                z-10

                w-full
                min-w-0
                max-w-[545px]
              "
            >
              {/* TITLE */}

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.08,
                  ease,
                }}
                className="
                  text-[34px]
                  font-semibold
                  leading-[1.05]
                  tracking-[-0.8px]
                  text-white

                  sm:text-[39px]

                  md:text-[43px]

                  lg:text-[45px]

                  max-[400px]:text-[32px]

                  max-[360px]:text-[29px]
                "
              >
                Submission
              </motion.h1>

              {/* BREADCRUMB */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.55,
                  delay: 0.18,
                }}
                className="
                  mt-[16px]

                  flex
                  min-w-0
                  flex-wrap
                  items-center
                  gap-[10px]

                  text-[12px]
                  font-medium
                  text-white/95

                  sm:text-[13px]

                  md:text-[14px]

                  lg:text-[15px]
                "
              >
                <Link
                  to="/"
                  className="
                    text-white

                    transition-colors
                    duration-300

                    hover:text-[#bddb69]
                  "
                >
                  Home
                </Link>

                <span
                  className="
                    text-[18px]
                    leading-none
                    text-[#a9c65c]
                  "
                >
                  ›
                </span>

                <span className="text-[#b7d264]">
                  Submission
                </span>
              </motion.div>

              {/* DESCRIPTION */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.27,
                  ease,
                }}
                className="
                  mt-[25px]
                  max-w-[485px]

                  text-[13px]
                  font-medium
                  leading-[1.55]

                  text-white/95

                  sm:text-[14px]

                  md:text-[15px]

                  lg:text-[16px]

                  max-[400px]:text-[12.5px]

                  max-[360px]:text-[12px]
                "
              >
                We have made the submission process simple, transparent
                <br className="hidden sm:block" />
                and efficient for all authors.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          02. MAIN SUBMISSION CONTENT
      ========================================================== */}

      <section
        className="
          w-full
          overflow-hidden
          bg-white

          py-8

          sm:py-10

          lg:py-11
        "
      >
        {/* =====================================================
            SAME EXACT CONTAINER AS HERO
        ====================================================== */}

        <div className="submission-page-container">
          <div
            className="
              grid
              w-full
              min-w-0
              grid-cols-1

              min-[980px]:grid-cols-[minmax(0,1.72fr)_minmax(310px,1fr)]
            "
          >
            {/* ===================================================
                LEFT SIDE
            ==================================================== */}

            <div
              className="
                min-w-0

                min-[980px]:pr-7

                lg:pr-8

                xl:pr-10
              "
            >
              {/* =================================================
                  GENERAL GUIDELINES
              ================================================== */}

              <motion.section
                initial={{
                  opacity: 0,
                  y: 22,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.55,
                  ease,
                }}
                className="
                  border-b
                  border-[#e0e5dc]

                  pb-6

                  sm:pb-7
                "
              >
                <SectionHeading>
                  General Guidelines
                </SectionHeading>

                <ul
                  className="
                    mt-[16px]

                    flex
                    flex-col

                    gap-[10px]

                    sm:gap-[10px]
                  "
                >
                  {generalGuidelines.map((item, index) => {
                    const GuidelineIcon =
                      guidelineIcons[index] || FileCheck2;

                    return (
                      <motion.li
                        key={`${item}-${index}`}
                        initial={{
                          opacity: 0,
                          x: -12,
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.035,
                          ease,
                        }}
                        className="
                          group

                          flex
                          min-w-0

                          items-start

                          gap-[11px]
                        "
                      >
                        <div
                          className="
                            mt-[1px]

                            flex
                            h-[24px]
                            w-[24px]

                            shrink-0

                            items-center
                            justify-center
                          "
                        >
                          <GuidelineIcon
                            strokeWidth={1.8}
                            className="
                              h-[16px]
                              w-[16px]

                              text-[#295b2b]

                              transition-all
                              duration-300

                              group-hover:scale-110
                              group-hover:text-[#1c471e]
                            "
                          />
                        </div>

                        <p
                          className="
                            min-w-0

                            text-[11px]
                            font-medium
                            leading-[1.55]

                            text-[#283129]

                            sm:text-[11.5px]

                            md:text-[12px]

                            xl:text-[12.5px]
                          "
                        >
                          {item}
                        </p>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.section>

              {/* =================================================
                  MANUSCRIPT PREPARATION
              ================================================== */}

              <motion.section
                initial={{
                  opacity: 0,
                  y: 22,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.55,
                  ease,
                }}
                className="
                  py-4
                  sm:py-3
                "
              >
                <SectionHeading>
                  Manuscript Preparation
                </SectionHeading>

                <div
                  className="
                    mt-[16px]

                    grid
                    min-w-0
                    grid-cols-1

                    gap-[9px]

                    min-[380px]:grid-cols-2

                    min-[680px]:grid-cols-4
                  "
                >
                  {manuscriptPreparation.map((item, index) => {
                    const PreparationIcon =
                      preparationIcons[index] || FileText;

                    return (
                      <motion.div
                        key={item.title}
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.42,
                          delay: index * 0.05,
                          ease,
                        }}
                        whileHover={{
                          y: -4,
                        }}
                        className="
                          group

                          flex
                          min-h-[125px]
                          min-w-0

                          cursor-default

                          flex-col
                          items-center

                          rounded-[7px]

                          border
                          border-[#e8ece4]

                          bg-[#f5f6f0]

                          px-[10px]
                          py-[13px]

                          text-center

                          transition-all
                          duration-300

                          hover:border-[#cddbc7]
                          hover:bg-[#f8faf5]

                          hover:shadow-[0_7px_18px_rgba(23,68,27,0.09)]
                        "
                      >
                        <PreparationIcon
                          strokeWidth={1.65}
                          className="
                            h-[28px]
                            w-[28px]

                            text-[#254d28]

                            transition-transform
                            duration-300

                            group-hover:scale-110
                          "
                        />

                        <h3
                          className="
                            mt-[9px]

                            text-[11.5px]
                            font-semibold
                            leading-[1.25]

                            text-[#172b1b]

                            sm:text-[12px]
                          "
                        >
                          {item.title}
                        </h3>

                        <p
                          className="
                            mt-[7px]

                            text-[8.5px]
                            font-medium
                            leading-[1.45]

                            text-[#4d554d]

                            sm:text-[9.5px]
                          "
                        >
                          {item.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>

              {/* =================================================
                  BEFORE YOU SUBMIT
              ================================================== */}

              <motion.section
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.55,
                  ease,
                }}
                className="pb-6 mt-2"
              >
                <SectionHeading>
                  Before You Submit
                </SectionHeading>

                <ul
                  className="
                    mt-[14px]

                    flex
                    flex-col

                    gap-[6px]
                  "
                >
                  {beforeYouSubmit.map((item, index) => (
                    <motion.li
                      key={`${item}-${index}`}
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.38,
                        delay: index * 0.035,
                      }}
                      className="
                        group

                        flex
                        min-w-0

                        items-start

                        gap-[8px]
                      "
                    >
                      <CheckCircle2
                        strokeWidth={2.2}
                        className="
                          mt-[1px]

                          h-[13px]
                          w-[13px]

                          shrink-0

                          text-[#2f722c]

                          transition-transform
                          duration-300

                          group-hover:scale-110
                        "
                      />

                      <p
                        className="
                          min-w-0

                          text-[10px]
                          font-medium
                          leading-[1.5]

                          text-[#293329]

                          sm:text-[10.5px]

                          md:text-[11px]
                        "
                      >
                        {item}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>

              {/* =================================================
                  CONFIDENTIALITY & ETHICS
              ================================================== */}

              <motion.section
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.55,
                  ease,
                }}
                whileHover={{
                  y: -3,
                }}
                className="
                  group
                  relative

                  min-h-[108px]

                  overflow-hidden

                  rounded-[8px]

                  border
                  border-[#e5e8df]

                  bg-[#f5f6ef]

                  shadow-[0_2px_8px_rgba(23,58,25,0.04)]

                  transition-all
                  duration-300

                  hover:shadow-[0_8px_20px_rgba(23,58,25,0.10)]
                "
              >
                {/* Background */}

                <img
                  src={bg2}
                  alt=""
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0

                    h-full
                    w-full

                    object-cover
                    object-center

                    transition-transform
                    duration-700

                    group-hover:scale-[1.015]
                  "
                />

               

                <div
                  className="
                    relative
                    z-10

                    max-w-[78%]

                    px-4
                    py-[14px]

                    sm:max-w-[72%]
                    sm:px-5

                    max-[420px]:max-w-[88%]
                  "
                >
                  <div
                    className="
                      flex
                      items-center

                      gap-[8px]
                    "
                  >
                    <Leaf
                      strokeWidth={1.8}
                      className="
                        h-[16px]
                        w-[16px]

                        shrink-0

                        text-[#39722b]
                      "
                    />

                    <h3
                      className="
                        text-[16px]
                        font-semibold

                        text-[#152b19]

                        sm:text-[17px]
                      "
                    >
                      Confidentiality &amp; Ethics
                    </h3>
                  </div>

                  <p
                    className="
                      mt-[8px]

                      text-[8.5px]
                      font-medium
                      leading-[1.55]

                      text-[#343c34]

                      sm:text-[9px]

                      md:text-[10.4px]
                    "
                  >
                    All submitted manuscripts are treated with strict
                    confidentiality. The review process is double blind. Any
                    unethical or fraudulent submission will lead to immediate
                    rejection and may be reported to the authors&apos;
                    institutions.
                  </p>
                </div>
              </motion.section>
            </div>

            {/* ===================================================
                RIGHT SIDE
            ==================================================== */}

            <aside
              className="
                mt-8
                min-w-0

                border-t
                border-[#e0e5dc]

                pt-7

                min-[980px]:mt-0
                min-[980px]:border-l
                min-[980px]:border-t-0
                min-[980px]:pl-7
                min-[980px]:pt-0

                lg:pl-8

                xl:pl-9
              "
            >
              {/* =================================================
                  SUBMISSION PROCESS
              ================================================== */}

              <motion.section
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.12,
                }}
                transition={{
                  duration: 0.6,
                  ease,
                }}
              >
                <SectionHeading>
                  Submission Process
                </SectionHeading>

                <ol
                  className="
                    relative

                    mt-[28px]

                    flex
                    flex-col

                    gap-[16px]

                    before:absolute
                    before:bottom-[24px]
                    before:left-[12px]
                    before:top-[14px]

                    before:border-l
                    before:border-dashed
                    before:border-[#a8b79e]
                  "
                >
                  {submissionProcess.map((item, index) => {
                    const ProcessIcon =
                      processIcons[index] || FileCheck2;

                    return (
                      <motion.li
                        key={item.title}
                        initial={{
                          opacity: 0,
                          x: 14,
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.045,
                          ease,
                        }}
                        className="
                          group
                          relative

                          grid
                          min-w-0

                          grid-cols-[25px_48px_minmax(0,1fr)]

                          items-start

                          gap-[16px]
                        "
                      >
                        {/* NUMBER */}

                        <span
                          className="
                            relative
                            z-10

                            flex
                            h-[25px]
                            w-[25px]

                            items-center
                            justify-center

                            rounded-full

                            bg-[#245b20]

                            text-[11px]
                            font-semibold
                            text-white

                            shadow-[0_0_0_3px_#ffffff]

                            transition-all
                            duration-300

                            group-hover:scale-110
                            group-hover:bg-[#184817]
                          "
                        >
                          {index + 1}
                        </span>

                        {/* ICON */}

                        <div
                          className="
                            flex

                            h-[49px]
                            w-[49px]

                            shrink-0

                            items-center
                            justify-center

                            rounded-[6px]

                            border
                            border-[#edf0e8]

                            bg-[#f3f5ef]

                            transition-all
                            duration-300

                            group-hover:-translate-y-[2px]
                            group-hover:bg-[#edf2e8]
                          "
                        >
                          <ProcessIcon
                            strokeWidth={1.55}
                            className="
                              h-[25px]
                              w-[25px]

                              text-[#244c29]
                            "
                          />
                        </div>

                        {/* TEXT */}

                        <div className="min-w-0 pt-[4px]">
                          <h3
                            className="
                              text-[13.5px]
                              font-semibold
                              leading-[1.3]

                              text-[#142818]

                              sm:text-[14.5px]
                            "
                          >
                            {item.title}
                          </h3>

                          <p
                            className="
                              mt-[5px]

                              text-[10.5px]
                              font-medium
                              leading-[1.5]

                              text-[#454e46]

                              sm:text-[11.5px]
                            "
                          >
                            {item.description}
                          </p>
                        </div>
                      </motion.li>
                    );
                  })}
                </ol>
              </motion.section>

              {/* =================================================
                  NEED HELP
              ================================================== */}

              <InfoCard
                icon={Headphones}
                title="Need Help?"
                text="If you face any issues during submission, please contact us."
              >
                <Link
                  to="/contact"
                  className="
                    group/button

                    mt-[16px]

                    inline-flex
                    min-h-[30px]

                    items-center
                    justify-center

                    gap-[6px]

                    rounded-[4px]

                    bg-[#164d18]

                    px-[16px]
                    py-[5px]

                    text-[10.5px]
                    font-semibold
                    text-white

                    transition-all
                    duration-300

                    hover:-translate-y-[1px]

                    hover:bg-[#206223]

                    hover:shadow-[0_5px_12px_rgba(12,55,17,0.18)]
                  "
                >
                  Contact Support

                  <ArrowRight
                    className="
                      h-[12px]
                      w-[12px]

                      transition-transform
                      duration-300

                      group-hover/button:translate-x-[3px]
                    "
                  />
                </Link>
              </InfoCard>

              {/* =================================================
                  DOWNLOAD
              ================================================== */}

              <InfoCard
                icon={Download}
                title="Download Resources"
                text="Get our template, sample paper and author guidelines."
                className="mt-[9px]"
              >
                <a
                  href="/downloads/submission-resources.zip"
                  download
                  className="
                    group/button

                    mt-[10px]

                    inline-flex
                    min-h-[30px]

                    items-center
                    justify-center

                    gap-[6px]

                    rounded-[4px]

                    bg-[#164d18]

                    px-[16px]
                    py-[5px]

                    text-[10.5px]
                    font-semibold
                    text-white

                    transition-all
                    duration-300

                    hover:-translate-y-[1px]

                    hover:bg-[#206223]

                    hover:shadow-[0_5px_12px_rgba(12,55,17,0.18)]
                  "
                >
                  Download Now

                  <ArrowRight
                    className="
                      h-[12px]
                      w-[12px]

                      transition-transform
                      duration-300

                      group-hover/button:translate-x-[3px]
                    "
                  />
                </a>
              </InfoCard>
            </aside>
          </div>
        </div>
      </section>

      {/* =========================================================
          03. CTA

          IMPORTANT:
          SAME CONTAINER AS HERO + MAIN
          NO 1110px EXTRA MAX WIDTH
      ========================================================== */}

      <section
        className="
          relative

          w-full
          overflow-hidden

          bg-white

          pb-10

          sm:pb-12

         
        "
      >
        {/* =====================================================
            EXACT SAME 1180px / 32px CONTAINER
        ====================================================== */}

        <div className="submission-page-container">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.992,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              ease,
            }}
            whileHover={{
              y: -2,
            }}
            className="
              group
              relative

              w-full
              min-w-0

              min-h-[112px]

              overflow-hidden

              rounded-[7px]

              border
              border-[#dce4d5]

              bg-[#eff2e5]

              shadow-[0_5px_16px_rgba(23,63,25,0.07)]

              transition-all
              duration-300

              hover:border-[#cedbc6]

              hover:shadow-[0_9px_24px_rgba(23,63,25,0.12)]

              max-[640px]:min-h-[150px]

              max-[400px]:min-h-[158px]
            "
          >
            {/* =================================================
                CTA BACKGROUND
            ================================================== */}

            <motion.div
              aria-hidden="true"
              initial={{
                scale: 1.015,
              }}
              whileInView={{
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.2,
                ease,
              }}
              className="
                pointer-events-none
                absolute
                inset-0

                bg-cover
                bg-center
                bg-no-repeat

                transition-transform
                duration-700

                group-hover:scale-[1.012]

                max-[640px]:bg-[position:25%_center]
              "
              style={{
                backgroundImage: `url(${bgcta})`,
              }}
            />

            {/* MOBILE OVERLAY */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0

                hidden

                max-[640px]:block

                max-[640px]:bg-[linear-gradient(90deg,rgba(5,43,10,0.83)_0%,rgba(5,43,10,0.72)_48%,rgba(5,43,10,0.52)_100%)]

                max-[400px]:bg-[linear-gradient(90deg,rgba(5,43,10,0.90)_0%,rgba(5,43,10,0.78)_50%,rgba(5,43,10,0.60)_100%)]
              "
            />

            {/* =================================================
                CTA CONTENT
            ================================================== */}

            <div
              className="
                relative
                z-10

                flex
                min-h-[112px]

                w-full
                min-w-0

                flex-col

                justify-center

                py-[15px]

                pl-[37.6%]
                pr-[10%]

                max-[640px]:min-h-[150px]

                max-[640px]:items-center

                max-[640px]:px-5

                max-[640px]:text-center

                max-[400px]:min-h-[158px]

                max-[390px]:px-4
              "
            >
              {/* CTA HEADING */}

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.55,
                  delay: 0.1,
                  ease,
                }}
                className="
                  w-full
                  min-w-0

                  max-w-[470px]

                  text-[14px]
                  font-semibold
                  leading-[1.32]

                  tracking-[-0.12px]

                  text-[#102b15]

                  md:text-[15px]

                  lg:text-[16px]

                  max-[640px]:max-w-[430px]

                  max-[640px]:text-white

                  max-[390px]:text-[13px]
                "
              >
                We look forward to your valuable research
                <br className="hidden sm:block" />
                contributions to advance entomological science.
              </motion.h2>

              {/* CTA BUTTON */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
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
                  delay: 0.18,
                  ease,
                }}
                className="
                  mt-[8px]

                  flex
                  w-full
                  min-w-0

                  max-[640px]:justify-center
                "
              >
                <Link
                  to="/submit-paper"
                  className="
                    group/button
                    relative

                    inline-flex
                    min-h-[29px]

                    max-w-full

                    items-center
                    justify-center

                    gap-[10px]

                    overflow-hidden

                    rounded-[4px]

                    border
                    border-[#19581e]

                    bg-[linear-gradient(180deg,#1e641f_0%,#145419_100%)]

                    px-[14px]
                    py-[6px]

                    text-[11.5px]
                    font-semibold
                    leading-none

                    text-white

                    shadow-[0_3px_7px_rgba(6,44,10,0.15)]

                    transition-all
                    duration-300
                    ease-out

                    hover:-translate-y-[2px]

                    hover:border-[#28722d]

                    hover:bg-[linear-gradient(180deg,#28762b_0%,#1a6120_100%)]

                    hover:shadow-[0_6px_12px_rgba(6,44,10,0.22)]

                    active:translate-y-0

                    max-[350px]:gap-[8px]

                    max-[350px]:px-[11px]

                    max-[350px]:text-[10px]
                  "
                >
                  {/* Shine */}

                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-y-0

                      -left-[35%]

                      w-[25%]

                      -skew-x-[20deg]

                      bg-white/10

                      transition-all
                      duration-700

                      group-hover/button:left-[120%]
                    "
                  />

                  <span
                    className="
                      relative
                      z-10

                      whitespace-nowrap
                    "
                  >
                    Submit Your Manuscript
                  </span>

                  <Icon
                    name="ArrowRight"
                    className="
                      relative
                      z-10

                      h-[12px]
                      w-[12px]

                      shrink-0

                      transition-transform
                      duration-300

                      group-hover/button:translate-x-[3px]
                    "
                  />
                </Link>
              </motion.div>
            </div>

            {/* SUBTLE HOVER LIGHT */}

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
        </div>
      </section>
    </>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({ children }) {
  return (
    <div
      className="
        flex
        min-w-0
        items-center

        gap-[10px]
      "
    >
      <Leaf
        strokeWidth={1.8}
        className="
          h-[20px]
          w-[20px]

          shrink-0

          text-[#39722b]
        "
      />

      <h2
        className="
          min-w-0

          text-[19px]
          font-semibold
          leading-none

          tracking-[-0.2px]

          text-[#142b18]

          sm:text-[20px]
        "
      >
        {children}
      </h2>
    </div>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  icon: CardIcon,
  title,
  text,
  children,
  className = "mt-6",
}) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 16,
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
        ease,
      }}
      whileHover={{
        y: -3,
      }}
      className={`
        ${className}

        rounded-[7px]

        border
        border-[#dfe4da]

        bg-[#f8f9f5]

        p-[16px]
        

        shadow-[0_2px_8px_rgba(18,52,20,0.04)]

        transition-all
        duration-300

        hover:border-[#cdd9c7]

        hover:shadow-[0_8px_18px_rgba(18,52,20,0.10)]
      `}
    >
      <div
        className="
          flex
          items-center

          gap-[10px]
        "
      >
        <CardIcon
          strokeWidth={1.7}
          className="
            h-[26px]
            w-[26px]

            shrink-0

            text-[#315c32]
          "
        />

        <h3
          className="
            text-[15.5px]
            font-semibold

            text-[#182c1b]
          "
        >
          {title}
        </h3>
      </div>

      <p
        className="
          mt-[12px]

          text-[8.7px]
          font-medium
          leading-[1.5]

          text-[#454e46]

          sm:text-[12px]
        "
      >
        {text}
      </p>

      {children}
    </motion.section>
  );
}