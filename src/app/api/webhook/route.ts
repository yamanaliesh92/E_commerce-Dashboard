import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return NextResponse.json(`Webhook Error ${error.message}`, { status: 500 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.country,
    address?.postal_code,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(`, `);

  if (event.type === "checkout.session.completed") {
    const order = await db.order.update({
      where: { id: session?.metadata?.orderId },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || "",
      },
      include: { orderItem: true },
    });
    console.log("order", order);
    const productIds = order.orderItem.map((orderItem) => orderItem.productId);
    await db.product.updateMany({
      where: { id: { in: [...productIds] } },
      data: { isArchived: true },
    });
  } else {
    return NextResponse.json(
      `Webhook Error:Unhandled event type ${event.type}`,
      { status: 200 }
    );
  }
  return NextResponse.json(null, { status: 200 });
}
