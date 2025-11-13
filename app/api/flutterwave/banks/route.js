import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.flutterwave.com/v3/banks/NG", {
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch banks" },
      { status: 500 }
    );
  }
}
