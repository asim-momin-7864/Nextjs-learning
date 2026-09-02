import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";

// components
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

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
    <html lang="en" className={`h-full antialiased ${roboto.className}`}>
      <body className="min-h-full overflow-x-hidden flex flex-col bg-slate-950 text-gray-100">
        <Navbar />
        <main className="grow w-full lg:max-w-4xl xl:max-w-5xl m-auto flex flex-col gap-y-5 bg-slate-950">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
