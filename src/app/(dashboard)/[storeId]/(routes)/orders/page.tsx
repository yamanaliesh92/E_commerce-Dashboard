import { db } from "@/lib/db";
import React from "react";

export default async function OrderPage({
  params,
}: {
  params: { storeId: string };
}) {
  const products = await db.order.findMany({
    where: { storeId: params.storeId },
    include: {
      orderItem: { include: { product: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <div></div>;
}
