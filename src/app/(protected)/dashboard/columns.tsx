"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { formatDateForDisplay } from "@/lib/dates";
import type { Ping } from "@/lib/types";

export const columns: Array<ColumnDef<Ping>> = [
  {
    accessorKey: "coordinates",
    header: "Coordinates",
    cell: ({ row }) => {
      return `${row.original.latitude}, ${row.original.longitude}`;
    },
  },
  {
    accessorKey: "id",
    header: "Ping ID",
    cell: ({ row }) => {
      return row.original.id.slice(0, 8);
    },
  },
  {
    accessorKey: "created_at",
    header: "Timestamp",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return formatDateForDisplay(date);
    },
  },
  {
    id: "parent_ping_id",
    header: "Parent Ping",
    cell: ({ row }) => {
      const parentPingId = row.original.parent_ping_id?.slice(0, 8);

      return parentPingId ? (
        <p>{parentPingId}</p>
      ) : (
        <p className="text-muted-foreground italic">Original Ping</p>
      );
    },
  },
  {
    accessorKey: "created_by",
    header: "Created By",
    cell: ({ row }) => {
      return `${row.original.user_first_name} ${row.original.user_last_name}`;
    },
  },
];
