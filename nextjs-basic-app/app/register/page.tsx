"use client";

import { useActionState } from "react";
import { register } from "@/app/actions/auth";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: any = {
  error: "",
  details: undefined,
};

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(register, initialState);

  return (
    <div className="max-w-sm mx-auto my-12 p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create an account</h2>

      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="block text-sm mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full border p-2 rounded"
          />
          {state?.details?.properties?.name?.errors && (
            <p className="text-red-500 text-xs mt-1">
              {state.details.properties.name.errors[0]}
            </p>
          )}
        </div>

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
          {state?.details?.properties?.email?.errors && (
            <p className="text-red-500 text-xs mt-1">
              {state.details.properties.email.errors[0]}
            </p>
          )}
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
          {state?.details?.properties?.password?.errors && (
            <p className="text-red-500 text-xs mt-1">
              {state.details.properties.password.errors[0]}
            </p>
          )}
        </div>

        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {pending ? "Registering..." : "Register"}
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
