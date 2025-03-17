import { useState, useEffect } from 'react';

// Update Resume interface to match Supabase schema
interface Resume {
  id: number;
  clerkUserId: string;
  file_url: string;
  position_title: string;
  company: string;
  keywords: string;
  created_at: string;
  updated_at: string;
  progress: string;
  completed: number;
  points: number;
  details: string | null;
}

export function ResumeList() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getResumes = async () => {
      try {
        const res = await fetch('/api/resumes');
        const data = await res.json();
        setResumes(data);
      } catch (err) {
        console.error("Failed to fetch resumes:", err);
      } finally {
        setLoading(false);
      }
    };
    
    getResumes();
  }, []);

  // Display loading state or resumes
  if (loading) {
    return <div>Loading resumes...</div>;
  }

  return (
    <div>
      {resumes.length === 0 ? (
        <p>No resumes found.</p>
      ) : (
        <ul>
          {resumes.map((resume) => (
            <li key={resume.id}>{resume.position_title} - {resume.company}</li>
          ))}
        </ul>
      )}
    </div>
  );
} 