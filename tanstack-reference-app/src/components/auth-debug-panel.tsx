/**
 * @file auth-debug-panel.tsx
 * @description A small Client Component that shows the Zustand auth store state.
 *
 * WHY THIS EXISTS:
 * The Zustand store is invisible to developers unless you render its state.
 * This panel makes the auth store's token visible, and lets you clear/restore
 * it to see how the Axios interceptor behaves without a token.
 *
 * This is a standalone "use client" island inside the Server Component page.
 * It's the minimal "surface area" we expose to the browser — everything
 * outside this component remains a Server Component.
 */

"use client";

import { useAuthStore } from "@/store/use-auth-store";
import { Button } from "@/components/ui/button";

export function AuthDebugPanel() {
  const { token, setToken, clearToken } = useAuthStore();

  return (
    <div className="rounded-lg border border-dashed bg-muted/40 px-4 py-3 text-sm space-y-2">
      <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
        🔐 Zustand Auth Store — Debug View
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-xs break-all">
          <span className="text-muted-foreground">token: </span>
          {token ? (
            <span className="text-green-600 dark:text-green-400">{token}</span>
          ) : (
            <span className="text-destructive">null (no auth header sent)</span>
          )}
        </span>

        <div className="flex gap-2 ml-auto shrink-0">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setToken("dummy-jwt-token-abc123xyz")}
            disabled={!!token}
            id="auth-set-token"
          >
            Set Token
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={clearToken}
            disabled={!token}
            id="auth-clear-token"
          >
            Clear Token
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        The Axios interceptor reads this token via{" "}
        <code className="font-mono">useAuthStore.getState().token</code> on
        every request. Toggle it to see the Authorization header change in
        DevTools → Network tab.
      </p>
    </div>
  );
}
