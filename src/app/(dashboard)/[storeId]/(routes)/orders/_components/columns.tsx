"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type OrderColumn = {
  id: string;
  address: string;
  createdAt: string;
  products: string;
  totalPrice: string;
  phone: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },

  {
    accessorKey: "totalPrice",
    header: "TotalPrice",
  },
  {
    accessorKey: "created",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
