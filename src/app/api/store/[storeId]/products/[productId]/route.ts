import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 400 });
    }

    if (!params.productId) {
      return NextResponse.json("Product id is required", { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("StoreId is required", { status: 400 });
    }

    const body = await req.json();

    const {
      name,
      sizeId,
      colorId,
      Images,
      isFeatured,
      isArchived,
      categoryId,
      price,
    } = body;

    if (!params.storeId) {
      return NextResponse.json("Store id is required", { status: 400 });
    }

    if (!Images || !Images.length) {
      return NextResponse.json("Images is required", { status: 400 });
    }

    if (!name) {
      return NextResponse.json("Name is required", { status: 400 });
    }

    if (!sizeId) {
      return NextResponse.json("Size id is required", { status: 400 });
    }

    if (!price) {
      return NextResponse.json("Price id is required", { status: 400 });
    }

    if (!categoryId) {
      return NextResponse.json("Category id is required", { status: 400 });
    }

    if (!colorId) {
      return NextResponse.json("Color id is required", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return NextResponse.json("Unauthorized", { status: 403 });
    }

    await db.product.update({
      where: { id: params.productId },
      data: {
        name,
        colorId,
        sizeId,
        categoryId,
        price,
        isArchived,
        isFeatured,
        Images: { deleteMany: {} },
      },
    });
    const product = await db.product.update({
      where: { id: params.productId },
      data: {
        Images: {
          createMany: {
            data: [...Images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("Store id is required", { status: 400 });
    }

    if (!params.productId) {
      return NextResponse.json("Product id is required", { status: 400 });
    }

    const product = await db.product.deleteMany({
      where: { id: params.productId },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return NextResponse.json("Product id is required", { status: 400 });
    }

    const product = await db.product.findUnique({
      where: { id: params.productId },

      include: {
        Images: true,
        color: true,
        size: true,
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}
