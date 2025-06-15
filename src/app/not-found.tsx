"use client";

import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <Image
        src="/bond-gif.gif"
        alt="Bond 2"
        priority
        width={324}
        height={324}
        className="rounded-4xl"
      />
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-8xl font-bold">404</h1>
        <p className="text-4xl">Page not found</p>
        <Button onClick={() => router.back()}>
          <ArrowLeftIcon />
          Go back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
