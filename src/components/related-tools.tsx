"use client";

import { usePathname } from "next/navigation";

const links = [
  { name: "Labor Rate Calculator", description: "Check whether your hourly rate covers the business.", url: "https://labor-rate.jakegenerates.com/" },
  { name: "Job Profit Calculator", description: "Compare the target with actual job performance.", url: "https://job-profit.jakegenerates.com/" },
  { name: "Browse tools by profession", description: "Find the pricing and document workflow for your trade.", url: "https://jakegenerates.com/#professions" },
] as const;

export function RelatedTools() {
  if (usePathname() !== "/") return null;

  return <section className="bg-slate-100 px-3 pb-8 sm:px-6 sm:pb-10" aria-labelledby="next-steps-heading">
    <div className="mx-auto max-w-7xl rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[.16em] text-blue-700">Keep moving</p>
      <h2 id="next-steps-heading" className="mt-1 text-xl font-bold text-slate-950">Next steps</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">These tools work independently. Your calculator entries are not transferred when you follow a link.</p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {links.map((link) => <a key={link.url} href={link.url} className="group rounded-xl border border-slate-200 p-4 outline-none transition hover:border-blue-300 hover:bg-blue-50/50 focus-visible:ring-4 focus-visible:ring-blue-100">
          <span className="font-semibold text-slate-950 group-hover:text-blue-800">{link.name} <span aria-hidden="true">→</span></span>
          <span className="mt-1 block text-sm leading-6 text-slate-600">{link.description}</span>
        </a>)}
      </div>
    </div>
  </section>;
}
