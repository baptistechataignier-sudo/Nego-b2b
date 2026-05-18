# Pitch Agent — Managed Agent Cookbook

This cookbook guides you through deploying the `pitch-agent` as a managed agent in your Claude environment. The pitch agent builds investor pitch decks, fundraising narratives, and investor memos on demand.

## What This Agent Does

The pitch agent synthesizes financial data, market positioning, and growth story into structured investor presentations. It follows a standard 12-section pitch deck structure and produces investor-grade narrative copy for each section.

**Best for:**
- Series A–C fundraising decks
- Board presentation materials
- Investor update memos
- Strategic partnership one-pagers

## Prerequisites

- Claude Code with the `pitch-agent` plugin installed
- Financial data for the company (ARR/MRR, growth rates, unit economics)
- Market sizing data or at minimum the market category

## Installation

```bash
# From the repo root
claude plugin install ./plugins/agent-plugins/pitch-agent
```

## Basic Usage

Once installed, invoke the agent by name:

```
@pitch-agent Help me build a Series B pitch deck. We're a vertical SaaS company for commercial real estate brokers. ARR is $8.2M, growing 85% YoY. We're raising $30M.
```

The agent will ask for any missing inputs before generating content. Do not provide data you don't have — the agent will help you identify what's needed.

## Customizing the Deck Structure

The default structure follows a standard VC pitch format. To modify:

- **Skip sections:** "Skip the team slide for now — I'll fill it in later"
- **Reorder sections:** "Start with traction before market — we want to lead with momentum"
- **Change format:** "Produce this as a memo format, not slide-by-slide"

## Deployment as a Managed Agent

To deploy as a standalone managed agent (e.g., in a Slack or web interface):

1. See `scripts/deploy-managed-agent.sh` for deployment instructions
2. Configure the agent with the system prompt from `plugins/agent-plugins/pitch-agent/agents/pitch-agent.md`
3. Set the model to Claude Sonnet or Opus depending on quality requirements

## Tips for Best Results

- **Provide structured inputs:** The agent produces better output when given organized financial data rather than raw exports
- **Use the investor lens:** Ask the agent to "stress test" each section by asking what investor questions it might trigger
- **Iterate section by section:** Don't try to generate the whole deck in one pass if you have limited data

## Example Prompts

```
@pitch-agent We're a fintech company building AI-powered accounts payable automation. 
Our ARR is $4.1M, NRR is 142%, CAC is $28k, LTV is $210k. 
We have 47 enterprise customers averaging $87k ACV.
Help me build a Series A pitch deck for a $15M raise.
```

```
@pitch-agent Review my existing pitch deck draft and identify the 3 sections 
where an investor would push back most. [attach deck]
```
