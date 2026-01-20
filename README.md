# Odyssey Ops Landing Site

A premium single-page landing site for [odysseyops.app](https://odysseyops.app).

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: TailwindCSS
- **Email**: Resend
- **Analytics**: Plausible

## Local Development

```bash
cd landing-site
npm install
npm run dev
```

The site runs on port 5000.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes (Vercel) | Resend API key for email delivery |
| `RESEND_FROM_EMAIL` | No | From email address (default: Odyssey Ops <noreply@odysseyops.app>) |
| `WAITLIST_TO_EMAIL` | No | Email address to receive waitlist signups (default: hello@odysseyops.app) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Plausible domain for analytics (default: odysseyops.app) |

**Note:** When running on Replit, Resend is configured via the Replit integration system and `RESEND_API_KEY` is not needed.

## Deploy to Vercel

1. Push this `landing-site` directory to a GitHub repository
2. Import the repo in Vercel
3. Set environment variables in Vercel dashboard:
   - `RESEND_API_KEY` - Get from [resend.com](https://resend.com)
   - `WAITLIST_TO_EMAIL` - Your email to receive signups
4. Deploy

## Project Structure

```
landing-site/
├── src/
│   ├── app/
│   │   ├── api/waitlist/route.ts  # Waitlist API endpoint
│   │   ├── thank-you/page.tsx     # Confirmation page
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx               # Main landing page
│   ├── components/
│   │   ├── Analytics.tsx
│   │   ├── FAQ.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Modules.tsx
│   │   ├── Outcomes.tsx
│   │   ├── Segments.tsx
│   │   ├── SiteIntelligence.tsx
│   │   └── WaitlistForm.tsx
│   ├── hooks/
│   │   └── useScrollAnimation.ts
│   ├── lib/
│   │   ├── analytics.ts
│   │   └── resend.ts
│   └── content.ts                  # All landing page copy
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Analytics Events

The following events are tracked via Plausible:

- `view_landing` - Page view
- `click_join_waitlist` - CTA button clicks
- `submit_waitlist` - Form submission started
- `submit_waitlist_success` - Form submitted successfully
- `submit_waitlist_error` - Form submission failed

## Form Features

- Client-side validation with inline errors
- Honeypot field for spam protection
- In-memory rate limiting (5 requests per minute per IP)
- Loading state during submission
- Redirect to /thank-you on success

## Content Editing

All landing page copy is in `/src/content.ts`. Edit this file to update text without touching component code.
