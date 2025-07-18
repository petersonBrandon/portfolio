// app/api/lore/category/route.ts

import { NextResponse } from "next/server";
import { getLoreEntriesByCategory } from "../../../../lib/lore/ftl-lore";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (!category) {
    return NextResponse.json(
      { error: "Category parameter is required" },
      { status: 400 }
    );
  }

  try {
    const results = await getLoreEntriesByCategory(category);
    return NextResponse.json(results);
  } catch (error) {
    console.error("API category filter error:", error);
    return NextResponse.json(
      { error: "Failed to filter by category" },
      { status: 500 }
    );
  }
}
