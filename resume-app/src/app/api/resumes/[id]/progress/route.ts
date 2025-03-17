import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

const POINTS_MAP = {
  applied: 10,
  phone_screen: 20,
  technical_test: 30,
  interview_1: 50,
  interview_2: 70,
  offer_received: 100,
  hired: 150
};

type ProgressStage = keyof typeof POINTS_MAP;

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { progress } = await request.json() as { progress: ProgressStage };
    const points = POINTS_MAP[progress] || 0;
    
    // Update resume points
    const { data: resume, error: resumeError } = await supabase
      .from('resumes')
      .update({ progress, points })
      .eq('id', params.id)
      .select()
      .single();
    
    if (resumeError) throw resumeError;
    
    // Note: If you need to update user points in the future,
    // you would get the user ID and update the users table
      
    return NextResponse.json(resume);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
} 