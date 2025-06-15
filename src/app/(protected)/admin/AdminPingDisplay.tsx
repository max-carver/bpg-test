"use client";

import { useCallback, useEffect, useState } from "react";

import { Loader2 } from "lucide-react";

import { pingColumns } from "@/app/(protected)/admin/pingColumns";
import NewPingForm from "@/components/NewPingForm";
import { Table } from "@/components/Table";
import type { Ping, ResponseData, TrailedPing } from "@/lib/types";

const AdminPingDisplay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [trailedPings, setTrailedPings] = useState<TrailedPing[]>([]);

  const buildTrail = useCallback(
    (ping: Ping, childPings: Ping[], level: number): TrailedPing[] => {
      const children = childPings.filter(
        (child) => child.parent_ping_id === ping.id,
      );
      const TrailedPing: TrailedPing = {
        ...ping,
        level,
        childCount: children.length,
      };

      const result: TrailedPing[] = [TrailedPing];

      children
        .sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        )
        .forEach((child, index) => {
          const childTrail = buildTrail(child, childPings, level + 1);
          if (index === children.length - 1 && childTrail.length > 0) {
            const lastChild = childTrail[childTrail.length - 1];
            if (lastChild) {
              lastChild.isLastInTrail = true;
            }
          }
          result.push(...childTrail);
        });

      return result;
    },
    [],
  );

  const organizeIntoTrails = useCallback(
    (pings: Ping[]): TrailedPing[] => {
      const rootPings: Ping[] = [];
      const childPings: Ping[] = [];

      pings.forEach((ping) => {
        if (!ping.parent_ping_id) {
          rootPings.push(ping);
        } else {
          childPings.push(ping);
        }
      });

      const result: TrailedPing[] = [];

      rootPings.forEach((rootPing) => {
        const Trail = buildTrail(rootPing, childPings, 0);
        result.push(...Trail);
      });

      return result.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    },
    [buildTrail],
  );

  const fetchPings = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/pings", { method: "GET" });
      const responseData = (await response.json()) as ResponseData;
      const pings = responseData.data as unknown as Ping[];
      setTrailedPings(organizeIntoTrails(pings));
    } finally {
      setIsLoading(false);
    }
  }, [organizeIntoTrails, setIsLoading]);

  useEffect(() => {
    void fetchPings();
  }, [fetchPings]);

  useEffect(() => {
    const handleNewPing = () => {
      void fetchPings();
    };

    window.addEventListener("newPingCreated", handleNewPing);

    return () => {
      window.removeEventListener("newPingCreated", handleNewPing);
    };
  }, [fetchPings]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <h2 className="font-semibold">Pings</h2>
        <NewPingForm />
      </div>
      {isLoading ? (
        <div className="flex h-24 items-center justify-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      ) : (
        <>
          <Table columns={pingColumns} data={trailedPings} />
          <span className="text-muted-foreground text-sm">
            {trailedPings.length} {trailedPings.length === 1 ? "ping" : "pings"}
          </span>
        </>
      )}
    </div>
  );
};

export default AdminPingDisplay;
