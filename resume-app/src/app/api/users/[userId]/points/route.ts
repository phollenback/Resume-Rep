import { db } from "@/lib/db";
import { resumeTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const result = await db
      .select({ totalPoints: sql<number>`sum(${resumeTable.points})` })
      .from(resumeTable)
      .where(eq(resumeTable.userId, params.userId));
      
    const totalPoints = result[0]?.totalPoints || 0;
    return NextResponse.json({ totalPoints });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to get points" }, { status: 500 });
  }
} 