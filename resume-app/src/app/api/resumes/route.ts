import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const user = await auth();
  
  if (!user.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await req.json();
  
  try {
    const { data: result, error } = await supabase
      .from('resumes')
      .insert({
        clerkUserId: user.userId,
        file_url: data.fileUrl,
        position_title: data.positionTitle,
        company: data.company,
        keywords: data.keywords,
        points: 0,
        progress: 'applied'
      })
      .select();
      
    if (error) throw error;
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("Database error:", error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  const authResult = await auth();
  const userId = authResult.userId;
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data: resumes, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('clerkUserId', userId);
      
    if (error) throw error;
    
    return NextResponse.json(resumes);
  } catch (error) {
    console.error("Database error:", error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 