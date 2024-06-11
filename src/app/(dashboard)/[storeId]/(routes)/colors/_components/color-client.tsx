"use client";
import Heading from "@/components/heading";
import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-tabel";
import { Separator } from "@/components/ui/separator";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ColorColumn, columns } from "./columns";

interface ColorClientProps {
  data: ColorColumn[];
}

export default function ColorClient({ data }: ColorClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Color  (${data.length})`}
          description="Manage colors for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="mr-2 h-4 w-4 " />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" data={data} columns={columns} />
      <Heading title="API" description="API calls for Colors" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
}
