import type { CalculatorForm, CalculatorMode } from "./calculator.ts";

export const DRAFT_STORAGE_KEY = "break-even-calculator:draft:v1";
export type CalculatorDraft = { version: 1; savedAt: string; form: CalculatorForm };

export function serializeDraft(form: CalculatorForm): string { return JSON.stringify({ version: 1, savedAt: new Date().toISOString(), form } satisfies CalculatorDraft); }

export function parseDraft(raw: string): CalculatorDraft | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const draft = parsed as Record<string, unknown>;
    if (draft.version !== 1 || typeof draft.savedAt !== "string" || Number.isNaN(Date.parse(draft.savedAt))) return null;
    if (!draft.form || typeof draft.form !== "object" || Array.isArray(draft.form)) return null;
    const form = draft.form as Record<string, unknown>;
    if (!["job", "hours"].includes(form.mode as CalculatorMode)) return null;
    for (const key of ["fixedOverhead", "variableCost", "sellingPrice", "targetProfit"]) if (typeof form[key] !== "string" || form[key].length > 100) return null;
    return { version: 1, savedAt: draft.savedAt, form: form as CalculatorForm };
  } catch { return null; }
}
