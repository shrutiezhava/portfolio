
# Digital Lab - Personal Portfolio

A full-stack personal website with a "digital lab" aesthetic, built with Next.js 16, TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## Features

- **Digital Lab Aesthetic:** Custom design system, dark mode aware, "attitude" voice.
- **Blog (Logs):** Rich text editor (TipTap), image support, slug auto-generation.
- **Projects (Experiments):** Showcase with tech stack tags and links.
- **Admin Dashboard:** Secure login, create/edit/delete posts, publish toggling.
- **Animations:** Page transitions, hover effects, scroll reveals using Framer Motion.
- **Image Upload:** Direct upload to Supabase Storage.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL (Supabase)
- **Styling:** Tailwind CSS + Typography
- **Animation:** Framer Motion
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **Editor:** TipTap

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Setup:**
    Create a `.env` file in the root:
    ```env
    NEXT_PUBLIC_SUPABASE_URL="https://[project-id].supabase.co"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="[your-anon-key]"
    
    # For Server Side Access (same as public typically)
    SUPABASE_URL="https://[project-id].supabase.co"
    SUPABASE_SERVICE_ROLE_KEY="[your-service-role-key]" # Optional, for admin tasks
    ```

3.  **Supabase Setup:**
    - Create a new project on Supabase.
    - Go to **SQL Editor** and run the contents of `supabase_schema.sql` to set up tables and policies.
    - Create a **Storage Bucket** named `uploads` and set it to Public.
    - Go to **Authentication -> Policies** and ensure Row Level Security (RLS) policies are enabled as per schema.

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000).

## Admin Access

- **Login URL:** `/login` or `/admin`
- **First Admin Creation:**
    - Sign up a user via Supabase Auth (or implement a signup page temporarily).
    - Manually set the user's `role` to `ADMIN` in the `public.users` table if using role-based access control logic in the app.
    - The app automatically syncs authenticated users to `public.users` table on first action.

## Deployment

This project is configured for deployment on Vercel with Supabase.

1.  **Supabase:** Ensure database schema and storage are set up.
2.  **Vercel:**
    - Import project.
    - Add Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, etc.).
    - Deploy.

## License

MIT
