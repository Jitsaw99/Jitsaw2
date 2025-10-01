
Jitsaw Property Group - Responsive 9-page Static Website + Cloudflare Worker

Contents:
- index.html
- rentals.html, investments.html, supported.html, accommodation.html, acquisition.html, funding.html, land.html
- contact.html (form posts to your Cloudflare Worker)
- assets/css/style.css
- assets/img/ (logo.png or logo.txt and placeholder .txt files with image URLs)
- workers/contact-worker.js (Cloudflare Worker that can forward via SendGrid)

Instructions:
1. Replace each assets/img/*.txt with downloaded royalty-free images and name them as indicated (e.g. rentals.jpg).
2. Replace assets/img/logo.png with your logo (already included if uploaded).
3. Deploy website to GitHub + Cloudflare Pages or any static host.
4. Deploy the Cloudflare Worker (workers/contact-worker.js) using Wrangler or the dashboard.
   - Set worker environment variables: SENDGRID_API_KEY, SENDGRID_TO, SENDGRID_FROM (if you want it to send emails).
5. Update the form 'action' in contact.html to the deployed worker URL.
6. Test the contact form. If SendGrid isn't configured the worker will echo form data as JSON for testing.

If you'd like, I can also generate a sample `wrangler.toml` for deployment and show the exact steps.
