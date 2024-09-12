import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/header';

export const metadata: Metadata = {
  title: "BlockWatch - Mespeet",
  description: "ComputerCraft Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`antialiased items-center justify-items-center min-h-screen p-8 dark flex flex-col gap-8 bg-background text-card-foreground`}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
