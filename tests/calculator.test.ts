import assert from "node:assert/strict";
import test from "node:test";
import { calculateBreakEven, moneyToCents, type CalculatorForm } from "../src/lib/calculator.ts";
import { parseDraft, serializeDraft } from "../src/lib/draft.ts";

const form = (changes: Partial<CalculatorForm> = {}): CalculatorForm => ({ mode: "job", fixedOverhead: "10000", variableCost: "200", sellingPrice: "500", targetProfit: "5000", ...changes });

test("calculates contribution margin per job and percentage", () => { const r = calculateBreakEven(form()); assert.equal(r.contributionCents, 30000); assert.equal(r.contributionMarginPercent, 60); });
test("calculates raw and rounded-up break-even jobs", () => { const r = calculateBreakEven(form()); assert.ok(Math.abs((r.breakEvenUnits ?? 0) - 33.333333) < .00001); assert.equal(r.operationalBreakEvenUnits, 34); });
test("calculates break-even revenue", () => assert.equal(calculateBreakEven(form()).breakEvenRevenueCents, 1_666_667));
test("calculates target-profit jobs and revenue", () => { const r = calculateBreakEven(form()); assert.equal(r.targetUnits, 50); assert.equal(r.operationalTargetUnits, 50); assert.equal(r.targetRevenueCents, 2_500_000); });
test("calculates decimal billable-hours break-even", () => { const r = calculateBreakEven(form({ mode: "hours", fixedOverhead: "8000", variableCost: "35", sellingPrice: "125", targetProfit: "1000" })); assert.ok(Math.abs((r.breakEvenUnits ?? 0) - 88.888889) < .00001); assert.equal(r.operationalBreakEvenUnits, r.breakEvenUnits); assert.equal(r.breakEvenRevenueCents, 1_111_111); });
test("zero contribution margin is unreachable", () => { const r = calculateBreakEven(form({ variableCost: "100", sellingPrice: "100" })); assert.equal(r.status, "zero"); assert.equal(r.breakEvenUnits, null); });
test("negative contribution margin is unreachable", () => { const r = calculateBreakEven(form({ variableCost: "120", sellingPrice: "100" })); assert.equal(r.status, "negative"); assert.equal(r.targetRevenueCents, null); });
test("zero fixed overhead breaks even at zero units", () => { const r = calculateBreakEven(form({ fixedOverhead: "0" })); assert.equal(r.breakEvenUnits, 0); assert.equal(r.breakEvenRevenueCents, 0); });
test("zero target profit matches break-even", () => { const r = calculateBreakEven(form({ targetProfit: "0" })); assert.equal(r.targetUnits, r.breakEvenUnits); assert.equal(r.targetRevenueCents, r.breakEvenRevenueCents); });
test("decimal currency and rates are cent-safe", () => { assert.equal(moneyToCents("19.99"), 1999); const r = calculateBreakEven(form({ fixedOverhead: "100.01", variableCost: "10.25", sellingPrice: "20.75" })); assert.equal(r.contributionCents, 1050); assert.equal(r.breakEvenRevenueCents, 19764); });
test("large realistic values remain deterministic", () => { const r = calculateBreakEven(form({ fixedOverhead: "2500000", variableCost: "12500.25", sellingPrice: "18000.75", targetProfit: "1000000" })); assert.equal(r.contributionCents, 550050); assert.equal(r.operationalBreakEvenUnits, 455); });
test("zero selling price is handled without division errors", () => { const r = calculateBreakEven(form({ variableCost: "0", sellingPrice: "0" })); assert.equal(r.contributionMarginPercent, null); assert.equal(r.status, "zero"); });
test("draft serializes and restores", () => { const value = form({ mode: "hours", sellingPrice: "99.95" }); assert.deepEqual(parseDraft(serializeDraft(value))?.form, value); });
test("malformed and incompatible drafts fall back safely", () => { assert.equal(parseDraft("not json"), null); assert.equal(parseDraft('{"version":2}'), null); assert.equal(parseDraft('{"version":1,"savedAt":"bad","form":{}}'), null); });
