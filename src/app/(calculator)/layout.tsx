import type { Metadata } from "next";

const title = "Break-Even Calculator | JakeGenerates";
const description = "Calculate the jobs, revenue, or billable hours needed to cover costs and reach a monthly profit goal.";
const image = "https://www.jakegenerates.com/brand/jakegenerates-logo.png";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title, description, siteName: "JakeGenerates", images: [{ url: image, width: 2172, height: 724, alt: "JakeGenerates" }] },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

export default function CalculatorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
