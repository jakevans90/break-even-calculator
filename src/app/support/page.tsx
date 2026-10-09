import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
export const metadata: Metadata = { title: "Support | Break-Even Calculator", description: "Support information for the Break-Even Calculator.", alternates: { canonical: "/support" } };
export default function Support() { return <LegalPage title="Support"><p>For help or to report a problem, visit <a className="font-semibold text-blue-700 underline" href="https://www.jakegenerates.com/">JakeGenerates</a>.</p><p>Include your browser, device, calculator mode, and values needed to reproduce an issue. Avoid sharing sensitive business or customer information.</p></LegalPage>; }
