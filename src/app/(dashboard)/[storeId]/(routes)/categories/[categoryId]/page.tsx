import { db } from "@/lib/db";
import React from "react";
import CategoryFrom from "./_components/category-form";

export default async function BillboardPage({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) {
  const { categoryId } = params;
  const { storeId } = params;

  const billboards = await db.billboard.findMany({ where: { storeId } });
  const category = await db.category.findFirst({
    where: { id: categoryId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryFrom billboards={billboards} initialData={category} />
      </div>
    </div>
  );
}
