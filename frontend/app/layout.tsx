'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import { ThemeProvider } from './theme-provider';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ResponseDataProvider } from "@/components/ResponseDataContext";
import { Suspense } from "react";
import Loading from "./loading";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Expense Tracker || HOME ",
//   description: "Expense Tracker, by sudeepbogati7s",
// };

import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title> X-pense Tracker </title>
      <Suspense fallback={<Loading />}>
        <body
          className={`${inter.className} bg-gray-100 dark:bg-[#0d1117]`}
        >
          <ThemeProvider attribute="class" >
            <ResponseDataProvider><main> {children} </main></ResponseDataProvider>
          </ThemeProvider>
        </body>
      </Suspense>
    </html>
  );
}