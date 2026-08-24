import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Bookmark,
  Bug,
  CheckCircle2,
  CircleCheck,
  FileText,
  Flower2,
  Globe2,
  Leaf,
  NotebookPen,
  ShieldCheck,
  Sprout,
  Upload,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import pubBg from "../assets/img/pubBg.png";
import pubCta from "../assets/img/pubCta.png";
import entoResearchImage from "../assets/img/entoRe.png";

const publicationFeatures = [
  {
    icon: Bookmark,
    title: "Quality Publication",
    description: "Papers published in high impact, Scopus indexed journals.",
  },
  {
    icon: Globe2,
    title: "Global Visibility",
    description: "Reach a global audience of researchers and practitioners.",
  },
  {
    icon: ShieldCheck,
    title: "Rigorous Peer Review",
    description: "Double blind peer review ensures quality and integrity.",
  },
  {
    icon: BarChart3,
    title: "Research Impact",
    description: "Increase citations and research impact.",
  },
];

const journalDetails = [
  { icon: Award, label: "Publisher", value: "Entomology Science Association" },
  { icon: Bookmark, label: "ISSN", value: "0254-0256" },
  { icon: FileText, label: "Frequency", value: "Quarterly (4 issues per year)" },
  { icon: Globe2, label: "Focus Areas", value: "All fields of entomology" },
  { icon: BookOpen, label: "Indexing", value: "Scopus, DOAJ, AGRICOLA, Google Scholar" },
];

const publicationBenefits = [
  "Scopus indexed journal",
  "Global readership and visibility",
  "Rigorous peer review process",
  "Digital Object Identifier (DOI)",
  "Rapid publication",
  "Open access availability",
  "Long-term archiving",
];

const publicationProcess = [
  {
    icon: Upload,
    title: "1. Paper Submission",
    description: "Submit your full paper through the submission portal.",
  },
  {
    icon: Users,
    title: "2. Peer Review",
    description: "Double blind peer review by experts in the relevant field.",
  },
  {
    icon: NotebookPen,
    title: "3. Revision",
    description: "Authors revise the paper based on reviewers’ comments.",
  },
  {
    icon: CircleCheck,
    title: "4. Acceptance",
    description: "Final acceptance after successful review and revision.",
  },
  {
    icon: BookOpen,
    title: "5. Publication",
    description: "Paper is published in the respective Scopus indexed journal.",
  },
];

const publicationNotes = [
  "Publication is subject to quality, scope, and review outcome.",
  "Additional charges may apply as per journal policy.",
  "Authors will be informed about the journal selection after conference.",
];

const otherJournals = [
  {
    title: "Entomologia Generalis",
    issn: "ISSN: 0171-8177",
    focus: "Insect diversity, taxonomy, ecology and evolution.",
    icon: Flower2,
    cover: "from-[#7a1717] to-[#3b0909]",
    accent: "text-[#f6d5c4]",
  },
  {
    title: "International Journal of Tropical Insect Science",
    issn: "ISSN: 1742-7584",
    focus: "Tropical insect science and applied entomology.",
    icon: Bug,
    cover: "from-[#4d3218] to-[#211208]",
    accent: "text-[#e2b769]",
  },
  {
    title: "Journal of Pest Science",
    issn: "ISSN: 1612-4758",
    focus: "Pest management, behavior, control and ecology.",
    icon: Bug,
    cover: "from-[#536b5a] to-[#263d31]",
    accent: "text-[#c7dcb5]",
  },
  {
    title: "Plant Protection Science",
    issn: "ISSN: 1212-258X",
    focus: "Crop protection, pest pathology and integrated management.",
    icon: Sprout,
    cover: "from-[#31652d] to-[#133c1a]",
    accent: "text-[#b9d37e]",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.16 },
  transition: { duration: 0.52, ease: "easeOut" },
};

