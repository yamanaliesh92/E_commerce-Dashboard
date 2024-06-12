import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string; colorId: string } }
) {
  console.log("+++++++++", { dd: params.colorId });
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 400 });
    }

    if (!params.colorId) {
      return NextResponse.json("Color id is required", { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("StoreId is required", { status: 400 });
    }

    const body = await req.json();

    const { name, value } = body;

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
    console.log("Value", value);
    const editColor = await db.color.updateMany({
      where: { id: params.colorId },
      data: { value, name },
    });
    return NextResponse.json(editColor);
  } catch (error) {
    console.log("[Color_PATCH]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("Store id is required", { status: 400 });
    }

    if (!params.colorId) {
      return NextResponse.json("Color id is required", { status: 400 });
    }

    const deleteColor = await db.color.deleteMany({
      where: { id: params.colorId },
    });

    return NextResponse.json(deleteColor);
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId) {
      return NextResponse.json("Color  id is required", { status: 400 });
    }

    const GetColor = await db.color.findUnique({
      where: { id: params.colorId },
    });

    return NextResponse.json(GetColor);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}
