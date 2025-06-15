"use client";

import { useCallback, useEffect, useState } from "react";

import { Loader2 } from "lucide-react";
import type { User } from "next-auth";

import { userColumns } from "@/app/(protected)/admin/userColumns";
import AddUserForm from "@/components/AddUserForm";
import { Table } from "@/components/Table";
import type { ResponseData } from "@/lib/types";

const UserDisplay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const fetchusers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/users", { method: "GET" });
      const responseData = (await response.json()) as ResponseData;
      setUsers(responseData.data as unknown as User[]);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  useEffect(() => {
    void fetchusers();
  }, [fetchusers]);

  useEffect(() => {
    const handleUpdatedUsers = () => {
      void fetchusers();
    };

    window.addEventListener("userUpdated", handleUpdatedUsers);
    window.addEventListener("userAdded", handleUpdatedUsers);

    return () => {
      window.removeEventListener("userUpdated", handleUpdatedUsers);
      window.removeEventListener("userAdded", handleUpdatedUsers);
    };
  }, [fetchusers]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <h2 className="font-semibold">Users</h2>
        <AddUserForm />
      </div>

      {isLoading ? (
        <div className="flex h-24 items-center justify-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      ) : (
        <>
          <Table columns={userColumns} data={users} />
          <span className="text-muted-foreground text-sm">
            {users.length} {users.length === 1 ? "user" : "users"}
          </span>
        </>
      )}
    </div>
  );
};

export default UserDisplay;
