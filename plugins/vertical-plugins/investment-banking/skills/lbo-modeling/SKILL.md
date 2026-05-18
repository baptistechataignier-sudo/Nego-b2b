---
name: lbo-modeling
description: Use when you need to build or analyze a leveraged buyout (LBO) model — including debt sizing, returns analysis (IRR and MoM), debt paydown waterfall, and sensitivity analysis. Covers the full LBO model construction process from entry assumptions through exit.
---

# LBO Modeling

## Overview

A leveraged buyout (LBO) model evaluates whether a private equity firm can acquire a company using significant debt, operate and grow it, and exit at a return that meets the fund's hurdle rate (typically 20%+ IRR / 2.0-3.0x MoM). The model has three core components: (1) the sources and uses of funds at entry, (2) the operating model through the hold period, and (3) the exit and returns analysis.

## Step 1: Entry Assumptions

### Purchase Price
- **Entry EV/EBITDA multiple** — The primary valuation metric in PE. Agree on the LTM EBITDA base and the entry multiple. Entry EV = Entry Multiple × LTM EBITDA.
- **Adjustments to EBITDA** — PE sponsors run "adjusted EBITDA" that adds back one-time items, non-recurring expenses, and run-rate cost synergies. Document every add-back and scrutinize it.
- **Transaction fees** — Financing fees (1-3% of debt), M&A advisory fees (1-2% of EV), and legal/accounting fees. These are uses of proceeds and reduce equity returns.

### Sources and Uses Table

| Uses | $ | Sources | $ |
|------|---|---------|---|
| Purchase equity | XX | Term Loan B | XX |
| Repay existing debt | XX | Second lien / Mezz | XX |
| Transaction fees | XX | Seller note | XX |
| Financing fees | XX | Sponsor equity | XX |
| **Total Uses** | **XX** | **Total Sources** | **XX** |

Sources must equal Uses. Equity check = Total Uses − Total Debt. Equity as % of EV is the key leverage metric.

**Typical leverage in current market:** 4.0-6.0x Net Debt/EBITDA depending on sector and credit quality. Less than 4.0x is conservative; above 6.0x requires strong cash generation and lender conviction.

## Step 2: Operating Model

Build a 5-year (sometimes 7-year) operating model from the target's historical financials:

### Revenue Projection
- Use a driver-based approach, not a single growth rate
- Identify revenue streams: recurring (subscription, maintenance) vs. non-recurring (project, product)
- Recurring revenue commands higher multiples and more debt; model it separately

### EBITDA Projection
- Model gross profit and each OpEx line separately
- Identify cost improvement opportunities (management initiatives, sponsor-driven efficiencies)
- Do not project margin improvement without identifying specific actions that drive it
- Build "sponsor case" (with value creation initiatives) vs. "base case" separately

### Interest Expense
- Model as: Beginning debt balance × applicable interest rate
- For floating rate debt, assume a base rate (use current SOFR + applicable spread)
- Add amortization of financing fees (non-cash but tax deductible)

### Debt Schedule (Cash Flow Sweep)
The debt paydown is the mechanical core of the LBO model:

1. **Mandatory amortization** — TLB typically requires 1% annual amortization of original principal
2. **Excess cash flow sweep** — Lenders receive 50-75% of excess cash flow above a floor until leverage target is met (ECF = EBITDA − Interest − Taxes − Capex − Mandatory Amortization − ΔWorking Capital)
3. **Revolver draw/paydown** — Model separately; revolving credit facility provides liquidity buffer

**Debt paydown waterfall (priority order):**
1. Revolver repayment (if drawn)
2. Term Loan mandatory amortization
3. Excess cash flow sweep → TLB
4. Any remaining cash to balance sheet

## Step 3: Returns Analysis

### Exit Assumptions
- **Exit year** — Most PE models assume a 3-7 year hold; 5 years is conventional
- **Exit multiple** — Model at same as entry (no multiple expansion), at a discount, and at a premium. Key sensitivity variable.
- **Exit EBITDA** — Year 5 EBITDA from the operating model
- **Exit EV** = Exit Multiple × Exit EBITDA

### Bridge to Equity Value at Exit

```
Exit Enterprise Value
- Exit Net Debt (Beginning net debt − debt paydown + any remaining cash)
= Exit Equity Value
- Management equity / option pool (typically 10-20% of equity in PE-backed cos)
= Sponsor equity proceeds
```

### Returns Calculation

**IRR (Internal Rate of Return):**
- Entry: Cash out (equity invested) at Year 0 as negative
- Exit: Sponsor equity proceeds at exit year as positive
- Solve for the discount rate that makes NPV = 0
- PE hurdle rate: typically 20% gross IRR

**Multiple of Money (MoM / MOIC):**
- MoM = Total proceeds ÷ Equity invested
- Strong PE deal: 2.5x-3.5x MoM in 5 years; equivalent to ~20-25% IRR

### Returns Attribution
Decompose the equity return into its drivers:
1. **EBITDA growth** — How much of the gain comes from growing the business?
2. **Multiple expansion/compression** — How much comes from buying cheap and selling dear?
3. **Debt paydown (deleveraging)** — How much equity was created by paying down debt?
4. **Dividends / distributions** — Any recapitalization dividends received during hold?

Formula: Equity Value gain = EBITDA growth contribution + Multiple expansion contribution + Leverage paydown contribution

## Step 4: Sensitivity Analysis

Build a 2D sensitivity table for both IRR and MoM:

**Primary sensitivities:**
- Entry multiple × Exit multiple (most important)
- Revenue growth × EBITDA margin
- Entry multiple × Revenue CAGR

**Stress test:** What entry multiple can you pay and still hit 20% IRR at your base case exit assumptions? This is the "max price" the sponsor can pay.

## Step 5: Credit Statistics

Lenders evaluate the credit, not the equity story. Include:

| Metric | At Entry | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|--------|----------|--------|--------|--------|--------|--------|
| Net Debt / EBITDA | | | | | | |
| EBITDA / Interest Expense | | | | | | |
| FCF / Total Debt Service | | | | | | |
| Revolver utilization | | | | | | |

Flag any year where:
- Leverage exceeds 6.0x (credit concern)
- Interest coverage falls below 2.0x (stress scenario risk)
- FCF is insufficient to cover mandatory amortization

## Common LBO Model Errors to Avoid

- **Circular reference without iteration** — Interest expense depends on debt balance, which depends on cash sweep, which depends on FCF, which includes interest. Enable iterative calculation or use a placeholder.
- **Double-counting cash** — Cash on the balance sheet is already in enterprise-to-equity bridge; do not add it twice.
- **Ignoring financing fee amortization** — Financing fees are capitalized and amortized; the cash is gone at close but the deduction flows through the income statement.
- **Static EBITDA multiple on levered business** — EBITDA multiple is applied to Enterprise Value, which is capital structure neutral. Don't mix up EV and equity value in the multiple.
- **Working capital improvements not modeled** — PE firms often extract working capital improvements in Year 1; this is real cash that improves returns.
