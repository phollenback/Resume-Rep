"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface LeaderboardEntry {
  id: string;
  clerkUserId: string;
  positionTitle: string;
  company: string;
  points: number;
}

interface LeaderboardProps {
  limit?: number;
  showViewAll?: boolean;
  title?: string;
  personal?: boolean;
  className?: string;
}

export function Leaderboard({ 
  limit = 3, 
  showViewAll = true, 
  title = "Other Industries",
  personal = false,
  className = "",
}: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const url = personal ? '/api/leaderboard/personal' : '/api/leaderboard';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${personal ? 'personal' : 'global'} leaderboard`);
        }
        const data = await response.json();
        setLeaderboard(Array.isArray(data) ? data.slice(0, limit) : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [limit, personal]);

  if (loading) {
    return <div className="text-muted-foreground">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="text-destructive">Error: {error}</div>;
  }

  return (
    <div className={`w-full border rounded-lg p-6 ${className}`}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      
      <div className="space-y-6">
        {leaderboard.length > 0 ? (
          leaderboard.map((entry, index) => (
            <div key={entry.id} className="border-b pb-4 last:border-0">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-medium">
                  {index + 1}. {entry.positionTitle} - {entry.company}
                </h3>
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                  {entry.points} pts
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="text-muted-foreground">
                  JUNE 25, 2020 | TECH
                </div>
                <Link 
                  href={`/resumes/${entry.id}`} 
                  className="text-primary inline-flex items-center"
                >
                  Continue reading →
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-muted-foreground">No leaderboard data available</div>
        )}
      </div>
      
      {showViewAll && leaderboard.length > 0 && (
        <div className="mt-6">
          <Link href={personal ? "/my-resumes" : "/leaderboard"} className="text-primary hover:underline">
            {personal ? "View all your resumes →" : "View full leaderboard →"}
          </Link>
        </div>
      )}
    </div>
  );
} 