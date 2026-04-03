"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-cream">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-lavender/30 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-coral/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-lavender/30 text-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
              Mindful Expression
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight text-balance">
              Transform Through{" "}
              <span className="text-coral">Creative</span> Expression
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
             A youth-led art and music therapy initiative in Nairobi, transforming mental health through creative expression.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-coral hover:bg-coral/90 text-white rounded-full px-8 py-6 text-lg font-medium group"
              >
                Join a Session
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-lg font-medium border-teal text-teal hover:bg-teal hover:text-white"
              >
                Explore Our Mission
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-cream bg-lavender flex items-center justify-center text-sm font-medium text-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5" />
                <span className="font-medium">
                  Trusted by <span className="text-coral">1000+</span> young people
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Artistic Visual */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-lavender via-cream to-coral/30 p-1">
                <div className="w-full h-full rounded-full bg-cream flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-teal/20 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-12 h-12 text-teal"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                    </div>
                    <div className="w-20 h-20 mx-auto rounded-full bg-coral/20 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-10 h-10 text-coral"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-sunflower flex items-center justify-center shadow-lg animate-bounce">
                <span className="font-serif text-2xl text-foreground">Art</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-teal flex items-center justify-center shadow-lg">
                <span className="font-serif text-2xl text-white">Music</span>
              </div>
              <div className="absolute top-1/2 -right-8 w-16 h-16 rounded-full bg-lavender flex items-center justify-center shadow-lg">
                <span className="font-serif text-lg text-foreground">Heal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-teal flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-teal animate-pulse" />
        </div>
      </div>
    </section>
  );
}
