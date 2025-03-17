import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: topResumes, error } = await supabase
      .from('resumes')
      .select('id, clerkUserId, position_title, company, points')
      .order('points', { ascending: false })
      .limit(10);

    if (error) throw error;

    // Transform to match expected interface
    const formattedLeaderboard = topResumes.map(resume => ({
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