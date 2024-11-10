import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coin price",
  description: "A web to view cry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
