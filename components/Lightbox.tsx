"use client"
import { useEffect, useCallback, useState, useRef } from "react"
import Image from "next/image"

interface LightboxProps {
  src: string
  alt: string
  onClose: () => void
}

export default function Lightbox({ src, alt, onClose }: LightboxProps) {
  const [zoomed, setZoomed] = useState(false)
  const lastDist = useRef<number | null>(null)

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose()
  }, [onClose])

  // Pinch to zoom (mobile)
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault()
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (lastDist.current !== null) {
        if (dist - lastDist.current > 10) setZoomed(true)
        if (lastDist.current - dist > 10) setZoomed(false)
      }
      lastDist.current = dist
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    lastDist.current = null
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    const el = document.getElementById("lightbox-img-container")
    if (el) {
      el.addEventListener("touchmove", handleTouchMove, { passive: false })
      el.addEventListener("touchend", handleTouchEnd)
    }
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
      if (el) {
        el.removeEventListener("touchmove", handleTouchMove)
        el.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [handleKey, handleTouchMove, handleTouchEnd])

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setZoomed(z => !z)
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        backdropFilter: "blur(8px)",
        cursor: "zoom-out",
      }}
    >
      {/* Close button */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        style={{
          position: "absolute", top: 20, right: 20,
          background: "rgba(255,255,255,0.1)", border: "none",
          borderRadius: "50%", width: 40, height: 40,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#fff", fontSize: 18,
          zIndex: 10,
        }}
      >
        <i className="ph-bold ph-x" />
      </button>

      {/* Hint */}
      <div style={{
        position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)",
        fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.35)",
        letterSpacing: "0.06em", pointerEvents: "none", whiteSpace: "nowrap",
      }}>
        {zoomed ? "click to zoom out · esc to close" : "click to zoom in · esc to close"}
      </div>

      {/* Image */}
      <div
        id="lightbox-img-container"
        style={{
          maxWidth: "90vw", maxHeight: "90vh",
          transform: zoomed ? "scale(1.5)" : "scale(1)",
          transition: "transform 0.25s ease",
          transformOrigin: "center center",
          lineHeight: 0,
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={1400}
          height={900}
          onClick={handleImageClick}
          style={{
            maxWidth: "90vw", maxHeight: "90vh",
            width: "auto", height: "auto",
            objectFit: "contain", display: "block",
            cursor: zoomed ? "zoom-out" : "zoom-in",
            borderRadius: "var(--radius-lg)",
          }}
          quality={100}
        />
      </div>

      {/* Caption */}
      {alt && (
        <div style={{
          position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
          fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.06em", textAlign: "center",
          pointerEvents: "none", whiteSpace: "nowrap",
        }}>
          {alt}
        </div>
      )}
    </div>
  )
}
