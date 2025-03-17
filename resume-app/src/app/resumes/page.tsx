import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ResumeCard } from "../../components/ResumeCard";
import { auth } from '@clerk/nextjs/server';
import { supabase } from "@/lib/supabase";

export default async function ResumesPage() {
  const authResult = await auth();
  
  if (!authResult.userId) {
    return <div>Please sign in to view resumes</div>;
  }

  console.log('Clerk User ID:', authResult.userId);
  
  try {
    // Fetch resumes directly from Supabase
    const { data: resumes, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('clerkUserId', authResult.userId);

    console.log('Supabase response:', { resumes, error });

    if (error) {
      console.error('Error fetching resumes:', error);
      return <div>Error: {error.message || 'Unable to load resumes'}</div>;
    }

    if (!resumes || resumes.length === 0) {
      return (
        <div className="container mx-auto p-4 text-center">
          <h1 className="text-2xl font-bold mb-6">Your Resumes</h1>
          <p className="mb-4">You haven&apos;t uploaded any resumes yet.</p>
          <Button asChild>
            <Link href="/create">Add Your First Resume</Link>
          </Button>
        </div>
      );
    }

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Your Resumes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
        <Button asChild className="mt-4">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  } catch (err) {
    console.error('Unexpected error in ResumesPage:', err);
    return <div>An unexpected error occurred. Please try again later.</div>;
  }
} 