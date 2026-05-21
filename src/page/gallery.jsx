import { useState } from "react";
import { X } from "lucide-react";

const tabs = ["All", "Events", "Classrooms", "Activities"];

const galleryImages = Object.entries(
  import.meta.glob("../assets/gallery/*.{png,jpg,jpeg,webp,svg}", {
    eager: true,
    import: "default",
  })
)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([, image]) => image);

const photos = [
  { id: 1,  label: "Annual Day",          cat: "Events",      tall: true  },
  { id: 2,  label: "Classroom Learning",  cat: "Classrooms"               },
  { id: 3,  label: "Sports Day",          cat: "Activities"               },
  { id: 4,  label: "Art Class",           cat: "Activities",  tall: true  },
  { id: 5,  label: "Science Fair",        cat: "Events"                   },
  { id: 6,  label: "Reading Hour",        cat: "Classrooms"               },
  { id: 7,  label: "Music Performance",   cat: "Activities"               },
  { id: 8,  label: "Independence Day",    cat: "Events",      tall: true  },
  { id: 9,  label: "Math Lab",            cat: "Classrooms"               },
  { id: 10, label: "Dance Recital",       cat: "Activities"               },
  { id: 11, label: "Field Trip",          cat: "Events"                   },
  { id: 12, label: "Library Time",        cat: "Classrooms"               },
].map((photo, index) => ({
  ...photo,
  src: galleryImages[index] ?? null,
}));

/* Placeholder colours per category — swap for real <img> tags later */
const catColour = {
  Events:      { bg: "#0f2557", text: "#bfdbfe" },
  Classrooms:  { bg: "#1e3a5f", text: "#bfdbfe" },
  Activities:  { bg: "#7c1f10", text: "#fed7cc" },
};

export function GalleryPage() {
  const [active, setActive]   = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);

  function openLightbox(id) {
    setLightbox(id);
    setAnimateIn(false);
    requestAnimationFrame(() => setAnimateIn(true));
  }

  function closeLightbox() {
    setAnimateIn(false);
    setTimeout(() => setLightbox(null), 200);
  }

  const filtered = active === "All" ? photos : photos.filter((p) => p.cat === active);
  const lightboxPhoto = photos.find((p) => p.id === lightbox);

  return (
    <div className="min-h-screen bg-[#f4f5f8]">

      {/* ── Hero ── */}
      <section className="relative bg-[#0f2557] text-white overflow-hidden
                          px-5 pt-10 pb-9
                          sm:px-10 sm:pt-14 sm:pb-12
                          md:px-14 md:pt-18 md:pb-16
                          lg:px-20 lg:pt-20 lg:pb-20">
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,white 0,white 1px,transparent 1px,transparent 12px)" }}
        />
        <div className="relative max-w-5xl mx-auto">
          <p className="flex items-center gap-2 uppercase font-medium text-blue-200 mb-4
                         text-[10px] tracking-[2.5px]
                         sm:text-[11px] sm:tracking-[3px] sm:mb-5">
            <span className="block h-[1.5px] bg-[#c55a3f] shrink-0 w-6 sm:w-8" />
            Miracle Minds Primary School
          </p>
          <h1 className="font-serif font-bold leading-snug mb-3
                          text-[28px]
                          sm:text-4xl sm:leading-tight sm:mb-4
                          md:text-5xl md:mb-5">
            Our Gallery
          </h1>
          <p className="text-blue-100 font-light
                         text-[13px] leading-[1.75]
                         sm:text-[15px] sm:leading-relaxed sm:max-w-lg
                         md:text-base md:max-w-xl">
            Moments of learning, laughter, and life at Miracle Minds —
            captured and cherished.
          </p>
          <div className="bg-[#c55a3f] rounded-full mt-6 sm:mt-8
                           w-10 h-0.75 sm:w-12 sm:h-1" />
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className="max-w-5xl mx-auto
                           px-4 pt-6 pb-0
                           sm:px-8 sm:pt-10
                           md:px-12 md:pt-12
                           lg:px-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-4 py-1.5 rounded-full text-[12.5px] font-medium transition-all border
                           sm:px-5 sm:py-2 sm:text-[13px]
                           ${active === t
                             ? "bg-[#0f2557] text-white border-[#0f2557]"
                             : "bg-white text-[#444458] border-transparent hover:border-[#0f2557] hover:text-[#0f2557]"
                           }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* ── Masonry Grid ── */}
      <section className="max-w-5xl mx-auto
                           px-4 pt-5 pb-12
                           sm:px-8 sm:pt-7 sm:pb-16
                           md:px-12 md:pt-8 md:pb-20
                           lg:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4
                         auto-rows-[160px] sm:auto-rows-[180px] md:auto-rows-[200px]">
          {filtered.map((p) => {
            const colours = catColour[p.cat];
            return (
              <button
                key={p.id}
                onClick={() => openLightbox(p.id)}
                className={`group relative overflow-hidden rounded-xl
                             focus:outline-none focus:ring-2 focus:ring-[#c55a3f]
                             ${p.tall ? "row-span-2" : "row-span-1"}`}
              >
                {p.src ? (
                  <img
                    src={p.src}
                    alt={p.label}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-105 filter"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-end transition-transform duration-500 group-hover:scale-105 group-hover:brightness-105 filter"
                    style={{ background: colours.bg }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-8"
          onClick={() => closeLightbox()}
        >
          <button
            aria-label="Close lightbox"
            onClick={() => closeLightbox()}
            className="absolute top-4 right-4 sm:top-6 sm:right-6
                        w-9 h-9 sm:w-10 sm:h-10 rounded-full
                        bg-white/10 hover:bg-white/20 transition-colors
                        flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="w-full max-w-3xl rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`w-full max-w-3xl rounded-2xl overflow-hidden transform transition-all duration-200 ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} onClick={(e) => e.stopPropagation()}>
              {lightboxPhoto?.src ? (
                <img
                  src={lightboxPhoto.src}
                  alt={lightboxPhoto.label}
                  loading="eager"
                  decoding="async"
                  className="w-full aspect-video object-cover"
                />
              ) : (
                <div
                  className="w-full aspect-video flex items-center justify-center"
                  style={{ background: catColour[lightboxPhoto?.cat]?.bg }}
                />
              )}
            </div>

            {/* Intentionally no caption: lightbox displays only the image */}
          </div>
        </div>
      )}

    </div>
  );
}