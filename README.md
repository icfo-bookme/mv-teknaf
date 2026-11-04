# MV Teknaf

Cruise information, packages, schedules and consultation requests, built with Next.js App Router, React and Tailwind CSS.

## Local setup

Use Node.js 22 or newer. Run npm install, copy .env.example to .env.local and provide the configuration below. Then run npm run dev.

- NEXT_PUBLIC_BASE_URL: booking API origin; also permits images under its /storage/ path.
- NEXT_PUBLIC_SITE_URL: public website origin for SEO/social sharing. The default production origin is https://mvteknaf.com.bd.
- NEXT_PUBLIC_EMAIL_JS_SERVICEID, NEXT_PUBLIC_EMAIL_JS_TEMPLATEID, NEXT_PUBLIC_EMAIL_JS_USERID: optional EmailJS browser configuration. Consultation storage succeeds independently of email delivery. These public identifiers are intentionally visible in the browser; configure allowed origins and abuse controls in EmailJS.

## Checks and deployment

Run npm run lint, npm test and npm run build. Run npm start to serve the production build. The optional custom server uses PORT (default 3000).

The booking API is external. GET responses are checked for HTTP errors and expected structure, use a 10-second timeout and revalidate hourly. A failed request displays a retryable error instead of claiming no availability. An empty schedule list is a valid response.

Forms POST to /api/tour-consultations. Local automated checks mock network requests; they never send customer enquiries or emails. Confirm the full production submission flow with an authorized test enquiry before launch.

## Security and assets

Rich descriptions are sanitized before rendering. Dialogs use native modal focus management, Escape handling, background scroll locking and focus restoration.

.env.local is ignored and removed from Git tracking. Earlier commits may still contain it: review historical values and rotate any private credentials through their providers. Git history has not been rewritten.

The footer and shared page banner use compressed WebP files. Original images and legacy template assets are retained to avoid deleting potentially needed material; unused static assets do not enter page bundles automatically.

## Contact numbers

Edit src/config/contact.js to change primaryPhone and secondaryPhone across the website. whatsappPhone defaults to primaryPhone when left empty; set it only for a separate WhatsApp number. Call and WhatsApp URLs are derived automatically. Rebuild and redeploy after changes. Payment merchant and bank account numbers are separate from contact numbers.

## Automatic VPS deployment

Pushes to main trigger deployment to Hostinger VPS without lint or tests. See [deployment setup](docs/deployment.md) for GitHub Secrets, server prerequisites and domain configuration.
