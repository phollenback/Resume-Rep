import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { clerkUserId, email } = await request.json();
    
    const user = await db.insert(usersTable)
      .values({ clerkUserId, email })
      .onDuplicateKeyUpdate({ set: { email } });
      
    return NextResponse.json(user);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to create/update user" }, { status: 500 });
  }
} 