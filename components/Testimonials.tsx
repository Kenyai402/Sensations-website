"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Amara, 19",
    role: "Student",
    content:
      "Sensations gave me a voice when I felt lost. Through art therapy, I discovered I could heal and help others heal too. It changed my entire perspective on mental health.",
    rating: 5,
    image: "A",
  },
  {
    id: 2,
    name: "Kwame, 22",
    role: "Young Professional",
    content:
      "The music therapy sessions helped me process trauma I didn't know how to talk about. This community is real, it's safe, and it's transforming lives in my city.",
    rating: 5,
    image: "K",
  },
  {
    id: 3,
    name: "Zainab, 20",
    role: "University Student",
    content:
      "I came for stress relief and found a whole family. Sensations isn't just therapy—it's a movement empowering young people like us to reclaim our mental health.",
    rating: 5,
    image: "Z",
  },
];

const quickTestimonials = [
  {
    quote: "For the first time, I felt my emotions mattered. Art gave me permission to feel.",
    name: "Tunde, 18",
    tag: "Art Therapy",
    tagColor: "bg-coral/10 text-coral",
  },
  {
    quote: "Music therapy unlocked feelings I couldn't express in words. Pure healing.",
    name: "Nia, 21",
    tag: "Music Therapy",
    tagColor: "bg-teal/10 text-teal",
  },
  {
    quote: "This space is judgement-free. I can be completely myself here.",
    name: "James, 20",
    tag: "Community",
    tagColor: "bg-lavender/20 text-foreground",
  },
  {
    quote: "Sensations helped me understand my trauma and transform it into strength.",
    name: "Precious, 19",
    tag: "Individual Care",
    tagColor: "bg-sunflower/20 text-foreground",
  },
  {
    quote: "I came broken and left empowered. Sensations is real healing for young people.",
    name: "Michael, 23",
    tag: "Group Sessions",
    tagColor: "bg-teal/10 text-teal",
  },
  {
    quote: "Creative expression saved my life. Sensations is more than therapy—it's family.",
    name: "Grace, 22",
    tag: "Healing Journey",
    tagColor: "bg-coral/10 text-coral",
  },
];

const stats = [
  { value: "1,000+", label: "Youth Reached" },
  { value: "4,500+", label: "Artworks Created" },
  { value: "850+", label: "Healing Sessions" },
  { value: "98%", label: "Would Recommend" },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-sunflower/20 text-foreground rounded-full text-sm font-medium mb-4">
            HEALING STORIES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Stories of Self-Expression
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Discover how our creative therapies have helped individuals navigate
            life&apos;s challenges and find their unique path to emotional wellness.
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative bg-gradient-to-br from-lavender/20 via-cream to-coral/10 rounded-3xl p-8 lg:p-12 mb-16">
          <Quote className="absolute top-6 left-6 w-12 h-12 text-coral/30" />
          
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-sunflower fill-sunflower"
                />
              ))}
            </div>
            
            <blockquote className="font-serif text-xl lg:text-2xl text-foreground mb-8 leading-relaxed">
              &quot;{testimonials[currentIndex].content}&quot;
            </blockquote>
            
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-coral flex items-center justify-center text-white font-semibold text-lg">
                {testimonials[currentIndex].image}
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonials[currentIndex].role}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-coral hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-coral hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-coral w-6"
                    : "bg-coral/30 hover:bg-coral/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-cream rounded-2xl p-6 border border-border"
            >
              <div className="font-serif text-3xl lg:text-4xl font-bold text-coral mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Testimonials */}
        <div className="mb-16">
          <h3 className="font-serif text-2xl font-bold text-foreground text-center mb-8">
            Voices from the Studio
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickTestimonials.map((item, index) => (
              <div
                key={index}
                className="bg-cream rounded-2xl p-6 border border-border hover:shadow-md transition-shadow"
              >
                <p className="text-foreground mb-4 leading-relaxed">
                  &quot;{item.quote}&quot;
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-muted-foreground">
                    {item.name}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${item.tagColor}`}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Ready to start your own story?
          </h3>
          <p className="text-muted-foreground mb-6">
            Join our community of creators and find healing through the
            transformative power of art and music.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-coral hover:bg-coral/90 text-white rounded-full px-8 py-6 text-lg font-medium">
              Book Your First Session
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-8 py-6 text-lg font-medium border-teal text-teal hover:bg-teal hover:text-white"
            >
              View Upcoming Events
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
