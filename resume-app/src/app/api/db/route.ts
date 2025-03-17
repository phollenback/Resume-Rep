import { db } from '@/lib/db/server';
import { NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    // Use sql template literal for raw queries
    const result = await db.execute(sql`${query}`);
    
    return NextResponse.json(result);
  } catch (err) {
    console.error('Database error:', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
} 