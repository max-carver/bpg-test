"use client";

import { type ColumnDef } from "@tanstack/react-table";
import type { User } from "next-auth";

import EditUserForm from "@/components/EditUserForm";

export const userColumns: Array<ColumnDef<User>> = [
  {
    accessorKey: "id",
    header: "User ID",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      return <EditUserForm user={row.original} />;
    },
  },
];
