"use client";

import { Palette, Music, Users, Heart, ArrowRight, Shield, Sparkles, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const modalities = [
  {
    icon: Palette,
    title: "Art Therapy",
    description: "Harness colors and textures to navigate complex emotions and reduce stress levels.",
    color: "bg-coral/10 text-coral",
  },
  {
    icon: Music,
    title: "Music Therapy",
    description: "Unlock healing through sound, rhythm, and melody guided by professional therapists.",
    color: "bg-teal/10 text-teal",
  },
  {
    icon: Users,
    title: "Group Sessions",
    description: "Find strength in community. Share, create, and heal alongside others in a safe space.",
    color: "bg-lavender/20 text-foreground",
  },
  {
    icon: Heart,
    title: "Individual Care",
    description: "One-on-one sessions focused entirely on your unique personal growth and healing.",
    color: "bg-sunflower/20 text-foreground",
  },
];

const features = [
  {
    icon: Sparkles,
    title: "Evidence-Based Arts",
    description: "Our methods combine traditional clinical psychology with modern creative expression for measurable healing.",
  },
  {
    icon: GraduationCap,
    title: "Guided by Experts",
    description: "Every session is led by licensed therapists specializing in expressive arts and traumatology.",
  },
  {
    icon: Shield,
    title: "Safe & Private",
    description: "Your journey is sacred. We provide a judgment-free environment protected by the highest privacy standards.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-teal/10 text-teal rounded-full text-sm font-medium mb-4">
            OUR MISSION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Using Art & Music as Tools for Transformation
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Sensations, we believe every young person deserves access to healing 
            and self-expression. Through evidence-based art and music therapy, we 
            empower communities and create lasting transformation.
          </p>
        </div>

        {/* Modalities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {modalities.map((modality) => (
            <div
              key={modality.title}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-border hover:border-coral/30"
            >
              <div
                className={`w-14 h-14 rounded-xl ${modality.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <modality.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {modality.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {modality.description}
              </p>
              <button className="text-coral font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Assessment CTA */}
        <div className="bg-gradient-to-r from-lavender/30 via-cream to-coral/20 rounded-3xl p-8 lg:p-12 mb-20">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Not sure where to start?
            </h3>
            <p className="text-muted-foreground mb-6">
              Take our 2-minute &quot;Creative Soul&quot; assessment to find which therapy
              modality matches your current emotional landscape.
            </p>
            <Button className="bg-coral hover:bg-coral/90 text-white rounded-full px-8 py-6 text-lg font-medium">
              Start Assessment
            </Button>
          </div>
        </div>

        {/* Sanctuary Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Visual */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-teal/20 via-lavender/20 to-coral/20 p-1">
              <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-teal/10 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-teal" />
                  </div>
                  <span className="text-sm font-medium text-teal uppercase tracking-wider">
                    Studio Atmosphere
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-foreground mt-2">
                    Zen Space
                  </h4>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-sunflower/30 -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-lavender/30 -z-10" />
          </div>

          {/* Right - Content */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-sunflower/20 text-foreground rounded-full text-sm font-medium mb-4">
              OUR CORE VALUES
            </span>
            <h3 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-6">
              A Safe Space for Youth Empowerment
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Built on the principles of integrity, honesty, humility, and courage, 
              Sensations is more than a therapy center—it&apos;s a sanctuary where 
              young people find their voice, heal from within, and discover their 
              creative power.
            </p>

            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-8 text-coral font-medium flex items-center gap-2 hover:gap-3 transition-all">
              Learn more about our methodology <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
