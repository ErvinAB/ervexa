# Lead Generation System - Quick Start Guide

## What You Have Now

A complete lead generation system with:
- ✅ Company scraper (with legal alternatives)
- ✅ Profile/contact finder
- ✅ Lead qualification scoring (0-100)
- ✅ Lead database storage
- ✅ Orchestration workflow

## How to Use It

### Option 1: Manual Company List (Recommended to Start)

Edit `/src/lib/lead-generation/company-scraper.ts` and add your target companies:

```typescript
export function getTargetCompanies(): Lead[] {
    const targetCompanies = [
        {
            company: 'Your Target Company',
            website: 'https://example.com',
            industry: 'SaaS',
            companySize: '51-200',
        },
        // Add 50-100 companies here
    ];
    // ...
}
```

### Option 2: Use Data Providers (Recommended for Scale)

**Apollo.io** (B2B contact database):
1. Sign up at apollo.io
2. Get API key
3. Add to `.env.local`: `APOLLO_API_KEY=your_key`
4. Use `getContactsFromApollo()` function

**Hunter.io** (Email finder):
1. Sign up at hunter.io
2. Get API key
3. Add to `.env.local`: `HUNTER_API_KEY=your_key`
4. Use `findEmailWithHunter()` function

### Option 3: LinkedIn Sales Navigator (Official)

Most legal and reliable, but requires subscription:
1. Subscribe to LinkedIn Sales Navigator
2. Use their official API
3. Implement `getCompaniesFromSalesNavigator()`

## Running the System

### Generate Leads

```typescript
import { generateLeads } from '@/lib/lead-generation';

// Generate 100 leads
const leads = await generateLeads(100);

// Leads are automatically:
// - Scored (0-100)
// - Saved to database
// - Prioritized by quality
```

### Get Leads for Outreach

```typescript
import { getLeadsForOutreach } from '@/lib/lead-generation';

// Get top 50 leads with score >= 60
const topLeads = await getLeadsForOutreach(60, 50);

// Use these for your outreach campaign
```

## Next Steps

### 1. Populate Your Lead List (Today)

**Manual Research (2-3 hours):**
- Find 50-100 target companies
- Add them to `getTargetCompanies()`
- Run `generateLeads()`

**Where to find companies:**
- LinkedIn company search
- Product Hunt (new SaaS companies)
- Crunchbase (funded startups)
- AngelList (startups)
- Your network/competitors' customers

### 2. Enrich with Contacts (Tomorrow)

For each company, find decision makers:
- Visit company website → Team page
- Check LinkedIn → Search "CTO at [Company]"
- Use Hunter.io to find email format
- Add to your lead list

### 3. Start Outreach (Day 3)

Use your SDR Agent to:
1. Analyze each lead's website
2. Generate personalized pitch
3. Send connection request on LinkedIn
4. Follow up with value offer

## Recommended Workflow

### Week 1: Manual + Free Tools

```
Day 1: Research 50 companies → Add to list
Day 2: Find 50 decision makers → Add contacts
Day 3: Qualify leads → Get top 20
Day 4: Manual outreach → 20 personalized messages
Day 5: Follow up → Track responses
```

**Tools:** LinkedIn, Google, Hunter.io (free tier)

### Week 2: Semi-Automated

```
Day 1: Research 100 more companies
Day 2: Use Apollo.io to find contacts (paid)
Day 3: Bulk qualify with your system
Day 4: Use SDR Agent for personalization
Day 5: Send 50 outreach messages
```

**Tools:** Apollo.io, Hunter.io, your SDR Agent

### Week 3+: Fully Automated

```
- Set up automated scraping
- Integrate with email automation
- Track responses automatically
- Scale to 100+ leads/week
```

## Legal & Ethical Guidelines

### ✅ DO:
- Use publicly available data
- Respect privacy laws (GDPR, CCPA)
- Provide opt-out options
- Be transparent about data usage
- Use official APIs when available
- Add value in your outreach

### ❌ DON'T:
- Scrape private/gated content
- Violate Terms of Service
- Send spam
- Buy email lists
- Ignore opt-out requests
- Use deceptive practices

## Data Providers Comparison

| Provider | Best For | Cost | Legal |
|----------|----------|------|-------|
| **Apollo.io** | B2B contacts | $49-99/mo | ✅ Yes |
| **Hunter.io** | Email finding | $49/mo | ✅ Yes |
| **Clearbit** | Company data | $99/mo | ✅ Yes |
| **LinkedIn Sales Nav** | Official LinkedIn | $99/mo | ✅ Yes |
| **Manual Research** | Starting out | Free | ✅ Yes |
| **Web Scraping** | Scale | Free | ⚠️ Risky |

## Quick Win Strategy

**Goal: Get your first customer in 30 days**

### Week 1: Foundation (10 hours)
- Research 50 perfect-fit companies
- Find decision makers manually
- Qualify and prioritize top 20

### Week 2: Outreach (5 hours)
- Personalize 20 messages with SDR Agent
- Send LinkedIn connection requests
- Follow up with value offer

### Week 3: Demos (10 hours)
- Book 5 demo calls
- Show your agents in action
- Close 1-2 customers

### Week 4: Scale (ongoing)
- Repeat with next 50 companies
- Improve messaging based on feedback
- Build referral system

## Support

Need help? Check:
- `/src/lib/lead-generation/` - All source code
- This guide - Implementation steps
- Your SDR Agent - For personalization

Ready to start? Begin with **Option 1: Manual Company List** and add 50 companies today!
