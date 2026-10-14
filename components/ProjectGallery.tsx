"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/portfolio";

export function ProjectGallery({
  images,
  alt,
  locale,
}: {
  images: string[];
  alt: string;
  locale: Locale;
}) {
  const [active, setActive] = useState(0);
  return (
    <div className="project-gallery">
      <div className="gallery-image">
        <img
          src={images[active]}
          alt={`${alt} — ${active + 1}/${images.length}`}
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
        />
      </div>
      {images.length > 1 && (
        <div className="gallery-controls">
          <span className="mono" aria-live="polite">
            {String(active + 1).padStart(2, "0")}{" "}
            <span className="muted">
              / {String(images.length).padStart(2, "0")}
            </span>
          </span>
          <div>
            <button
              onClick={() =>
                setActive((active - 1 + images.length) % images.length)
              }
              aria-label={
                locale === "fr" ? "Capture précédente" : "Previous screenshot"
              }
            >
              <ArrowLeft size={19} />
            </button>
            <button
              onClick={() => setActive((active + 1) % images.length)}
              aria-label={
                locale === "fr" ? "Capture suivante" : "Next screenshot"
              }
            >
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
