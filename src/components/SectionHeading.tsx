export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto" : ""}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-blue mb-2">{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-ink relative inline-block">
        {title}
        <span className={`block h-1 w-16 bg-brand-red rounded-full mt-3 ${center ? "mx-auto" : ""}`} />
      </h2>
      {subtitle && <p className="mt-4 text-ink/70 leading-relaxed">{subtitle}</p>}
    </div>
  );
}
