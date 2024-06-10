"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  size: string;
  color: string;
  isArchived: boolean;
  isFeatured: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
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
