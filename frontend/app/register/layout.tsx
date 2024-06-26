import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from '../theme-provider';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
    title: "Register || Expense Tracker",
    description: "Expense Tracker, by sudeepbogati7",
};

import { ResponseDataProvider } from "@/components/ResponseDataContext";
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
                <ThemeProvider attribute="class">
                    <ResponseDataProvider>
                        <main>{children}</main>
                    </ResponseDataProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}