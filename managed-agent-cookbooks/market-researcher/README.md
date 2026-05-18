# Market Researcher — Managed Agent Cookbook

This cookbook guides you through deploying the `market-researcher` as a managed agent for structured market research workflows. The market researcher performs TAM/SAM/SOM analysis, competitive landscape mapping, and industry dynamics assessments suitable for investment decisions and strategic planning.

## What This Agent Does

The market researcher applies rigorous, methodology-driven approaches to market sizing and competitive analysis. Output meets the standards required for investor-grade due diligence — every estimate includes stated assumptions and methodology, and competitive profiles distinguish between stated positioning and observable behavior.

**Best for:**
- Investment committee memos (VC, PE, corporate development)
- New market entry assessments
- Competitive intelligence for product and GTM strategy
- Board-level market update presentations
- M&A target market analysis

## Prerequisites

- Claude Code with the `market-researcher` plugin installed
- A clear definition of the market or segment to analyze
- The purpose of the research (shapes the depth and focus)

## Installation

```bash
# From the repo root
claude plugin install ./plugins/agent-plugins/market-researcher
```

## Basic Usage

```
@market-researcher I need a market sizing analysis for the SMB expense management 
software market in North America. This is for a Series A investment committee memo. 
Time horizon: current + 5-year forecast.
```

The agent will ask clarifying questions before beginning if the scope is ambiguous. A well-defined brief produces faster, higher-quality output.

## Writing an Effective Research Brief

Provide:

1. **Market definition** — Be specific. "SMB accounting software in North America" is better than "accounting software."
2. **Customer definition** — "Companies with 10-100 employees, US-based, in professional services" is better than "small businesses."
3. **Purpose** — Investment decision, GTM strategy, M&A, competitive response?
4. **Available inputs** — Do you have any existing data (customer surveys, sales data, prior research)?
5. **Time horizon** — Current state, 3-year, or 5-year forecast?

## Output Sections

The market researcher produces a structured report:

1. **Executive Summary** — Key findings in 3-5 bullets
2. **Market Definition** — Precise scope and boundaries
3. **Market Sizing** — TAM/SAM/SOM with methodology, assumptions, sensitivity analysis
4. **Competitive Landscape** — Player map, segment breakdown, comparative table
5. **Industry Dynamics** — Forces shaping the market, regulatory environment, macro tailwinds
6. **Opportunities and Risks** — Structural opportunities; key risks and mitigants
7. **Sources and Methodology** — All data sources; assumptions flagged

## Deployment as a Research Workflow

### Batch Research Mode

Use `scripts/orchestrate.py` to run market research across a portfolio of companies or markets:

```python
# Batch competitive intelligence run
markets = [
    "AP automation software — mid-market",
    "Treasury management systems — enterprise",
    "Corporate card and expense management — SMB",
]
for market in markets:
    run_agent("market-researcher", brief=market, output_dir="./research/")
```

### Integration with Notion / Google Drive

The market researcher's structured output (with consistent section headers) is designed to be pasted directly into Notion databases or Google Docs templates. Use `scripts/sync-agent-skills.py` to automate output routing.

## Tips for Best Results

- **Narrow the scope before starting:** Broad markets ("fintech") produce superficial analysis. Narrow to the specific segment where you have a decision to make.
- **Provide analogous markets:** If you have data on a similar market (e.g., you're researching AP automation and have data on the broader ERP market), share it — the agent can use it as a cross-check.
- **Ask for the methodology explicitly:** If you need to defend the analysis in an investment committee, ask the agent to explain its bottom-up and top-down methodologies in detail.
- **Use sensitivity analysis:** Ask for "what does the TAM look like if the key assumption is 50% lower?" before presenting to skeptical audiences.

## Example Prompts

```
@market-researcher Give me a competitive landscape for AI-powered contract 
lifecycle management (CLM) software. Focus on enterprise (>1,000 employees) 
in the US. I need to understand: who the major players are, how they're 
positioned, where the whitespace is, and what pricing looks like.
```

```
@market-researcher Build a TAM/SAM/SOM analysis for embedded lending 
in vertical SaaS platforms. Use both top-down (from total SMB lending market) 
and bottom-up (from number of vertical SaaS platforms × attach rate × loan volume). 
Show me the assumptions and a sensitivity analysis on the attach rate assumption.
```
