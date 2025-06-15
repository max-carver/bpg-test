"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

import { AppSidebar } from "@/app/(protected)/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { formatPathname } from "@/lib/utils";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();



  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full px-4">
          <div className="flex w-full items-center gap-2 p-2">
            <SidebarTrigger />
            <h1 className="text-xl font-bold">{formatPathname(pathname)}</h1>
          </div>
          <Separator />
          <section className="p-2">{children}</section>
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default ProtectedLayout;
