import type { Metadata } from "next";
import "../styles/globals.css";
import { ClientProviders } from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "Guardian | On-Chain Trust Protocol",
  description: "High-end on-chain trust scoring dashboard for Solana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Gunakan class 'dark' secara manual tanpa variabel font
    <html lang="en" className="dark h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@covalenthq/goldrush-kit@latest/dist/styles.css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}