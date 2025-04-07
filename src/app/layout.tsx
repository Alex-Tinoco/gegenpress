import type { Metadata } from "next";
import "@/tailwind.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Gegenpress",
  description: "Booking pitches was never this easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-poppins" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
