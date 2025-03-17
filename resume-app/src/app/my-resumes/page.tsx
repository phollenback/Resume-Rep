import { Leaderboard } from "@/components/Leaderboard";
import Link from "next/link";

export default function MyResumesPage() {
  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Resumes</h1>
        <Link href="/" className="text-primary hover:underline">
          Back to Home
        </Link>
      </div>
      
      <Leaderboard 
        limit={20} 
        showViewAll={false} 
        personal={true} 
        title="Your Resume Performance" 
      />
    </div>
  );
} 