import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import CtaBanner from "../components/CtaBanner";
import PrimaryButton from "../components/PrimaryButton";
import Icon from "../components/Icon";
import { reveal, revealStagger } from "../lib/motion";
import {
  generalGuidelines,
  manuscriptPreparation,
  beforeYouSubmit,
  submissionProcess,
} from "../data/siteData";

export default function Submission() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", path: "/" }, { label: "Submission" }]}
        title="Submission"
        description="We have made the submission process simple, transparent and efficient for all authors."
        image="/images/hero-submission-weevil.jpg"
        imageAlt="Weevil beetle on a green leaf"
        compact
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 flex flex-col gap-10">
              <motion.div {...reveal}>
                <SectionTitle icon="Leaf" title="General Guidelines" />
                <ul className="mt-5 flex flex-col gap-3.5">
                  {generalGuidelines.map((g) => (
                    <li key={g} className="flex items-start gap-3 text-sm text-body">
                      <Icon name="FileCheck2" className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      {g}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div {...revealStagger(0.1)}>
                <SectionTitle icon="Leaf" title="Manuscript Preparation" />
                <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {manuscriptPreparation.map((m) => (
                    <div key={m.title} className="bg-surface rounded-lg p-5 text-center flex flex-col items-center gap-2.5 hover:-translate-y-1 hover:shadow-cardHover transition-all duration-300">
                      <Icon name={m.icon} className="w-6 h-6 text-secondary" />
                      <p className="font-semibold text-heading text-sm">{m.title}</p>
                      <p className="text-xs text-muted leading-relaxed">{m.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...revealStagger(0.2)}>
                <SectionTitle icon="Leaf" title="Before You Submit" />
                <ul className="mt-5 flex flex-col gap-3">
                  {beforeYouSubmit.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-body">
                      <Icon name="CheckCircle2" className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div {...revealStagger(0.3)} className="bg-surface rounded-xl p-6 sm:p-7 relative overflow-hidden">
                <SectionTitle icon="Leaf" title="Confidentiality & Ethics" />
                <p className="mt-4 text-sm text-body leading-relaxed max-w-2xl">
                  All submitted manuscripts are treated with strict confidentiality. The review process is
                  double blind. Any unethical or fraudulent submission will lead to immediate rejection and
                  may be reported to the authors' institutions.
                </p>
              </motion.div>
            </div>

            <div className="flex flex-col gap-6">
              <motion.div {...reveal} className="bg-surface rounded-xl p-6 shadow-card">
                <SectionTitle icon="Leaf" title="Submission Process" size="sm" />
                <ol className="mt-6 relative flex flex-col gap-7 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:border-l before:border-dashed before:border-secondary/40">
                  {submissionProcess.map((s, i) => (
                    <li key={s.title} className="flex items-start gap-4 relative">
                      <span className="w-8 h-8 rounded-full bg-primary text-white text-sm font-semibold flex items-center justify-center shrink-0 z-10">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-heading text-sm flex items-center gap-2">
                          <Icon name={s.icon} className="w-4 h-4 text-secondary" /> {s.title}
                        </p>
                        <p className="text-xs text-muted mt-1 leading-relaxed">{s.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.div>

              <motion.div {...revealStagger(0.1)} className="bg-surface rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-2.5 mb-2">
                  <Icon name="Headphones" className="w-5 h-5 text-secondary" />
                  <h3 className="font-semibold text-heading">Need Help?</h3>
                </div>
                <p className="text-sm text-body mb-4">
                  If you face any issues during submission, please contact us.
                </p>
                <PrimaryButton to="/contact" icon="ArrowRight" variant="dark" className="w-full">
                  Contact Support
                </PrimaryButton>
              </motion.div>

              <motion.div {...revealStagger(0.2)} className="bg-surface rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-2.5 mb-2">
                  <Icon name="Download" className="w-5 h-5 text-secondary" />
                  <h3 className="font-semibold text-heading">Download Resources</h3>
                </div>
                <p className="text-sm text-body mb-4">
                  Get our template, sample paper and author guidelines.
                </p>
                <PrimaryButton icon="Download" variant="dark" className="w-full">
                  Download Now
                </PrimaryButton>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      <div className="pb-16 sm:pb-20">
        <CtaBanner
          image="/images/cta-ladybug.jpg"
          imageAlt="Ladybug on a leaf"
          title="We look forward to your valuable research contributions to advance entomological science."
          buttonText="Submit Your Manuscript"
          buttonTo="/submit-paper"
          dark={false}
        />
      </div>
    </>
  );
}
