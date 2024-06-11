"use client";
import Heading from "@/components/heading";
import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-tabel";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { OrderColumn, columns } from "./columns";

interface OrderClientProps {
  data: OrderColumn[];
}

export default function OrderClient({ data }: OrderClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Order  (${data.length})`}
          description="Manage orders for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/orders/new`)}>
          <Plus className="mr-2 h-4 w-4 " />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="" data={data} columns={columns} />
      <Heading title="API" description="API calls for Orders" />
      <Separator />
      <ApiList entityName="order" entityIdName="orderId" />
    </>
  );
}
