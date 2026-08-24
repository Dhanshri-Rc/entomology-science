import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  CalendarDays,
  Check,
  ClipboardCheck,
  Clock3,
  Download,
  FileCheck2,
  Files,
  FileText,
  Languages,
  Leaf,
  Lightbulb,
  Send,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

import callHeroBg from "../assets/img/callBG.png";
import callCtaBg from "../assets/img/callCta.png";

const topics = [
  "Insect Biodiversity & Systematics",
  "Molecular Entomology & Genomics",
  "Insect Physiology & Biochemistry",
  "Pest Management & IPM",
  "Beneficial Insects & Pollinators",
  "Entomology in Agriculture & Forestry",
  "Medical & Veterinary Entomology",
  "Insect Ecology & Evolution",
  "Behavior, Neurobiology & Development",
  "Insect Biotechnology & Bioresources",
  "Climate Change & Insect Adaptation",
  "Emerging Trends in Entomological Research",
];

const submissionTypes = [
  {
    title: "Research Papers",
    description: "Original research with novel findings.",
    icon: FileText,
  },
  {
    title: "Review Articles",
    description: "Comprehensive reviews of current developments.",
    icon: Files,
  },
  {
    title: "Short Communications",
    description: "Preliminary findings or innovative ideas.",
    icon: Lightbulb,
  },
];

const guidelines = [
  {
    text: "Papers must be original, unpublished and not under consideration elsewhere.",
    icon: FileCheck2,
  },
  {
    text: "Manuscripts should be written in English and follow the journal/template guidelines.",
    icon: Languages,
  },
  { text: "Abstract: Max 300 words for abstract submission.", icon: Clock3 },
  {
    text: "Full Paper: Follow the formatting guidelines provided in the submission portal.",
    icon: ClipboardCheck,
  },
  { text: "All submissions will be peer reviewed.", icon: BadgeCheck },
  {
    text: "Accepted papers will be presented at the conference and considered for publication in Scopus indexed journals.",
    icon: Leaf,
  },
];

const importantDates = [
  {
    label: "Abstract Submission Deadline",
    date: "31 July 2025",
    icon: CalendarDays,
  },
  {
    label: "Notification of Abstract Acceptance",
    date: "10 August 2025",
    icon: CalendarCheck2,
  },
  {
    label: "Full Paper Submission Deadline",
    date: "30 August 2025",
    icon: FileText,
  },
  {
    label: "Notification of Acceptance",
    date: "20 September 2025",
    icon: UserRound,
  },
  {
    label: "Early Bird Registration Deadline",
    date: "30 September 2025",
    icon: ClipboardCheck,
  },
  { label: "Conference Dates", date: "10–12 November 2025", icon: Clock3 },
];

const whySubmit = [
  "Present your research to a global audience",
  "Receive feedback from leading experts",
  "Publication opportunity in Scopus indexed journals",
  "Network with entomologists worldwide",
];

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.16 },
  transition: { duration: 0.55, ease: "easeOut" },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: "easeOut" },
  },
};

