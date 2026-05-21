import { School, Trophy, BookOpen, Palette } from "lucide-react";

const items = [
  {
    icon: School,
    color: "red",
    title: "Spacious Classrooms",
    desc: "Bright and comfortable classrooms that help students learn with focus and ease.",
  },
  {
    icon: Trophy,
    color: "blue",
    title: "Playground & Sports",
    desc: "Open play areas and sports activities that keep children active and healthy.",
  },
  {
    icon: BookOpen,
    color: "red",
    title: "Library & Reading Room",
    desc: "A friendly space with books that encourage reading and learning.",
  },
  {
    icon: Palette,
    color: "blue",
    title: "Art, Music & Activities",
    desc: "Creative spaces for art, music, and fun activities to develop every child’s talent.",
  },
];

export function FacilitiesPage() {
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
            World-Class Facilities
          </h1>
          <p className="text-blue-100 font-light
                         text-[13px] leading-[1.75]
                         sm:text-[15px] sm:leading-relaxed sm:max-w-lg
                         md:text-base md:max-w-xl">
Well-designed spaces that support learning, play, and creativity, helping every child grow and succeed.
          </p>
          <div className="bg-[#c55a3f] rounded-full mt-6 sm:mt-8
                           w-10 h-[3px] sm:w-12 sm:h-1" />
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="max-w-5xl mx-auto
                           px-4 pt-6 pb-5
                           sm:px-8 sm:pt-10 sm:pb-8
                           md:px-12 md:pt-12 md:pb-10
                           lg:px-6">
        <div className="bg-white rounded-xl
                         p-5
                         sm:p-7
                         md:p-8">
          <p className="text-[#444458]
                         text-[13.5px] leading-[1.85]
                         sm:text-[15px]">
At Miracle Minds, our facilities are designed to support learning, creativity, and growth. We provide a safe and friendly environment where children can explore, learn, and develop at every stage.
          </p>
        </div>
      </section>

      {/* ── Facilities Grid ── */}
      <section className="max-w-5xl mx-auto
                           px-4 pt-6 pb-10
                           sm:px-8 sm:pt-8 sm:pb-12
                           md:px-12 md:pt-10 md:pb-16
                           lg:px-6">
        <p className="uppercase font-medium text-[#c55a3f] mb-1
                       text-[10px] tracking-[2.5px]
                       sm:text-[11px] sm:tracking-[3px]">
          What we offer
        </p>
        <h2 className="font-serif font-bold text-[#0f2557] mb-5
                        text-[20px]
                        sm:text-2xl sm:mb-6
                        md:text-3xl md:mb-7">
          Our Facilities
        </h2>

        <div className="grid gap-3
                         grid-cols-1
                         sm:grid-cols-2
                         sm:gap-4">
          {items.map(({ icon: Icon, color, title, desc }) => {
            const isRed = color === "red";
            return (
              <div
                key={title}
                className="bg-white rounded-xl flex items-start gap-4 transition-colors
                            hover:border-[#0f2557] border border-transparent
                            p-4 sm:p-5 md:p-6"
              >
                <div
                  className={`rounded-lg flex items-center justify-center shrink-0
                               w-9 h-9 sm:w-10 sm:h-10
                               ${isRed ? "bg-red-50" : "bg-blue-50"}`}
                >
                  <Icon
                    className={`w-[18px] h-[18px] sm:w-5 sm:h-5
                                 ${isRed ? "text-[#c55a3f]" : "text-[#0f2557]"}`}
                  />
                </div>
                <div>
                  <h4 className="font-medium text-[#0f2557] mb-1
                                  text-[13.5px] sm:text-sm md:text-[15px]">
                    {title}
                  </h4>
                  <p className="text-[#6b6b80] leading-[1.65]
                                 text-[12.5px] sm:text-xs md:text-[13px]">
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}