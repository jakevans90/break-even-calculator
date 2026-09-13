import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = { title: "Break-Even Calculator | JakeGenerates", description: "Calculate the jobs, revenue, or billable hours needed to cover costs and reach a monthly profit goal.", robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><SiteHeader />{children}<SiteFooter /></body></html>; }
