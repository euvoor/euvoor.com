# Oussama Elgoumri — experimental portfolio

A responsive, deliberately unconventional one-page portfolio. Entirely static; no framework, build tooling, analytics, cookies, or third-party JavaScript required.

## Open it

Open `index.html` in a modern browser. To publish it, upload the complete folder to any static host (Cloudflare Pages, Netlify, Vercel, GitHub Pages, or your own server).

## Important edits before launch

1. **Email**: Change `CONTACT_EMAIL = 'hello@example.com'` in `script.js` to your real public work email. The visible demo disclaimer is intentionally shown until you replace/remove it.
2. **Bio & copy**: Edit `index.html` to reflect exactly how you describe your services.
3. **Case files**: These are explicitly anonymized *capability examples*, not unverified testimonials or specific client project claims. Replace with approved, factual case studies if you have permission to show them.
4. **SEO/social**: Review `<title>`, description, and Open Graph content in `<head>`.
5. **Fonts**: The CSS requests Archivo Black, Space Grotesk, and DM Mono from Google Fonts. System fallbacks work offline. If you want full offline independence, self-host properly licensed font files.
6. **Accessibility**: Keyboard focus, skip link, accessible toggle state, semantic headings, live diagnosis result, and reduced-motion preferences are included. Test with your chosen accessibility tooling before launch.

## Interaction

- `SAVAGE MODE` alternates between audacious and polished copy.
- `DIAGNOSIS MACHINE` lets visitors click a project challenge to see a playful verdict.
- All navigation uses in-page anchors. Contact opens an email draft.

## Structure

- `index.html`: Content and page sections
- `styles.css`: Layout, visual language, responsiveness, animations
- `script.js`: Persona switcher, diagnosis machine, contact config
- `assets/favicon.svg`: Simple branded icon

Built as a design concept, not a claim that any client endorsements or project outcomes have been validated.
