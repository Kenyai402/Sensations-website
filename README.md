# Sensations 🎨🎵
> Empowering youth through creative expression and community healing.

A modern, responsive web platform for a youth-focused art and music therapy 
initiative based in Nairobi, Kenya - inspired by the "Akili Yangu Raha Yangu" project.

## 🌍 Live Site
[sensations.vercel.app]( ) 

## ✨ Features
- Art & Music therapy session discovery
- Event booking system
- Creative expression gallery
- Community testimonials
- Newsletter signup
- Contact form with email integration

## 🛠 Tech Stack
- **Framework**: Next.js 16 + React 19
- **Styling**: Tailwind CSS v4
- **UI**: shadcn/ui + Lucide React
- **Fonts**: Playfair Display + Lato

## 🚀 Getting Started
```bash
pnpm install
pnpm dev
```

## ⚙️ Environment Variables
Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```
Add your `RESEND_API_KEY` from [resend.com](https://resend.com)

## 📁 Project Structure
components/    - UI components
app/           - Next.js pages & API routes
public/        - Static assets
styles/        - Global styles

## 📬 API Routes
- `POST /api/contact` — Contact form
- `POST /api/newsletter` — Newsletter signup
- `GET /api/events` — Fetch events
- `POST /api/events/book` — Book a session