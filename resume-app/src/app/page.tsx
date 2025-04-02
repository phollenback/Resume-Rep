import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaderboard } from "@/components/Leaderboard";

export default function Home() {
  return (
    <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-screen font-['Times_New_Roman']">
      <h1 className="text-3xl font-bold mb-4">Resume Manager</h1>

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

      <SignedIn>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/create">Add Resume</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/resumes">View Resumes</Link>
            </Button>
          </div>
          
          <UserButton afterSignOutUrl="/" />

          <div className="w-full max-w-3xl mt-8">
            {/* Personal Leaderboard */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold"><u>Your Resumes</u></h2>
                <Link href="/my-resumes" className="text-primary hover:underline">
                  View All →
                </Link>
              </div>
              <Leaderboard 
                limit={5} 
                personal={true} 
                title="Your Top Resumes" 
                className="h-full"
              />
            </div>
          </div>
        </div>
      </SignedIn>

      <footer className="w-full bg-white text-black text-center py-4 mt-8">
        <p>&copy; {new Date().getFullYear()} Digital Rev Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
}
