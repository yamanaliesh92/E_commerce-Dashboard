"use client";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-tabel";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import { BillboardColumn, columns } from "./columns";

interface BillboardClientProps {
  data: BillboardColumn[];
}

export default function BillboardClient({ data }: BillboardClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboard  (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4 " />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" data={data} columns={columns} />
      <Heading title="API" description="API calls for Billboards" />
    </>
  );
}
