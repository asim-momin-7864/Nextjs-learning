import React from "react";
import { cn } from "@/lib/utils";

const PADDING = "px-4 sm:px-6 lg:px-8 xl:px-12";

const variants = {
  default: "max-w-7xl",
  narrow: "max-w-3xl",
  wide: "max-w-[96rem]",
  full: "max-w-full",
} as const;

type Variant = keyof typeof variants;

type ContainerProps<T extends React.ElementType = "div"> = {
  as?: T;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

function Container<T extends React.ElementType = "div">({
  as,
  variant = "default",
  className,
  children,
  ...rest
}: ContainerProps<T>) {
  const Component = as || "div";

  return (
    <Component
      className={cn("mx-auto w-full", PADDING, variants[variant], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}

export { Container, type ContainerProps, type Variant };
export default Container;
