import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const authResult = await auth();
  const userId = authResult.userId;
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data: userResumes, error } = await supabase
      .from('resumes')
      .select('id, clerkUserId, position_title, company, points')
      .eq('clerkUserId', userId)
      .order('points', { ascending: false })
      .limit(10);

    if (error) throw error;

    // Transform to match expected interface
    const formattedLeaderboard = userResumes.map(resume => ({
      id: resume.id,
      clerkUserId: resume.clerkUserId,
      positionTitle: resume.position_title,
      company: resume.company,
      points: resume.points || 0
    }));

    return NextResponse.json(formattedLeaderboard || []);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json([], { status: 500 });
  }
} 