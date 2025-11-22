# Job Board Support Matrix

This document details the compatibility of various job boards with this application.

## Test Results Summary

| Job Board | URL Tested | Works on Vercel? | Works with Puppeteer? | Notes |
|-----------|------------|------------------|-----------------------|-------|
| **SmartRecruiters** | jobs.smartrecruiters.com | ✅ Yes | ✅ Yes | Uses `.jobad-container`. Text cutoff fixed by removing footer elements. |
| **Greenhouse** | greenhouse.io | ✅ Yes | ✅ Yes | Fully supported with static HTML. |
| **YCombinator** | ycombinator.com/companies | ✅ Yes | ✅ Yes | Uses `.ycdc-job-posting`. Text cutoff fixed. |
| **AshbyHQ** | ashbyhq.com | ✅ Yes* | ✅ Yes | Extracts from `window.__appData` embedded JSON. No JavaScript execution needed! |
| **Paylocity** | paylocity.com | ✅ Yes | ✅ Yes | Uses `.job-description-wrapper`. Works well. |
| **Jobvite** | jobvite.com | ✅ Yes | ✅ Yes | Uses `.jv-job-detail`. Text cutoff fixed. |
| **Workday** | myworkdayjobs.com | ❌ No | ✅ Yes | Requires JavaScript rendering. Puppeteer only. |
| **Reval** | reval.site | ❌ No | ✅ Yes | Full SPA - requires JavaScript rendering. Puppeteer only. |
| **ServiceNow** | careers.servicenow.com | ❌ No | ⚠️ Maybe | Blocks automated requests (403). May work with Puppeteer. |
| **Lever** | lever.co | ❌ No | ✅ Yes | Requires JavaScript rendering. Puppeteer only. |

## Categories

### ✅ Vercel-Compatible (Static HTML)

These job boards work perfectly on Vercel without Puppeteer:

1. **Greenhouse** - The gold standard. Perfect HTML structure.
2. **SmartRecruiters** - Good semantic HTML with `.jobad-container`.
3. **YCombinator** - Clean structure with `.ycdc-job-posting`.
4. **AshbyHQ** - Special case: embeds data in `window.__appData`, which we can parse without executing JavaScript.
5. **Paylocity** - Uses `.job-description-wrapper`.
6. **Jobvite** - Uses `.jv-job-detail`.

### ⚠️ Puppeteer Required (Dynamic/SPA)

These require headless browser rendering (local development only):

1. **Workday** - Full SPA with `data-automation-id` attributes.
2. **Reval** - Full SPA with "You need to enable JavaScript" message.
3. **Lever** - Requires JavaScript execution.

### ❌ Blocked/Problematic

1. **ServiceNow** - Returns 403 for automated requests. Anti-bot protection.

## Implementation Details

### Text Cutoff Fixes

The initial implementation had text cutoff issues because footer/navigation elements were included. Fixed by:

1. Removing footer elements with class/ID patterns: `[class*="footer"]`, `[id*="footer"]`
2. Removing privacy/legal elements: `[class*="privacy"]`, `[class*="cookie"]`
3. Removing social sharing widgets: `[class*="share"]`, `[class*="social"]`
4. Using site-specific containers instead of generic `body` selector

### AshbyHQ Special Case

AshbyHQ appears to require JavaScript but actually embeds the full job data in:

```javascript
window.__appData = {
  jobPosting: {
    title: "...",
    descriptionHtml: "..."
  }
}
```

We extract this directly from the script tag without executing any JavaScript!

## Extraction Strategy by Site

### SmartRecruiters
- **Container:** `.jobad-container` or `.job-description`
- **Title:** `h1` or page title
- **Content:** All text within container after removing scripts/styles/footer

### Greenhouse
- **Container:** `main` or `.content`
- **Title:** `h1`
- **Content:** May also have JSON-LD structured data

### YCombinator
- **Container:** `.ycdc-job-posting`
- **Title:** `h1`
- **Content:** Everything within the container

### AshbyHQ
- **Source:** `window.__appData` in `<script>` tag
- **Title:** `appData.jobPosting.title`
- **Content:** `appData.jobPosting.descriptionHtml` (strip HTML tags)

### Paylocity
- **Container:** `.job-description-wrapper`
- **Title:** `h1`
- **Content:** Container text content

### Jobvite
- **Container:** `.jv-job-detail`
- **Title:** `h1`
- **Content:** Container text content

### Workday (Puppeteer)
- **Container:** `[data-automation-id="jobPostingDescription"]`
- **Title:** `[data-automation-id="jobPostingHeader"]`
- **Wait for:** Element with `data-automation-id` to load

## Deployment Modes

### Production (Vercel)
- Uses `/api/fetch-job` endpoint
- Regular `fetch()` only
- Supports: Greenhouse, SmartRecruiters, YC, AshbyHQ, Paylocity, Jobvite
- Rejects: Workday, Reval, Lever, ServiceNow with helpful error messages

### Development (Local)
- Uses `/api/fetch-job-puppeteer` endpoint (toggle in UI)
- Puppeteer for JavaScript rendering
- Supports: All sites except ServiceNow (blocked)
- Toggle "Developer Mode" in UI to enable

## Recommendations

### For Vercel Deployment
Deploy as-is. Works with 6+ major job boards without any external dependencies.

### For Local Development
Enable "Developer Mode" toggle to access Puppeteer functionality for dynamic sites.

### Future Improvements
1. **Proxy Service:** Consider services like ScrapingBee or Browserless.io for Puppeteer-in-the-cloud
2. **Browser Extension:** Build a Chrome extension for client-side extraction (no server needed)
3. **More Site Support:** Add specific parsers for Indeed, LinkedIn, ZipRecruiter, etc.

## Testing Commands

```bash
# Test locally with regular fetch
npm run dev

# Test with Puppeteer mode
# Enable "Developer Mode" toggle in UI
```
