import { EnvVarWarning } from "@/src/components/env-var-warning";
import { AuthButton } from "@/src/components/auth-button";
import { ThemeSwitcher } from "@/src/components/theme-switcher";
import { hasEnvVars } from "@/src/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>My Supabase App</Link>
            </div>
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              {!hasEnvVars ? (
                <EnvVarWarning />
              ) : (
                <Suspense>
                  <AuthButton />
                </Suspense>
              )}
            </div>
          </div>
        </nav>

        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5 w-full">
          <main className="flex-1 flex flex-col gap-6 px-4">
            <h1 className="text-3xl font-bold">Welcome to your app</h1>
            <p>Start building your UI here.</p>
          </main>
        </div>
      </div>
    </main>
  );
}
