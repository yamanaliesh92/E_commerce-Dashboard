import { db } from "@/lib/db";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await db.order.findMany({
    where: { storeId, isPaid: true },
    include: { orderItem: { include: { product: true } } },
  });
  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItem.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber();
    }, 0);
    return total + orderTotal;
  }, 0);
  return totalRevenue;
};
