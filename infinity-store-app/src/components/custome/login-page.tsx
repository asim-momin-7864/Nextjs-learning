// login page
"use client";

import React from "react";
import Link from "next/link";
import { Infinity } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Field, FieldError, FieldLabel } from "../ui/field";

// --------

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import type { UserInputType } from "@/lib/schemas/auth";
import { UserInputSchema } from "@/lib/schemas/auth";
import { useLogin } from "@/hooks/use-auth-hook";
import { Alert, AlertDescription } from "../ui/alert";

const LoginPage = () => {
  // router for navigation
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const [serverError, setServerError] = useState<string | null>(null);

  // initialize RHF with zod
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors, isSubmitting },
  } = useForm<UserInputType>({
    resolver: zodResolver(UserInputSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // on submit
  function onSubmit(values: UserInputType) {
    setServerError(null);

    login(values, {
      onSuccess: () => {
        // redirect to user profile
        router.push("/profile");
      },

      onError: (error) => {
        // extract backend error message if available

        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.message || "Invalid username and password.";
          setServerError(message);
        } else {
          setServerError("An unexpected error occured. Please try again.");
        }
      },
    });
  }

  return (
    <div className="flex min-h-[calc(100vh-140px)] w-full items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-[400px] border-border/40 bg-card/60 shadow-sm backdrop-blur-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Infinity className="h-6 w-6" />
          </div>
          <div className="space-y-1.5">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Welcome back
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to access your account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {/* // serever error log */}
          {/* Error banner for API-level failures */}
          {serverError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          {/* Form UI Container */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  {...register("username")}
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  className="bg-background/50 focus-visible:ring-2 focus-visible:ring-primary/30"
                />
                <FieldError>{errors.username?.message}</FieldError>
              </Field>

              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="#"
                    className="text-xs font-medium text-primary hover:underline hover:underline-offset-4"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-background/50 focus-visible:ring-2 focus-visible:ring-primary/30"
                />
                <FieldError>{errors.password?.message}</FieldError>
              </Field>

              <Button
                type="submit"
                disabled={isPending}
                className="mt-2 w-full"
              >
                {isPending ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
