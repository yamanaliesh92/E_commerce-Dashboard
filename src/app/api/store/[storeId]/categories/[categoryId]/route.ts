import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 400 });
    }

    if (!params.categoryId) {
      return NextResponse.json("CategoryId is required", { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("StoreId is required", { status: 400 });
    }

    const body = await req.json();

    const { name, billboardId } = body;

    if (!name) {
      return NextResponse.json("Name is required", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return NextResponse.json("Unauthorized", { status: 403 });
    }

    const editCategory = await db.category.updateMany({
      where: { id: params.categoryId },
      data: { billboardId, name },
    });
    return NextResponse.json(editCategory);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("Store id is required", { status: 400 });
    }

    if (!params.categoryId) {
      return NextResponse.json("Category id is required", { status: 400 });
    }

    const deleteBillboard = await db.category.deleteMany({
      where: { id: params.categoryId },
    });

    return NextResponse.json(deleteBillboard);
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return NextResponse.json("Billboard id is required", { status: 400 });
    }

    const GetCategory = await db.category.findUnique({
      where: { id: params.categoryId },
      include: { billboard: true },
    });

    return NextResponse.json(GetCategory);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}
