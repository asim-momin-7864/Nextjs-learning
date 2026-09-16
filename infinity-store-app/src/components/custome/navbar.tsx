"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, User, Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";
import Container from "../ui/container";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/store/use-auth-store";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { user, token } = useAuthStore();
  const isLoggedIn = !!token;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer the state update to avoid synchronous cascading render warnings
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full py-4">
      <Container as="nav" variant="default">
        {/* Premium pill-shaped glassmorphism navbar with contrast */}
        <nav className="flex items-center justify-between rounded-full border border-border/60 bg-primary/5 px-6 py-2.5 backdrop-blur-md">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-8 w-8 overflow-hidden rounded-md">
                <Image
                  src="/logo.png"
                  alt="Infinity Store Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                Infinity Store
              </span>
            </Link>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full hover:bg-primary/20 hover:text-primary"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {mounted ? (
              isLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary/20 hover:text-primary"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="sr-only">Cart</span>
                  </Button>

                  <Link
                    href="/profile"
                    className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-border/50 hover:border-primary transition-colors cursor-pointer"
                  >
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={`${user?.firstName || "User"}'s profile`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-secondary text-secondary-foreground">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                  </Link>
                </>
              ) : (
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="rounded-full border-border/50 bg-primary/50 px-6 hover:bg-primary/60 shadow-none"
                  >
                    Login
                  </Button>
                </Link>
              )
            ) : (
              // Placeholder during SSR to prevent hydration jumps
              <div className="h-10 w-[72px]" />
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
