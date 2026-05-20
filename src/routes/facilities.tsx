import { createFileRoute } from "@tanstack/react-router";
import { School, Trophy, BookOpen, Palette } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";

export const Route = createFileRoute("/facilities")({
  component: Facilities,
});

const items = [
  { icon: School, color: "red", title: "Spacious Classrooms", desc: "Bright, airy classrooms equipped with modern learning aids and comfortable seating." },
  { icon: Trophy, color: "blue", title: "Playground & Sports", desc: "Open play areas, sports gear, and trained coaches for an active, healthy childhood." },
  { icon: BookOpen, color: "red", title: "Library & Reading Room", desc: "A well-stocked library to spark a lifelong love of reading and discovery." },
  { icon: Palette, color: "blue", title: "Art, Music & Activities", desc: "Dedicated spaces for creativity — painting, music, dance, and more." },
];

function Facilities() {
  return (
    <>
      <PageHero title="World-Class Facilities" subtitle="Thoughtfully designed spaces that inspire learning, play, and creativity." />

      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="What We Offer" center />
        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {items.map((it) => {
            const isRed = it.color === "red";
            return (
              <div key={it.title} className="bg-white rounded-2xl p-7 shadow-card hover:-translate-y-1 hover:shadow-card-hover transition-all border border-border">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${isRed ? "bg-brand-red/10 text-brand-red" : "bg-brand-blue/10 text-brand-blue"}`}>
                  <it.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-xl mb-2">{it.title}</h3>
                <p className="text-ink/70 leading-relaxed">{it.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
