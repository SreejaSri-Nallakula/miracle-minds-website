export function LogoBadge({ size = "md" }: { size?: "sm" | "md" | "lg" | "xl" | "2xl" }) {
  const heights: Record<string, string> = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
    xl: "h-20",
    "2xl": "h-32",
  };

  const faviconHeights: Record<string, string> = {
    sm: "h-4",
    md: "h-6",
    lg: "h-8",
    xl: "h-10",
    "2xl": "h-14",
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none`}>
      <img
        src="/favicon.png?v=2"
        alt="Miracle Minds logo"
        className={`${faviconHeights[size]} object-contain`} 
        loading="eager"
      />
      <img
        src="/SchlName.png?v=2"
        alt="Miracle Minds wordmark"
        className={`${heights[size]} object-contain`} 
        loading="lazy"
      />
    </div>
  );
}
