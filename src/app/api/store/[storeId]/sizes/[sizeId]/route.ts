import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 400 });
    }

    if (!params.sizeId) {
      return NextResponse.json("SizeId is required", { status: 400 });
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

    const editCategory = await db.size.updateMany({
      where: { id: params.sizeId },
      data: { value, name },
    });
    return NextResponse.json(editCategory);
  } catch (error) {
    console.log("[Size_PATCH]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("Store id is required", { status: 400 });
    }

    if (!params.sizeId) {
      return NextResponse.json("Size id is required", { status: 400 });
    }

    const deleteSize = await db.size.deleteMany({
      where: { id: params.sizeId },
    });

    return NextResponse.json(deleteSize);
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return NextResponse.json("SizeID id is required", { status: 400 });
    }

    const GetSize = await db.size.findUnique({
      where: { id: params.sizeId },
    });

    return NextResponse.json(GetSize);
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}
