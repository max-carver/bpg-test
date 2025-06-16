"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import FormError from "@/components/FormError";
import SubmitButton from "@/components/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { ResponseData } from "@/lib/types";
import { signUpSchema } from "@/lib/zodSchemas";
import { signInUser } from "@/server/actions/signIn";

const SignUpForm = () => {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setError(null);

    const response = await fetch("/api/sign-up", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const responseData = (await response.json()) as ResponseData;

    if (!responseData.success) {
      setError(responseData.message);
      return;
    }

    await signInUser({
      email: data.email.toLowerCase(),
      password: data.password,
    });
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome</CardTitle>
        <CardDescription>Create an account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex w-full items-center justify-between gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ian" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Fleming" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input placeholder="i.fleming@example.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <FormError error={error} />}

            <SubmitButton
              text="Create account"
              className="w-full"
              size="lg"
              isLoading={form.formState.isSubmitting}
            />
          </form>
        </Form>

        <p className="text-muted-foreground mt-4 text-center text-xs">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-primary underline-offset-3 transition duration-300 ease-in-out hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
