# DAMCA Creative Portfolio & Academy

A React/TypeScript website and lightweight full-stack CMS for DAMCA's creative studio and editing academy.

## Features

- Creative portfolio, project filters, and detailed case studies
- Academy programs, curriculum, fees, FAQs, and application form
- Password-protected admin dashboard for content, leads, and students
- Supabase Postgres persistence for CMS, leads, and student records
- Supabase Auth with HTTP-only admin sessions, validation, request limits, and CSV exports
- SPA routing for `/portfolio`, `/academy`, and `/admin`

## Local development

Requirements: Node.js 20 or newer.

1. Create a Supabase project and run `supabase/migrations/001_damca_crm.sql` in its SQL editor.
2. Create the administrator in Supabase Authentication → Users.
3. Copy `.env.example` to `.env.local` and enter the project URL, publishable key, secret key, admin email, and session secret.
4. Install packages with `npm install`, run `npm run dev`, and open `http://localhost:3000`.

The API runs on port 8787 and Vite proxies `/api` to it. Admin is intentionally absent from the public navigation; visit `/admin` directly.

## Production

Run `npm install`, `npm run lint`, `npm run build`, then start with `NODE_ENV=production npm start` (use the equivalent environment-variable syntax for your platform).

Configure all Supabase variables, `ADMIN_EMAILS`, `SESSION_SECRET`, and `PORT`. The Supabase secret key must only exist on the server. The production server serves the built SPA and API from one origin.

## Data and integrations

CMS content is stored in `site_content`; CRM leads are stored in `contacts`; academy applicants and students are stored in `students`. Row-level security is enabled and browser access is denied—the server performs authorized operations with the private service role.

Contact and academy forms create server records. Payment processing, transactional email, and official social/WhatsApp links require the owner's provider accounts and credentials; no fake live integration is presented.
