import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://euvoor.com',
  output: 'static',
  security: {
    csp: { directives: ["base-uri 'self'", "object-src 'none'", "form-action 'self'"] },
  },
  trailingSlash: 'always',
  markdown: { syntaxHighlight: false },
  build: { inlineStylesheets: 'never' },
});
