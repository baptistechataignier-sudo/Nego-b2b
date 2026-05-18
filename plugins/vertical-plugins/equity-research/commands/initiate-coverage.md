---
name: initiate-coverage
description: Generate a structured equity research initiation report for a public company. Produces a full research note with investment thesis, financial model summary, valuation, price target, and rating. Usage: /initiate-coverage [ticker] [--rating BUY|HOLD|SELL] [--sector SECTOR] [--price-target PRICE]
---

# /initiate-coverage Command

Generates a sell-side equity research initiation-of-coverage report. This is a formal research publication that establishes the analyst's initial investment view, thesis, financial estimates, price target, and rating on a stock.

## Usage

```
/initiate-coverage [ticker] [options]
```

**Options:**
- `--rating` — Analyst rating: `BUY`, `HOLD`, or `SELL` (or `OUTPERFORM`, `NEUTRAL`, `UNDERPERFORM`)
- `--sector` — Industry sector for comp selection
- `--price-target` — Analyst's 12-month price target
- `--fiscal-year` — Company's fiscal year end (default: December)

## Report Structure

### Cover Page
- Company name, ticker, exchange, current price
- Rating (Buy / Hold / Sell with color coding)
- Price target and upside/downside percentage
- Report date, analyst name, firm name
- Sector, market cap, average daily volume
- Summary box: 3-5 bullet investment thesis

### Section 1: Investment Thesis

**Bulleted summary (5-7 points)** — The most important reasons to own (or avoid) the stock. Lead with the differentiated insight, not generic company description.

**Thesis structure:**
1. **The Core Opportunity** — What is the bull case in one sentence?
2. **Competitive Moat** — Why will this company sustain its position?
3. **Growth Catalyst** — What specific drivers will generate revenue and earnings growth over the next 2-3 years?
4. **Variant View** — What does the market underappreciate or mismodel? (This is the alpha-generating argument)
5. **Valuation Case** — How does the stock get to the price target?
6. **Risk to Thesis** — The top 2-3 risks that could invalidate the thesis (credibility requires acknowledging risks)

### Section 2: Company Overview

- Business description (2-3 paragraphs): what the company does, key products/services, end markets
- Revenue breakdown by segment, geography, and contract type
- Customer profile: who buys this product and why?
- Competitive landscape: who are the main competitors and how is the company differentiated?
- History and key milestones: when founded, major acquisitions, important product launches

### Section 3: Industry Analysis

- Market size and growth rate (TAM with methodology)
- Industry structure and competitive dynamics
- Key demand drivers (secular tailwinds supporting growth)
- Regulatory environment and any material regulatory risk
- Technology disruption risk: is there a plausible scenario where this industry is disrupted?

### Section 4: Competitive Positioning

- Porter's Five Forces analysis (brief — this is an appendix in most initiations, not the main body)
- Competitive moat assessment (see `fundamental-analysis` skill for framework)
- Market share trend: is the company gaining or losing share?
- Pricing power: has the company been able to raise prices? What do customer surveys / channel checks suggest?

### Section 5: Financial Analysis

**Historical financials table (3 years actual + 2 years estimates):**

| | FY2022A | FY2023A | FY2024A | FY2025E | FY2026E |
|---|---------|---------|---------|---------|---------|
| Revenue ($M) | | | | | |
| YoY growth | | | | | |
| Gross profit | | | | | |
| Gross margin | | | | | |
| EBITDA | | | | | |
| EBITDA margin | | | | | |
| EBIT | | | | | |
| Net income | | | | | |
| EPS (diluted) | | | | | |
| Free cash flow | | | | | |
| Net debt / EBITDA | | | | | |

**Key commentary:**
- Revenue growth drivers and assumptions
- Margin trajectory: why do margins expand (or contract)?
- FCF conversion: why does OCF differ from net income?
- Balance sheet: leverage, cash position, liquidity

### Section 6: Valuation

Produce the full valuation analysis using the `valuation` skill methodology:

1. **Comparable company analysis** — Peer table with multiples; where does the target trade vs. peers on key metrics?
2. **DCF analysis** — Key assumptions table, sensitivity analysis (WACC × terminal growth)
3. **Football field** — Visual (textual approximation) of implied value range across methodologies

**Price target derivation:**
- State the primary valuation method and the multiple/discount rate applied
- Show the bridge from implied EV → equity value → price per share
- Note if using a blended methodology and the weightings

### Section 7: Bull / Base / Bear Cases

| | Bear | Base | Bull |
|---|------|------|------|
| Scenario description | | | |
| Revenue CAGR (3-yr) | | | |
| EBITDA margin (exit yr) | | | |
| Exit EV/EBITDA | | | |
| Price target | | | |
| Probability | 25% | 50% | 25% |

### Section 8: Key Risks

List 5-8 material risks with:
- Risk description
- Why it matters (quantify the impact if possible)
- What would confirm the risk is materializing (early warning indicators)

Categories to cover: competitive risk, execution risk, regulatory risk, balance sheet risk, macro/cyclical risk, key person risk.

### Section 9: Management and Corporate Governance

- CEO, CFO, and key executives — backgrounds and relevant experience
- Board composition and independence
- Executive compensation structure — does pay align with shareholder value creation?
- Insider ownership — what percentage do management and the board own?
- Capital allocation history — track record of M&A, buybacks, dividends

### Section 10: Financial Statements (Appendix)

Full projected income statement, balance sheet, and cash flow statement for 5 years.

## Writing Standards

**For initiation reports:**
- The first paragraph must convey the entire investment thesis — a portfolio manager reading only the first paragraph should understand the recommendation
- Use specific numbers and dates, not vague language ("significant growth" → "23% revenue CAGR from FY2024-FY2027E")
- Distinguish clearly between historical facts and analyst estimates (use "E" suffix for estimates)
- Disclose assumptions: every key estimate should have a stated rationale
- Avoid conflicts of interest language: note investment banking relationships per compliance requirements

## Example

```
/initiate-coverage CRWD --rating BUY --sector cybersecurity --price-target 420
```

Generates a full initiation report on CrowdStrike (CRWD) with a Buy rating, $420 price target, covering cybersecurity industry dynamics, the Falcon platform's competitive position, financial estimates through FY2028, and a DCF + comps valuation analysis.
