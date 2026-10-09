import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
export const metadata: Metadata = { title: "Terms | Break-Even Calculator", description: "Terms for using the Break-Even Calculator.", alternates: { canonical: "/terms" } };
export default function Terms() { return <LegalPage title="Terms"><p>This calculator is for general informational use. Results depend on your inputs and are not accounting, tax, legal, or financial advice.</p><p>Verify costs, capacity, rounding, and business requirements before relying on a result. You are responsible for business and pricing decisions.</p><p>The tool is provided as-is without guarantees of availability, accuracy, or fitness for a particular purpose.</p></LegalPage>; }
