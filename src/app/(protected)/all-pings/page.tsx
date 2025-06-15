"use client";

import { useCallback, useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { columns } from "@/app/(protected)/all-pings/columns";
import PingDisplay from "@/components/PingDisplay";
import type { Ping, ResponseData, TrailedPing } from "@/lib/types";

const AllPingsPage = () => {
  const [trailedPings, setTrailedPings] = useState<TrailedPing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

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
      const pings = (responseData.data as unknown as Ping[]).filter(
        (ping) => ping.user_id === session?.user.id,
      );
      setTrailedPings(organizeIntoTrails(pings));
    } finally {
      setIsLoading(false);
    }
  }, [organizeIntoTrails, session?.user.id]);

  useEffect(() => {
    void fetchPings();
  }, [fetchPings]);

  return (
    <PingDisplay
      pings={trailedPings}
      isLoading={isLoading}
      columns={columns}
      isDashboardPage={false}
    />
  );
};

export default AllPingsPage;
