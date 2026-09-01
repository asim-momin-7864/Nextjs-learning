import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";

// components
import Navbar from "@/components/Navbar";

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
      className={`h-full antialiased ${roboto.className} bg-green-400`}
    >
      <body className="min-h-full overflow-x-hidden flex flex-col bg-blue-900">
        <Navbar />
        <main className="grow w-full">{children}</main>
        {/* footer */}
      </body>
    </html>
  );
}
