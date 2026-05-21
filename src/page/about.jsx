import { Target, Star, BookOpen, Heart, Lightbulb, ShieldCheck, Gamepad2, TrendingUp, Sparkles } from "lucide-react";

const values = [
  { icon: BookOpen,   title: "Learn", desc: "Making education fun and engaging." },
  { icon: Gamepad2,   title: "Play",  desc: "Balancing studies with joyful activities." },
  { icon: TrendingUp, title: "Grow",  desc: "Developing skills, values, and confidence." },
  { icon: Sparkles,   title: "Shine", desc: "Helping every child reach their potential." },
];

export function AboutPage() {
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
            About Our School
          </h1>
          <p className="text-blue-100 font-light
                         text-[13px] leading-[1.75]
                         sm:text-[15px] sm:leading-relaxed sm:max-w-lg
                         md:text-base md:max-w-xl">
A caring place where children grow into confident, curious, and kind learners, ready for the future.
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
Miracle Minds is a primary school focused on giving quality education in a caring and friendly environment. Our teachers support every child to learn, grow, and feel confident.
          </p>
          <p className="text-[#444458] mt-3 sm:mt-4
                         text-[13.5px] leading-[1.85]
                         sm:text-[15px]">
We combine studies with fun activities, creativity, and sports so that children enjoy learning and develop all-round skills. Our goal is to help every child become confident, responsible, and ready for the future.
          </p>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="max-w-5xl mx-auto
                           px-4 pt-3 pb-3
                           sm:px-8 sm:pt-4 sm:pb-4
                           md:px-12
                           lg:px-6">
        <div className="grid gap-3
                         grid-cols-1
                         md:grid-cols-2
                         sm:gap-4">

          {/* Vision */}
          <div className="bg-white rounded-xl overflow-hidden flex">
            <div className="w-1 sm:w-1.5 bg-[#0f2557] shrink-0" />
            <div className="flex-1 p-5 sm:p-6 md:p-7">
              <div className="rounded-lg bg-blue-50 flex items-center justify-center mb-4
                               w-9 h-9 sm:w-10 sm:h-10">
                <Star className="text-[#0f2557] w-[18px] h-[18px] sm:w-5 sm:h-5" />
              </div>
              <h3 className="font-serif font-semibold text-[#0f2557] mb-2
                              text-[17px] sm:text-[18px] md:text-xl">
                Our Vision
              </h3>
              <p className="text-[#555568]
                             text-[13px] leading-[1.75]
                             sm:text-sm sm:leading-relaxed">
Our vision is to become a trusted school where children learn with confidence, curiosity, and kindness. We aim to help every child grow into a responsible and successful individual.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-xl overflow-hidden flex">
            <div className="w-1 sm:w-1.5 bg-[#c55a3f] shrink-0" />
            <div className="flex-1 p-5 sm:p-6 md:p-7">
              <div className="rounded-lg bg-red-50 flex items-center justify-center mb-4
                               w-9 h-9 sm:w-10 sm:h-10">
                <Target className="text-[#c55a3f] w-[18px] h-[18px] sm:w-5 sm:h-5" />
              </div>
              <h3 className="font-serif font-semibold text-[#0f2557] mb-2
                              text-[17px] sm:text-[18px] md:text-xl">
                Our Mission
              </h3>
              <p className="text-[#555568]
                             text-[13px] leading-[1.75]
                             sm:text-sm sm:leading-relaxed">
Our mission is to provide a well-rounded education that helps children build strong basics, be creative, and grow into confident and responsible individuals.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="max-w-5xl mx-auto
                           px-4 pt-6 pb-10
                           sm:px-8 sm:pt-8 sm:pb-12
                           md:px-12 md:pt-10 md:pb-16
                           lg:px-6">
        <p className="uppercase font-medium text-[#c55a3f] mb-1
                       text-[10px] tracking-[2.5px]
                       sm:text-[11px] sm:tracking-[3px]">
          What we stand for
        </p>
        <h2 className="font-serif font-bold text-[#0f2557] mb-5
                        text-[20px]
                        sm:text-2xl sm:mb-6
                        md:text-3xl md:mb-7">
          Our Core Values
        </h2>

        {/*
          Breakpoints:
          - Mobile  (default) : 1 column
          - Tablet  (sm 640+) : 2 columns
          - Desktop (lg 1024+): 2 columns with larger padding
        */}
        <div className="grid gap-3
                         grid-cols-1
                         sm:grid-cols-2
                         sm:gap-4">
          {values.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-xl flex items-start gap-4 transition-colors
                          hover:border-[#0f2557] border border-transparent
                          p-4 sm:p-5 md:p-6"
            >
              <div className="rounded-lg bg-blue-50 flex items-center justify-center shrink-0
                               w-9 h-9 sm:w-10 sm:h-10">
                <Icon className="text-[#0f2557] w-[18px] h-[18px] sm:w-5 sm:h-5" />
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
          ))}
        </div>
      </section>

    </div>
  );
}