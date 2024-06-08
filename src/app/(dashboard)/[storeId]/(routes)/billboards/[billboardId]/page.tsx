import { db } from "@/lib/db";
import React from "react";
import BillboardFrom from "./_components/billboard-form";

export default async function BillboardPage({
  params,
}: {
  params: { billboardId: string };
}) {
  const { billboardId } = params;
  const billboard = await db.billboard.findFirst({
    where: { id: billboardId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardFrom initialData={billboard} />
      </div>
    </div>
  );
}
