"use client";

import { useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";

const GALLERY_IMAGES = [
  { src: "/gallery1.jpg",   cat: "Community"   },
  { src: "/gallery2.jpg",   cat: "Community"   },
  { src: "/gallery3.jpg",   cat: "Performance" },
  { src: "/gallery4.jpg",   cat: "Performance" },
  { src: "/gallery5.jpg",   cat: "Community"   },
  { src: "/gallery6.jpg",   cat: "Performance" },
  { src: "/gallery7.jpg",   cat: "Community"   },
  { src: "/gallery8.jpg",   cat: "Performance" },
  { src: "/gallery9.jpeg",  cat: "Team"        },
  { src: "/gallery10.jpeg", cat: "Community"   },
  { src: "/gallery11.jpeg", cat: "Performance" },
  { src: "/gallery12.jpeg", cat: "Community"   },
  { src: "/gallery13.jpeg", cat: "Performance" },
  { src: "/gallery14.jpeg", cat: "Community"   },
  { src: "/gallery15.jpeg", cat: "Team"        },
  { src: "/gallery16.jpeg", cat: "Performance" },
  { src: "/gallery17.jpeg", cat: "Community"   },
  { src: "/gallery18.jpeg", cat: "Performance" },
  { src: "/gallery19.jpeg", cat: "Community"   },
  { src: "/gallery20.jpeg", cat: "Team"        },
  { src: "/gallery21.jpeg", cat: "Performance" },
  { src: "/gallery22.jpeg", cat: "Community"   },
  { src: "/gallery23.jpeg", cat: "Performance" },
  { src: "/gallery24.jpeg", cat: "Community"   },
  { src: "/gallery25.jpeg", cat: "Team"        },
  { src: "/gallery26.jpeg", cat: "Performance" },
  { src: "/gallery27.jpeg", cat: "Community"   },
  { src: "/gallery28.jpeg", cat: "Performance" },
  { src: "/gallery29.jpeg", cat: "Community"   },
  { src: "/gallery30.jpeg", cat: "Team"        },
  { src: "/gallery31.jpeg", cat: "Performance" },
  { src: "/gallery32.jpeg", cat: "Community"   },
  { src: "/gallery33.jpeg", cat: "Performance" },
  { src: "/gallery34.jpeg", cat: "Community"   },
  { src: "/gallery35.jpeg", cat: "Team"        },
  { src: "/gallery36.jpeg", cat: "Performance" },
  { src: "/gallery37.jpeg", cat: "Community"   },
  { src: "/gallery38.jpeg", cat: "Performance" },
  { src: "/gallery39.jpg",  cat: "Community"   },
  { src: "/gallery40.jpg",  cat: "Team"        },
];

const CATEGORIES = ["All", "Performance", "Community", "Team"];

/* Split into 4 columns of 10 */
const col1 = GALLERY_IMAGES.slice(0, 10);
const col2 = GALLERY_IMAGES.slice(10, 20);
const col3 = GALLERY_IMAGES.slice(20, 30);
const col4 = GALLERY_IMAGES.slice(30, 40);

/* ─────────────────────────────────────────────────────────────────
   INFINITE SCROLL COLUMN
   Each column doubles its images for a seamless loop.
   The CSS animation moves the strip up by 50% (= one full set),
   then snaps back invisibly ,creating endless motion.
   reverse=true plays the animation backwards so the column
   scrolls downward instead of upward.
   ───────────────────────────────────────────────────────────────── */
function InfiniteColumn({
  images,
  reverse = false,
  duration = 40,
}: {
  images: typeof GALLERY_IMAGES;
  reverse?: boolean;
  duration?: number;
}) {
  const doubled = [...images, ...images];

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        animationName: "gallery-scroll-up",
        animationDuration: `${duration}s`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationDirection: reverse ? "reverse" : "normal",
        willChange: "transform",
      }}
    >
      {doubled.map((img, i) => (
        <div
          key={`${img.src}-${i}`}
          style={{
            position: "relative",   /* REQUIRED for next/image fill */
            width: "100%",
            aspectRatio: "3 / 4",
            borderRadius: 14,
            overflow: "hidden",
            flexShrink: 0,
            background: "oklch(0.25 0.04 270)",
          }}
        >
          <NextImage
            src={img.src}
            alt={img.cat}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

/* MAIN GALLERY PAGE */
export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.cat === activeCategory);

  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + filtered.length) % filtered.length : null,
    );
  const next = () =>
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % filtered.length : null,
    );

  return (
    <>
      {/* Inject the keyframe */}
      <style>{`
        @keyframes gallery-scroll-up {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes gallery-marquee-fwd {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes gallery-marquee-rev {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "var(--warm-cream)", color: "var(--dark-slate)" }}>

        {/* ── STICKY HEADER ─────────────────────────────────── */}
        <header style={{
          position: "sticky", top: 0, zIndex: 40,
          background: "rgba(255,255,255,0.92) dark: rgba(18,18,18,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 2rem",
        }}>
          <Link href="/" style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            fontSize: "0.85rem", fontWeight: 500,
            color: "var(--muted-foreground)",
            textDecoration: "none", width: 80,
          }}>
            <ArrowLeft size={16} /> Back
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-heading)", fontWeight: 700 }}>
            <NextImage src="/sensations_logo.png" alt="Sensations" width={36} height={36} className="object-contain" />
            <span>Sensations</span>
          </div>
          <div style={{ width: 80 }} />
        </header>

        {/* ── HERO ──────────────────────────────────────────── */}
        <section style={{
          padding: "5rem 2rem 3rem", textAlign: "center",
          background: "linear-gradient(135deg, oklch(0.62 0.14 290 / 0.08) 0%, var(--warm-cream) 50%, oklch(0.60 0.10 195 / 0.08) 100%)",
        }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-teal)", marginBottom: "1rem" }}>
            Creative Showcase
          </p>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1rem" }}>
            Our Gallery
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--muted-foreground)", maxWidth: "36rem", margin: "0 auto", lineHeight: 1.6 }}>
            Moments of healing, creativity and community captured through our sessions, concerts and events across Nairobi.
          </p>
        </section>

        {/* ── INFINITE SCROLL COLUMNS ───────────────────────── */}
        <section style={{
          position: "relative",
          height: "75vh", minHeight: 500, maxHeight: 800,
          overflow: "hidden",
          background: "oklch(0.14 0.03 270)",
        }}>
          {/* fade edges */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 120, zIndex: 10, pointerEvents: "none", background: "linear-gradient(to bottom, oklch(0.14 0.03 270), transparent)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, zIndex: 10, pointerEvents: "none", background: "linear-gradient(to top, oklch(0.14 0.03 270), transparent)" }} />

          {/* 4 columns: down, up, down, up */}
          <div style={{ display: "flex", gap: 10, height: "100%", padding: "0 10px" }}>
            <InfiniteColumn images={col1} reverse={false} duration={38} />
            <InfiniteColumn images={col2} reverse={true}  duration={44} />
            <InfiniteColumn images={col3} reverse={false} duration={36} />
            <InfiniteColumn images={col4} reverse={true}  duration={42} />
          </div>
        </section>

        {/* ── FILTER + MASONRY GRID ─────────────────────────── */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 2rem" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, textAlign: "center", marginBottom: "2rem" }}>
            Browse by Category
          </h2>

          {/* Filter pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center", marginBottom: "3rem" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.5rem 1.25rem", borderRadius: 999,
                  fontSize: "0.85rem", fontWeight: 500, cursor: "pointer",
                  border: activeCategory === cat ? "1px solid var(--soft-lavender)" : "1px solid var(--border)",
                  background: activeCategory === cat ? "var(--soft-lavender)" : "white",
                  color: activeCategory === cat ? "white" : "var(--muted-foreground)",
                  boxShadow: activeCategory === cat ? "0 2px 12px oklch(0.62 0.14 290 / 0.3)" : "none",
                  transition: "all 0.2s",
                }}
              >
                {cat}
                <span style={{ fontSize: "0.7rem", opacity: 0.7 }}>
                  {cat === "All" ? GALLERY_IMAGES.length : GALLERY_IMAGES.filter((i) => i.cat === cat).length}
                </span>
              </button>
            ))}
          </div>

          {/* CSS-columns masonry — each card has position:relative for fill */}
          <div style={{ columns: "4 200px", columnGap: 12 }}>
            {filtered.map((img, index) => (
              <div
                key={img.src}
                onClick={() => setLightboxIndex(index)}
                style={{
                  position: "relative",     /* REQUIRED for next/image fill */
                  breakInside: "avoid",
                  marginBottom: 12,
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "var(--muted)",
                  cursor: "pointer",
                  aspectRatio: "3 / 4",
                }}
              >
                <NextImage
                  src={img.src}
                  alt={img.cat}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)",
                  display: "flex", alignItems: "flex-end", padding: "0.75rem",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
                  className="gallery-grid-hover-overlay"
                >
                  <span style={{
                    display: "inline-block", padding: "0.2rem 0.65rem",
                    borderRadius: 999, background: "oklch(0.62 0.14 290 / 0.85)",
                    color: "white", fontSize: "0.7rem", fontWeight: 600,
                  }}>
                    {img.cat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── VIDEO PLACEHOLDERS ────────────────────────────── */}
        <section style={{ padding: "4rem 2rem 6rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-teal)", marginBottom: "1rem" }}>
            Watch &amp; Listen
          </p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "0.75rem" }}>
            Videos
          </h2>
          <p style={{ color: "var(--muted-foreground)", marginBottom: "2.5rem", maxWidth: "32rem", margin: "0.75rem auto 2.5rem" }}>
            Watch our performances, therapy sessions and community events — coming soon.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", maxWidth: 900, margin: "0 auto" }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                background: "white dark:grey" , border: "1px solid var(--border)",
                borderRadius: 24, padding: "2.5rem 1rem",
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: "0.75rem",
                color: "var(--muted-foreground)", fontSize: "0.875rem", height: 220,
                justifyContent: "center",
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 999,
                  background: "oklch(0.62 0.14 290 / 0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--soft-lavender)",
                }}>
                  <svg fill="currentColor" viewBox="0 0 24 24" width={24} height={24}><path d="M8 5v14l11-7z" /></svg>
                </div>
                <p>Video coming soon</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────────────── */}
        <footer style={{
          borderTop: "1px solid var(--border)", padding: "2rem",
          textAlign: "center", fontSize: "0.85rem",
          color: "var(--muted-foreground)",
          display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center",
        }}>
          <p>© 2026 The Sensations · Kariobangi North, Nairobi, Kenya</p>
          <Link href="/" style={{ color: "var(--soft-lavender)", textDecoration: "none" }}>
            ← Back to main site
          </Link>
        </footer>

        {/* ── LIGHTBOX ──────────────────────────────────────── */}
        {lightboxIndex !== null && (
          <div
            onClick={closeLightbox}
            style={{
              position: "fixed", inset: 0, zIndex: 50,
              background: "rgba(0,0,0,0.92)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <button onClick={closeLightbox} style={{
              position: "absolute", top: "1.25rem", right: "1.25rem",
              color: "white", background: "rgba(255,255,255,0.15)",
              border: "none", borderRadius: 999, width: 40, height: 40,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}>
              <X size={20} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} style={{
              position: "absolute", left: "1.25rem", top: "50%", transform: "translateY(-50%)",
              color: "white", background: "rgba(255,255,255,0.15)",
              border: "none", borderRadius: 999, width: 48, height: 48,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", zIndex: 10,
            }}>
              <ChevronLeft size={28} />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "min(90vw, 1000px)",
                height: "min(85vh, 700px)",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <NextImage
                src={filtered[lightboxIndex].src}
                alt="Gallery"
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>

            <button onClick={(e) => { e.stopPropagation(); next(); }} style={{
              position: "absolute", right: "1.25rem", top: "50%", transform: "translateY(-50%)",
              color: "white", background: "rgba(255,255,255,0.15)",
              border: "none", borderRadius: 999, width: 48, height: 48,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", zIndex: 10,
            }}>
              <ChevronRight size={28} />
            </button>

            <div style={{
              position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)",
              padding: "0.35rem 1rem",
              background: "oklch(0.62 0.14 290 / 0.85)",
              color: "white", borderRadius: 999, fontSize: "0.8rem", fontWeight: 500,
            }}>
              {filtered[lightboxIndex].cat} · {lightboxIndex + 1} / {filtered.length}
            </div>
          </div>
        )}
      </div>

      {/* hover overlay fix — CSS only, can't do :hover inline */}
      <style>{`
        .gallery-grid-hover-overlay { opacity: 0; }
        div:hover > .gallery-grid-hover-overlay { opacity: 1; }
      `}</style>
    </>
  );
}