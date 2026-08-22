import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import CtaBanner from "../components/CtaBanner";
import PrimaryButton from "../components/PrimaryButton";
import Icon from "../components/Icon";
import { reveal, revealStagger } from "../lib/motion";
import { conferenceGlance, coreValues, organizingCommittee, pastEditions } from "../data/siteData";

export default function About() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", path: "/" }, { label: "About the Conference" }]}
        title="About the Conference"
        subtitle="Exploring. Understanding. Preserving. Insects, Ecosystems, and Our Future."
        description="The International Conference on Entomology brings together researchers, academicians, and industry professionals to exchange knowledge, share innovations, and discuss the latest advancements in entomological science and its real-world applications."
        image="/images/hero-about-beetle.jpg"
        imageAlt="Iridescent green beetle resting on a leaf"
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10">
            <motion.div {...reveal} className="lg:col-span-2">
              <SectionTitle icon="Leaf" title="About the Conference" />
              <p className="mt-5 text-body leading-relaxed">
                Entomology is central to understanding biodiversity, ensuring food security, protecting
                public health, and maintaining ecological balance.
              </p>
              <p className="mt-4 text-body leading-relaxed">
                This conference provides a global platform to present cutting-edge research, foster
                interdisciplinary collaborations, and inspire innovative solutions for a sustainable
                future.
              </p>
              <p className="mt-4 text-body leading-relaxed">
                We welcome researchers, students, academicians, and industry professionals to join us in
                advancing entomological science and creating a positive impact on people and the planet.
              </p>
            </motion.div>

            <motion.div {...revealStagger(0.1)} className="bg-surface rounded-xl p-6 shadow-card h-fit">
              <p className="font-semibold text-heading mb-5">Conference at a Glance</p>
              <div className="grid grid-cols-2 gap-5">
                {conferenceGlance.map((item) => (
                  <div key={item.label} className="flex flex-col items-center text-center gap-1.5">
                    <Icon name={item.icon} className="w-6 h-6 text-secondary" />
                    <p className="font-semibold text-heading text-sm">{item.value}</p>
                    <p className="text-xs text-muted leading-snug">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-surface">
        <Container>
          <SectionTitle title="Our Core Values" align="center" ornament className="mb-12" />
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {coreValues.map((v, i) => (
              <motion.div key={v.title} {...revealStagger(i * 0.06)} className="flex flex-col items-center text-center gap-3">
                <span className="w-16 h-16 rounded-full bg-white shadow-card flex items-center justify-center text-secondary">
                  <Icon name={v.icon} className="w-7 h-7" />
                </span>
                <p className="font-semibold text-heading">{v.title}</p>
                <p className="text-sm text-muted leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <motion.div {...reveal} className="bg-surface rounded-2xl px-6 sm:px-10 py-10">
            <SectionTitle title="Organizing Committee" align="center" className="mb-10 mx-auto items-center" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
              {organizingCommittee.map((c) => {
                const initials = c.name
                  .replace("Dr. ", "")
                  .split(" ")
                  .map((n) => n[0])
                  .join("");
                return (
                  <div key={c.name} className="flex flex-col items-center text-center gap-2">
                    <span className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold shadow-card">
                      {initials}
                    </span>
                    <p className="font-semibold text-heading text-sm">{c.name}</p>
                    <p className="text-xs text-secondary font-medium">{c.role}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center mt-9">
              <PrimaryButton to="/contact" variant="outlineDark">
                View Full Committee
              </PrimaryButton>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-surface">
        <Container>
          <SectionTitle title="Our Past Editions" align="center" ornament className="mb-12" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {pastEditions.map((e, i) => (
              <motion.div
                key={e.year}
                {...revealStagger(i * 0.06)}
                className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-cardHover hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="relative h-24 overflow-hidden">
                  <img
                    src={e.image}
                    alt={`${e.city}, ${e.country} — past conference edition`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
                    {e.year}
                  </span>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-heading text-sm">{e.city}</p>
                  <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
                    <Icon name="MapPin" className="w-3 h-3" /> {e.country}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-9">
            <PrimaryButton to="/about" variant="outlineDark" icon="ArrowRight">
              View All Past Conferences
            </PrimaryButton>
          </div>
        </Container>
      </section>

      <div className="pb-16 sm:pb-20">
        <CtaBanner
          image="/images/cta-about-caterpillar.jpg"
          imageAlt="Caterpillar on a leaf"
          title="Together, Let's Advance Entomological Science"
          description="Be part of a global community working towards sustainable solutions for insects, ecosystems, and humanity."
          buttonText="Submit Your Paper Today"
          buttonTo="/submit-paper"
        />
      </div>
    </>
  );
}
