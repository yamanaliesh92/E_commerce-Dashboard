import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: { id: params.storeId, userId },
  });
  if (!store) {
    return redirect("/");
  }
  return (
    <div>
      <h1>this is will be navbar</h1>
      {children}
    </div>
  );
}
