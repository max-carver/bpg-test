"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GitPullRequestCreateArrow } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";

import { Form } from "@/components/ui/form";
import { generateRandomGPSCoordinates } from "@/lib/generateCoords";
import type { Ping, ResponseData } from "@/lib/types";
import { sendPingSchema } from "@/lib/zodSchemas";

import SubmitButton from "./SubmitButton";

const UserRecentPingForm = ({
  recentPings,
  recentPingsLoading,
  fetchRecentPings,
}: {
  recentPings: Ping[];
  recentPingsLoading: boolean;
  fetchRecentPings: () => void;
}) => {
  const form = useForm<z.infer<typeof sendPingSchema>>({
    resolver: zodResolver(sendPingSchema),
    defaultValues: {
      latitude: 0.0,
      longitude: 0.0,
      parentPingId: null,
      userId: null,
    },
  });

  const mostRecentPing = recentPings[0];

  const onSubmit = async () => {
    const coords = generateRandomGPSCoordinates();

    if (!mostRecentPing) {
      toast.error("No recent pings");
      return;
    }

    const pingData = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      parentPingId: mostRecentPing.id,
      userId: null,
    };

    const response = await fetch(`/api/pings/${pingData.parentPingId}`, {
      method: "POST",
      body: JSON.stringify(pingData),
    });

    const responseData = (await response.json()) as ResponseData;

    if (!responseData.success) {
      toast.error(responseData.message);
      return;
    }
    toast.success(responseData.message);

    void fetchRecentPings();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SubmitButton
          size="xl"
          icon={<GitPullRequestCreateArrow className="size-6" />}
          variant="outline"
          text={
            recentPingsLoading
              ? "Loading recent pings..."
              : recentPings.length === 0
                ? "No recent pings"
                : "Respond to Your Recent Ping"
          }
          isLoading={form.formState.isSubmitting || recentPingsLoading}
          isDisabled={recentPings.length === 0 || recentPingsLoading}
        />
      </form>
    </Form>
  );
};

export default UserRecentPingForm;
