import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Music, Users } from "lucide-react";

const categories = [
  { id: "all", label: "All", icon: null },
  { id: "art", label: "Art", icon: Palette },
  { id: "music", label: "Music", icon: Music },
  { id: "workshop", label: "Workshop", icon: Users },
];

const galleryItems = [
  {
    id: 1,
    category: "art",
    title: "Abstract Emotional Release",
    description: "Fluid acrylics expressing inner peace",
    color: "from-coral/40 to-lavender/40",
    size: "col-span-1 row-span-1",
  },
  {
    id: 2,
    category: "music",
    title: "Harmonic Meditation",
    description: "Sound bath with crystal bowls",
    color: "from-teal/40 to-sunflower/30",
    size: "col-span-1 row-span-2",
  },
  {
    id: 3,
    category: "art",
    title: "Colors of Healing",
    description: "Group watercolor session",
    color: "from-lavender/40 to-coral/30",
    size: "col-span-1 row-span-1",
  },
  {
    id: 4,
    category: "workshop",
    title: "Community Circle",
    description: "Rhythm and connection",
    color: "from-sunflower/40 to-teal/30",
    size: "col-span-2 row-span-1",
  },
  {
    id: 5,
    category: "art",
    title: "Clay & Mindfulness",
    description: "Pottery for presence",
    color: "from-coral/30 to-teal/40",
    size: "col-span-1 row-span-1",
  },
  {
    id: 6,
    category: "music",
    title: "Piano Reflections",
    description: "Gentle melodies for the soul",
    color: "from-lavender/30 to-sunflower/40",
    size: "col-span-1 row-span-1",
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-gradient-to-b from-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 bg-lavender/20 text-foreground rounded-full text-sm font-medium mb-4">
            CREATIVE EXPRESSION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Stories Told Through Art & Sound
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Discover the transformative power of creative expression. Each artwork, 
            composition, and performance represents a young person's journey toward 
            healing, self-discovery, and authentic voice.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-coral text-white shadow-lg"
                  : "bg-white text-muted-foreground hover:bg-coral/10 hover:text-coral border border-border"
              }`}
            >
              {category.icon && <category.icon className="w-4 h-4" />}
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${item.size}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} transition-all duration-500 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-all duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                {item.category === "art" && <Palette className="w-4 h-4 text-white" />}
                {item.category === "music" && <Music className="w-4 h-4 text-white" />}
                {item.category === "workshop" && <Users className="w-4 h-4 text-white" />}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-lavender/20 rounded-3xl p-8 lg:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Inspired by what you see?
            </h3>
            <p className="text-muted-foreground mb-6">
              Begin your own creative journey today. Join our next workshop and
              discover the healing power of self-expression.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-coral hover:bg-coral/90 text-white rounded-full px-8 py-6 text-lg font-medium">
                View Upcoming Workshops
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 text-lg font-medium border-teal text-teal hover:bg-teal hover:text-white"
              >
                Contact Curators <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
