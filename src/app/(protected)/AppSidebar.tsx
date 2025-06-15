import { LayoutDashboard, Network, Radio, Shield } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import UserDropdown from "@/components/UserDropdown";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "All Pings",
      url: "/all-pings",
      icon: Network,
    },
    {
      title: "Send Ping",
      url: "/send-ping",
      icon: Radio,
    },
  ];

  if (session.user.role === "Admin") {
    items.push({
      title: "Admin Dashboard",
      url: "/admin",
      icon: Shield,
    });
  }

  const { user } = session;

  const isActive = (itemUrl: string) => {
    return pathname === itemUrl;
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex w-full items-center justify-center">
            <Image src="/bond.svg" alt="logo" width={64} height={64} />
            {/* <span>{`${user.firstName} ${user.lastName}`}</span> */}
          </SidebarGroupLabel>
          <Separator className="my-2" />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`animate ${isActive(item.url) ? "bg-primary text-primary-foreground pointer-events-none" : ""}`}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator className="my-2" />
      <SidebarFooter>
        <UserDropdown user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
