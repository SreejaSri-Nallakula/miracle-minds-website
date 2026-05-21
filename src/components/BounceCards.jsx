import { useEffect, useState } from "react";

const galleryModules = import.meta.glob("../assets/gallery/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
  import: "default",
});

const defaultImages = Object.entries(galleryModules)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([, image]) => image);

const cardTransforms = [
  "translate(-170px, 18px) rotate(-12deg) scale(0.82)",
  "translate(-88px, 4px) rotate(-6deg) scale(0.88)",
  "translate(0px, 0px) rotate(0deg) scale(0.96)",
  "translate(88px, 4px) rotate(6deg) scale(0.88)",
  "translate(170px, 18px) rotate(12deg) scale(0.82)",
];

export default function BounceCards({
  className = "",
  images = defaultImages,
  containerWidth = 520,
  containerHeight = 420,
  animationDelay = 0.08,
  animationStagger = 0.11,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const visibleImages = images.slice(0, 5);

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: containerWidth,
        height: containerHeight,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
      }}
    >
      <style>{`
        .bounceCardsContainer .bounceCard {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(100%, 220px);
          aspect-ratio: 3 / 4;
          border-radius: 24px;
          overflow: hidden;
          transform-origin: center center;
          box-shadow: 0 24px 50px rgba(5, 24, 61, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.1);
          will-change: transform, opacity;
        }

        .bounceCardsContainer .bounceCardInner {
          width: 100%;
          height: 100%;
          animation: bounceCardFloat 6.4s ease-in-out infinite;
        }

        .bounceCardsContainer .bounceCardImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .bounceCardsContainer .bounceCard::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(13, 61, 118, 0.12) 100%);
          pointer-events: none;
        }

        @keyframes bounceCardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 960px) {
          .bounceCardsContainer {
            height: 340px !important;
            max-width: 100% !important;
          }

          .bounceCardsContainer .bounceCard {
            width: min(100%, 170px);
          }
        }

        @media (max-width: 640px) {
          .bounceCardsContainer {
            height: 280px !important;
          }

          .bounceCardsContainer .bounceCard {
            width: min(100%, 140px);
            border-radius: 18px;
          }
        }
      `}</style>

      {visibleImages.map((src, index) => {
        const baseTransform = cardTransforms[index] ?? "translate(0px, 0px) rotate(0deg) scale(0.9)";
        const enterTransform = baseTransform.replace("translate", "translate3d");

        return (
          <div
            key={`${src}-${index}`}
            className="bounceCard"
            style={{
              transform: mounted
                ? `translate(-50%, -50%) ${baseTransform}`
                : `translate(-50%, -50%) translate3d(0px, 22px, 0) scale(0.72)`,
              opacity: mounted ? 1 : 0,
              transition: `transform 0.85s cubic-bezier(0.2, 0.9, 0.2, 1) ${animationDelay + index * animationStagger}s, opacity 0.55s ease ${animationDelay + index * animationStagger}s`,
            }}
          >
            <div
              className="bounceCardInner"
              style={{
                animationDelay: `${index * 0.18}s`,
              }}
            >
              <img className="bounceCardImage" src={src} alt={`Gallery card ${index + 1}`} loading="lazy" decoding="async" />
            </div>
          </div>
        );
      })}
    </div>
  );
}