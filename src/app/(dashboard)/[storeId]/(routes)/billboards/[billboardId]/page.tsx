import { db } from "@/lib/db";
import React from "react";

export default async function BillboardPage({
  params,
}: {
  params: { billboardId: string };
}) {
  const { billboardId } = params;
  const billboard = await db.billboard.findFirst({
    where: { id: billboardId },
  });

  return <div>Existing billboard:{billboard?.label}</div>;
}
