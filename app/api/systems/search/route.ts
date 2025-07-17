import { NextRequest, NextResponse } from "next/server";
import { searchSystems } from "@/lib/ftl-systems";

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || query.trim().length < 2) {
      return NextResponse.json([]);
    }

    const results = await searchSystems(query.trim());
    return NextResponse.json(results);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
