import React from "react";
import { cn } from "@/lib/utils";

/*
 * ============================================================
 * Container — Production-Level Responsive Layout Wrapper
 * ============================================================
 *
 * A single, reusable container component that handles:
 *  ✅ Responsive horizontal padding (mobile-first, iPhone SE → ultra-wide)
 *  ✅ Auto centering with mx-auto
 *  ✅ Max-width capping (prevents content from stretching on 4K screens)
 *  ✅ Variants for different use cases (default, narrow, wide, full)
 *  ✅ "as" prop for semantic HTML (nav, section, header, footer, etc.)
 *
 * Usage:
 *   <Container>                       → Standard page content
 *   <Container variant="narrow">      → Blog posts, forms, auth pages
 *   <Container variant="wide">        → Dashboards, wide tables
 *   <Container variant="full">        → Full-width (edge-to-edge) with padding
 *   <Container as="section">          → Renders as <section> instead of <div>
 *
 * Nav/Footer: Use the SAME Container inside your header/footer.
 *   The outer header/footer handles bg color (edge-to-edge),
 *   the inner Container constrains and pads the content.
 *
 *   <header className="bg-card border-b border-border">
 *     <Container as="nav">  ← constrains nav content
 *       ...
 *     </Container>
 *   </header>
 *
 * ============================================================
 */

// Responsive padding scale (mobile-first):
//   px-4    → 16px  (320px+  iPhone SE, small phones)
//   sm:px-6 → 24px  (640px+  large phones / small tablets)
//   lg:px-8 → 32px  (1024px+ tablets / laptops)
//   xl:px-12→ 48px  (1280px+ desktops) — extra breathing room

const PADDING = "px-4 sm:px-6 lg:px-8 xl:px-12";

// Max-width variants
const variants = {
  /** Default — ideal for most page content (1280px max) */
  default: "max-w-7xl",
  /** Narrow — ideal for blog posts, forms, auth pages (768px max) */
  narrow: "max-w-3xl",
  /** Wide — ideal for dashboards, data tables (1536px max) */
  wide: "max-w-[96rem]",
  /** Full — no max-width cap, still has side padding */
  full: "max-w-full",
} as const;

type Variant = keyof typeof variants;

type ContainerProps<T extends React.ElementType = "div"> = {
  /** The HTML element to render. Defaults to "div". */
  as?: T;
  /** Width variant. Defaults to "default" (max-w-7xl / 1280px). */
  variant?: Variant;
  /** Additional class names */
  className?: string;
  /** Child elements */
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
      className={cn(
        // Core: center + responsive padding
        "mx-auto w-full",
        PADDING,
        // Max-width from variant
        variants[variant],
        // Consumer overrides
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

export { Container, type ContainerProps, type Variant };
export default Container;
