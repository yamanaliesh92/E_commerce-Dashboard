import { db } from "@/lib/db";
import React from "react";
import { format } from "date-fns";
import BillboardClient from "./_components/billboard-client";
import { BillboardColumn } from "./_components/columns";

export default async function BillboardPage({
  params,
}: {
  params: { storeId: string };
}) {
  const billboards = await db.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMM do, yyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
}
