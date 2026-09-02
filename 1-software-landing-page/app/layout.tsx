import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@/components/Navbar/ThemeProvider";

// components
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Software Landing Page",
  description: "Software Landing Page",
};

// font
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full antialiased ${roboto.className}`}
    >
      <body className="min-h-full overflow-x-hidden flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <Navbar />
          <main className="grow w-full lg:max-w-4xl xl:max-w-5xl  m-auto">
            {children}
          </main>
          {/* footer */}
        </ThemeProvider>
      </body>
    </html>
  );
}
