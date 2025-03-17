import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaderboard } from "@/components/Leaderboard";

export default function Home() {
  return (
    <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-screen font-['Times_New_Roman']">
      <h1 className="text-3xl font-bold mb-4">Resume Manager</h1>

      {/* Signed Out State */}
      <SignedOut>
        <div className="flex gap-2">
          <Button asChild>
            <SignInButton mode="modal" />
          </Button>
          <Button variant="outline" asChild>
            <SignUpButton mode="modal" />
          </Button>
        </div>
      </SignedOut>

      {/* Signed In State */}
      <SignedIn>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/create">Add Resume</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/resumes">View Resumes</Link>
          </Button>
        </div>
        <div className="mt-4">
          <UserButton afterSignOutUrl="http://localhost:3000/" />
        </div>
      </SignedIn>

      {/* Leaderboards Section */}
      <SignedIn>
        <div className="w-full max-w-5xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Leaderboard */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold"><u>Your Resumes</u></h2>
              <Link href="/my-resumes" className="text-primary hover:underline">
                View All →
              </Link>
            </div>
            <Leaderboard 
              limit={3} 
              personal={true} 
              title="Your Top Resumes" 
              className="h-full"
            />
          </div>
          
          {/* Global Leaderboard */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold"><u>Top Resumes</u></h2>
              <Link href="/leaderboard" className="text-primary hover:underline">
                View All →
              </Link>
            </div>
            <Leaderboard 
              limit={3}
              title="Industry Leaders" 
              className="h-full"
            />
          </div>
        </div>
      </SignedIn>

      {/* Footer */}
      <footer className="w-full bg-white text-black text-center py-4 mt-8">
        <p>&copy; {new Date().getFullYear()} Digital Rev Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
}
