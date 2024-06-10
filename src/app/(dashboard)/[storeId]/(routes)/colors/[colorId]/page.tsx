import { db } from "@/lib/db";
import React from "react";
import ColorFrom from "./_components/color-form";

export default async function ColorPage({
  params,
}: {
  params: { colorId: string };
}) {
  const { colorId } = params;
  const size = await db.color.findFirst({
    where: { id: colorId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorFrom initialData={size} />
      </div>
    </div>
  );
}
