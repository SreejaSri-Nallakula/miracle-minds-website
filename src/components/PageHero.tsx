export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-brand-gradient text-white py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h1 className="text-4xl md:text-5xl font-extrabold">{title}</h1>
        {subtitle && <p className="mt-3 text-white/90 text-lg max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
}
