"use client";

import { useCallback, useEffect, useState } from "react";

import { columns } from "@/app/(protected)/dashboard/columns";
import PingDisplay from "@/components/PingDisplay";
import type { Ping, ResponseData } from "@/lib/types";

const DashboardPage = () => {
  const [pings, setPings] = useState<Ping[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPings = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/pings/latest", { method: "GET" });
      const responseData = (await response.json()) as ResponseData;
      setPings(responseData.data as unknown as Ping[]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPings();
  }, [fetchPings]);

  return (
    <PingDisplay
      pings={pings}
      isLoading={isLoading}
      columns={columns}
      isDashboardPage={true}
    />
  );
};

export default DashboardPage;
