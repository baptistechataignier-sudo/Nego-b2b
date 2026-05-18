---
name: data-connectors
description: Use when you need to pull financial data from external systems — ERPs (SAP, Oracle, NetSuite), data warehouses (Snowflake, BigQuery), market data providers (Bloomberg, Refinitiv, FactSet), or internal databases — and prepare it for financial analysis. Covers connection patterns, data normalization, and validation.
---

# Data Connectors

## Overview

Financial analysis requires data from many source systems. This skill covers how to connect to, extract, normalize, and validate financial data from the most common systems used in enterprise finance. Each connector section covers: authentication, key data objects, common extracts, and data quality checks.

## ERP Connectors

### NetSuite

**Key data objects:**
- `Transaction` — All financial transactions (invoices, bills, journal entries, payments)
- `Account` — Chart of accounts
- `Period` — Accounting periods (for filtering)
- `Subsidiary` — For multi-entity consolidations

**Common extract patterns:**
```
Saved Search: GL Impact
Filter: Period = [target period], Account type = [Income/Expense/Asset/Liability]
Columns: Date, Document Number, Account, Debit, Credit, Memo, Entity, Class, Department
```

**Data quality checks:**
- Verify `SUM(Debit) = SUM(Credit)` for the period
- Check for transactions with no account assignment (Account = null)
- Confirm period is "Closed" before extracting for reconciliation purposes

### SAP (S/4HANA / ECC)

**Key tables:**
- `BKPF` — Document header (date, company code, document type)
- `BSEG` — Document line items (account, amount, cost center)
- `SKA1` — G/L account master
- `T001` — Company codes

**Standard extract (FBL3N equivalent):**
```sql
SELECT bkpf.bukrs, bkpf.belnr, bkpf.budat, bseg.hkont, bseg.dmbtr, bseg.shkzg
FROM bkpf JOIN bseg ON bkpf.mandt = bseg.mandt AND bkpf.belnr = bseg.belnr
WHERE bkpf.budat BETWEEN [start] AND [end]
  AND bkpf.bukrs = [company_code]
  AND bseg.hkont IN ([account_list])
```

**Data quality checks:**
- `SHKZG` field: 'S' = debit, 'H' = credit — verify sign conventions before aggregating
- Check for parked or held documents (`BKPF.BSTAT != ''`) — typically exclude from reconciliation
- Confirm that document currency (`WAERS`) matches reporting currency or apply FX conversion

### QuickBooks (Online API)

**Authentication:** OAuth 2.0. Tokens expire after 60 minutes; refresh tokens valid for 100 days.

**Key endpoints:**
- `/v3/company/{companyId}/query?query=SELECT * FROM JournalEntry`
- `/v3/company/{companyId}/reports/GeneralLedger`

**Common issues:**
- QBO API has a 1,000-record limit per request — paginate with `startPosition` and `maxResults`
- Date filters use `MetaData.LastUpdatedTime` (modified date) or `TxnDate` — use `TxnDate` for period-based extracts

## Data Warehouse Connectors

### Snowflake

**Connection pattern (Python):**
```python
import snowflake.connector

conn = snowflake.connector.connect(
    account='<account_identifier>',
    user='<username>',
    authenticator='externalbrowser',  # Prefer SSO over password
    warehouse='<warehouse>',
    database='<database>',
    schema='<schema>'
)
```

**Performance tips:**
- Always specify `WAREHOUSE`, `DATABASE`, and `SCHEMA` — avoids permission errors
- Use `LIMIT` during development; remove for production extracts
- For large fact tables, filter on the partition key (usually `transaction_date`) first

### BigQuery

**Authentication:** Use Application Default Credentials (ADC) via `gcloud auth application-default login` for local development; use a service account JSON key for production.

**Standard query pattern:**
```sql
SELECT
  transaction_date,
  account_code,
  SUM(debit_amount) AS total_debit,
  SUM(credit_amount) AS total_credit
FROM `project.dataset.gl_transactions`
WHERE transaction_date BETWEEN '2024-01-01' AND '2024-12-31'
  AND company_code = 'HQ'
GROUP BY 1, 2
```

**Cost management:** Always use `SELECT column_list` not `SELECT *` — BQ charges by bytes scanned.

## Market Data Providers

### Bloomberg (BLPAPI)

**Key functions:**
- `BDP` (Bloomberg Data Point) — Current or reference data for a single field
- `BDH` (Bloomberg Data History) — Historical time series
- `BDS` (Bloomberg Data Set) — Multi-value data (e.g., dividend history)

**Common securities identifiers:** CUSIP, ISIN, Bloomberg ticker (e.g., `AAPL US Equity`)

**Standard historical pull:**
```python
# Requires Bloomberg Terminal + BLPAPI Python library
securities = ['AAPL US Equity', 'MSFT US Equity']
fields = ['PX_LAST', 'VOLUME', 'EV_TO_T12M_EBITDA']
start_date = '20230101'
end_date = '20231231'
```

**Rate limits:** BLP is not rate-limited in the traditional sense but respects terminal subscription entitlements. If a field returns `#N/A N/A`, the field is not subscribed.

### FactSet

**Authentication:** API key via header `X-FactSet-Api-Key`

**Key APIs:**
- `/factset-prices/v1/prices` — Historical price data
- `/factset-fundamentals/v2/financials` — Standardized financial statements
- `/factset-estimates/v2/consensus-estimates` — Analyst consensus

## Data Normalization

After extracting from any source system, apply these normalization steps before analysis:

1. **Standardize date formats** — Convert all dates to ISO 8601 (`YYYY-MM-DD`)
2. **Standardize sign conventions** — Decide on one convention (positive = inflow, negative = outflow) and apply consistently; document which you used
3. **Normalize account codes** — Map source system account codes to your standard chart of accounts hierarchy
4. **Currency conversion** — If multi-currency, apply period-average FX rates for P&L items and period-end rates for balance sheet items; document the rate source
5. **Deduplication** — Check for duplicate transaction IDs before aggregating; SAP reversals can create paired entries that net to zero

## Data Validation Checklist

Before using extracted data in analysis:
- [ ] Row count matches expected volume (compare to prior period ± expected variance)
- [ ] Sum of debits equals sum of credits for the period (for double-entry systems)
- [ ] No null values in key fields (date, account, amount)
- [ ] Amount distribution looks reasonable (no outlier transactions from data errors)
- [ ] Currency codes are all expected values (no unknown currency codes)
- [ ] Period is complete — no transactions missing from the last few days due to processing lag
