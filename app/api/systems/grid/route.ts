// app/api/systems/grid/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSystemGridForViewport } from "../../../../lib/ftl-systems";

export async function POST(request: NextRequest) {
  try {
    const { centerQ, centerR, zoom, mapWidth, mapHeight, hexSize } =
      await request.json();

    const systems = await getSystemGridForViewport(
      centerQ,
      centerR,
      zoom,
      mapWidth,
      mapHeight,
      hexSize
    );

    return NextResponse.json(systems);
  } catch (error) {
    console.error("Grid API error:", error);
    return NextResponse.json(
      { error: "Failed to generate grid" },
      { status: 500 }
    );
  }
}
