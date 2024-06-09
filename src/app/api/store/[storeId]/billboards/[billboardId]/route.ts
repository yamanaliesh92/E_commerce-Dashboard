import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 400 });
    }

    if (!params.billboardId) {
      return NextResponse.json("BillboardId is required", { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("StoreId is required", { status: 400 });
    }

    const body = await req.json();

    const { label, imgUrl } = body;

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

    const editBillboard = await db.billboard.updateMany({
      where: { id: params.billboardId },
      data: { label, imgUrl },
    });
    return NextResponse.json(editBillboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("Store id is required", { status: 400 });
    }

    if (!params.billboardId) {
      return NextResponse.json("Billboard id is required", { status: 400 });
    }

    const deleteBillboard = await db.billboard.deleteMany({
      where: { id: params.billboardId },
    });

    return NextResponse.json(deleteBillboard);
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return NextResponse.json("Billboard id is required", { status: 400 });
    }

    const GetBillboard = await db.billboard.findUnique({
      where: { id: params.billboardId },
    });

    return NextResponse.json(GetBillboard);
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}
