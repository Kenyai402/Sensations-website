"use client";

import { useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";

const categories =  ["All", "Performance", "Community", "Team"];

const galleryItems = [
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
  { src: "/gallery40.jpg", cat: "Team" },
];

export default function Gallery() {
    const Image = NextImage;
  const [activeCategory, setActiveCategory] = useState("all");
   const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((img) => img.cat === activeCategory);

        const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + filteredItems.length) % filteredItems.length : null));
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % filteredItems.length : null));



   return (
    <div className="min-h-screen bg-warm-cream text-dark-slate">

      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-soft-lavender transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <Image
              src="/sensations_logo.png"
              alt="Sensations"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="font-heading font-bold">Sensations</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-soft-lavender/20 via-cream to-muted-teal/20 py-20 px-6 text-center">
        <p className="text-sm font-medium text-muted-teal mb-4 tracking-wide uppercase">
          Creative Showcase
        </p>
        <h1 className="font-heading font-bold text-4xl lg:text-6xl mb-6">
          Our Gallery
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Moments of healing, creativity and community captured through our
          sessions, concerts and events across Nairobi.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-soft-lavender text-white shadow-md"
                  : "bg-white border border-border text-muted-foreground hover:border-soft-lavender hover:text-soft-lavender"
              }`}
            >
              {cat}
              <span className="ml-2 text-xs opacity-70">
                {cat === "All"
                  ?  galleryItems.length
                  :  galleryItems.filter((i) => i.cat === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredItems.map((img, index) => (
            <div
              key={img.src}
              onClick={() => openLightbox(index)}
              className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden bg-muted"
            >
              <Image
                src={img.src}
                alt={`${img.cat} photo`}
                width={400}
                height={300}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-slate/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="px-3 py-1 bg-soft-lavender/90 text-white text-xs font-medium rounded-full">
                  {img.cat}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Video Section Placeholder */}
        <div className="mt-24 mb-12">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-muted-teal mb-4 tracking-wide uppercase">
              Watch & Listen
            </p>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-4">
              Videos
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Watch our performances, therapy sessions and community events.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-border p-8 flex flex-col items-center justify-center text-center h-56 gap-3"
              >
                <div className="w-14 h-14 rounded-full bg-soft-lavender/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-soft-lavender" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">
                  Video coming soon
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-soft-lavender transition cursor-pointer"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={prev}
            className="absolute left-4 text-white hover:text-soft-lavender transition cursor-pointer p-2"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <div className="max-w-4xl max-h-[85vh] relative">
            <Image
              src={filteredItems[lightboxIndex].src}
              alt="Gallery"
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto object-contain rounded-xl"
            />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="px-4 py-1.5 bg-soft-lavender/90 text-white text-sm rounded-full">
                {filteredItems[lightboxIndex].cat} · {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
          <button
            onClick={next}
            className="absolute right-4 text-white hover:text-soft-lavender transition cursor-pointer p-2"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>© 2026 The Sensations. Kariobangi North, Nairobi, Kenya.</p>
        <Link href="/" className="text-soft-lavender hover:underline mt-2 inline-block">
          ← Back to main site
        </Link>
      </footer>
    </div>
  );
}