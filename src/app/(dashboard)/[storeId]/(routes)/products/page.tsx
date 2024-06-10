import { db } from "@/lib/db";
import React from "react";
import { format } from "date-fns";
import ProductClient from "./_components/product-client";
import { ProductColumn } from "./_components/columns";
import { formatter } from "@/lib/utils";

export default async function ProductPage({
  params,
}: {
  params: { storeId: string };
}) {
  const products = await db.product.findMany({
    where: { storeId: params.storeId },
    include: { color: true, category: true, size: true },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    color: item.color.value,
    size: item.size.name,
    createdAt: format(item.createdAt, "MMM do, yyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
}
