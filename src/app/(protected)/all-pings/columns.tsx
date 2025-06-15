"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowRight, CornerUpRight, Hash } from "lucide-react";

import { formatDateForDisplay } from "@/lib/dates";
import type { Ping, TrailedPing } from "@/lib/types";

export const columns: Array<ColumnDef<Ping | TrailedPing>> = [
  {
    accessorKey: "coordinates",
    header: "Coordinates",
    cell: ({ row }) => {
      const level = (row.original as TrailedPing).level;
      const isRoot = level === 0;
      const childCount = (row.original as TrailedPing).childCount || 0;

      return (
        <div className="flex items-center">
          <div
            style={{ marginLeft: `${level * 10}px` }}
            className="flex items-center gap-2"
          >
            {level > 0 && (
              <CornerUpRight className="text-muted-foreground size-4" />
            )}
            {isRoot && childCount > 0 && (
              <Hash className="text-muted-foreground size-4" />
            )}
            <span className={`${isRoot ? "font-semibold" : ""}`}>
              {row.original.latitude}, {row.original.longitude}
            </span>
          </div>
        </div>
      );
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
      const level = (row.original as TrailedPing).level;
      const childCount = (row.original as TrailedPing).childCount || 0;

      if (level === 0) {
        return (
          <div className="text-sm">
            <div className="font-bold">Original Ping</div>
            {childCount > 0 && (
              <div className="text-muted-foreground">Trail started</div>
            )}
          </div>
        );
      } else {
        return (
          <div className="text-sm">
            <div className="text-muted-foreground flex items-center gap-1">
              {row.original.parent_ping_id?.slice(0, 8)}{" "}
              <ArrowRight className="size-2" />
              {row.original.parent_ping_id ? "Ping Response" : "Original Ping"}
            </div>
          </div>
        );
      }
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
