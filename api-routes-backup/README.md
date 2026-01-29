# API routes backup (Decap CMS OAuth)

These routes (`auth/route.ts`, `callback/route.ts`) were used for Decap CMS GitHub OAuth when the site ran on a **Node server** (e.g. Vercel). They cannot run on **123.reg static hosting** (no server).

- **123.reg:** The site is built with `output: 'export'` and deployed as static files. Decap CMS login on the live site requires an **external OAuth proxy** (e.g. a small serverless app elsewhere); set `auth_endpoint` in `public/admin/config.yml` to that URL.
- **To restore for Vercel/Node:** Copy these files back into `app/api/auth/` and `app/api/callback/`, and remove `output: 'export'` from `next.config.js`.
