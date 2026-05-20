export function LogoBadge({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-2xl px-5 py-2.5",
  };
  return (
    <div className="inline-flex font-display font-extrabold tracking-wide select-none rounded-md overflow-hidden shadow-card">
      <span className={`${sizes[size]} bg-brand-red text-white`}>MIRACLE</span>
      <span className={`${sizes[size]} bg-brand-blue text-white`}>MINDS</span>
    </div>
  );
}