function PageContainer({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-[1170px] px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({ children, description, align = "center", leaf = true }) {
  return (
    <motion.div {...fadeUp} className={align === "left" ? "text-left" : "text-center"}>
      <div
        className={`flex items-center gap-3 ${
          align === "left" ? "justify-start" : "justify-center"
        }`}
      >
        {leaf && align !== "left" && (
          <span className="flex items-center gap-1 text-[#527e34]">
            <span className="h-px w-6 bg-[#73945d] sm:w-8" />
            <Leaf className="h-4 w-4 -rotate-45 fill-current" strokeWidth={1.3} />
          </span>
        )}
        {leaf && align === "left" && (
          <Leaf className="h-5 w-5 -rotate-12 fill-[#8cb651]/35 text-[#376f2a]" />
        )}
        <h2 className="text-[20px] font-[550] leading-tight text-[#153819] sm:text-[21px]">
          {children}
        </h2>
        {leaf && align !== "left" && (
          <span className="flex items-center gap-1 text-[#527e34]">
            <Leaf className="h-4 w-4 rotate-[135deg] fill-current" strokeWidth={1.3} />
            <span className="h-px w-6 bg-[#73945d] sm:w-8" />
          </span>
        )}
      </div>
      {description && (
        <p
          className={`mt-3 text-[13px] leading-5 text-[#354438] sm:text-[14px] ${
            align === "left" ? "max-w-2xl" : "mx-auto max-w-[720px]"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

function MainJournalCover() {
  return (
    <motion.div
      whileHover={{ y: -5, rotate: -0.4 }}
      transition={{ duration: 0.3 }}
      className="mx-auto flex h-[310px] w-full max-w-[220px] flex-col overflow-hidden rounded-[3px] bg-gradient-to-b from-[#123b1b] to-[#062810] p-5 text-white shadow-[8px_8px_0_rgba(10,47,20,.18),0_14px_26px_rgba(14,48,19,.17)] lg:h-full lg:min-h-[300px]"
    >
      <p className="font-serif text-[17px] leading-5 text-white/95">Journal of</p>
      <p className="font-serif text-[24px] leading-[1.05]">Entomological</p>
      <p className="font-serif text-[24px] leading-[1.05]">Research</p>
      <div className="mt-5 flex-1 overflow-hidden rounded-sm border border-white/10">
        <img
          src={entoResearchImage}
          alt="Metallic green beetle on a leaf"
          className="h-full w-full object-cover transition duration-700 hover:scale-105"
        />
      </div>
      <p className="mt-3 text-[9px] tracking-wide text-white/85">ISSN: 0254-0256</p>
    </motion.div>
  );
}

function JournalCover({ journal }) {
  const CoverIcon = journal.icon;

  return (
    <div
      className={`relative flex h-[160px] w-[105px] shrink-0 flex-col overflow-hidden rounded-[2px] bg-gradient-to-b ${journal.cover} p-3 text-white shadow-md transition duration-500 group-hover:-rotate-1 group-hover:scale-[1.03]`}
    >
      <p className="font-serif text-[11px] leading-[1.15]">{journal.title}</p>
      <span className="my-2 h-px w-full bg-white/20" />
      <CoverIcon className={`mx-auto mt-auto h-12 w-12 ${journal.accent}`} strokeWidth={1} />
      <p className="mt-auto text-[7px] text-white/70">ENTOMOLOGY JOURNAL</p>
    </div>
  );
}

export default function Publication() {
  return (
    <main className="overflow-hidden bg-white font-sans text-[#25372a]">
      {/* Hero */}
      <section
        className="relative isolate flex min-h-[396px] items-center bg-cover bg-[position:66%_center] sm:min-h-[380px] md:min-h-[400px] md:bg-center"
        style={{ backgroundImage: `url(${pubBg})` }}
      >
        {/* <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#082d16]/[0.99] via-[#103c1d]/82 to-[#123c16]/20 sm:via-[#103c1d]/72 md:via-[#103c1d]/58 lg:to-transparent" /> */}

        <PageContainer>
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="max-w-[555px] py-10 text-white"
          >
            <h1 className="text-[32px] mt-2 text-white font-[600] leading-tight tracking-[-0.025em] sm:text-[34px] lg:text-[36px]">
              Publication
            </h1>
            <p className="mt-3 text-[15px] font-[550] leading-tight text-[#a8d366] sm:text-[16px]">
              High Visibility. Global Impact.
            </p>
            <p className="mt-4 max-w-[535px] text-[13px] leading-[1.75] text-white/95 sm:text-[14px]">
              All accepted and presented papers will be published in Scopus indexed journals and
              other reputed entomology journals associated with Entomology Science Association.
            </p>
          </motion.div>
        </PageContainer>
      </section>

      {/* Publication features */}
      <section className="py-5 sm:py-6">
        <PageContainer>
          <div className="grid gap-4 rounded-xl border border-[#edf1e8] bg-[#f6f8f3] p-5 shadow-sm sm:grid-cols-2 sm:p-6 lg:grid-cols-4 lg:gap-0">
            {publicationFeatures.map(({ icon: FeatureIcon, title, description }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                whileHover={{ y: -4 }}
                className="group flex items-start gap-4 rounded-lg p-2 transition duration-300 hover:bg-white/80 lg:border-r lg:border-[#dfe6da] lg:px-5 lg:last:border-r-0"
              >
                <FeatureIcon className="h-10 w-10 shrink-0 text-[#17481e] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.45} />
                <div>
                  <h2 className="text-[13px] font-[550] text-[#17381c] sm:text-[14px]">{title}</h2>
                  <p className="mt-1.5 text-[13px] leading-5 text-[#3f4c42]">{description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Main journal */}
      <section className="pb-7 pt-2 sm:pb-9 sm:pt-3">
        <PageContainer>
          <SectionHeading description="Selected high-quality papers from the conference will be recommended for publication in the following Scopus indexed journals.">
            Publication in Scopus Indexed Journals
          </SectionHeading>

          <motion.article
            {...fadeUp}
            className="mt-6 grid gap-7 rounded-xl border border-[#dce5d7] bg-[#fbfcf9] p-5 shadow-[0_8px_26px_rgba(20,55,23,.05)] sm:p-7 lg:grid-cols-[220px_minmax(0,1fr)_280px] lg:items-stretch"
          >
            <MainJournalCover />

            <div className="min-w-0">
              <h3 className="text-[20px] font-[550] leading-tight text-[#153819] sm:text-[21px]">
                Journal of Entomological Research
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded bg-[#27652c] px-3 py-1.5 text-[12px] font-[550] text-white">
                  Scopus Indexed
                </span>
                <span className="rounded bg-[#e7efdd] px-3 py-1.5 text-[12px] font-[550] text-[#31552d]">
                  Peer Reviewed
                </span>
              </div>

              <p className="mt-4 text-[13px] leading-[1.65] text-[#39483d]">
                The Journal of Entomological Research publishes original research articles,
                reviews, and short communications covering all aspects of entomology.
              </p>

              <dl className="mt-5 space-y-2.5">
                {journalDetails.map(({ icon: DetailIcon, label, value }) => (
                  <div key={label} className="grid grid-cols-[18px_84px_1fr] items-start gap-2 text-[12px] leading-5 sm:text-[13px]">
                    <DetailIcon className="mt-0.5 h-4 w-4 text-[#2e682d]" />
                    <dt className="font-[550] text-[#213b26]">{label}</dt>
                    <dd className="min-w-0 text-[#3c493f]">{value}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-[18px_84px_1fr] items-start gap-2 text-[12px] leading-5 sm:text-[13px]">
                  <Globe2 className="mt-0.5 h-4 w-4 text-[#2e682d]" />
                  <dt className="font-[550] text-[#213b26]">Website</dt>
                  <dd className="min-w-0 break-all">
                    <a
                      href="https://www.entomologyscience.org/journal"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#306c31] underline underline-offset-2 transition hover:text-[#74a23d]"
                    >
                      www.entomologyscience.org/journal
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <motion.div
              whileHover={{ y: -3 }}
              className="h-fit rounded-xl bg-[#f4f7f0] p-5 shadow-sm sm:p-6"
            >
              <h3 className="text-[15px] font-[550] text-[#183b1c]">Publication Benefits</h3>
              <ul className="mt-4 space-y-3">
                {publicationBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-[12px] leading-5 text-[#344438] sm:text-[13px]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 fill-[#31732f] text-white" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.article>
        </PageContainer>
      </section>

      {/* Process and notes */}
      <section className="pb-8 sm:pb-10">
        <PageContainer>
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_265px] lg:items-start">
            <motion.div {...fadeUp}>
              <SectionHeading align="left">Publication Process</SectionHeading>

              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
                {publicationProcess.map(({ icon: ProcessIcon, title, description }, index) => (
                  <motion.article
                    key={title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.42, delay: index * 0.06 }}
                    className="group relative text-center"
                  >
                    <span className="mx-auto flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#f1f5ec] text-[#153f1b] shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:bg-[#e7efdd] group-hover:shadow-md">
                      <ProcessIcon className="h-7 w-7" strokeWidth={1.45} />
                    </span>
                    {index < publicationProcess.length - 1 && (
                      <span className="absolute left-[calc(50%+37px)] top-[30px] hidden w-[calc(100%-74px)] border-t border-dashed border-[#8dac79] lg:block" />
                    )}
                    <h3 className="mt-3 text-[13px] font-[550] leading-5 text-[#18391d]">{title}</h3>
                    <p className="mt-2 text-[12px] leading-[1.55] text-[#4b574e] sm:text-[13px]">{description}</p>
                  </motion.article>
                ))}
              </div>
            </motion.div>

            <motion.aside
              {...fadeUp}
              className="rounded-xl bg-gradient-to-br from-[#123f1a] to-[#0b3516] p-6 text-white shadow-[0_12px_28px_rgba(9,50,19,.17)]"
            >
              <h2 className="text-[16px] text-white font-[550]">Important Notes</h2>
              <ul className="mt-5 space-y-4">
                {publicationNotes.map((note) => (
                  <li key={note} className="flex items-start gap-3 text-[12px] leading-[1.65] text-white/95">
                    <Leaf className="mt-0.5 h-3.5 w-3.5 shrink-0 -rotate-12 fill-[#b4d86c] text-[#b4d86c]" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </motion.aside>
          </div>
        </PageContainer>
      </section>

      {/* Other journals */}
      <section className="pb-7 sm:pb-9">
        <PageContainer>
          <SectionHeading description="In addition to the Journal of Entomological Research, authors may also consider the following Scopus indexed journals from our partner publishers and societies." leaf={false}>
            Other Reputed Entomology Journals
          </SectionHeading>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {otherJournals.map((journal, index) => (
              <motion.article
                key={journal.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                whileHover={{ y: -5 }}
                className="group flex min-h-[190px] gap-4 rounded-xl border border-[#dfe6da] bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-[0_13px_30px_rgba(24,62,26,.12)]"
              >
                <JournalCover journal={journal} />
                <div className="min-w-0 flex-1">
                  <h3 className="text-[13px] font-[550] leading-[1.35] text-[#17381c]">{journal.title}</h3>
                  <p className="mt-2 text-[11px] text-[#4e5a51]">{journal.issn}</p>
                  <span className="mt-3 inline-flex rounded bg-[#e8f0de] px-2 py-1 text-[10px] font-[550] text-[#31602d]">
                    Scopus Indexed
                  </span>
                  <p className="mt-3 text-[11px] leading-[1.55] text-[#4b574e]">
                    <span className="font-[550] text-[#243d28]">Focus:</span> {journal.focus}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* CTA */}
      <section className="pb-10 sm:pb-12">
        <PageContainer>
          <motion.div
            {...fadeUp}
            className="relative isolate flex min-h-[265px] items-end overflow-hidden rounded-xl bg-[#f4f6ee] bg-cover bg-[position:17%_center] px-5 py-4 shadow-sm sm:min-h-[100px] sm:items-center sm:bg-center sm:px-8 lg:min-h-[110px] lg:px-10"
            style={{ backgroundImage: `url(${pubCta})` }}
          >
            {/* <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#f6f7f1]/40 to-[#f6f7f1] sm:bg-gradient-to-r sm:from-transparent sm:via-[#f6f7f1]/30 sm:to-[#f6f7f1]/90" /> */}

            <div className="w-full text-center sm:ml-auto sm:w-[62%] sm:text-left md:w-[58%] lg:mr-[8%] lg:w-[55%]">
              <h2 className="text-[16px] font-[550] leading-[1.35] text-[#17371d] sm:text-[17px]">
                Publish Your Research. Make an Impact.
              </h2>
              <p className="mt-2 text-[12px] leading-5 text-[#405044] sm:text-[13px]">
                Join us in advancing entomological science through high-quality publications.
              </p>
              <Link
                to="/submit-paper"
                className="group mt-4 inline-flex items-center justify-center gap-4 rounded-md bg-[#174d1b] px-5 py-2.5 text-[12px] font-[550] text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#0d3914] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#82ad45] focus:ring-offset-2"
              >
                Submit Your Paper Now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </PageContainer>
      </section>
    </main>
  );
}