"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Frown, Loader2, Network, Radio } from "lucide-react";

import NewPingForm from "@/components/NewPingForm";
import { Table } from "@/components/Table";
import { Button } from "@/components/ui/button";
import type { Ping, TrailedPing } from "@/lib/types";

interface PingDisplayProps {
  pings: Ping[] | TrailedPing[];
  isLoading: boolean;
  columns: Array<ColumnDef<Ping | TrailedPing>>;
  isDashboardPage?: boolean;
  isAdminPage?: boolean;
}

const PingDisplay = ({
  pings,
  isLoading,
  columns,
  isDashboardPage = false,
  isAdminPage = false,
}: PingDisplayProps) => {
  return isLoading ? (
    <div className="page-height flex items-center justify-center">
      <Loader2 className="size-16 animate-spin" />
    </div>
  ) : pings.length === 0 ? (
    <>
      {isDashboardPage && (
        <div className="flex items-center justify-between gap-3">
          <Button variant="outline">
            <Network className="size-4" />
            All Pings
          </Button>
          <Button>
            <Radio className="size-4" />
            Send Ping
          </Button>
        </div>
      )}
      {isAdminPage ? (
        <div className="page-height flex flex-col items-center justify-center">
          <h2 className="font-semibold">No pings found</h2>
        </div>
      ) : (
        <div className="page-height flex flex-col items-center justify-center">
          <Frown className="text-muted-foreground size-16" />
          <h2 className="text-2xl font-bold">You have no pings yet</h2>
          <p className="text-muted-foreground text-sm">
            Send a ping to get started.
          </p>
        </div>
      )}
    </>
  ) : (
    <>
      <div className="flex flex-col gap-2">
        {isDashboardPage && (
          <div className="flex items-center justify-between gap-3">
            <Button variant="outline">
              <Network className="size-4" />
              All Pings
            </Button>
            <Button>
              <Radio className="size-4" />
              Send Ping
            </Button>
          </div>
        )}
        {isDashboardPage && (
          <h2 className="font-semibold">Your Most Recent Pings</h2>
        )}
        {isAdminPage && (
          <div className="flex w-full items-center justify-between">
            <h2 className="font-semibold">Pings</h2>
            <NewPingForm />
          </div>
        )}
        <Table columns={columns} data={pings} />
        <span className="text-muted-foreground text-sm">
          {pings.length} {pings.length === 1 ? "ping" : "pings"}
        </span>
      </div>
    </>
  );
};

export default PingDisplay;
