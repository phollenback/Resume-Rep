import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // Test the connection by listing tables
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Supabase connection successful',
      data,
      tables: await supabase.from('resumes').select('*').limit(5)
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ 
      error: 'Unexpected error', 
      details: err instanceof Error ? err.message : String(err) 
    }, { status: 500 });
  }
} 