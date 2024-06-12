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

    const product = await db.product.create({
      data: {
        name,
        sizeId,
        colorId,
        categoryId,
        Images: {
          createMany: {
            data: [...Images.map((image: { url: string }) => image)],
          },
        },
        price,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId) {
      return NextResponse.json("Store id is required", { status: 400 });
    }

    const products = await db.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
        colorId,
      },
      include: {
        Images: true,
        color: true,
        size: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[Product_GET]", error);
    return NextResponse.json("internal server error", { status: 500 });
  }
}
