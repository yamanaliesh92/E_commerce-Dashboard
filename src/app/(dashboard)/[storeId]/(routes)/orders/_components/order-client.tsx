"use client";
import Heading from "@/components/heading";

import { DataTable } from "@/components/ui/data-tabel";
import { Separator } from "@/components/ui/separator";

import React from "react";
import { OrderColumn, columns } from "./columns";

interface OrderClientProps {
  data: OrderColumn[];
}

export default function OrderClient({ data }: OrderClientProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Order  (${data.length})`}
          description="Manage orders for your store"
        />
      </div>
      <Separator />
      <DataTable searchKey="products" data={data} columns={columns} />
    </>
  );
}
