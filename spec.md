# Project: Digital Lab

## Core Concept

A modern, playful, builder-first personal website inspired by Hack Club.

Public users:
- Can view projects
- Can read blog posts

Admin (only me):
- Can create blog posts
- Can edit blog posts
- Can delete blog posts

No one else has write access.

---

## Tech Stack

Frontend:
- Next.js (App Router)
- Tailwind CSS
- Framer Motion
- TypeScript

Backend:
- Next.js Server Actions / API Routes
- PostgreSQL (or Supabase)
- Prisma ORM

Authentication:
- NextAuth (Credentials or GitHub OAuth)
- Role-based access (admin only)

Deployment:
- Vercel
- Supabase DB

---

## Roles

### Public User
- View homepage
- View lab page
- View blog posts
- View about/contact

### Admin
- Secure login
- Access /dashboard
- Create post
- Edit post
- Delete post

---

## Pages

- `/` → Homepage
- `/lab` → Projects
- `/notes` → Blog listing
- `/notes/[slug]` → Individual blog
- `/about`
- `/contact`
- `/login`
- `/dashboard` (protected)
- `/dashboard/new`
- `/dashboard/edit/[id]`

---

## Database Schema

User:
- id
- email
- role (admin)

Post:
- id
- title
- slug
- content (rich text or markdown)
- createdAt
- updatedAt
- published (boolean)

---

## Blog Features

Public:
- View published posts only
- Clean reading layout
- Animated section transitions

Admin:
- Rich text editor (TipTap or Markdown)
- Save draft
- Publish/unpublish
- Delete
- Slug auto-generate

---

## UI Style

HackClub-inspired:
- Playful but clean
- Strong accent color
- Rounded cards
- Modular layout
- Friendly tone

---

## Motion Design (Framer Motion)

- Section fade-in on scroll
- Card hover lift
- Page transitions (subtle slide + fade)
- Button micro-bounce
- Nav underline animation

Keep motion subtle and smooth.
No heavy animations.
