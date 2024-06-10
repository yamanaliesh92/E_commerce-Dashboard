import { db } from "@/lib/db";
import React from "react";
import ProductFrom from "./_components/product-form";

export default async function ProductPage({
  params,
}: {
  params: { productId: string; storeId: string };
}) {
  const { productId, storeId } = params;
  const product = await db.product.findUnique({
    where: { id: productId },
    include: { Images: true },
  });

  const categories = await db.category.findMany({ where: { storeId } });
  const sizes = await db.size.findMany({ where: { storeId } });
  const colors = await db.color.findMany({ where: { storeId } });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductFrom
          sizes={sizes}
          colors={colors}
          categories={categories}
          initialData={product}
        />
      </div>
    </div>
  );
}
