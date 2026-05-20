import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { PageHero } from "../components/PageHero";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
});

type Cat = "All" | "Events" | "Classrooms" | "Activities";
const tabs: Cat[] = ["All", "Events", "Classrooms", "Activities"];

const photos: { id: number; label: string; cat: Exclude<Cat, "All">; tall?: boolean }[] = [
  { id: 1, label: "Annual Day", cat: "Events", tall: true },
  { id: 2, label: "Classroom Learning", cat: "Classrooms" },
  { id: 3, label: "Sports Day", cat: "Activities" },
  { id: 4, label: "Art Class", cat: "Activities", tall: true },
  { id: 5, label: "Science Fair", cat: "Events" },
  { id: 6, label: "Reading Hour", cat: "Classrooms" },
  { id: 7, label: "Music Performance", cat: "Activities" },
  { id: 8, label: "Independence Day", cat: "Events", tall: true },
  { id: 9, label: "Math Lab", cat: "Classrooms" },
  { id: 10, label: "Dance Recital", cat: "Activities" },
  { id: 11, label: "Field Trip", cat: "Events" },
  { id: 12, label: "Library Time", cat: "Classrooms" },
];

function Gallery() {
  const [active, setActive] = useState<Cat>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = active === "All" ? photos : photos.filter((p) => p.cat === active);

  return (
    <>
      <PageHero title="Gallery" subtitle="Moments of learning, laughter and life at Miracle Minds." />

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
                active === t
                  ? "bg-brand-red text-white shadow-card"
                  : "bg-white text-ink/70 border border-border hover:border-brand-red hover:text-brand-red"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => setLightbox(p.id)}
              className={`group relative overflow-hidden rounded-2xl shadow-card focus:outline-none focus:ring-2 focus:ring-brand-red ${p.tall ? "row-span-2 aspect-[3/5]" : "aspect-square"}`}
            >
              <div className="w-full h-full bg-brand-gradient flex items-center justify-center text-white font-semibold group-hover:scale-110 transition-transform duration-500">
                {p.label}
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </button>
          ))}
        </div>
      </section>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-up"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close"
            className="absolute top-6 right-6 text-white p-2 rounded-full bg-white/10 hover:bg-white/20"
            onClick={() => setLightbox(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-3xl w-full aspect-video rounded-2xl bg-brand-gradient flex items-center justify-center text-white text-2xl font-bold">
            {photos.find((p) => p.id === lightbox)?.label}
          </div>
        </div>
      )}
    </>
  );
}
