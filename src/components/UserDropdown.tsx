"use client";

import { ChevronsUpDown, LogOut, Settings, User } from "lucide-react";
import type { User as UserType } from "next-auth";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { signOut } from "@/server/actions/signOut";

const UserDropdown = ({ user }: { user: UserType }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton size="lg" className="cursor-pointer">
          <span className="text-muted-foreground inline truncate text-xs">
            {user.email}
          </span>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[18rem] rounded-b-none shadow-none"
        align="center"
        side="top"
        sideOffset={16}
      >
        <DropdownMenuLabel>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <div className="flex w-full items-center justify-between gap-1">
              <span className="truncate font-medium">
                {user.first_name} {user.last_name}
              </span>
              <Badge className="text-xs" variant="secondary">
                {user.role}
              </Badge>
            </div>

            <span className="text-muted-foreground inline truncate text-xs">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center">
            <User />
            <Link href="/profile">Account</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center">
            <Settings />
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center"
          variant="destructive"
          onClick={async () => {
            await signOut();
          }}
        >
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
