import { db } from "@/lib/db";
import React from "react";
import SizeFrom from "./_components/size-form";

export default async function SizePage({
  params,
}: {
  params: { sizeId: string };
}) {
  const { sizeId } = params;
  const size = await db.size.findFirst({
    where: { id: sizeId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeFrom initialData={size} />
      </div>
    </div>
  );
}
