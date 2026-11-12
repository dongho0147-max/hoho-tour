# HoHo Tour - hoho-tour.com

English travel blog for foreigners visiting Korea. Niche: Korea travel for
first-time visitors, written by a Seoul local. Static site built with
[Hugo](https://gohugo.io/) (extended), deployed to Cloudflare Pages.

## Goal (year 1)

Not revenue. Prove that organic search traffic actually arrives.
See the kill criteria in `docs/` (3 / 6 / 9 months) before scaling effort.

## Local build

```sh
hugo server -D   # preview at http://localhost:1313
hugo --minify    # production build into public/
```

Requires Hugo extended >= 0.140.

## Deploy

Push to `main` triggers `.github/workflows/deploy.yml`, which builds with
Hugo and deploys `public/` to Cloudflare Pages via Wrangler.

Required GitHub repository secrets (set by the owner, never committed):

- `CLOUDFLARE_API_TOKEN` - API token with Cloudflare Pages:Edit + Account:Read
- `CLOUDFLARE_ACCOUNT_ID` - Cloudflare account ID (dashboard URL)

First deploy also needs the Cloudflare Pages project `hoho-tour` created
(dashboard: Workers & Pages > Create > Pages > Connect to Git, pick this
repo) OR the token above, which lets Wrangler create the project on first run.
After the project exists, connect the custom domain `hoho-tour.com` in the
Pages dashboard (Workers & Pages > hoho-tour > Custom domains). DNS is
handled automatically by Cloudflare.

## Content

- Posts live in `content/blog/` as Markdown.
- Photos: only photos we took ourselves or verified free-stock (Unsplash /
  Pexels) with a real source URL. Never hotlink random blog images.
- Affiliate links (Travelpayouts etc.) are marked with
  `rel="sponsored nofollow"` and disclosed on the About page (FTC).
