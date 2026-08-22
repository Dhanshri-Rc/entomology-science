import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import CtaBanner from "../components/CtaBanner";
import PrimaryButton from "../components/PrimaryButton";
import Icon from "../components/Icon";
import { reveal, revealStagger } from "../lib/motion";
import {
  researchTopics,
  importantDates,
  submissionTypes,
  authorGuidelines,
  whySubmit,
} from "../data/siteData";

export default function CallForPapers() {
  return (
    <>
      <PageHero
        eyebrow="Call for Papers"
        breadcrumb={[{ label: "Home", path: "/" }, { label: "Call for Papers" }]}
        title={
          <>
            Share Your Research. <br className="hidden sm:block" />
            Advance <span className="text-accent-light">Entomological Science.</span>
          </>
        }
        description="We invite researchers, scientists, academicians and industry professionals to contribute their original research and innovative ideas to the conference."
        image="/images/hero-cfp-beetle.jpg"
        imageAlt="Shield bug resting on a green leaf"
      >
        <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-secondary/40 bg-primary-dark/70 backdrop-blur-sm p-5 text-center flex flex-col items-center justify-center gap-1.5 z-20">
          <Icon name="CalendarDays" className="w-6 h-6 text-accent-light mb-1" />
          <p className="text-white font-semibold text-sm">Important Dates</p>
          <p className="text-white/70 text-xs mt-1">Abstract Submission</p>
          <p className="text-accent-light text-sm font-semibold">31 July 2025</p>
          <p className="text-white/70 text-xs mt-1">Full Paper Submission</p>
          <p className="text-accent-light text-sm font-semibold">30 August 2025</p>
        </div>
      </PageHero>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 flex flex-col gap-10">
              <motion.div {...reveal}>
                <SectionTitle icon="Leaf" title="Topics of Interest" />
                <p className="mt-4 text-body">
                  We welcome papers (but not limited to) in the following areas:
                </p>
                <div className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                  {researchTopics.map((t) => (
                    <div key={t} className="flex items-start gap-2.5 text-sm text-body py-1">
                      <Icon name="Leaf" className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      {t}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...revealStagger(0.1)}>
                <SectionTitle icon="Leaf" title="Submission Types" />
                <div className="mt-5 grid sm:grid-cols-3 gap-5">
                  {submissionTypes.map((s) => (
                    <div key={s.title} className="bg-surface rounded-lg p-6 text-center flex flex-col items-center gap-3 hover:-translate-y-1 hover:shadow-cardHover transition-all duration-300">
                      <Icon name={s.icon} className="w-7 h-7 text-secondary" />
                      <p className="font-semibold text-heading">{s.title}</p>
                      <p className="text-sm text-muted leading-relaxed">{s.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...revealStagger(0.2)}>
                <SectionTitle icon="Leaf" title="Guidelines for Authors" />
                <ul className="mt-5 flex flex-col gap-3">
                  {authorGuidelines.map((g) => (
                    <li key={g} className="flex items-start gap-3 text-sm text-body">
                      <Icon name="FileCheck2" className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      {g}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-5">
                  <PrimaryButton icon="Download" variant="dark">
                    Download Templates
                  </PrimaryButton>
                  <p className="text-sm text-body">
                    For detailed author instructions, visit the{" "}
                    <Link to="/submission" className="text-secondary font-medium hover:underline">
                      Submission
                    </Link>{" "}
                    page.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col gap-6">
              <motion.div {...reveal} className="bg-surface rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-2.5 mb-5">
                  <Icon name="CalendarDays" className="w-5 h-5 text-secondary" />
                  <h3 className="font-semibold text-heading">Important Dates</h3>
                </div>
                <ul className="flex flex-col gap-4">
                  {importantDates.map((d) => (
                    <li key={d.label + d.date} className="flex items-start gap-3">
                      <Icon name={d.icon} className="w-4 h-4 text-secondary shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-muted">{d.label}</p>
                        <p className="font-semibold text-heading text-sm">{d.date}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div {...revealStagger(0.1)} className="bg-primary rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-4">Why Submit?</h3>
                <ul className="flex flex-col gap-3">
                  {whySubmit.map((w) => (
                    <li key={w} className="flex items-start gap-2.5 text-sm text-white/85">
                      <Icon name="Check" className="w-4 h-4 text-accent-light shrink-0 mt-0.5" />
                      {w}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div {...revealStagger(0.2)} className="bg-surface rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-2.5 mb-2">
                  <Icon name="Send" className="w-5 h-5 text-secondary" />
                  <h3 className="font-semibold text-heading">Submit Your Paper</h3>
                </div>
                <p className="text-sm text-body mb-4">
                  All submissions must be made through our online submission system.
                </p>
                <PrimaryButton to="/submit-paper" icon="ArrowRight" variant="dark" className="w-full">
                  Submit Now
                </PrimaryButton>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      <div className="pb-16 sm:pb-20">
        <CtaBanner
          image="/images/hero-cfp-beetle.jpg"
          imageAlt="Jewel wasp on a green leaf"
          title="Join us in advancing the science of entomology for a sustainable future."
          buttonText="Submit Your Paper Today!"
          buttonTo="/submit-paper"
          dark={false}
        />
      </div>
    </>
  );
}
