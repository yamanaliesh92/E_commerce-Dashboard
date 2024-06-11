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
import { OrderColumn } from "./columns";

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
      <Separator />=
    </>
  );
}
