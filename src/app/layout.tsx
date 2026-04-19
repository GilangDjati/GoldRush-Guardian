import type { Metadata } from "next";
import "../styles/globals.css";
// Pastikan ini tetap menggunakan kurung kurawal
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
    <html
      lang="en"
      className="dark h-full antialiased"
      style={{ colorScheme: 'dark' }} // Memastikan browser merender scrollbar dark mode
    >
      <head>
        {/* Bypass Node.js ESM Loader dengan memuat CSS via CDN */}
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