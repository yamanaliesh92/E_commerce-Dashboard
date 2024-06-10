import { db } from "@/lib/db";
import React from "react";
import { format } from "date-fns";
import SizeClient from "./_components/color-client";
import { ColorColumn } from "./_components/columns";

export default async function ColorPage({
  params,
}: {
  params: { storeId: string };
}) {
  const sizes = await db.color.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedColors: ColorColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMM do, yyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedColors} />
      </div>
    </div>
  );
}
