// app/api/lore/search/route.ts

import { NextResponse } from "next/server";
import { searchLoreEntries } from "../../../../lib/lore/ftl-lore";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const results = await searchLoreEntries(query);
    return NextResponse.json(results);
  } catch (error) {
    console.error("API search error:", error);
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    );
  }
}
