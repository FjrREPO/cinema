import type { Metadata } from "next";
import "./globals.css";
import CustomScrollbar from "@/components/element/CustomScrollbar";

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
        {children}
      </body>
    </html>
  );
}
