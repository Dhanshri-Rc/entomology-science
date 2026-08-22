import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import CtaBanner from "../components/CtaBanner";
import Icon from "../components/Icon";
import { reveal, revealStagger } from "../lib/motion";
import { publicationFeatures, mainJournal, publicationProcess, publicationNotes, otherJournals } from "../data/siteData";

export default function Publication() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", path: "/" }, { label: "Publication" }]}
        title="Publication"
        subtitle="High Visibility. Global Impact."
        description="All accepted and presented papers will be published in Scopus indexed journals and other reputed entomology journals associated with Entomology Science Association."
        image="/images/hero-publication-beetle.jpg"
        imageAlt="Metallic green jewel beetle on a leaf"
        compact
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-surface rounded-xl p-6 sm:p-8">
            {publicationFeatures.map((f, i) => (
              <motion.div key={f.title} {...revealStagger(i * 0.06)} className="flex flex-col items-center text-center gap-2.5">
                <Icon name={f.icon} className="w-7 h-7 text-secondary" />
                <p className="font-semibold text-heading text-sm">{f.title}</p>
                <p className="text-xs text-muted leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container>
          <SectionTitle title="Publication in Scopus Indexed Journals" align="center" ornament className="mb-3" />
          <p className="text-center text-body max-w-2xl mx-auto mb-10">
            Selected high-quality papers from the conference will be recommended for publication in the
            following Scopus indexed journals.
          </p>

          <motion.div {...reveal} className="bg-surface rounded-2xl p-6 sm:p-8 shadow-card">
            <div className="grid lg:grid-cols-[220px_1fr_280px] gap-8">
              <div className="rounded-lg overflow-hidden shadow-card h-56 lg:h-full">
                <img
                  src="/images/journal-cover.jpg"
                  alt="Journal of Entomological Research cover"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-heading">{mainJournal.title}</h3>
                <div className="flex gap-2 mt-2.5">
                  {mainJournal.badges.map((b) => (
                    <span key={b} className="bg-secondary/10 text-secondary text-xs font-semibold px-2.5 py-1 rounded">
                      {b}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-body mt-4 leading-relaxed">{mainJournal.description}</p>
                <dl className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
                  {mainJournal.details.map((d) => (
                    <div key={d.label} className="flex gap-1.5">
                      <dt className="text-muted shrink-0">{d.label}:</dt>
                      <dd className="text-heading font-medium">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-card h-fit">
                <p className="font-semibold text-heading mb-3">Publication Benefits</p>
                <ul className="flex flex-col gap-2.5">
                  {mainJournal.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-body">
                      <Icon name="CheckCircle2" className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container>
          <div className="grid lg:grid-cols-[1fr_300px] gap-6">
            <motion.div {...reveal}>
              <SectionTitle title="Publication Process" align="center" className="mb-10 mx-auto items-center" />
              <div className="grid sm:grid-cols-5 gap-4">
                {publicationProcess.map((p, i) => (
                  <div key={p.title} className="flex flex-col items-center text-center gap-2.5 relative">
                    <span className="w-14 h-14 rounded-full bg-surface flex items-center justify-center text-secondary shadow-card">
                      <Icon name={p.icon} className="w-6 h-6" />
                    </span>
                    <p className="font-semibold text-heading text-sm">{p.title}</p>
                    <p className="text-xs text-muted leading-relaxed">{p.description}</p>
                    {i < publicationProcess.length - 1 && (
                      <span className="hidden sm:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] border-t border-dashed border-secondary/40" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...revealStagger(0.1)} className="bg-primary rounded-xl p-6 text-white h-fit">
              <h3 className="font-semibold mb-4">Important Notes</h3>
              <ul className="flex flex-col gap-3">
                {publicationNotes.map((n) => (
                  <li key={n} className="flex items-start gap-2.5 text-sm text-white/85">
                    <Icon name="Leaf" className="w-4 h-4 text-accent-light shrink-0 mt-0.5" />
                    {n}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container>
          <SectionTitle title="Other Reputed Entomology Journals" align="center" className="mb-3 mx-auto items-center" />
          <p className="text-center text-body max-w-2xl mx-auto mb-10">
            In addition to the Journal of Entomological Research, authors may also consider the following
            Scopus indexed journals from our partner publishers and societies.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {otherJournals.map((j, i) => (
              <motion.div
                key={j.title}
                {...revealStagger(i * 0.07)}
                className="bg-white rounded-xl p-5 shadow-card hover:shadow-cardHover hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-3"
              >
                <img src={j.image} alt={`${j.title} journal cover`} loading="lazy" className="w-20 h-28 object-cover rounded shadow-card" />
                <p className="font-semibold text-heading text-sm">{j.title}</p>
                <p className="text-xs text-muted">{j.issn}</p>
                <span className="bg-secondary/10 text-secondary text-xs font-semibold px-2.5 py-1 rounded">
                  Scopus Indexed
                </span>
                <p className="text-xs text-muted leading-relaxed">{j.focus}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <div className="pb-16 sm:pb-20">
        <CtaBanner
          image="/images/hero-aimscope-butterfly.jpg"
          imageAlt="Monarch butterfly on a daisy flower"
          title="Publish Your Research. Make an Impact."
          description="Join us in advancing entomological science through high-quality publications."
          buttonText="Submit Your Paper Now"
          buttonTo="/submit-paper"
          dark={false}
        />
      </div>
    </>
  );
}
