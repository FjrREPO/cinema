import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomScrollbar from "@/components/element/CustomScrollbar";
import Navbar from "@/components/element/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cinema",
  description: "Cinemaa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
