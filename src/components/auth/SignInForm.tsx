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
import { signInSchema } from "@/lib/zodSchemas";
import { signInUser } from "@/server/actions/signIn";

const SignInForm = () => {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setError(null);

    const res = await signInUser({
      email: data.email.toLowerCase(),
      password: data.password,
    });

    if (!res?.success) {
      setError(res?.message || "Something went wrong");
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            {error && <FormError error={error} />}

            <SubmitButton
              text="Sign in"
              className="w-full"
              size="lg"
              isLoading={form.formState.isSubmitting}
            />
          </form>
        </Form>

        <p className="text-muted-foreground mt-4 text-center text-xs">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-primary underline-offset-3 transition duration-300 ease-in-out hover:underline"
          >
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
