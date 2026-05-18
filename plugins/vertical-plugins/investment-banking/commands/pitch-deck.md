---
name: pitch-deck
description: Generate a structured investment banking pitch deck outline and narrative for M&A sell-side, buy-side, or financing mandates. Produces a complete slide-by-slide deck with talking points, data tables, and key messages. Usage: /pitch-deck [mandate-type] [company-name] [--sector SECTOR] [--deal-size SIZE]
---

# /pitch-deck Command

Generates a professional investment banking pitch deck for sell-side M&A, buy-side M&A, or capital markets mandates. Output is organized as a slide-by-slide outline with suggested content, key messages, and banker talking points.

## Usage

```
/pitch-deck [mandate-type] [company] [options]
```

**Mandate types:**
- `sell-side` — Pitch to win a sell-side M&A advisory mandate (convince the company to hire your bank)
- `buy-side` — Pitch to win a buy-side M&A advisory mandate (help the company acquire a target)
- `ipo` — Pitch for an IPO or equity capital markets mandate
- `debt` — Pitch for a debt capital markets or leveraged finance mandate

**Options:**
- `--sector` — Industry sector (e.g., `software`, `healthcare`, `industrials`). Tailors comparable companies, precedent transactions, and market commentary.
- `--deal-size` — Estimated transaction size (e.g., `$500M`, `$2B`). Affects league table selection and deal team composition.
- `--target` — For buy-side mandates, a specific target company if relevant.

## Deck Structure by Mandate Type

### Sell-Side M&A Pitch

1. **Cover Page** — Bank name, client company, "Project [Codename]", date, "Strictly Confidential"

2. **Situation Overview** — 1-page summary of why now is the right time to consider a transaction. Market dynamics, company performance highlights, strategic context.

3. **Strategic Alternatives Analysis** — Frame the full range of options: remain independent, raise growth capital, strategic merger, full sale process. Banker recommendation with rationale.

4. **Valuation Summary** — Football field chart showing valuation range across methodologies:
   - 52-week trading range (for public companies)
   - Comparable public company analysis (EV/EBITDA, EV/Revenue, P/E)
   - Precedent transaction analysis (transaction multiples, premiums paid)
   - DCF analysis (WACC range × terminal multiple range)
   - LBO analysis (what a financial sponsor could pay at 20% IRR)

5. **Comparable Companies** — Table of 6-10 public peers with key financial metrics (Revenue, EBITDA, Growth, Margins) and trading multiples. Source: most recent filings + consensus estimates.

6. **Precedent Transactions** — Table of 8-15 recent comparable transactions with transaction value, EV/EBITDA at entry, premiums paid. Filter by sector, size, and recency (prefer last 3 years).

7. **Potential Buyer Universe** — Categorize by buyer type:
   - Strategic buyers: Large-cap players who might acquire for market share, product capability, or geographic expansion
   - Financial sponsors: PE firms with relevant sector focus and dry powder
   - SPAC/blank check (if applicable)
   For each buyer: rationale for interest, strategic fit, financial capacity.

8. **Proposed Process** — Timeline from mandate signing through close:
   - Preparation phase: data room, management presentation, teaser/CIM (4-6 weeks)
   - First round: process letter, IOI deadline (4 weeks)
   - Second round: management presentations, final bids (4-6 weeks)
   - Negotiation and signing (2-4 weeks)
   - Regulatory and close (30-90 days depending on jurisdiction)

9. **Bank Credentials** — Relevant transaction tombstones, league table position in sector, deal team bios. Lead with the most relevant deals, not the biggest deals.

10. **Fee Proposal** — Retainer (monthly), success fee (% of transaction value with minimum floor), expense reimbursement. Standard sell-side: 1-2% of deal value; higher for smaller deals.

### Buy-Side M&A Pitch

1. **Cover Page**
2. **Client Strategic Objectives** — What is the acquirer trying to achieve? Growth in adjacencies, vertical integration, talent acquisition, geographic expansion?
3. **Acquisition Criteria** — Size range, sector, geography, financial profile (growth vs. profitability)
4. **Target Universe** — Screened list of potential targets with financial profiles and acquisition rationale
5. **Priority Target Deep Dive** — For 1-3 priority targets: business overview, financial summary, synergy potential, valuation range, deal structure considerations
6. **Valuation and Financing** — Accretion/dilution analysis, financing capacity (credit ratings impact, leverage ratios), deal structures available
7. **Process and Timeline**
8. **Bank Credentials and Fees**

## Key Talking Points by Section

**When presenting valuation:**
- Lead with the football field — it shows the range of outcomes, not just one number
- The LBO floor is important for strategic buyers: it tells them what they're competing against
- Be explicit about the assumptions behind your DCF; investors have seen too many 40% discount rates

**When presenting the buyer universe:**
- Segment by strategic fit and financial capacity separately — a buyer can have high fit but limited capacity (integration constraints, leverage)
- Flag any buyers who would face regulatory scrutiny (antitrust, CFIUS)
- Rank by "likelihood to pay a premium" not just "strategic fit"

**When presenting process:**
- Controlled auction generates better price than bilateral negotiation in most cases
- Pre-emption risk: if one buyer is clearly advantaged (e.g., a competitor), acknowledge how to manage it
- Management presentation prep is underestimated; allocate sufficient time

## Output Format

For each slide, produce:
1. **Slide title** (as it would appear on the actual slide)
2. **Key message** (the one thing the client should remember from this slide — one sentence)
3. **Content** (bullets, data tables, or narrative as appropriate)
4. **Banker talking points** (what the banker says that is NOT on the slide — the color and context)
5. **Data needed** (what inputs are required to populate this slide fully)

## Example

```
/pitch-deck sell-side Acme Software --sector software --deal-size $800M
```

Generates a full sell-side M&A pitch deck for Acme Software, a software company, targeting approximately $800M transaction value — including software-sector comps, relevant PE sponsors, and a proposed dual-track process (sale + IPO optionality).
