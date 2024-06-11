"use client";
import Heading from "@/components/heading";
import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-tabel";
import { Separator } from "@/components/ui/separator";

import { Plus } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import { SizeColumn, columns } from "./columns";

interface SizeClientProps {
  data: SizeColumn[];
}

export default function SizeClient({ data }: SizeClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Size  (${data.length})`}
          description="Manage sizes for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4 " />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" data={data} columns={columns} />
      <Heading title="API" description="API calls for Sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
}
