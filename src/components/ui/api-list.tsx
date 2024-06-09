"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useOrigin } from "../../../hook/use-origin";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}
export default function ApiList({ entityIdName, entityName }: ApiListProps) {
  const origin = useOrigin();
  const params = useParams();

  const baseUrl = `${origin}/api/${params.storeId}`;
  return <div>Api</div>;
}
