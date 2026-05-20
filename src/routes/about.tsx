import { createFileRoute } from "@tanstack/react-router";
import { Target, Star, BookOpen, Heart, Lightbulb, Trophy } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";

export const Route = createFileRoute("/about")({
  component: About,
});

const values = [
  { icon: BookOpen, title: "Excellence", desc: "Pursuing the highest standards in everything we do." },
  { icon: Heart, title: "Compassion", desc: "Caring for one another with kindness and empathy." },
  { icon: Lightbulb, title: "Curiosity", desc: "Encouraging questions and the joy of discovery." },
  { icon: Trophy, title: "Integrity", desc: "Building character through honesty and responsibility." },
];

function About() {
  return (
    <>
      <PageHero title="About Miracle Minds" subtitle="A nurturing space where children grow into confident, curious, and compassionate learners." />

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-lg text-ink/80 leading-relaxed">
          Miracle Minds is a leading primary school dedicated to providing quality education that nurtures both the mind and the heart. Our experienced teachers, modern facilities, and child-centered approach create an environment where every student can flourish.
        </p>
        <p className="mt-5 text-lg text-ink/80 leading-relaxed">
          We blend academic rigor with creative learning, sports, and personal development — ensuring that every child leaves Miracle Minds prepared for the world and inspired to make a difference in it.
        </p>
      </section>

      <section className="py-12 bg-bg-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-brand-blue text-white p-8 shadow-card">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
            <p className="text-white/90 leading-relaxed">
              To be the school of choice for families who seek an inspiring, values-driven education that prepares children to lead with confidence, curiosity, and compassion.
            </p>
          </div>
          <div className="rounded-2xl bg-brand-red text-white p-8 shadow-card">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
            <p className="text-white/90 leading-relaxed">
              To deliver a holistic, student-first education that builds strong fundamentals, nurtures creativity, and develops the character and resilience children need to thrive.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-card p-8 md:p-10 border-l-4 border-brand-red">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-full bg-brand-gradient text-white flex-shrink-0 flex items-center justify-center font-bold text-xl">PM</div>
            <div>
              <p className="text-lg italic text-ink/80 leading-relaxed">
                "Every child who walks through our doors carries unique gifts. Our mission is to help each one discover, develop, and share those gifts with the world."
              </p>
              <p className="mt-4 font-semibold text-brand-blue">— The Principal, Miracle Minds</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-bg-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Core Values" center />
          <div className="mt-10 grid grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-card hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-3">
                  <v.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg mb-2">{v.title}</h4>
                <p className="text-sm text-ink/70">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
