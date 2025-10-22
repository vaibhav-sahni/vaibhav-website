yarn install
yarn dev
yarn compile
yarn build
# Vaibhav Sahni — Personal Website

This repository contains a personal portfolio website built with Next.js and TypeScript. The project is structured to be content-driven: sections of the site (Hero, About, Resume, Portfolio, Testimonials, Contact) are populated from data files, and components are kept small and composable.

If you're a contributor, maintainer, or reviewer, this README explains how to run, build and deploy the site, what environment variables to set, and where to look for common tasks.

---

## Tech stack

- Next.js 14 (React 18)
- TypeScript
- Tailwind CSS for utility-first styling
- PostCSS + Autoprefixer, optional cssnano in production
- Sass for global styles
- @headlessui/react, @heroicons/react for UI building blocks

Images are handled via `next/image` and are imported as static assets where appropriate.

---

## Prerequisites

- Node.js (recommend LTS >= 18)
- Yarn (preferred) or npm

Confirm versions locally:

```cmd
node -v

```

---

## Setup (local development)

1. Clone the repository and install dependencies:

```cmd
git clone https://github.com/vaibhav-sahni/vaibhav-website.git
cd vaibhav-website
yarn install
```

2. Start the development server:

```cmd
yarn dev
```

3. (Optional) Run a TypeScript build to check types:

```cmd
yarn compile
```

Available scripts are defined in `package.json` and include `dev`, `build`, `compile`, `lint`, and `deploy`.

---

## Build & production

To build the project for production:

```cmd
yarn build
```

This runs the TypeScript build (`yarn compile`) then `next build`.

If you want a static export for hosting on GitHub Pages, add `next export` to the pipeline and configure the output directory for `gh-pages` (the repo previously used `gh-pages -d build` — adjust as necessary).

---

## Environment variables

Set the following environment variables for production/CI:

- `NEXT_PUBLIC_SITE_URL` — Full base URL of the site (e.g. `https://your-domain.com`). This value is used to build canonical and Open Graph URLs. If not set, the site uses the `homepage` field from `package.json` as a fallback.

You can create a `.env.local` file for local development and add:

```text
NEXT_PUBLIC_SITE_URL=https://your-site.example
```

Note: environment variables prefixed with `NEXT_PUBLIC_` are exposed to client-side code by Next.js.

---

## Project structure (high level)

- `src/components` — React components organized into `Layout`, `Sections`, `Icon`, etc.
- `src/data` — site content (heroData, aboutData, portfolioItems, resume, contact, social links). This is where you update site content.
- `src/pages` — Next.js pages (`_app.tsx`, index page, etc.)
- `src/images` — local static images used by `next/image`

---

## Security & accessibility notes

- External links opened with `target="_blank"` should include `rel="noopener noreferrer"` (this repository has been updated to follow this practice).
- Forms are basic and currently log data to the console — consider wiring the contact form to an API endpoint or service (EmailJS, Formspree, or a serverless API route).

---

## Changes included in this branch

- Image-related TypeScript types were widened to accept both `string` and `StaticImageData` to support static `next/image` imports.
- Canonical/OG URL handling now prefers `NEXT_PUBLIC_SITE_URL` and falls back to the `homepage` field in `package.json`.
- Added `rel="noopener noreferrer"` to external links that open in a new tab.

---

## Troubleshooting

- If `yarn dev` fails with `tsc` missing, run `yarn install` to ensure devDependencies (including `typescript`) are installed.
- If you run into image import or type errors, ensure TypeScript and the `@types/*` packages are installed and your `tsconfig.json` includes `resolveJsonModule` and appropriate JSX settings (this repo ships with a working config).

---


