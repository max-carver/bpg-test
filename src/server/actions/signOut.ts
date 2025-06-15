"use server";

import { signOut as signOutAuth } from "@/server/auth";

export const signOut = async () => {
  await signOutAuth();
};
