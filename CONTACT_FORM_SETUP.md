# Contact form (Resend)

The contact form sends submissions via the **Resend** API from `/api/contact`. You receive the enquiry at your email, and the person who submitted gets an automatic confirmation email.

## Resend free tier: domain required for real recipients

**Without a verified domain**, Resend only allows sending **to** the email address on your Resend account. So for local testing you have two options:

1. **Test mode (no domain):** Set `CONTACT_EMAIL_OVERRIDE_TO=your-resend-account@gmail.com` in `.env.local`. All emails (enquiry + confirmation) go to that address so you can test the flow. Subjects are prefixed with `[Test]`.
2. **Production (real visitors):** Verify your domain in Resend (see below), then **do not set** `CONTACT_EMAIL_OVERRIDE_TO`. Enquiries go to Victoria and confirmations go to the submitter.

## Local testing

1. **Sign up at [resend.com](https://resend.com)** and create an API key at [resend.com/api-keys](https://resend.com/api-keys).
2. **Create `.env.local`** and add:
   ```
   RESEND_API_KEY=re_your_actual_key_here
   CONTACT_EMAIL_OVERRIDE_TO=your-resend-account@gmail.com
   ```
   (Use the same email you used for Resend. Remove `CONTACT_EMAIL_OVERRIDE_TO` once the domain is verified.)
3. **Run:** `npm run dev`, submit the form. Check that inbox for both the enquiry and the confirmation.

## Production (Vercel) – verify domain

To send to **any** recipient (Victoria and real submitters), you must verify your domain in Resend:

1. Go to **[resend.com/domains](https://resend.com/domains)** → Add domain → enter `dragonflypsychotherapy.co.uk`.
2. Add the DNS records (SPF, DKIM) Resend shows to your domain DNS (at 123.reg or wherever the domain is managed).
3. In **Vercel** → Environment Variables, set:
   - `RESEND_API_KEY` = your API key
   - `CONTACT_EMAIL_FROM` = `Dragonfly Psychotherapy <contact@dragonflypsychotherapy.co.uk>` (or another address on that domain)
4. **Do not set** `CONTACT_EMAIL_OVERRIDE_TO` in production.

## Reverting to Formspree

If you want to switch back to Formspree:

1. Restore the previous `components/Contact.tsx` (Formspree endpoint and FormData submit).
2. Remove or leave unused the `/api/contact` route and Resend env vars.
3. Redeploy from Vercel or your last Formspree commit if needed.
