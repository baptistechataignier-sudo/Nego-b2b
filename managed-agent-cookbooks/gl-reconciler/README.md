# GL Reconciler — Managed Agent Cookbook

This cookbook guides you through deploying the `gl-reconciler` as a managed agent for automated general ledger reconciliation workflows. The GL reconciler performs systematic matching of ledger entries against source systems and produces audit-ready reconciliation workpapers.

## What This Agent Does

The GL reconciler ingests data from two source systems, performs systematic line-by-line matching, categorizes discrepancies by type (timing difference, missing entry, duplicate, amount mismatch, coding error), and produces a structured reconciliation report meeting Big Four audit standards.

**Best for:**
- Month-end and quarter-end close processes
- Audit preparation and substantive testing support
- Cash account bank reconciliation
- Accounts receivable sub-ledger to GL reconciliation
- Intercompany reconciliation

## Prerequisites

- Claude Code with the `gl-reconciler` plugin installed
- Data exports from both source systems in CSV or Excel format
- Knowledge of the opening (prior-period) balance for the account being reconciled

## Installation

```bash
# From the repo root
claude plugin install ./plugins/agent-plugins/gl-reconciler
```

## Basic Usage

```
@gl-reconciler Reconcile our cash account (GL #1000) for October 2024. 
I'm attaching the GL export and bank statement. Opening balance: $1,247,832.
[attach: gl-export-oct2024.csv, bank-statement-oct2024.csv]
```

## Data Format Requirements

### GL Export
Minimum required columns:
- `date` or `posting_date` — Transaction date
- `account` or `account_code` — GL account number
- `description` or `memo` — Transaction description
- `debit` and `credit` (or `amount` with sign convention)
- `document_number` or `reference` — Unique transaction identifier

### Bank Statement
Minimum required columns:
- `date` — Transaction date
- `description` — Bank transaction description
- `amount` — Amount (positive = deposit, negative = withdrawal, or with separate debit/credit columns)
- `running_balance` (optional but recommended for validation)

## Deployment as a Managed Agent

### Integration with Close Management Tools

The GL reconciler can be integrated into close management workflows (FloQast, Blackline, etc.) as a secondary review tool:

1. Export reconciliation data from your close tool in CSV format
2. Route to the GL reconciler agent for discrepancy analysis
3. Import reconciliation report back into your close tool

### Automated Scheduling

For recurring reconciliations, use `scripts/orchestrate.py` to schedule the agent to run at month-end:

```python
# In orchestrate.py configuration
agents:
  - name: gl-reconciler
    schedule: "last_day_of_month"
    inputs:
      - source: erp_export
        query: "SELECT * FROM gl_transactions WHERE period = '{current_period}'"
      - source: bank_feed
        format: ofx
```

## Interpreting Output

The agent produces output in this order:
1. **Summary** — Total discrepancy, number of reconciling items, categories
2. **Reconciliation report** — Full schedule of all reconciling items
3. **Journal entries** — Proposed JEs for any true discrepancies
4. **Outstanding items** — Items requiring human follow-up with suggested owner and due date

**Review the outstanding items first** — these are the items that need human action before the reconciliation can be signed off.

## Common Issues

**"The agent found more discrepancies than expected"**
- Check that both exports cover the exact same date range
- Verify the opening balance is correct (if wrong, all items will appear unmatched)
- Confirm sign conventions: some ERP exports flip signs for certain account types

**"The GL export is too large to process in one pass"**
- Break it into sub-account ranges or date ranges
- Run the agent on one week at a time and combine outputs

## Example Prompts

```
@gl-reconciler We have a $127,450 variance in our AR balance vs. the sub-ledger 
as of September 30. GL shows $4.2M, sub-ledger shows $4.07M. 
Here are both exports. [attach files]
```

```
@gl-reconciler Prepare a reconciliation workpaper for accounts payable (GL #2000) 
for Q3 2024. I need it audit-ready — format it with a sign-off block.
```
