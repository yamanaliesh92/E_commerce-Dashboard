import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("StoreId is required", { status: 400 });
    }

    const body = await req.json();

    const { name } = body;
    if (!name) {
      return NextResponse.json("Name is required", { status: 400 });
    }

    const store = await db.store.updateMany({
      where: { id: params.storeId, userId },
      data: { name, userId },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 400 });
    }

    const save = await db.store.deleteMany({
      where: { id: params.storeId, userId },
    });

    return NextResponse.json(save);
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}
