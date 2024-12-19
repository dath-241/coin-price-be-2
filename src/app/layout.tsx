import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProviders } from "../provider/ThemeProvider";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coin price",
  description: "A web to view crypto price",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={roboto.className}>
        <ThemeProviders>
          <Toaster position="top-center" richColors closeButton />
          {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
