"use client";
import React from "react";
import Image from "next/image";
import { ShoppingCart, User, Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";
import Container from "../ui/container";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full py-4">
      <Container as="nav" variant="default">
        {/* Premium pill-shaped glassmorphism navbar with contrast */}
        <nav className="flex items-center justify-between rounded-full border border-border/60 bg-primary/5 px-6 py-2.5 backdrop-blur-md">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
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

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/20 hover:text-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Cart</span>
            </Button>

            <Button
              variant="outline"
              className="rounded-full border-border/50 bg-primary/50 px-6 hover:bg-primary/60 shadow-none"
            >
              Login
            </Button>

            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-none hover:bg-primary/20 hover:text-primary"
            >
              <User className="h-4 w-4" />
              <span className="sr-only">Profile</span>
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
