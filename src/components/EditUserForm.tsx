"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "next-auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";

import FormError from "@/components/FormError";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { ResponseData } from "@/lib/types";
import { editUserSchema } from "@/lib/zodSchemas";

const EditUserForm = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      firstName: user.first_name ?? "",
      lastName: user.last_name ?? "",
      email: user.email ?? "",
      role: (user.role as "Admin" | "User") ?? "User",
    },
  });

  const onSubmit = async (data: z.infer<typeof editUserSchema>) => {
    const response = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    const responseData = (await response.json()) as ResponseData;
    if (!responseData.success) {
      setError(responseData.message);
      return;
    }

    toast.success(responseData.message);

    setIsOpen(false);

    window.dispatchEvent(new CustomEvent("userUpdated"));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {user.role === "Admin" ? (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            toast.error("You cannot edit an admin user");
          }}
        >
          Edit
        </Button>
      ) : (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
            Edit
          </Button>
        </DialogTrigger>
      )}
      <DialogContent
        className="sm:max-w-[568px]"
        aria-describedby="edit-user-dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Edit User</DialogTitle>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="User">User</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <FormError error={error} />}

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <SubmitButton
                text="Save changes"
                isLoading={form.formState.isSubmitting}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserForm;
