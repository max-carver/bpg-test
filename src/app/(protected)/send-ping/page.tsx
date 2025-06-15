"use client";

import { useCallback, useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import GlobalRecentPingForm from "@/components/GlobalRecentPingForm";
import NewPingForm from "@/components/NewPingForm";
import UserRecentPingForm from "@/components/UserRecentPingForm";
import type { Ping, ResponseData } from "@/lib/types";

const SendPingPage = () => {
  const [recentPings, setRecentPings] = useState<Ping[]>([]);
  const [recentPingsLoading, setRecentPingsLoading] = useState(false);
  const { data: session } = useSession();

  const fetchRecentPings = useCallback(async () => {
    setRecentPingsLoading(true);
    try {
      const response = await fetch("/api/pings", { method: "GET" });
      const responseData = (await response.json()) as ResponseData;

      setRecentPings(responseData.data as unknown as Ping[]);
    } catch (error) {
      console.error(error);
    } finally {
      setRecentPingsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchRecentPings();
  }, [fetchRecentPings]);

  useEffect(() => {
    const handleNewPing = () => {
      void fetchRecentPings();
    };

    window.addEventListener("newPingCreated", handleNewPing);

    return () => {
      window.removeEventListener("newPingCreated", handleNewPing);
    };
  }, [fetchRecentPings]);

  return (
    <div className="page-height flex w-full items-center justify-center gap-4">
      <NewPingForm />
      <UserRecentPingForm
        recentPings={recentPings.filter(
          (ping) => ping.user_id === session?.user.id,
        )}
        recentPingsLoading={recentPingsLoading}
        fetchRecentPings={fetchRecentPings}
      />
      <GlobalRecentPingForm
        recentPings={recentPings}
        recentPingsLoading={recentPingsLoading}
        fetchRecentPings={fetchRecentPings}
      />
    </div>
  );
};

export default SendPingPage;
