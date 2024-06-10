import { db } from "@/lib/db";
import React from "react";
import { format } from "date-fns";
import CategoryClient from "./_components/category-client";
import { CategoryColumn } from "./_components/columns";

export default async function BillboardPage({
  params,
}: {
  params: { storeId: string };
}) {
  const categories = await db.category.findMany({
    where: { storeId: params.storeId },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    billboardLabel: item.billboard.label,
    name: item.name,
    createdAt: format(item.createdAt, "MMM do, yyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
}
