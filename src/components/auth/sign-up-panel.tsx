"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export function SignUpPanel() {
  const schema = z
    .object({
      email: z.string().email(),
      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters"),
      passwordMatch: z.string(),
    })
    .refine(
      (form) => form.password === form.passwordMatch,
      (form) => ({
        message: "Passowrds do not match",
        path: ["passwordMatch"],
      }),
    );

  type FormValues = Zod.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  function handleSignUp(data: FormValues) {
    signIn("credentials", {
      email: data.email,
      password: data.password,
      signUp: "true",
    });
  }

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to sign up for an account
        </p>
      </div>
      <div className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignUp)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div className="grid gap-2">
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="john.smith@example.com"
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <div className="grid gap-2">
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="passwordMatch"
              render={({ field }) => (
                <div className="grid gap-2">
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </Form>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => signIn("google")}
        >
          Sign up with Google
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
