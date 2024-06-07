import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 400 });
    }
    const body = await req.json();

    const { name } = body;
    if (!name) {
      return NextResponse.json("Name is required", { status: 400 });
    }

    const save = await db.store.create({ data: { name, userId } });

    return NextResponse.json(save);
  } catch (error) {
    console.log("[STORE_POST]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}
