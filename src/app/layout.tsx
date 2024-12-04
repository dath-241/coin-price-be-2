import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import PrivateNavbar from "../layouts/Navbar";

export const metadata: Metadata = {
  title: "Coin price - Admin",
  description: "A web to view cryptocurrency prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster closeButton position="top-center" richColors />
        <PrivateNavbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
