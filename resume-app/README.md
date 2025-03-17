# Resume-Reputation

> A resume tracking application that helps you manage your job applications and track your progress through the hiring process.

## Features

- Upload and manage your resumes
- Track the progress of each job application
- Earn points as you advance through the hiring process
- View leaderboards to compare your progress with others

## Tech Stack

### Frontend
- Next.js 14 with App Router
- Tailwind CSS
- Shadcn UI components
- Clerk for authentication

### Backend
- Supabase PostgreSQL database
- UploadThing for file storage
- Vercel for deployment

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the `.env.example` file to `.env.local` and fill in your environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Database Schema

The application uses a Supabase PostgreSQL database with the following schema:

### Resumes Table
```sql
CREATE TABLE resumes (
  id SERIAL PRIMARY KEY,
  clerkUserId VARCHAR(255) NOT NULL,
  file_url VARCHAR(255) NOT NULL,
  position_title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  keywords TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  progress VARCHAR(255) DEFAULT 'applied',
  completed INTEGER DEFAULT 0,
  points INTEGER DEFAULT 0,
  details TEXT
);
```

## Deployment

This application is configured for deployment on Vercel with a Supabase PostgreSQL database.

1. Create a Supabase project and set up the database schema
2. Set up environment variables in Vercel
3. Deploy the application

## License

MIT