function PageContainer({ children, className = "" }) {
  return (
    <div
      className={`mx-auto w-full max-w-[1170px] px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 className="flex items-center gap-3 text-[20px] font-[550] leading-tight text-[#123819] sm:text-[21px]">
      <Leaf className="h-5 w-5 shrink-0 -rotate-12 fill-[#8dbd51]/35 text-[#427a29]" />
      {children}
    </h2>
  );
}

function DarkButton({ children, to, icon: Icon, className = "" }) {
  const styles = `group inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-[#174d1b] px-5 py-2.5 text-[12px] font-[550] text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#0d3914] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#82ad45] focus:ring-offset-2 ${className}`;

  if (to) {
    return (
      <Link to={to} className={styles}>
        {children}
        {Icon && (
          <Icon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </Link>
    );
  }

  return (
    <button type="button" className={styles}>
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}

export default function CallForPapers() {
  return (
    <main className="overflow-hidden bg-white font-sans text-[#203426]">
      {/* Hero */}
      <section
        className="relative isolate flex min-h-[395px] items-center bg-cover bg-[position:68%_center] sm:min-h-[400px] md:min-h-[450px] md:bg-center"
        style={{ backgroundImage: `url(${callHeroBg})` }}
      >
        {/* <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#082d16]/[0.98] via-[#103c1d]/80 to-[#123c16]/15 sm:via-[#103c1d]/66 lg:via-[#103c1d]/48" /> */}

        <PageContainer className="relative flex min-h-[520px] items-center py-10 sm:min-h-[440px] lg:min-h-[310px] lg:py-8">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="w-full max-w-[700px] pb-[172px] text-white sm:pb-[150px] lg:pb-0"
          >
            <span className="inline-flex rounded-md bg-white/15 px-3 py-1.5 text-[10px] font-[500] uppercase tracking-[0.02em] text-white backdrop-blur-sm sm:text-[11px]">
              Call for Papers
            </span>

            <h1 className="mt-5 text-[34px] max text-white font-semibold leading-[1.16] tracking-[-0.025em] sm:text-[36px] lg:text-[36px]">
              Share Your Research.
              <br />
              Advance{" "}
              <span className="text-[#acd261]">Entomological Science.</span>
            </h1>

            <p className="mt-4 max-w-[450px] text-[13px] leading-[1.75] text-white/95 sm:text-[14px]">
              We invite researchers, scientists, academicians and industry
              professionals to contribute their original research and innovative
              ideas to the conference.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.55, ease: "easeOut" }}
            className="absolute bottom-2 left-1/2 flex h-[158px] w-[158px] -translate-x-1/2 flex-col items-center justify-center rounded-full border-[6px] border-[#a8d36b] bg-[#fbfdf8] px-3 text-center shadow-[0_0_0_3px_rgba(255,255,255,.88)] sm:bottom-8 sm:h-[170px] sm:w-[170px] lg:bottom-auto lg:left-auto lg:right-8  lg:h-[180px] lg:w-[180px] lg:-translate-x-0 lg:-translate-y-1/2 xl:right-10"
          >
            <CalendarDays className="mb-1 h-6 w-6 text-[#163d1d]" />
            <h2 className="text-[12px] font-[550] text-[#143719] sm:text-[13px]">
              Important Dates
            </h2>
            <p className="mt-1 text-[10px] leading-tight text-[#3e4d41] sm:text-[11px]">
              Abstract Submission
            </p>
            <p className="mt-0.5 text-[11px] font-[550] text-[#174d1b] sm:text-[12px]">
              31 July 2025
            </p>
            <p className="mt-2 text-[10px] leading-tight text-[#3e4d41] sm:text-[11px]">
              Full Paper Submission
            </p>
            <p className="mt-0.5 text-[11px] font-[550] text-[#174d1b] sm:text-[12px]">
              30 August 2025
            </p>
          </motion.div>
        </PageContainer>
      </section>

      {/* Page content */}
      <section className="py-10 sm:py-14 lg:py-9">
        <PageContainer>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.95fr)_minmax(290px,1fr)] lg:gap-7">
            <div className="space-y-10 lg:space-y-9">
              {/* Topics */}
              <motion.section {...fadeUp}>
                <SectionHeading>Topics of Interest</SectionHeading>
                <p className="mt-2 text-[14px] leading-6 text-[#2c4732]">
                  We welcome papers (but not limited to) in the following areas:
                </p>

                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2"
                >
                  {topics.map((topic) => (
                    <motion.div
                      key={topic}
                      variants={itemReveal}
                      className="group flex items-start gap-3 py-0.5 text-[13px] leading-5 text-[#25382a]"
                    >
                      <Leaf className="mt-0.5 h-3.5 w-3.5 shrink-0 -rotate-12 fill-[#8fbd50]/35 text-[#4a7d30] transition-transform duration-300 group-hover:scale-125 group-hover:rotate-0" />
                      <span>{topic}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>

              {/* Submission types */}
              <motion.section {...fadeUp}>
                <SectionHeading>Submission Types</SectionHeading>
                <div className="mt-5 grid gap-5 sm:grid-cols-3">
                  {submissionTypes.map(
                    ({ title, description, icon: TypeIcon }, index) => (
                      <motion.article
                        key={title}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08, duration: 0.45 }}
                        whileHover={{ y: -5 }}
                        className="group flex min-h-[132px] flex-col items-center justify-center rounded-lg border border-[#edf1e8] bg-[#f4f7f0] p-5 text-center shadow-sm transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(25,67,28,.13)]"
                      >
                        <TypeIcon className="h-8 w-8 text-[#194b20] transition-transform duration-300 group-hover:scale-110" />
                        <h3 className="mt-3 text-[14px] font-[550] text-[#17391c]">
                          {title}
                        </h3>
                        <p className="mt-2 text-[13px] leading-5 text-[#344638]">
                          {description}
                        </p>
                      </motion.article>
                    ),
                  )}
                </div>
              </motion.section>

              {/* Guidelines */}
              <motion.section {...fadeUp}>
                <SectionHeading>Guidelines for Authors</SectionHeading>
                <ul className="mt-5 space-y-2.5">
                  {guidelines.map(({ text, icon: GuidelineIcon }) => (
                    <li
                      key={text}
                      className="group flex items-start gap-3 text-[13px] leading-5 text-[#26372a]"
                    >
                      <GuidelineIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#2b642b] transition-transform duration-300 group-hover:scale-110" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <DarkButton icon={Download}>Download Templates</DarkButton>
                  <p className="text-[13px] leading-5 text-[#35483a]">
                    For detailed author instructions, visit the{" "}
                    <Link
                      to="/submission"
                      className="font-[550] text-[#235a25] underline underline-offset-2 transition hover:text-[#6f9a33]"
                    >
                      Submission
                    </Link>{" "}
                    page.
                  </p>
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              <motion.section
                {...fadeUp}
                className="rounded-xl border border-[#dce5d7] bg-[#fbfcf9] p-5 shadow-sm sm:p-6"
              >
                <div className="mb-5 flex items-center gap-3">
                  <CalendarDays className="h-6 w-6 text-[#1d5424]" />
                  <h2 className="text-[18px] font-[550] text-[#153a1b]">
                    Important Dates
                  </h2>
                </div>

                <ul className="space-y-3.5">
                  {importantDates.map(({ label, date, icon: DateIcon }) => (
                    <li key={label} className="group flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#f0f4eb] text-[#245827] transition duration-300 group-hover:bg-[#245827] group-hover:text-white">
                        <DateIcon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[12.5px] leading-4 text-[#4b5d50]">
                          {label}
                        </p>
                        <p className="mt-0.5 text-[13px] font-[550] leading-5 text-[#19451e]">
                          {date}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.section>

              <motion.section
                {...fadeUp}
                className="rounded-xl bg-gradient-to-br from-[#123f1a] to-[#235b22] p-6 text-white shadow-[0_10px_28px_rgba(14,60,21,.15)] transition-shadow duration-300 hover:shadow-[0_14px_32px_rgba(14,60,21,.25)]"
              >
                <h2 className="text-[18px] text-white font-[550]">
                  Why Submit?
                </h2>
                <ul className="mt-3 space-y-2">
                  {whySubmit.map((reason) => (
                    <li
                      key={reason}
                      className="flex items-start gap-3 text-[13px] leading-5 text-white/95"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c4e177]" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>

              <motion.section
                {...fadeUp}
                className="rounded-xl border border-[#edf1e8] bg-[#f4f7f0] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <Send className="h-7 w-7 -rotate-6 text-[#225623]" />
                  <h2 className="text-[18px] font-[550] text-[#153a1b]">
                    Submit Your Paper
                  </h2>
                </div>
                <p className="mt-3 text-[13px] leading-5 text-[#314436]">
                  All submissions must be made through our online submission
                  system.
                </p>
                <DarkButton
                  to="/submit-paper"
                  icon={ArrowRight}
                  className="mt-4"
                >
                  Submit Now
                </DarkButton>
              </motion.section>
            </aside>
          </div>
        </PageContainer>
      </section>

      {/* CTA */}
      <section className="pb-10 sm:pb-14">
        <PageContainer>
          <motion.div
            {...fadeUp}
            className="relative isolate flex min-h-[215px] items-center overflow-hidden rounded-lg bg-[#f5f7ef] bg-cover bg-[position:23%_center] px-5 py-4 shadow-sm sm:min-h-[176px] sm:bg-center sm:px-8 lg:min-h-[164px] lg:px-10"
            style={{ backgroundImage: `url(${callCtaBg})` }}
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/0 via-[#f5f7ef]/55 to-[#f5f7ef]/95 sm:hidden" />
            <div className="ml-auto w-[68%] max-w-[570px] sm:w-[58%] md:w-[56%] lg:mr-[9%] lg:w-[53%]">
              <h2 className="text-[16px] font-[550] leading-[1.35] text-[#17371d] sm:text-[17px] lg:text-[18px]">
                Join us in advancing the science of entomology
                <br className="hidden sm:block" /> for a sustainable future.
              </h2>
              <DarkButton to="/submit-paper" className="mt-4">
                Submit Your Paper Today!
              </DarkButton>
            </div>
          </motion.div>
        </PageContainer>
      </section>
    </main>
  );
}
