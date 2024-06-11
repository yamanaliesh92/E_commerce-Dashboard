import { db } from "@/lib/db";
import React from "react";

export default async function OrderPage({
  params,
}: {
  params: { storeId: string };
}) {
  const orders = await db.order.findMany({
    where: { storeId: params.storeId },
    include: {
      orderItem: { include: { product: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

   const formattedBillboards: OrderColumn[] = .map((item) => ({
     id: item.id,
     label: item.label,
     createdAt: format(item.createdAt, "MMM do, yyy"),
   }));

  return <div></div>;
}
