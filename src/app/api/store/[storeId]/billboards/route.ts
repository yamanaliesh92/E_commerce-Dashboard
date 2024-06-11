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

    console.log("body...................", body);

    const { label, imgUrl } = body;

    if (!params.storeId) {
      return NextResponse.json("Store id is required", { status: 400 });
    }

    if (!label) {
      return NextResponse.json("Label is required", { status: 400 });
    }

    if (!imgUrl) {
      return NextResponse.json("ImgUrl is required", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return NextResponse.json("Unauthorized", { status: 403 });
    }

    if (!imgUrl) {
      return NextResponse.json("ImgUrl is required", { status: 400 });
    }

    const billboard = await db.billboard.create({
      data: { label, imgUrl, storeId: params.storeId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[Billboard_POST]", error);
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

    const billboards = await db.billboard.findFirst({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[Billboard_GET]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}
