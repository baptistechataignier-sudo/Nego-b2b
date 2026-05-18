---
name: analyze
description: Run a structured financial analysis on provided data or a named company/ticker. Produces an integrated assessment covering financial performance, key ratios, trend analysis, and forward-looking commentary. Usage: /analyze [company or dataset] [--period YYYY or YYYY-YYYY] [--type performance|valuation|credit]
---

# /analyze Command

Runs a structured financial analysis. The analysis type and depth adapt to the data available and the `--type` flag.

## Usage

```
/analyze [subject] [options]
```

**Options:**
- `--period` — Fiscal year or range (e.g., `2023` or `2021-2023`). Defaults to most recent available.
- `--type` — Analysis focus: `performance` (operating metrics), `valuation` (EV/EBITDA, P/E, DCF), `credit` (leverage, coverage, liquidity). Defaults to `performance`.
- `--compare` — Ticker or company name to benchmark against.

## What This Command Does

### Step 1: Data Acquisition
- If a ticker is provided, pull income statement, balance sheet, and cash flow statement for the specified period from available data connectors.
- If a file or dataset is provided, ingest and validate the data using the data-connectors normalization checklist.
- If insufficient data is available, prompt the user for the missing inputs.

### Step 2: Financial Performance Analysis

**Revenue Analysis:**
- Year-over-year growth rates
- Revenue by segment (if available)
- Organic vs. acquisition-driven growth (if discernible)

**Margin Analysis:**
- Gross margin trend
- EBITDA margin trend
- Net income margin trend
- Operating leverage: is revenue growing faster than opex?

**Working Capital:**
- DSO, DIO, DPO trends — improving or deteriorating?
- Cash conversion cycle
- Flag any unusual changes (DSO spike may indicate collection issues)

### Step 3: Ratio Analysis

Compute and contextualize:

| Category | Ratios |
|----------|--------|
| Profitability | Gross margin, EBITDA margin, EBIT margin, Net margin, ROIC, ROE |
| Liquidity | Current ratio, Quick ratio, Cash ratio |
| Leverage | Net debt/EBITDA, Debt/Equity, Interest coverage (EBIT/Interest expense) |
| Efficiency | Asset turnover, Receivables turnover, Inventory turns |
| Valuation (if applicable) | EV/Revenue, EV/EBITDA, P/E, P/FCF, EV/EBIT |

For each ratio, note whether it is improving, deteriorating, or stable vs. prior periods.

### Step 4: Benchmarking (if `--compare` is used)
- Side-by-side comparison of key margins and ratios
- Identify where the subject company outperforms or underperforms the benchmark
- Contextualize differences (different business model, different stage, different geography)

### Step 5: Key Observations and Flags

Automatically surface:
- Any margin that has declined more than 200bps year-over-year
- Revenue growth deceleration of more than 10 percentage points
- Net debt/EBITDA above 4.0x (leverage flag)
- Free cash flow negative despite positive EBITDA (working capital or capex concern)
- ROIC below WACC (value destruction)

### Step 6: Output Structure

```
## Financial Analysis: [Subject] — [Period]

### Executive Summary
[3-5 bullets: most important findings]

### Revenue and Growth
[Table + commentary]

### Profitability
[Margin table by year + commentary on drivers]

### Balance Sheet and Liquidity
[Key balance sheet metrics + liquidity ratios]

### Cash Flow
[FCF generation, capex intensity, cash conversion]

### Key Ratios Summary
[Full ratio table]

### Flags and Concerns
[Any automated flags triggered]

### Data Sources and Notes
[Source systems, data currency, assumptions]
```

## Example

```
/analyze MSFT --period 2021-2023 --type performance --compare GOOGL
```

Produces a 3-year performance analysis of Microsoft benchmarked against Alphabet, covering revenue growth, margin trends, and efficiency ratios with year-over-year commentary.
