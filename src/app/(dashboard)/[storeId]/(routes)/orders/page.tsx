import { db } from "@/lib/db";
import formatPrice from "@/lib/utils";
import { format } from "date-fns";
import React from "react";
import { OrderColumn } from "./_components/columns";
import OrderClient from "./_components/order-client";

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

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    address: item.address,
    phone: item.phone,
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMM do, yyy"),
    products: item.orderItem
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatPrice(
      item.orderItem.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
}
