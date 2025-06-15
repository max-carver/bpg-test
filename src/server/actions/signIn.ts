"use server";

import { AuthError } from "next-auth";
import type * as z from "zod";

import { signInSchema } from "@/lib/zodSchemas";
import { signIn } from "@/server/auth";

export const signInUser = async (data: z.infer<typeof signInSchema>) => {
  const validatedFields = signInSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: "Invalid request body",
      success: false,
      status: 400,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });

    return {
      message: "Sign in successful",
      success: true,
      status: 200,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
            success: false,
            status: 401,
          };
        default:
          return {
            message: "Something went wrong",
            success: false,
            status: 500,
          };
      }
    }

    throw error;
  }
};
