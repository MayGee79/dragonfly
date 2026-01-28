# Debug workflow (without breaking the interface)

## 1. **Work on a branch**
- Keep `main` as the stable, working version that matches Vercel.
- For any risky change (layout, globals, fonts), create a branch:
  ```bash
  git checkout -b fix/font-or-layout
  ```
- Make your changes, test locally, then merge to `main` only when everything looks correct.

## 2. **Test locally before pushing**
- Run `npm run dev` and open http://localhost:3000.
- Check: font, background, nav, sections, contact form.
- Do a hard refresh (Cmd+Shift+R / Ctrl+Shift+R) after changes.
- Only run `git push` when the local site looks right.

## 3. **One change at a time**
- Change one thing (e.g. layout only, or globals only), then test.
- If something breaks, you know which change caused it and can revert just that.

## 4. **Clear cache when things look wrong**
- **Next.js:** `rm -rf .next` then restart `npm run dev`.
- **Browser:** Hard refresh or use an incognito window.

## 5. **Revert safely**
- To undo uncommitted changes:
  ```bash
  git checkout -- app/layout.tsx app/globals.css
  ```
- To revert a commit but keep history:
  ```bash
  git revert <commit-hash>
  git push
  ```

## 6. **If you need to change layout/font again**
- The site currently uses **Quicksand** on `<body>` (from `app/layout.tsx`) and **Century Gothic** in `globals.css`. Next.js font applies its class to `body`, which can override globals.
- To switch font or tweak layout without breaking UI:
  - Prefer changing only **metadata** (e.g. `metadataBase`) or **one** layout detail.
  - Avoid removing the `body` class or the font import until you’ve tested that globals still apply (e.g. body background, font-family from globals).
  - If you remove Quicksand, ensure `body` has no class that could strip styles, or add a class that re-applies the same `html, body` rules from `globals.css`.

## 7. **Vercel**
- Pushing to `main` triggers a new deploy. Don’t push until local is good.
- If a deploy is broken: in Vercel dashboard, open the previous deployment and “Promote to Production”, or fix the code and push again.
