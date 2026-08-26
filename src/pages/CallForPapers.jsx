import SEO from "../components/SEO";
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

import callHeroBg from "../assets/img/entomology-conference-call-for-papers-beetle-hero.webp";
import callCtaBg from "../assets/img/entomology-conference-call-for-papers-insect-cta.webp";

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
    date: "31 July 2026",
    icon: CalendarDays,
  },
  {
    label: "Notification of Abstract Acceptance",
    date: "10 August 2026",
    icon: CalendarCheck2,
  },
  {
    label: "Full Paper Submission Deadline",
    date: "30 August 2026",
    icon: FileText,
  },
  {
    label: "Notification of Acceptance",
    date: "20 September 2026",
    icon: UserRound,
  },
  {
    label: "Early Bird Registration Deadline",
    date: "30 September 2026",
    icon: ClipboardCheck,
  },
  { label: "Conference Dates", date: "10–12 November 2026", icon: Clock3 },
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
    <h2 className="flex items-center gap-3 text-[21px] font-[550] leading-tight text-[#123819] sm:text-[23px]">
      <Leaf className="h-5 w-5 shrink-0 -rotate-12 fill-[#8dbd51]/35 text-[#427a29]" />
      {children}
    </h2>
  );
}

function DarkButton({
  children,
  to,
  href,
  download,
  icon: Icon,
  className = "",
}) {
  const styles = `group inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-[#174d1b] px-5 py-2.5 text-sm font-[550] text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#0d3914] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#82ad45] focus:ring-offset-2 ${className}`;

  if (href) {
    return (
      <a href={href} download={download} className={styles}>
        {Icon && <Icon className="h-4 w-4" />}
        {children}
      </a>
    );
  }

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
      <SEO
        title="Call for Papers | International Conference on Entomology"
        description="Submit your original research to ICEBIS. Review key tracks, important dates, and paper submission guidelines for the conference."
        canonical="/call-for-papers"
      />
      {/* Hero */}
      <section
        className="relative isolate flex min-h-[360px] items-center bg-cover bg-[position:66%_center] sm:min-h-[380px] md:min-h-[400px] md:bg-center"
        style={{ backgroundImage: `url(${callHeroBg})` }}
      >
        {/* <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#082d16]/[0.99] via-[#103c1d]/90 to-[#123c16]/55 sm:via-[#103c1d]/76 sm:to-[#123c16]/30 md:via-[#103c1d]/66 md:to-[#123c16]/15 lg:via-[#103c1d]/48 lg:to-transparent" /> */}

        <PageContainer className="relative grid min-h-[535px] grid-cols-1 content-center gap-7 py-10 sm:min-h-[500px] sm:py-12 md:min-h-[410px] md:grid-cols-[minmax(0,1fr)_164px] md:items-center md:gap-6 md:py-9 lg:min-h-[310px] lg:grid-cols-[minmax(0,1fr)_190px] lg:gap-8 lg:py-6">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="w-full max-w-[660px] text-center text-white md:text-left"
          >
            <span className="inline-flex mt-16 sm:mt-12 lg:mt-14 rounded-md bg-white/15 px-3 py-1.5 text-[11px] font-[550] uppercase tracking-[0.02em] text-white backdrop-blur-sm sm:text-[12px]">
              Call for Papers
            </span>

            <h1 className="mt-5 text-[32px] text-white font-semibold leading-[1.16] tracking-[-0.025em] min-[380px]:text-[35px] sm:text-[40px] md:text-[34px] lg:text-[36px]">
              Share Your Research.
              <br />
              Advance{" "}
              <span className="text-[#acd261]">Entomological Science.</span>
            </h1>

            <p className="mx-auto mt-4 max-w-[470px] text-[13px] leading-[1.7] text-white/95 sm:text-[14px] sm:leading-[1.75] md:mx-0 lg:text-[15px]">
              We invite researchers, scientists, academicians and industry
              professionals to contribute their original research and innovative
              ideas to the conference.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.55, ease: "easeOut" }}
            className="mx-auto flex h-[154px] w-[154px] flex-col items-center justify-center rounded-full border-[6px] border-[#a8d36b] bg-[#fbfdf8] px-3 text-center shadow-[0_0_0_3px_rgba(255,255,255,.88)] sm:h-[164px] sm:w-[164px] md:mx-0 md:justify-self-end lg:h-[180px] lg:w-[180px]"
          >
            <CalendarDays className="mb-1 h-6 w-6 text-[#163d1d]" />
            <h2 className="text-[13px] font-[550] text-[#143719] sm:text-sm">
              Important Dates
            </h2>
            <p className="mt-2 text-[10px] leading-tight text-[#3e4d41] sm:text-[11px]">
              Abstract Submission
            </p>
            <p className="mt-0.5 text-xs font-[550] text-[#174d1b] sm:text-[13px]">
              31 July 2026
            </p>
            <p className="mt-2 text-[10px] leading-tight text-[#3e4d41] sm:text-[11px]">
              Full Paper Submission
            </p>
            <p className="mt-0.5 text-xs font-[550] text-[#174d1b] sm:text-[13px]">
              30 August 2026
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
                <p className="mt-4 text-sm leading-6 text-[#2c4732]">
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
                        <h3 className="mt-3 text-sm font-[550] text-[#17391c]">
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

                <div className="mt-7 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                  <a
                    href={`${import.meta.env.BASE_URL}download/entomology-author-paper-template.pdf`}
                    download="entomology-author-paper-template.pdf"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#174d1b] px-5 py-2.5 text-sm font-[550] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#0d3914] hover:shadow-lg sm:w-auto"
                  >
                    <Download className="h-4 w-4" />
                    Download Templates
                  </a>
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
                  <h2 className="text-lg font-[550] text-[#153a1b]">
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
                        <p className="text-[12px] leading-4 text-[#4b5d50]">
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
                <h2 className="text-lg text-white font-[550]">Why Submit?</h2>
                <ul className="mt-5 space-y-4">
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
                  <h2 className="text-lg font-[550] text-[#153a1b]">
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
            className="relative isolate flex min-h-[290px] items-end overflow-hidden rounded-lg bg-[#f5f7ef] bg-cover bg-[position:16%_top] px-5 py-4 lg:py-3 shadow-sm sm:min-h-[110px] sm:items-center sm:bg-center sm:px-8 lg:min-h-[110px] lg:px-10"
            style={{ backgroundImage: `url(${callCtaBg})` }}
          >
            {/* <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#f5f7ef]/55 to-[#f5f7ef] sm:bg-gradient-to-r sm:from-transparent sm:via-[#f5f7ef]/35 sm:to-[#f5f7ef]/95" /> */}
            <div className="w-full max-w-[570px] text-center sm:ml-auto sm:w-[58%] sm:text-left md:w-[56%] lg:mr-[9%] lg:w-[53%]">
              <h2 className="text-[15px] font-[550] leading-[1.4] text-[#17371d] sm:text-[16px] lg:text-[17px]">
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
