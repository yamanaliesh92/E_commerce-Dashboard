import { db } from "@/lib/db";
import React from "react";
import BillboardClient from "./_components/billboard-client";

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
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={billboards} />
      </div>
    </div>
  );
}
