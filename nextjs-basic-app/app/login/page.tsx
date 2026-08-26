"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import Link from "next/link";

const initialState = {
  error: "",
  details: undefined,
};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="max-w-sm mx-auto my-12 p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">
        Login to your account
      </h2>

      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block text-sm mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {pending ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
