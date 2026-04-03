"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Instagram,
  Facebook,
  Twitter,
  Shield,
  PhoneCall,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

type Status = { type: "success" | "error"; message: string } | null;

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    inquiry: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<Status>(null);
  const [formLoading, setFormLoading] = useState(false);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<Status>(null);
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message.");
      setFormStatus({ type: "success", message: data.message });
      setFormData({ firstName: "", lastName: "", email: "", inquiry: "", message: "" });
    } catch (err: unknown) {
      setFormStatus({ type: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    } finally {
      setFormLoading(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterLoading(true);
    setNewsletterStatus(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to subscribe.");
      setNewsletterStatus({ type: "success", message: data.message });
      setNewsletterEmail("");
    } catch (err: unknown) {
      setNewsletterStatus({ type: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-teal/20 via-lavender/20 to-coral/20 rounded-3xl p-8 lg:p-12 mb-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Join the Sensations Community
            </h2>
            <p className="text-muted-foreground mb-6">
              Be part of a movement empowering young people through creative healing. 
              Get updates on sessions, success stories, and ways to get involved in 
              transforming your community.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 rounded-full px-6 py-6 bg-white border-border"
                required
                disabled={newsletterLoading}
              />
              <Button
                className="bg-coral hover:bg-coral/90 text-white rounded-full px-8 py-6 font-medium"
                disabled={newsletterLoading}
              >
                {newsletterLoading ? "Subscribing…" : "Subscribe"}
              </Button>
            </form>
            {newsletterStatus && (
              <div
                className={`flex items-center gap-2 justify-center mt-4 text-sm font-medium ${
                  newsletterStatus.type === "success" ? "text-teal" : "text-red-500"
                }`}
              >
                {newsletterStatus.type === "success" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {newsletterStatus.message}
              </div>
            )}
            {!newsletterStatus && (
              <p className="text-sm text-muted-foreground mt-4">
                Respecting your inbox like we respect your sanctuary. No spam, ever.
              </p>
            )}
          </div>
        </div>

        {/* Contact Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-coral/10 text-coral rounded-full text-sm font-medium mb-4">
            LET'S CONNECT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Connect With Our Sanctuary
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you&apos;re seeking emotional healing, interested in our creative
            workshops, or simply have a question, our team in Nairobi is here to
            support your journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
              Send a Message
            </h3>
            <p className="text-muted-foreground mb-8">
              We typically respond within 2-4 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Jane"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="rounded-xl px-4 py-3 bg-cream border-border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="rounded-xl px-4 py-3 bg-cream border-border"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="rounded-xl px-4 py-3 bg-cream border-border"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nature of Inquiry
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Art Therapy Inquiry"
                  value={formData.inquiry}
                  onChange={(e) =>
                    setFormData({ ...formData, inquiry: e.target.value })
                  }
                  className="rounded-xl px-4 py-3 bg-cream border-border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Message
                </label>
                <textarea
                  placeholder="Tell us about your needs or how we can help..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full rounded-xl px-4 py-3 bg-cream border border-border resize-none focus:outline-none focus:ring-2 focus:ring-teal"
                  required
                />
              </div>

              <Button
                className="w-full bg-coral hover:bg-coral/90 text-white rounded-full py-6 text-lg font-medium"
                disabled={formLoading}
              >
                <Send className="w-5 h-5 mr-2" />
                {formLoading ? "Sending…" : "Send Message"}
              </Button>

              {formStatus && (
                <div
                  className={`flex items-center gap-2 text-sm font-medium p-4 rounded-xl ${
                    formStatus.type === "success"
                      ? "bg-teal/10 text-teal"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {formStatus.type === "success" ? (
                    <CheckCircle className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  {formStatus.message}
                </div>
              )}
            </form>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-teal" />
                <span>Privacy Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PhoneCall className="w-4 h-4 text-teal" />
                <span>Free First Call</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Location Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
              <div className="flex items-center gap-2 text-teal mb-4">
                <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                <span className="text-sm font-medium">
                  OPEN NOW: 9:00 AM - 6:00 PM
                </span>
              </div>
              <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-teal/20 to-lavender/20 flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-coral mx-auto mb-2" />
                  <p className="font-medium text-foreground">
                    Sensations Nairobi
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Kilimani Wellness District
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-coral" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">
                  Email Support
                </h4>
                <p className="text-coral font-medium">hello@sensations.art</p>
                <p className="text-sm text-muted-foreground mt-1">
                  For general & session inquiries
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-teal" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">
                  Voice & WhatsApp
                </h4>
                <p className="text-teal font-medium">+254 700 000000</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Mon-Fri, 9am - 6pm EAT
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                <div className="w-12 h-12 rounded-xl bg-lavender/20 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-foreground" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">
                  Main Center
                </h4>
                <p className="text-foreground font-medium">
                  Nairobi Wellness Center
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Kilimani, Nairobi, Kenya
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                <div className="w-12 h-12 rounded-xl bg-sunflower/20 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-foreground" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">
                  Working Hours
                </h4>
                <p className="text-foreground font-medium">Mon - Sat</p>
                <p className="text-sm text-muted-foreground mt-1">
                  9:00 AM - 6:00 PM EAT
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <h4 className="font-semibold text-foreground mb-4">
                Connect on Social
              </h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-coral/10 flex items-center justify-center hover:bg-coral hover:text-white transition-colors text-coral"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center hover:bg-teal hover:text-white transition-colors text-teal"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-lavender/20 flex items-center justify-center hover:bg-lavender hover:text-foreground transition-colors text-foreground"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
