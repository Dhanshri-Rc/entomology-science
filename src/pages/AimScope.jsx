import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Atom,
  Binoculars,
  Bug,
  Cpu,
  Dna,
  Earth,
  FilePenLine,
  Flower2,
  Leaf,
  Microscope,
  Send,
  Sprout,
  Target,
} from "lucide-react";

import aimsBg from "../assets/img/aimsBg.png";
import interdisciplinaryImage from "../assets/img/aims.png";
import aimsCtaBg from "../assets/img/aimsCta.png";

const leftTopics = [
  {
    icon: Bug,
    title: "Insect Biodiversity & Systematics",
    description:
      "Taxonomy, morphology, phylogeny, and biodiversity assessments of insects.",
  },
  {
    icon: Sprout,
    title: "Agricultural Entomology & Pest Management",
    description:
      "Integrated pest management, biocontrol, pest behavior, and crop protection strategies.",
  },
  {
    icon: Earth,
    title: "Insect Ecology & Conservation",
    description:
      "Population dynamics, habitat conservation, ecosystem services, and climate change impacts.",
  },
  {
    icon: Microscope,
    title: "Medical & Veterinary Entomology",
    description:
      "Vector biology, disease transmission, diagnostics, and control of insect-borne diseases.",
  },
];

const rightTopics = [
  {
    icon: Dna,
    title: "Molecular Entomology & Genomics",
    description:
      "Genetics, genomics, transcriptomics, and molecular techniques in entomology.",
  },
  {
    icon: Atom,
    title: "Insect Physiology & Biochemistry",
    description:
      "Physiology, biochemistry, toxicology, nutrition, and insect development.",
  },
  {
    icon: Flower2,
    title: "Pollinators & Ecosystem Services",
    description:
      "Pollinator biology, pollination ecology, and their role in sustainable ecosystems.",
  },
  {
    icon: Cpu,
    title: "Emerging Trends & Technologies",
    description:
      "AI, IoT, biotechnology, remote sensing, and innovative technologies in entomological research.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const heroMotion = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

function PageContainer({ children, className = "" }) {
  return (
    <div
      className={`mx-auto w-[calc(100%-32px)] max-w-[1170px] sm:w-[90%] ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      <span className="flex items-center gap-1 text-[#4d762e]">
        <span className="h-px w-8 bg-[#5c7d42] sm:w-10" />
        <Leaf className="h-4 w-4 -rotate-45 fill-current" strokeWidth={1.3} />
      </span>
      <h2 className="text-center text-[20px] font-[550] leading-tight text-[#163719] sm:text-[21px]">
        {children}
      </h2>
      <span className="flex items-center gap-1 text-[#4d762e]">
        <Leaf
          className="h-4 w-4 rotate-[135deg] fill-current"
          strokeWidth={1.3}
        />
        <span className="h-px w-8 bg-[#5c7d42] sm:w-10" />
      </span>
    </div>
  );
}

function AimCard({ icon: CardIcon, title, children, delay = 0 }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-[10px] border border-[#e4e8df] bg-[#f7f8f5] px-5 py-6 shadow-[0_7px_22px_rgba(23,60,26,0.04)] transition-shadow duration-300 hover:shadow-[0_14px_32px_rgba(23,60,26,0.12)] sm:px-6"
    >
      <div className="relative z-10 flex items-start gap-5 sm:gap-6">
        <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#376e20] to-[#164d1b] text-white shadow-md transition duration-300 group-hover:scale-105 group-hover:rotate-3">
          <CardIcon className="h-6 w-6" strokeWidth={1.6} />
        </span>

        <div>
          <h2 className="text-[20px] font-[550] text-[#163719] sm:text-[21px]">
            {title}
          </h2>
          <span className="my-1 block h-[2px] w-12 bg-[#487b2e] transition-all duration-300 group-hover:w-20" />
          <p className="max-w-[430px] text-[12px] leading-[1.75] text-[#232a23] sm:text-[13px]">
            {children}
          </p>
        </div>
      </div>

      <Leaf
        aria-hidden="true"
        className="absolute -bottom-5 -right-2 h-24 w-24 rotate-[-22deg] text-[#739363]/25"
        strokeWidth={0.8}
      />
      <Leaf
        aria-hidden="true"
        className="absolute bottom-6 right-7 h-12 w-12 rotate-[18deg] text-[#739363]/20"
        strokeWidth={0.8}
      />
    </motion.article>
  );
}

function TopicColumn({ topics, columnDelay = 0 }) {
  return (
    <div className="divide-y divide-dotted divide-[#ccd4c7]">
      {topics.map(({ icon: TopicIcon, title, description }, index) => (
        <motion.article
          key={title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.42, delay: columnDelay + index * 0.055 }}
          className="group flex min-h-[79px] items-center gap-4 py-3 sm:gap-5"
        >
          <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#477b27] to-[#21571e] text-white shadow-sm transition duration-300 group-hover:-rotate-3 group-hover:scale-105 group-hover:shadow-md">
            <TopicIcon className="h-6 w-6" strokeWidth={1.55} />
          </span>

          <div>
            <h3 className="text-[13px] font-[550] leading-snug text-[#152f17] sm:text-[14px]">
              {title}
            </h3>
            <p className="mt-1 max-w-[430px] text-[12px] leading-[1.55] text-[#303630] sm:text-[13px]">
              {description}
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

export default function AimScope() {
  return (
    <main className="overflow-hidden bg-white font-sans text-[#202720]">
      {/* HERO */}
      <section
        className="relative isolate flex min-h-[360px] items-center bg-cover bg-[position:68%_center] sm:min-h-[380px] md:min-h-[400px] md:bg-center"
        style={{ backgroundImage: `url(${aimsBg})` }}
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#062417]/95 via-[#0a2d19]/78 to-[#0a2d19]/10 sm:via-[#0a2d19]/62 md:to-transparent" />

        <PageContainer>
          <motion.div
            variants={heroMotion}
            initial="hidden"
            animate="visible"
            className="max-w-[545px] py-8 text-white"
          >
            <nav
              aria-label="Breadcrumb"
              className="mb-5 mt-20 sm:mt-14 lg:mt-16 flex items-center gap-2 text-[13px] sm:text-[12px]"
            >
              <Link to="/" className="transition hover:text-[#b8d96b]">
                Home
              </Link>
              <span aria-hidden="true" className="text-white/75">
                ›
              </span>
              <span className="font-[550]">Aims &amp; Scope</span>
            </nav>

            <h1 className="text-[36px] text-white font-[600] leading-tight tracking-[-0.02em] sm:text-[38px]">
              Aims &amp; Scope
            </h1>
            <span className="my-3 block h-[2px] w-[105px] bg-[#5c8b37]" />

            <p className="max-w-[495px] text-[16px] font-[550] leading-[1.45] text-[#a4cf57] sm:text-[17px]">
              Advancing knowledge. Inspiring innovation.
              <br />
              Building a sustainable future through entomology.
            </p>

            <p className="mt-4 max-w-[535px] text-[13px] leading-[1.6] text-white/95 sm:text-[14px]">
              Our aim is to bring together researchers, academicians, students,
              and industry professionals to exchange knowledge and explore
              cutting-edge advancements in entomological science and its
              real-world applications.
            </p>
          </motion.div>
        </PageContainer>
      </section>

      {/* AIM AND SCOPE */}
      <section className="pb-5 pt-7 sm:pb-6 sm:pt-8">
        <PageContainer>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <AimCard icon={Target} title="Our Aim">
              To promote and advance entomological research, education, and
              innovation by providing a global platform for the dissemination of
              knowledge and fostering collaborations that address challenges
              related to insects, ecosystems, and human well-being.
            </AimCard>

            <AimCard icon={Binoculars} title="Our Scope" delay={0.08}>
              The conference encompasses a wide range of themes in entomology,
              from fundamental research to applied solutions. We welcome
              original research, reviews, case studies, and innovative ideas
              that contribute to the sustainable management of insect-related
              challenges.
            </AimCard>
          </div>
        </PageContainer>
      </section>

      {/* TOPICS */}
      <section className="pb-6 pt-1 sm:pb-7 sm:pt-2">
        <PageContainer>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <SectionHeading>Topics &amp; Focus Areas</SectionHeading>
            <p className="mx-auto mb-4 mt-3 max-w-[720px] text-center text-[12px] leading-relaxed text-[#303630] sm:mb-5 sm:text-[13px]">
              We invite submissions that align with, but are not limited to, the
              following key areas:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-x-11 rounded-[10px] border border-[#dde3d8] bg-[#fbfcfa] px-5 py-1 shadow-[0_7px_22px_rgba(23,60,26,0.04)] sm:px-6 lg:grid-cols-2 lg:px-7">
            <TopicColumn topics={leftTopics} />
            <TopicColumn topics={rightTopics} columnDelay={0.08} />
          </div>
        </PageContainer>
      </section>

      {/* INTERDISCIPLINARY CONTRIBUTIONS */}
      <section className="pb-5 pt-0 sm:pb-6">
        <PageContainer>
          <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="group grid overflow-hidden rounded-[10px] border border-[#e1e6dc] bg-[#f5f7f2] shadow-[0_8px_24px_rgba(23,60,26,0.05)] md:min-h-[142px] md:grid-cols-[42%_58%]"
          >
            <div className="min-h-[210px] overflow-hidden md:min-h-0">
              <img
                src={interdisciplinaryImage}
                alt="Iridescent emerald beetle resting on a green leaf"
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>

            <div className="flex items-start gap-5 px-5 py-6 sm:px-7 md:items-center md:px-10 md:py-5">
              <span className="flex h-[66px] w-[66px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#174b25] to-[#032b17] text-white shadow-md transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
                <FilePenLine className="h-8 w-8" strokeWidth={1.5} />
              </span>

              <div>
                <h2 className="flex flex-wrap items-center gap-2 text-[18px] font-[550] leading-tight text-[#173719] sm:text-[20px]">
                  Interdisciplinary Contributions
                  <Leaf
                    className="h-4 w-4 fill-[#8bb344] text-[#8bb344]"
                    strokeWidth={1.2}
                  />
                </h2>
                <p className="mt-3 max-w-[620px] text-[12px] leading-[1.7] text-[#303630] sm:text-[13px]">
                  We encourage interdisciplinary research linking entomology
                  with agriculture, environment, public health, biotechnology,
                  data science, and social sciences to drive innovative
                  solutions for global challenges.
                </p>
              </div>
            </div>
          </motion.article>
        </PageContainer>
      </section>

      {/* CTA */}
      <section className="pb-5">
        <PageContainer>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="relative isolate overflow-hidden rounded-[10px] bg-[#082e19] bg-cover bg-center px-5 py-6 text-white shadow-[0_8px_24px_rgba(8,45,24,0.18)] sm:px-7 md:min-h-[105px] md:py-3"
            style={{ backgroundImage: `url(${aimsCtaBg})` }}
          >
            <div className="absolute inset-0 -z-10 bg-[#062b17]/25" />

            <div className="flex min-h-[80px] flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:text-left">
                <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full border border-[#7fa641] text-white transition duration-300 hover:scale-105 hover:bg-[#6c9431]/20">
                  <Send className="h-8 w-8 -rotate-12" strokeWidth={1.35} />
                </span>

                <h2 className="max-w-[365px] text-[16px] text-white font-[550] leading-[1.5] sm:text-[17px]">
                  Join us in shaping the future of entomological science and
                  making a
                  <span className="text-[#9bc852]"> global impact.</span>
                </h2>
              </div>

              <div className="flex flex-col items-center md:items-start">
                <Link
                  to="/submit-paper"
                  className="group inline-flex items-center gap-4 rounded-[5px] bg-[#6ba233] px-5 py-3 text-[12px] font-[550] text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-[#80b43d] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#174522] sm:text-[13px]"
                >
                  Submit Your Paper
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <p className="mt-2 text-[11px] text-white/95 sm:text-[12px]">
                  Be part of innovation. Be part of impact.
                </p>
              </div>
            </div>
          </motion.div>
        </PageContainer>
      </section>
    </main>
  );
}
