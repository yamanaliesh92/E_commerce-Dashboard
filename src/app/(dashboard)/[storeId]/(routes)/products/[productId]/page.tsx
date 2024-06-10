import { db } from "@/lib/db";
import React from "react";
import ProductFrom from "./_components/product-form";

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;
  const product = await db.product.findUnique({
    where: { id: productId },
    include: { Images: true },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductFrom initialData={product} />
      </div>
    </div>
  );
}
