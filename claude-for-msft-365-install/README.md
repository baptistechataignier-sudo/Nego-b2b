# Claude for Microsoft 365 — Installation Guide

This directory contains installation and configuration guides for deploying Claude financial services plugins within Microsoft 365 environments — including integration with Excel, Word, Teams, and SharePoint.

## Overview

The Claude for Microsoft 365 integration makes the financial services plugin capabilities available directly within the M365 productivity suite:

- **Excel add-in:** Run financial models, DCF analysis, and LBO calculations using natural language prompts alongside your spreadsheets
- **Word add-in:** Generate pitch deck content, research reports, and financial narratives in Word documents
- **Teams integration:** Deploy GL reconciler and market researcher agents in Teams channels for collaborative finance workflows
- **SharePoint connector:** Connect Claude agents to SharePoint-hosted financial data and reports

## Prerequisites

- Microsoft 365 Business or Enterprise subscription (E1 or higher)
- Azure Active Directory tenant with admin consent capability
- Claude API key (obtain from console.anthropic.com)
- Node.js 18+ and npm 9+ (for local development/testing)

## Installation Options

### Option A: Admin-Managed Deployment (Recommended for Enterprise)

Recommended for organizations with IT governance requirements. Deploys Claude add-ins to all users in the tenant via the Microsoft 365 admin center.

**Steps:**
1. Download the add-in manifest packages from the `manifests/` directory in this folder
2. Sign in to the Microsoft 365 admin center (admin.microsoft.com)
3. Navigate to **Settings → Integrated apps → Upload custom apps**
4. Upload the relevant manifest file(s)
5. Configure scope (specific users/groups or entire organization)
6. Configure the Claude API key as an environment variable in the Azure Key Vault connected to your tenant

### Option B: Self-Service Sideload (Individual / Pilot)

For testing or individual use without IT involvement:

1. Open Excel (or Word)
2. Go to **Insert → Add-ins → My Add-ins → Upload My Add-in**
3. Select the manifest XML from `manifests/excel-addin-manifest.xml`
4. The Claude panel will appear in the right sidebar

### Option C: Teams App Deployment

To deploy the GL Reconciler or Market Researcher as a Teams bot:

1. In the Teams admin center, go to **Teams apps → Manage apps → Upload**
2. Upload `manifests/teams-app-manifest.zip`
3. Assign to the relevant Finance or Research teams
4. Configure the bot with your Claude API key via the app configuration tab

## Configuration

### API Key Management

Never store the Claude API key in plain text. Recommended approaches by environment:

| Environment | Recommended Storage |
|-------------|---------------------|
| Production (enterprise) | Azure Key Vault |
| Development | `.env` file (not committed to Git) |
| CI/CD pipeline | GitHub Actions / Azure DevOps secrets |

### Permissions Required

The M365 integration requires the following Microsoft Graph API permissions:
- `Files.ReadWrite` — Read and write Excel/Word files
- `ChannelMessage.Send` — Post to Teams channels (Teams integration only)
- `Sites.ReadWrite.All` — Access SharePoint libraries (SharePoint connector only)

Request admin consent for these permissions in Azure AD → App registrations → Claude Financial Services App.

## Supported Workflows

### Excel: Financial Analysis
1. Open a financial model in Excel
2. Click the Claude panel (right sidebar)
3. Type: "Analyze the income statement in columns B-F and flag any year with margin compression > 200bps"
4. Claude reads the selected range and produces analysis

### Excel: LBO Model Assistant
1. With an LBO model open, open the Claude panel
2. Type: "Check if my sources and uses table balances and flag any issues"
3. Claude reads the model, identifies structural errors, and suggests corrections

### Word: Pitch Deck Narrative
1. Open a Word document with slide content or bullet points
2. Open the Claude panel
3. Type: "Convert these bullet points into investor-grade narrative copy for a Series B pitch deck"
4. Claude generates polished narrative text you can paste into your deck

### Teams: Research Requests
In any Finance or Research Teams channel where the bot is deployed:
```
@Claude-Research I need a competitive landscape for embedded insurance — 
who are the major players and where is the whitespace?
```

## Troubleshooting

**Add-in doesn't appear after installation**
- Clear the Office add-in cache: `%LOCALAPPDATA%\Microsoft\Office\16.0\Wef\`
- Restart Excel/Word
- Verify the manifest is valid XML (use the Office Add-in Validator tool)

**API rate limit errors**
- The M365 integration uses the Claude API; rate limits apply based on your API tier
- For high-volume deployments, request a rate limit increase via the Anthropic console

**Teams bot not responding**
- Verify the Azure Bot Service is running and the webhook URL is correctly configured
- Check the Teams app permissions in the admin center — the bot may need admin consent refresh

## Support

For enterprise deployment support, contact: plugins@anthropic.com
