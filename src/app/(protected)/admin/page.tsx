"use client";

import AdminPingDisplay from "@/app/(protected)/admin/AdminPingDisplay";
import UserDisplay from "@/components/UserDisplay";
import { Separator } from "@/components/ui/separator";

const AdminPage = () => {
  return (
    <>
      <AdminPingDisplay />
      <Separator className="my-4" />
      <UserDisplay />
    </>
  );
};

export default AdminPage;
