"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Radio } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";

import SubmitButton from "@/components/SubmitButton";
import { Form } from "@/components/ui/form";
import { generateRandomGPSCoordinates } from "@/lib/generateCoords";
import type { ResponseData } from "@/lib/types";
import { sendPingSchema } from "@/lib/zodSchemas";

const NewPingForm = ({ isAdminPage = false }: { isAdminPage?: boolean }) => {
  const form = useForm<z.infer<typeof sendPingSchema>>({
    resolver: zodResolver(sendPingSchema),
    defaultValues: {
      latitude: 0.0,
      longitude: 0.0,
      parentPingId: null,
      userId: null,
    },
  });

  const onSubmit = async () => {
    const coords = generateRandomGPSCoordinates();

    const pingData = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      parentPingId: null,
      userId: null,
    };

    const response = await fetch("/api/pings", {
      method: "POST",
      body: JSON.stringify(pingData),
    });

    const responseData = (await response.json()) as ResponseData;

    if (!responseData.success) {
      toast(responseData.message);
      return;
    }

    toast.success(responseData.message);

    window.dispatchEvent(new CustomEvent("newPingCreated"));
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SubmitButton
          size={isAdminPage ? "sm" : "xl"}
          icon={<Radio className={isAdminPage ? "size-4" : "size-6"} />}
          text="Send New Ping"
          isLoading={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
};

export default NewPingForm;
