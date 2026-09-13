export type CalculatorMode = "job" | "hours";
export type CalculatorForm = {
  mode: CalculatorMode;
  fixedOverhead: string;
  variableCost: string;
  sellingPrice: string;
  targetProfit: string;
};

export type BreakEvenResult = {
  contributionCents: number;
  contributionMarginPercent: number | null;
  status: "viable" | "zero" | "negative";
  breakEvenUnits: number | null;
  operationalBreakEvenUnits: number | null;
  breakEvenRevenueCents: number | null;
  targetUnits: number | null;
  operationalTargetUnits: number | null;
  targetRevenueCents: number | null;
};

export const EMPTY_FORM: CalculatorForm = { mode: "job", fixedOverhead: "", variableCost: "", sellingPrice: "", targetProfit: "" };
export const MAX_MONEY_DOLLARS = 999_999_999.99;

export function moneyToCents(value: string): number {
  const clean = value.trim();
  if (!/^\d+(?:\.\d{0,2})?$/.test(clean)) return 0;
  const [whole, fraction = ""] = clean.split(".");
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  return Number.isSafeInteger(cents) ? cents : 0;
}

export function calculateBreakEven(form: CalculatorForm): BreakEvenResult {
  const fixed = moneyToCents(form.fixedOverhead);
  const variable = moneyToCents(form.variableCost);
  const price = moneyToCents(form.sellingPrice);
  const target = moneyToCents(form.targetProfit);
  const contributionCents = price - variable;
  const status = contributionCents > 0 ? "viable" : contributionCents === 0 ? "zero" : "negative";
  const contributionMarginPercent = price === 0 ? null : contributionCents / price * 100;
  if (status !== "viable") return { contributionCents, contributionMarginPercent, status, breakEvenUnits: null, operationalBreakEvenUnits: null, breakEvenRevenueCents: null, targetUnits: null, operationalTargetUnits: null, targetRevenueCents: null };
  const breakEvenUnits = fixed / contributionCents;
  const targetUnits = (fixed + target) / contributionCents;
  return {
    contributionCents,
    contributionMarginPercent,
    status,
    breakEvenUnits,
    operationalBreakEvenUnits: form.mode === "job" ? Math.ceil(breakEvenUnits) : breakEvenUnits,
    breakEvenRevenueCents: Math.round(breakEvenUnits * price),
    targetUnits,
    operationalTargetUnits: form.mode === "job" ? Math.ceil(targetUnits) : targetUnits,
    targetRevenueCents: Math.round(targetUnits * price),
  };
}

export function validateForm(form: CalculatorForm): Record<"fixedOverhead" | "variableCost" | "sellingPrice" | "targetProfit", string | undefined> {
  const validate = (value: string) => value && (!/^\d+(?:\.\d{0,2})?$/.test(value) || Number(value) > MAX_MONEY_DOLLARS) ? `Enter $0 to $${MAX_MONEY_DOLLARS.toLocaleString("en-US")}, with up to two decimal places.` : undefined;
  return { fixedOverhead: validate(form.fixedOverhead), variableCost: validate(form.variableCost), sellingPrice: validate(form.sellingPrice), targetProfit: validate(form.targetProfit) };
}

export function formatMoney(cents: number): string { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100); }
export function formatPercent(value: number | null): string { return value === null || !Number.isFinite(value) ? "—" : `${value.toFixed(1)}%`; }
export function formatUnits(value: number | null, maximumFractionDigits = 2): string { return value === null || !Number.isFinite(value) ? "—" : value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits }); }
