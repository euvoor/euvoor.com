FROM node:24.18.1-bookworm-slim AS build
WORKDIR /site
ENV ASTRO_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci --no-fund --no-audit
COPY astro.config.mjs tsconfig.json ./
COPY src ./src
COPY public ./public
COPY tests ./tests
COPY scripts ./scripts
RUN npm run build

FROM nginx:1.30.4-alpine
COPY ops/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /site/dist/ /srv/site/
USER nginx
EXPOSE 8080
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
