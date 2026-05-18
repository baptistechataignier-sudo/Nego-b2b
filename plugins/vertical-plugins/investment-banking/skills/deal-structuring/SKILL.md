---
name: deal-structuring
description: Use when you need to structure an M&A transaction, private equity buyout, or capital raise — including determining optimal deal form (asset vs. stock), consideration mix (cash/stock/earnout), financing structure, and tax and legal considerations. Provides step-by-step frameworks for evaluating and negotiating transaction structure.
---

# Deal Structuring

## Overview

Deal structuring determines how an M&A transaction is financed, how consideration is paid, what tax treatment applies, and how risk is allocated between buyer and seller. A well-structured deal achieves the buyer's return objectives while meeting the seller's valuation expectations and tax preferences. Poor structure can kill a deal that both parties want to do.

## Step 1: Define the Deal Parameters

Before structuring, establish:

1. **Transaction type** — Acquisition, merger, divestiture, carve-out, minority investment, or recapitalization
2. **Buyer type** — Strategic acquirer, financial sponsor (PE), or management buyout team
3. **Seller profile** — Founder-owned, PE-backed, public company subsidiary, or distressed seller
4. **Target business** — Asset-light services vs. capital-intensive; recurring revenue vs. project-based; regulated or not
5. **Size** — Enterprise value range drives what financing structures are available (sub-$50M vs. $500M+ have different markets)

## Step 2: Choose the Deal Form

### Asset Purchase vs. Stock Purchase

| | Asset Purchase | Stock Purchase |
|---|---|---|
| **Buyer preference** | Usually preferred | Less common |
| **Tax (buyer)** | Step-up in asset basis → higher depreciation | Carryover basis; no step-up |
| **Tax (seller — C-corp)** | Double taxation (entity + shareholder) | Single level of tax on gain |
| **Tax (seller — pass-through)** | Single level of tax | Single level of tax |
| **Liabilities** | Buyer selects which liabilities to assume | Buyer assumes all liabilities (known and unknown) |
| **Contracts** | Assignment/consent may be required | Contracts transfer automatically |
| **Complexity** | Higher (individual asset transfers) | Lower |

**When to use each:**
- Asset purchase: Target has significant known liabilities (litigation, environmental), customer concentration risk, or unknown contingencies. Buyer is a C-corp wanting depreciation step-up.
- Stock purchase: Target is a regulated entity (licenses don't transfer in asset deals), has valuable contracts with change-of-control restrictions, or seller demands for tax treatment.

### 338(h)(10) Election
For S-Corp targets, a 338(h)(10) election allows the buyer to get asset-purchase tax treatment (step-up) while the transaction is legally structured as a stock purchase. Requires seller consent. This is often the key negotiating point in deals involving S-Corps.

## Step 3: Structure the Consideration

### Cash vs. Stock vs. Earnout

**All-cash:** Simplest. Seller gets certainty; buyer assumes all execution risk. Used when buyer is PE (no public stock), seller needs liquidity, or parties cannot agree on price.

**Stock consideration:** Seller rolls equity into buyer. Used in strategic M&A when seller believes in the combined entity, or when buyer wants to preserve cash. Key issues: valuation of buyer's stock, registration rights, lockup periods, collar structures.

**Earnout:** Deferred consideration tied to future performance milestones. Bridges valuation gaps when seller has aggressive projections buyer doesn't fully credit.

**Earnout design — key decisions:**
1. **Metric** — Revenue earnouts are simpler (harder to manipulate) than EBITDA earnouts (easier for buyer to expense things). Prefer revenue or gross profit.
2. **Period** — 1-3 years. Longer periods increase litigation risk.
3. **Cap** — Maximum earnout payout; usually 20-40% of purchase price.
4. **Acceleration** — Specify that earnout accelerates if buyer sells or changes the business materially.
5. **Covenant protections** — Seller needs operating covenants: buyer must run the business in the ordinary course and not make changes that impair earnout achievement.

**Typical consideration mix by deal type:**
- PE buyout: 100% cash (buyer uses debt + equity)
- Strategic acquisition: 70-100% cash
- Merger of equals: 100% stock
- Founder-led company: 80% cash + 20% rollover equity (seller remains invested)

## Step 4: Structure the Financing (for PE/LBO)

See the `lbo-modeling` skill for detailed debt sizing. Key structural decisions:

### Debt Stack

| Instrument | Seniority | Typical Cost | Typical Size |
|------------|-----------|--------------|--------------|
| Revolving credit facility | Senior secured | SOFR + 200-350bps | 10-15% of EV |
| Term Loan B | Senior secured | SOFR + 300-500bps | 40-55% of EV |
| Second lien | Second lien | SOFR + 700-1000bps | 5-10% of EV |
| Mezzanine / PIK | Subordinated | 12-16% (cash + PIK) | 5-10% of EV |
| Seller note | Subordinated | 5-8% | 5-15% of EV |
| Sponsor equity | Equity | Target IRR 20%+ | 30-50% of EV |

### Covenant Considerations
- Maintenance covenants (tested quarterly): Max leverage, min interest coverage. Preferred by lenders; negotiated out by sponsors where possible.
- Incurrence covenants (tested only when action is taken): More borrower-friendly; standard in leveraged loan market post-2010.

## Step 5: Risk Allocation

### Representations and Warranties
Seller makes representations about the business (financials, tax, litigation, IP, employees). Buyer's recourse for breaches:
- **Escrow:** 5-15% of purchase price held for 12-24 months
- **Indemnification caps:** Typically 10-25% of purchase price
- **R&W Insurance:** Rep & warranty insurance has become standard in PE deals > $50M. Shifts risk to insurer; allows seller to distribute proceeds at close.

### MAC Clause (Material Adverse Change)
Gives buyer the right to walk away if a material adverse change occurs between signing and closing. Heavily negotiated. Key issues:
- What qualifies as a MAC? (Avoid seller-favorable carve-outs for industry-wide downturns, pandemics, regulatory changes)
- Litigation risk of invocation is high — courts rarely find a MAC

### Purchase Price Adjustments
- **Working capital adjustment:** Compare actual closing working capital to a target (negotiated peg). Dollar-for-dollar adjustment post-close.
- **Cash and debt adjustment:** Enterprise value → equity value bridge. All cash is for the buyer; all debt (including transaction expenses, deferred revenue treated as debt) is deducted.

## Step 6: Tax Structuring

Key questions for tax counsel:
1. **Section 338(h)(10) election** — available for S-Corps and certain subsidiaries
2. **Rollover equity** — Section 351 or 721 exchange to defer tax on rolled portion
3. **Installment sale** — Seller notes can allow seller to defer gain recognition
4. **State and local tax** — Asset deals trigger sales tax in some states; vary by jurisdiction
5. **International targets** — GILTI, BEAT, transfer pricing if cross-border

## Output: Deal Structure Summary

For any deal structure analysis, produce:

1. **Recommended structure** — Deal form, consideration mix, financing structure with rationale
2. **Alternative structures considered** — What was rejected and why
3. **Key negotiating points** — Issues where buyer and seller interests diverge; suggested resolution
4. **Tax impact analysis** — Estimated after-tax proceeds to seller under each structure
5. **Risk allocation summary** — Who bears what risk and through what mechanism
6. **Open items** — Items requiring legal, tax, or financial diligence before finalizing structure
