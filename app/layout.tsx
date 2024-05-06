import type { Metadata } from "next";
import "./globals.css";
import CustomScrollbar from "@/components/element/CustomScrollbar";
import Navbar from "@/components/element/Navbar";

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
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
