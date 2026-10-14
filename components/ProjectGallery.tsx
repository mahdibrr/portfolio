"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import type { Locale } from "@/lib/portfolio";

export function ProjectGallery({
  images,
  alt,
  locale,
  captions,
}: {
  images: string[];
  alt: string;
  locale: Locale;
  captions?: string[];
}) {
  const [active, setActive] = useState(0);
  return (
    <div className="project-gallery">
      <div className="gallery-image">
        <img
          src={images[active]}
          alt={`${captions?.[active] || alt} — ${active + 1}/${images.length}`}
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="gallery-controls">
        <a
          className="gallery-full-size"
          href={images[active]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Expand size={15} aria-hidden="true" />
          {locale === "fr" ? "Voir en plein format" : "View full screenshot"}
        </a>
        {images.length > 1 && (
          <div className="gallery-navigation">
            <span className="mono" aria-live="polite">
              {String(active + 1).padStart(2, "0")}{" "}
              <span className="muted">
                / {String(images.length).padStart(2, "0")}
              </span>
            </span>
            <div className="gallery-buttons">
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
      {captions?.[active] && (
        <p className="gallery-caption" aria-live="polite">
          {captions[active]}
        </p>
      )}
    </div>
  );
}
