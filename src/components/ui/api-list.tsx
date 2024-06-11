"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useOrigin } from "../../../hook/use-origin";
import { ApiAlert } from "./api-alert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}
export default function ApiList({ entityIdName, entityName }: ApiListProps) {
  const origin = useOrigin();
  const params = useParams();

  const baseUrl = `${origin}/api/store/${params.storeId}`;
  return (
    <>
      <ApiAlert
        title="GET"
        variant={"public"}
        description={`${baseUrl}/${entityName}`}
      />

      <ApiAlert
        title="GET"
        variant={"public"}
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />

      <ApiAlert
        title="POST"
        variant={"admin"}
        description={`${baseUrl}/${entityName}`}
      />

      <ApiAlert
        title="PATCH"
        variant={"admin"}
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />

      <ApiAlert
        title="DELETE"
        variant={"admin"}
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
}
