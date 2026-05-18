---
name: financial-modeling
description: Use when you need to build, analyze, or stress-test financial models — including three-statement models, DCF valuations, scenario analysis, or sensitivity tables. This skill provides structured methodologies for constructing rigorous financial models from first principles.
---

# Financial Modeling

## Overview

Financial modeling is the process of building a quantitative representation of a company's financial performance — past, present, and projected. This skill covers the construction and analysis of integrated financial models used in investment decisions, corporate planning, and transaction analysis.

## Core Model Types

### Three-Statement Model

The foundation of all financial analysis. Links the income statement, balance sheet, and cash flow statement into a single integrated model.

**Step-by-step construction:**

1. **Populate historical financials** — Enter at least 3 years of historical IS, BS, and CF data. Label clearly as "Actual." Verify that BS balances and the CF statement reconciles net income to ending cash.

2. **Build the income statement projection**
   - Revenue: Use a driver-based approach (volume × price, or segment × growth rate). Never project a single "revenue growth %" without decomposing it.
   - COGS: Model as % of revenue or using a unit cost × volume approach
   - Operating expenses: Distinguish between fixed (headcount-driven) and variable (revenue-driven) costs
   - EBITDA, EBIT, EBT, Net Income — build each line

3. **Build the balance sheet projection**
   - Working capital: Model A/R as Days Sales Outstanding (DSO), Inventory as Days Inventory Outstanding (DIO), A/P as Days Payable Outstanding (DPO)
   - PP&E: Prior PP&E + Capex − Depreciation
   - Debt: Beginning balance + draws − repayments
   - Equity: Prior equity + net income − dividends

4. **Build the cash flow statement**
   - Start from net income
   - Add back non-cash charges (D&A, SBC)
   - Adjust for working capital changes (increase in A/R is a use of cash)
   - Add investing activities (Capex, acquisitions)
   - Add financing activities (debt draws/repayments, equity issuances)
   - Ending cash = Beginning cash + net cash flow; must match BS cash

5. **Check the model balances** — Assets must equal Liabilities + Equity in every projected period. If not, find the plug.

### DCF Valuation

**Step-by-step:**

1. **Project free cash flow** — Unlevered FCF = EBIT × (1 − tax rate) + D&A − Capex − Change in NWC. Project for 5-10 years.

2. **Determine the discount rate (WACC)**
   - Cost of equity: Use CAPM — Rf + β × (Rm − Rf). Use a 10-year Treasury for Rf, 5-6% equity risk premium for (Rm − Rf).
   - Cost of debt: Current marginal borrowing rate × (1 − tax rate)
   - Weight by market value of equity and book value of debt
   - WACC for most companies falls in the 8-14% range; flag outliers

3. **Calculate terminal value** — Use Exit Multiple Method (EV/EBITDA × terminal year EBITDA) or Gordon Growth Model (FCF × (1 + g) / (WACC − g)). Use both as a cross-check; they should be within 20% of each other.

4. **Discount cash flows** — Each period's FCF discounted at WACC^n. Terminal value discounted at WACC^(final year).

5. **Bridge to equity value** — Enterprise Value − Net Debt = Equity Value. Divide by shares outstanding for price per share.

6. **Build a sensitivity table** — WACC (x-axis) × terminal growth rate (y-axis) for Gordon Growth, or WACC × exit multiple. This is not optional.

### LBO Model

See the `lbo-modeling` skill in the investment-banking plugin.

## Key Modeling Conventions

- **Label every assumption** — No hardcoded numbers in formula cells. Every assumption belongs in a clearly labeled inputs section.
- **Consistent sign conventions** — Expenses shown as negatives on the IS; use a single convention and document it.
- **Color coding** — Hard-coded inputs in blue; formulas in black; links from other sheets in green. (Standard Wall Street convention.)
- **Error checks** — Embed balance sheet check (Assets − Liabilities − Equity = 0), cash flow check, and debt schedule check.
- **Circular references** — Avoid where possible. If using a revolver that depends on ending cash (which depends on the revolver), use an iterative calculation flag.

## Scenario and Sensitivity Analysis

### Scenario Analysis
Build at minimum three cases: Base, Bull, and Bear. Key differences should be in revenue growth, margin assumptions, and capex intensity. Store all scenarios in a scenario manager tab; never duplicate the model.

### Sensitivity Analysis
For any output metric (IRR, equity value, EPS), identify the two most impactful drivers and build a 2D sensitivity table. Common pairs:
- Revenue growth × EBITDA margin
- Entry multiple × exit multiple (M&A)
- WACC × terminal growth rate (DCF)

## Quality Checks

Before finalizing any model:
- [ ] Balance sheet balances in every period
- [ ] Cash flow statement reconciles to balance sheet cash
- [ ] All assumptions are clearly labeled and sourced
- [ ] At least one sensitivity table exists
- [ ] Model has been "stressed" — set revenue to zero and confirm it doesn't break
- [ ] Historical period matches reported financials (spot-check 3 line items)
