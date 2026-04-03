# Sensations — Backend API

A simple Next.js Route Handler API that powers the Sensations platform.  
All routes live under `app/api/` and follow REST conventions.

---

## Stack

- **Framework**: Next.js 16 App Router (Route Handlers)
- **Runtime**: Node.js (Edge-compatible)
- **Storage**: In-memory (see "Production" below)
- **Validation**: Manual, inline

---

## Endpoints

### 📬 Contact Form

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/contact` | Submit a contact message |
| `GET`  | `/api/contact` | List all submissions (admin) |

**POST body:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "inquiry": "Art Therapy Inquiry",
  "message": "I'd love to join a session..."
}
```

**Success response (201):**
```json
{
  "success": true,
  "message": "Thank you! We'll get back to you within 2–4 hours.",
  "id": "contact_1699999999_abc123"
}
```

---

### 📧 Newsletter

| Method   | Path | Description |
|----------|------|-------------|
| `POST`   | `/api/newsletter` | Subscribe an email |
| `DELETE` | `/api/newsletter` | Unsubscribe an email |
| `GET`    | `/api/newsletter` | Subscriber count (admin) |

**POST body:**
```json
{ "email": "jane@example.com" }
```

**DELETE body:**
```json
{ "email": "jane@example.com" }
```

---

### 🗓️ Events

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/api/events` | List all events |
| `GET`  | `/api/events?category=Art+Therapy` | Filter by category |
| `GET`  | `/api/events?featured=true` | Featured events only |
| `POST` | `/api/events` | Create an event (admin) |

**Categories:** `Art Therapy`, `Music Therapy`, `Group Healing`, `Sound Bath`

**GET response:**
```json
{
  "count": 6,
  "events": [
    {
      "id": "evt_001",
      "title": "Acrylic Soul Expression",
      "spotsAvailable": 12,
      "isSoldOut": false,
      ...
    }
  ]
}
```

---

### 🎟️ Event Booking

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/events/book` | Book a spot at an event |
| `GET`  | `/api/events/book` | List all bookings (admin) |

**POST body:**
```json
{
  "eventId": "evt_001",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+254 700 000000"
}
```

**Success response (201):**
```json
{
  "success": true,
  "message": "You're booked for \"Acrylic Soul Expression\"! See you there.",
  "booking": {
    "id": "bkg_1699999999_xyz",
    "event": { "id": "evt_001", "title": "Acrylic Soul Expression", ... },
    "name": "Jane Doe",
    "email": "jane@example.com",
    "bookedAt": "2024-10-15T12:00:00.000Z"
  }
}
```

**Error cases handled:**
- Event not found → 404
- Event fully booked → 409
- Duplicate booking (same email + event) → 409
- Invalid email → 400
- Missing required fields → 400

---

## Error Format

All errors return:
```json
{ "error": "Human-readable error message." }
```

---

## Production Upgrade Path

The in-memory stores reset on every server restart.  
To persist data, swap the store arrays with a real database:

| Option | Best for |
|--------|----------|
| **Prisma + PostgreSQL** (Supabase/Neon) | Full relational data |
| **MongoDB Atlas** | Flexible document storage |
| **Resend / Mailchimp API** | Newsletter management |
| **KV (Vercel/Redis)** | Simple key-value caching |

### Example: Prisma swap (contact route)
```ts
// Replace: contactSubmissions.push(submission)
await prisma.contactSubmission.create({ data: submission });

// Replace: return contactSubmissions
return await prisma.contactSubmission.findMany();
```

---

## Running Locally

```bash
pnpm install
pnpm dev
# API available at http://localhost:3000/api/*
```

## Testing with curl

```bash
# Contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Doe","email":"jane@example.com","message":"Hello there!"}'

# Newsletter signup
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com"}'

# List events
curl http://localhost:3000/api/events

# Book an event
curl -X POST http://localhost:3000/api/events/book \
  -H "Content-Type: application/json" \
  -d '{"eventId":"evt_001","name":"Jane Doe","email":"jane@example.com"}'
```
