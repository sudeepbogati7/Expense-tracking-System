
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from './theme-provider';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ResponseDataProvider } from "@/components/ResponseDataContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expense Tracker || HOME ",
  description: "Expense Tracker, by sudeepbogati7s",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-100 dark:bg-[#0d1117] `}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ResponseDataProvider >
            <main>{children}</main>
          </ResponseDataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}