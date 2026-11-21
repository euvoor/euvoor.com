# Oussama Elgoumri’s workshop

Source for Oussama Elgoumri’s personal website. The Case Files hold engineering investigations. The Laboratory lets you run the small experiments that go with them. The Common Arsenal records upstream contributions, and the Notebook leaves room for unfinished thoughts.

## Run locally

Run `docker compose up --build -d --wait` from the repository root. Open [the workshop on loopback](http://127.0.0.1:4817). The image builds the site with Node and serves the resulting files with an unprivileged Nginx process.

For live editing, use the Node version in `.node-version`, run `npm ci`, then `npm run dev`. Use `npm run build` to run the experiment tests, check the Astro types, render the archive, and verify links against the generated files.

## Local HTTPS on the workshop machine

The Debian host uses Apache on ports 80 and 443. Its virtual host forwards `euvoor.test` to the container’s loopback port. Run the following commands from `/data/dev/euvoor.com`.

```sh
mkcert -install
install -d -m 700 .local/tls
mkcert -cert-file .local/tls/euvoor.test.pem -key-file .local/tls/euvoor.test-key.pem euvoor.test localhost 127.0.0.1
./ops/enable-local-site.sh
```

The last command uses sudo to install the Apache virtual host, check the configuration, reload Apache, and register the local hostname. Open [euvoor.test](https://euvoor.test). Local certificates and build artifacts stay outside version control.

## File an entry

Add a Markdown file under `src/content/case-files/`, `laboratory/`, `common-arsenal/`, or `notebook/`. The directory and filename form the permanent URL. Edit the title freely and keep the filename stable when people already link to it.

Each entry has a title, a summary, and a date. Use `related` to point to another entry by its stable path, such as `laboratory/ampersand-bench`. The build creates the return link and includes each new entry in its section and the RSS feed. Cite original material in the body or the optional `evidence` list. Keep any illustrations beside the entry that uses them.

The two browser experiments share their functions with the regression tests. Each page includes a reference run that readers can inspect with JavaScript disabled.

## Cloudflare Pages

Connect this repository to a Pages project. Set the production branch to `master`, the build command to `npm run build`, and the output directory to `dist`. The root contains `.node-version` and `wrangler.toml` for the Node version and static output. A pull request from a branch in this repository can receive a preview deployment. Only the generated site goes to Pages.

The feed and canonical links use the stable Pages hostname during the initial launch. After the custom domain serves the site over HTTPS, set the production build variable `SITE_URL` to `https://euvoor.com` and rebuild. Local builds default to `https://euvoor.test`.

## Credits

The workshop serves Archivo Black, Space Grotesk, and DM Mono locally. Their licenses accompany the fonts in the build.
