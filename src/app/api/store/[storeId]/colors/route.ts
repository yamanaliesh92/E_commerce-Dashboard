import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json("Unauthenticated", { status: 400 });
    }
    const body = await req.json();

    const { name, value } = body;

    if (!params.storeId) {
      return NextResponse.json("Store id is required", { status: 400 });
    }

    if (!name) {
      return NextResponse.json("Name is required", { status: 400 });
    }

    if (!value) {
      return NextResponse.json("Value is required", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return NextResponse.json("Unauthorized", { status: 403 });
    }

    const color = await db.color.create({
      data: { name, value, storeId: params.storeId },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_POST]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return NextResponse.json("Store id is required", { status: 400 });
    }

    const colors = await db.color.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}
