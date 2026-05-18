---
name: valuation
description: Use when you need to value a publicly traded company and derive a price target for an equity research report. Covers relative valuation (comparable companies, EV/EBITDA, P/E, EV/FCF), intrinsic valuation (DCF), and sum-of-the-parts analysis. Produces a price target with methodology and bull/base/bear case framework.
---

# Equity Valuation

## Overview

Equity research valuation produces a price target — the analyst's estimate of what a stock is worth over a 12-month investment horizon — and a rating (Buy/Hold/Sell or equivalent) based on the expected return from current price to price target. The price target is derived from multiple complementary methodologies, weighted by their applicability to the company's business model.

## Methodology Selection Guide

| Business Type | Primary Method | Secondary Method |
|---------------|----------------|------------------|
| Profitable, stable growth | EV/EBITDA comps + DCF | P/E comps |
| High-growth, pre-profitability | EV/Revenue comps + DCF (terminal year) | Rule of 40, GMV multiples |
| Highly capital-intensive | EV/EBITDA + DCF | P/BV, EV/EBITDA-Capex |
| Financial services | P/E, P/BV, P/TBV | Dividend discount model |
| Holding company / conglomerate | Sum-of-the-parts | NAV |
| Real estate | P/FFO, Cap rate NAV | DCF |

## Method 1: Comparable Company Analysis

### Step 1: Select Peer Group
- 8-15 public companies in the same sector with similar business models, size, and growth profiles
- Pure-play peers are preferred over diversified conglomerates
- If no pure-play peers exist, use the closest structural analogs and flag the limitation
- Note: use the peer group your target investor base will use, not the theoretically "correct" group

### Step 2: Calculate Key Multiples

For each comparable company, calculate:

**Enterprise Value Multiples** (capital structure neutral):
- EV/EBITDA (most common for non-financial companies)
- EV/EBIT (better for capex-intensive businesses)
- EV/Revenue (for pre-profit companies)
- EV/FCF

**Equity Value Multiples**:
- P/E (NTM consensus EPS)
- P/FCF
- P/BV (book value per share)

**Growth-adjusted multiples:**
- PEG ratio = P/E ÷ EPS growth rate (used for high-growth comps)
- EV/EBITDA ÷ EBITDA growth rate

### Step 3: Compute the Comparable Range

- Report mean, median, 25th percentile, and 75th percentile
- Exclude outliers with explanation (acquisition target causing bid-up, or distressed company)
- The "fair value" multiple for the target is typically median or a premium/discount to median depending on business quality relative to peers

### Step 4: Apply to Target

Implied EV = Selected Multiple × Target's Forward EBITDA (or Revenue, EBIT, etc.)
Implied Equity Value = Implied EV − Net Debt
Implied Price = Implied Equity Value ÷ Diluted Shares Outstanding

**Important:** Use fully diluted shares (basic + in-the-money options and warrants using the treasury stock method + convertible instruments).

## Method 2: DCF Analysis

### Construction (5 + Terminal Year)

**Phase 1: Near-term projection (Years 1-5)**
- Build from the income statement model
- Use bottom-up revenue drivers, not a single growth rate
- Model FCF = EBIT × (1 − tax rate) + D&A − Capex − Change in NWC

**Phase 2: Terminal value**
- **Gordon Growth Model:** TV = Year 5 FCF × (1 + g) ÷ (WACC − g)
  - g should not exceed long-term nominal GDP growth (2-3%). Using 5% terminal growth is a red flag.
- **Exit Multiple Method:** TV = Year 5 EBITDA × Exit Multiple
  - Use a multiple consistent with current peer trading multiples for a mature version of the business

**Phase 3: Discount and bridge**
- Discount each FCF and terminal value at WACC
- Terminal value % of total value should be in 60-80% range; >90% means the near-term model doesn't matter much and you're essentially doing a multiple valuation anyway
- Bridge from EV to equity value: subtract net debt, add cash, subtract minority interest (if any), add value of unconsolidated subsidiaries

### WACC Estimation

- **Risk-free rate:** Current 10-year Treasury yield (update this periodically — it changes)
- **Equity risk premium:** 5.0-5.5% for US equities (Damodaran updated annually)
- **Beta:** Use 2-year weekly or 5-year monthly regression beta against the relevant index. Unlever, re-lever to the company's target capital structure.
- **Cost of debt:** Pre-tax cost × (1 − marginal tax rate). Use current credit spreads, not historical.
- **Capital structure weights:** Use target capital structure (where the company is heading), not current (which may be temporarily elevated due to acquisition leverage)

## Method 3: Sum-of-the-Parts (SOTP)

Use when a company operates distinct business segments with different growth profiles and appropriate valuation multiples.

**Step 1:** Identify segments. Segment financials must be disclosed (in 10-K or annual report). Confirm segments are large enough to be meaningful.

**Step 2:** Apply the appropriate multiple to each segment. Match method to segment type:
- High-growth software segment → revenue multiple or high EV/EBITDA
- Mature industrial segment → lower EV/EBITDA or EV/EBIT
- Financial services segment → P/E or P/BV

**Step 3:** Sum the segment values, subtract corporate overhead at an appropriate multiple (or capitalize at 10x), subtract net debt.

**Step 4:** Conglomerate discount. SOTP typically implies a 10-20% premium to where a conglomerate trades. The market applies a discount for complexity, capital allocation risk, and information asymmetry. Incorporate this discount in your price target or note it explicitly.

## Price Target and Rating Framework

### Base / Bull / Bear Cases

Produce three scenarios:

| | Bear | Base | Bull |
|---|------|------|------|
| Revenue growth (3-yr CAGR) | | | |
| EBITDA margin (exit year) | | | |
| Exit multiple | | | |
| Implied price target | | | |
| Upside / downside from current | | | |
| Probability weight | 25% | 50% | 25% |
| **Probability-weighted target** | | **=** | |

### Rating Assignment

| Expected 12-month return | Rating |
|--------------------------|--------|
| > +15% | Buy / Outperform |
| -5% to +15% | Hold / Neutral |
| < -5% | Sell / Underperform |

(Adjust thresholds for house conventions and market beta of the stock.)

### Price Target Documentation

Every price target must include:
1. Primary methodology and weighting
2. Key assumptions (growth rate, margin, multiple, WACC)
3. Sensitivity: what would the price target be at ±1 turn of multiple or ±1% on growth?
4. Catalyst: what event in the next 12 months is expected to close the gap between current price and price target?

## Quality Checks

- [ ] Peer group multiples are from the same date (don't mix trailing and forward from different periods)
- [ ] DCF terminal growth rate ≤ long-term nominal GDP growth
- [ ] WACC is reasonable for the company's risk profile (typically 8-14% for US equities)
- [ ] Implied valuation cross-checks: do comps and DCF produce similar results? If not, explain why.
- [ ] Share count is fully diluted (options, warrants, convertibles)
- [ ] Net debt is current (use most recent balance sheet, not fiscal year end if quarters have passed)
