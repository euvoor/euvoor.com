import { defineConfig } from 'astro/config';

// Pages provides a deployment-specific URL. Publish feeds under the stable project hostname.
const deployment = new URL(process.env.CF_PAGES_URL || 'https://euvoor.test');
const projectHost = deployment.hostname.match(/(?:^|\.)([a-z0-9-]+\.pages\.dev)$/)?.[1];
const site =
  process.env.SITE_URL || (projectHost ? 'https://' + projectHost : deployment.origin);

export default defineConfig({
  site,
  output: 'static',
  security: {
    csp: { directives: ["base-uri 'self'", "object-src 'none'", "form-action 'self'"] },
  },
  trailingSlash: 'always',
  markdown: { syntaxHighlight: false },
  build: { inlineStylesheets: 'never' },
});
