
# Digital Lab - Personal Portfolio

A full-stack personal website with a "digital lab" aesthetic, built with Next.js 16, TypeScript, Tailwind CSS, Framer Motion, and Prisma.

## Features

- **Digital Lab Aesthetic:** Custom design system, dark mode aware, "attitude" voice.
- **Blog (Logs):** Rich text editor (TipTap), image support, slug auto-generation.
- **Projects (Experiments):** Showcase with tech stack tags and links.
- **Admin Dashboard:** Secure login, create/edit/delete posts, publish toggling.
- **Animations:** Page transitions, hover effects, scroll reveals using Framer Motion.
- **Image Upload:** Local file upload for MVP (switch to Cloudinary/Supabase for production).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** SQLite (default for development) / PostgreSQL (production ready)
- **ORM:** Prisma
- **Styling:** Tailwind CSS + Typography
- **Animation:** Framer Motion
- **Auth:** NextAuth.js (Credentials)
- **Editor:** TipTap

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Setup:**
    Create a `.env` file in the root:
    ```env
    DATABASE_URL="file:./dev.db" # Or postgresql://...
    NEXTAUTH_SECRET="your-secret-key-at-least-32-chars"
    NEXTAUTH_URL="http://localhost:3000"
    ```

3.  **Database Setup:**
    ```bash
    npx prisma db push
    npx prisma db seed
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000).

## Admin Access

- **Login URL:** `/login` or `/admin`
- **Default Credentials:**
    - Email: `admin@example.com`
    - Password: `password123` (See `prisma/seed.ts`)

## Production Deployment

This project is configured for deployment on Vercel with Supabase.

### 1. Supabase Setup
- Create a new project on Supabase.
- Go to Project Settings -> API and copy the `URL` and `anon` key.
- Go to Database -> Connection String -> URI and copy the connection string (Mode: Transaction).
- Create a bucket named `uploads` in Storage.

### 2. Environment Variables
Set the following environment variables in `.env` (local) and Vercel:

```
DATABASE_URL="postgres://postgres.[project]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgres://postgres.[project]:[password]@aws-0-[region].supabase.co:5432/postgres"

NEXT_PUBLIC_SUPABASE_URL="https://[project-id].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[your-anon-key]"

# For Server Side Access (same as public typically)
SUPABASE_URL="https://[project-id].supabase.co"
SUPABASE_ANON_KEY="[your-anon-key]"
```

### 3. Database Migration
Run Prisma migration to push schema to Supabase:
```bash
npx prisma migrate dev --name init_supabase
```

### 4. Vercel Deployment
- Import project to Vercel.
- Add the Environment Variables.
- Redeploy.
- **Auth:** Generate a strong `NEXTAUTH_SECRET`.

## License

MIT
