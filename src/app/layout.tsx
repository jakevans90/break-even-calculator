import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { GoogleAnalytics } from "@/components/google-analytics";
import { RelatedTools } from "@/components/related-tools";
import "./globals.css";

export const metadata: Metadata = { metadataBase: new URL("https://break-even.jakegenerates.com"), title: "Break-Even Calculator | JakeGenerates", description: "Calculate the jobs, revenue, or billable hours needed to cover costs and reach a monthly profit goal.", robots: { index: true, follow: true } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><SiteHeader />{children}<RelatedTools /><SiteFooter /></body><GoogleAnalytics /></html>; }
