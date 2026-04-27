"use client"
import { useState } from "react"
import Image from "next/image"
import Lightbox from "./Lightbox"

interface ImageItem {
  src: string
  alt: string
}

interface Props {
  heroImage?: string
  heroAlt?: string
  images: ImageItem[]
}

export default function CaseStudyImages({ heroImage, heroAlt, images }: Props) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  return (
    <>
      {/* Hero image */}
      {heroImage && (
        <div
          className="ma-fade-up cs-hero-image"
          style={{ marginBottom: 56, cursor: "zoom-in" }}
          onClick={() => setLightbox({ src: heroImage, alt: heroAlt || "" })}
        >
          <Image
            src={heroImage}
            alt={heroAlt || ""}
            width={900}
            height={500}
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius-lg)", display: "block" }}
            priority
          />
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)",
            letterSpacing: "0.06em", marginTop: 8, textAlign: "right",
            opacity: 0.6,
          }}>
            click to expand
          </div>
        </div>
      )}

      {/* Inline image grid */}
      {images.length > 0 && (
        <div className="cs-image-grid" style={{ marginBottom: 56 }}>
          {images.map((img) => (
            <div
              key={img.src}
              className="cs-image-item"
              style={{ cursor: "zoom-in" }}
              onClick={() => setLightbox(img)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                style={{ width: "100%", height: "auto", borderRadius: "var(--radius-lg)", display: "block" }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  )
}
