"use client";

import { useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";

const GALLERY_IMAGES = [
  { src: "/gallery1.jpg", cat: "Community" },
  { src: "/gallery2.jpg", cat: "Community" },
  { src: "/gallery3.jpg", cat: "Performance" },
  { src: "/gallery4.jpg", cat: "Performance" },
  { src: "/gallery5.jpg", cat: "Community" },
  { src: "/gallery6.jpg", cat: "Performance" },
  { src: "/gallery7.jpg", cat: "Community" },
  { src: "/gallery8.jpg", cat: "Performance" },
  { src: "/gallery9.jpeg", cat: "Team" },
  { src: "/gallery10.jpeg", cat: "Community" },
  { src: "/gallery11.jpeg", cat: "Performance" },
  { src: "/gallery12.jpeg", cat: "Community" },
  { src: "/gallery13.jpeg", cat: "Performance" },
  { src: "/gallery14.jpeg", cat: "Community" },
  { src: "/gallery15.jpeg", cat: "Team" },
  { src: "/gallery16.jpeg", cat: "Performance" },
  { src: "/gallery17.jpeg", cat: "Community" },
  { src: "/gallery18.jpeg", cat: "Performance" },
  { src: "/gallery19.jpeg", cat: "Community" },
  { src: "/gallery20.jpeg", cat: "Team" },
  { src: "/gallery21.jpeg", cat: "Performance" },
  { src: "/gallery22.jpeg", cat: "Community" },
  { src: "/gallery23.jpeg", cat: "Performance" },
  { src: "/gallery24.jpeg", cat: "Community" },
  { src: "/gallery25.jpeg", cat: "Team" },
  { src: "/gallery26.jpeg", cat: "Performance" },
  { src: "/gallery27.jpeg", cat: "Community" },
  { src: "/gallery28.jpeg", cat: "Performance" },
  { src: "/gallery29.jpeg", cat: "Community" },
  { src: "/gallery30.jpeg", cat: "Team" },
  { src: "/gallery31.jpeg", cat: "Performance" },
  { src: "/gallery32.jpeg", cat: "Community" },
  { src: "/gallery33.jpeg", cat: "Performance" },
  { src: "/gallery34.jpeg", cat: "Community" },
  { src: "/gallery35.jpeg", cat: "Team" },
  { src: "/gallery36.jpeg", cat: "Performance" },
  { src: "/gallery37.jpeg", cat: "Community" },
  { src: "/gallery38.jpeg", cat: "Performance" },
  { src: "/gallery39.jpg", cat: "Community" },
  { src: "/gallery40.jpg", cat: "Performance" },
  { src: "/gallery41.jpeg", cat: "Performance" },
  { src: "/gallery42.jpeg", cat: "Performance" },
  { src: "/gallery43.jpeg", cat: "Performance" },
  { src: "/gallery44.jpeg", cat: "Performance" },
];

const CATEGORIES = ["All", "Performance", "Community", "Team"];

/* Split into 4 columns of 10 */
const col1 = GALLERY_IMAGES.slice(0, 10);
const col2 = GALLERY_IMAGES.slice(10, 20);
const col3 = GALLERY_IMAGES.slice(20, 30);
const col4 = GALLERY_IMAGES.slice(30, 40);


/* ─────────────────────────────────────────────────────────────────
   INFINITE SCROLL COLUMN
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
        gap: 12,
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
            position: "relative",
            width: "100%",
            aspectRatio: "3 / 4",
            borderRadius: 16,
            overflow: "hidden",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          className="infinite-col-image"
        >
          <NextImage
            src={img.src}
            alt={img.cat}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
              opacity: 0,
              transition: "opacity 0.3s ease",
              display: "flex",
              alignItems: "flex-end",
              padding: "12px",
            }}
            className="infinite-col-overlay"
          >
            <span
              style={{
                padding: "4px 12px",
                borderRadius: 20,
                background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
                color: "white",
                fontSize: "0.7rem",
                fontWeight: 600,
              }}
            >
              {img.cat}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* MAIN GALLERY PAGE */
export default function GalleryPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
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
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <>
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
        
        .infinite-col-image:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        
        .infinite-col-image:hover .infinite-col-overlay {
          opacity: 1;
        }
        
        .gallery-grid-hover-overlay { opacity: 0; }
        div:hover > .gallery-grid-hover-overlay { opacity: 1; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .gallery-card {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-violet-50/30 via-white to-teal-50/30 dark:from-violet-950/20 dark:via-gray-900 dark:to-teal-950/20">
        {/* ── STICKY HEADER ─────────────────────────────────── */}
        <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between px-6 lg:px-8 py-3 max-w-7xl mx-auto">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
              Back to Home
            </Link>
            <div className="flex items-center gap-2">
              <NextImage
                src="/sensations_logo.png"
                alt="Sensations"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                Sensations
              </span>
            </div>
            <div className="w-24" />
          </div>
        </header>

        {/* ── HERO ──────────────────────────────────────────── */}
        <section className="py-20 px-6 lg:px-8 text-center bg-gradient-to-br from-violet-100/30 via-white to-fuchsia-100/30 dark:from-violet-950/30 dark:via-gray-900 dark:to-fuchsia-950/30">
          <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
            Creative Showcase
          </p>
          <h1 className="font-heading font-bold text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-teal-600 bg-clip-text text-transparent">
            Our Gallery
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Moments of healing, creativity and community captured through our
            sessions, concerts and events across Nairobi.
          </p>
        </section>

        {/* ── INFINITE SCROLL COLUMNS ───────────────────────── */}
        <section className="relative h-[75vh] min-h-[500px] max-h-[800px] overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
          {/* fade edges */}
          <div className="absolute top-0 left-0 right-0 h-32 z-10 pointer-events-none bg-gradient-to-b from-gray-900 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none bg-gradient-to-t from-gray-900 to-transparent" />

          {/* 4 columns */}
          <div className="flex gap-3 h-full px-3">
            <InfiniteColumn images={col1} reverse={false} duration={20} />
            <InfiniteColumn images={col2} reverse={true} duration={44} />
            <InfiniteColumn images={col3} reverse={false} duration={36} />
            <InfiniteColumn images={col4} reverse={true} duration={42} />
           
          </div>
        </section>

        {/* ── FILTER + MASONRY GRID ─────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-3 text-gray-900 dark:text-white">
              Browse by Category
            </h2>
            <p className="text-gray-500 dark:text-gray-400">Explore our collection of memories and moments</p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {CATEGORIES.map((cat) => {
              const count = cat === "All" ? GALLERY_IMAGES.length : GALLERY_IMAGES.filter((i) => i.cat === cat).length;
              const gradients: Record<string, string> = {
                All: "from-violet-600 to-fuchsia-600",
                Performance: "from-fuchsia-500 to-pink-500",
                Community: "from-teal-500 to-cyan-500",
                Team: "from-orange-500 to-amber-500",
              };
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
                    isActive
                      ? `bg-gradient-to-r ${gradients[cat]} text-white shadow-lg`
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700 hover:text-violet-600 dark:hover:text-violet-400"
                  }`}
                >
                  {cat}
                  <span className="ml-1.5 text-xs opacity-80">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Masonry grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {filtered.map((img, index) => {
              const gradientMap: Record<string, string> = {
                Performance: "from-fuchsia-600 to-pink-600",
                Community: "from-teal-600 to-cyan-600",
                Team: "from-orange-600 to-amber-600",
              };
              return (
                <div
                  key={img.src}
                  onClick={() => setLightboxIndex(index)}
                  className="relative break-inside-avoid mb-4 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 gallery-card group"
                >
                  <NextImage
                    src={img.src}
                    alt={img.cat}
                    width={400}
                    height={533}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  >
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${gradientMap[img.cat] || "from-violet-600 to-fuchsia-600"} shadow-md`}
                    >
                      {img.cat}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── VIDEO SECTION ─────────────────────────────────── */}
        <section className="py-20 px-6 lg:px-8 text-center bg-gradient-to-br from-fuchsia-50/30 via-white to-violet-50/30 dark:from-fuchsia-950/20 dark:via-gray-900 dark:to-violet-950/20">
          <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
            Watch &amp; Listen
          </p>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-3 text-gray-900 dark:text-white">
            Videos
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Watch our performances, therapy sessions and community events —
            coming soon.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-950/50 dark:to-fuchsia-950/50 flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-all">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    width={28}
                    height={28}
                    className="text-violet-600 dark:text-violet-400"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Video coming soon</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Stay tuned!</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────────────── */}
        <footer className="border-t border-gray-100 dark:border-gray-800 bg-gradient-to-br from-violet-100/50 via-fuchsia-100/50 to-teal-100/50 dark:from-violet-950/30 dark:via-fuchsia-950/30 dark:to-teal-950/30 py-8 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              © 2026 The Sensations · Kariobangi North, Nairobi, Kenya
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to main site
            </Link>
          </div>
        </footer>

        {/* ── LIGHTBOX ──────────────────────────────────────── */}
        {lightboxIndex !== null && (
          <div
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
            >
              <X size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronLeft size={28} />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-[90vw] max-w-4xl h-[85vh] max-h-[700px] rounded-xl overflow-hidden shadow-2xl"
            >
              <NextImage
                src={filtered[lightboxIndex].src}
                alt="Gallery"
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronRight size={28} />
            </button>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-medium shadow-lg">
              {filtered[lightboxIndex].cat} · {lightboxIndex + 1} / {filtered.length}
            </div>
          </div>
        )}
      </div>
    </>
  );
}