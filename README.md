# All Phase Plumbing

Marketing and lead-generation website for **All Phase Plumbing**. It's a fast,
SEO-focused site with dedicated landing pages for each plumbing service and
service area (city pages, emergency plumber, drain cleaning, hydro jetting,
gas line repair, and more), a blog sourced from a headless WordPress backend,
and contact/quote forms.

## What it's built with

- **[React 19](https://react.dev/)** + **TypeScript**
- **[TanStack Start / Router](https://tanstack.com/start)** — full-stack React framework with file-based routing and server-side rendering (SSR)
- **[Vite 7](https://vite.dev/)** — build tool and dev server
- **[Tailwind CSS 4](https://tailwindcss.com/)** + **[shadcn/ui](https://ui.shadcn.com/)** (Radix UI) — styling and components
- **[GSAP](https://gsap.com/)** + **[OGL](https://github.com/oframe/ogl)** — animations and WebGL effects
- **[Leaflet](https://leafletjs.com/)** — service-area maps
- **[React Hook Form](https://react-hook-form.com/)** + **[Zod](https://zod.dev/)** — forms and validation
- **[TanStack Query](https://tanstack.com/query)** — data fetching (blog posts from WordPress)
- Headless **WordPress** REST API as the blog content source
- Deploys to **Vercel** (config included for **Cloudflare Workers** as well)

## Project structure

```
src/
  routes/        File-based routes (pages). Each .tsx here is a URL.
    services/    Service landing pages (drain cleaning, hydro jetting, etc.)
    service-area/ & areas/   City / location pages
    blog/        Blog index + individual post pages (from WordPress)
  components/
    layout/      Header, footer, shared layout
    sections/    Reusable page sections (hero, CTA, etc.)
    ui/          shadcn/ui primitives
  data/          Static content (services, areas, FAQs, etc.)
  hooks/         Custom React hooks
  lib/           Helpers (WordPress API client, utils)
  types/         Shared TypeScript types
api/             Serverless entry used by Vercel
public/          Static assets (images, videos, robots.txt)
wordpress/       Headless WordPress reference / config
```

## Prerequisites

- **[Node.js](https://nodejs.org/) 20+** and npm
- A headless WordPress install for the blog (optional — the rest of the site works without it)

## Getting started (run it locally)

1. **Fork** this repo on GitHub (click **Fork** at the top of the
   [repository page](https://github.com/DEV-ETHIXWEB/Allphaseplumbings)), then
   clone your fork:

   ```bash
   git clone https://github.com/<your-username>/Allphaseplumbings.git
   cd Allphaseplumbings
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables.** Copy the example file and fill in your values:

   ```bash
   cp .env.example .env
   ```

   | Variable        | Description                                                                                     |
   | --------------- | ----------------------------------------------------------------------------------------------- |
   | `PUBLIC_WP_URL` | URL of your WordPress install (no trailing slash). Blog REST API endpoints are built from this. |

4. **Start the dev server:**

   ```bash
   npm run dev
   ```

   The site runs at **http://localhost:3000** (or the port Vite prints) with
   hot reload.

## Available scripts

| Command             | What it does                              |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Start the local dev server with hot reload |
| `npm run build`     | Production build (output in `dist/`)      |
| `npm run build:dev` | Build using development mode              |
| `npm run preview`   | Preview the production build locally      |
| `npm run lint`      | Run ESLint                                |
| `npm run format`    | Format the codebase with Prettier         |

## Making changes / updating content

- **Add or edit a page:** create/edit a `.tsx` file under `src/routes/`. The
  file path becomes the URL (e.g. `src/routes/services/drain-cleaning.tsx` →
  `/services/drain-cleaning`). Dynamic pages use `$param` (e.g.
  `src/routes/areas/$city.tsx`).
- **Edit shared content** (service lists, areas, FAQs): update the files in
  `src/data/`.
- **Change layout** (header/footer): edit `src/components/layout/`.
- **Blog posts** come from WordPress — manage them in the WordPress admin, not
  in this repo.
- **Images and videos** live in `public/`.

After editing, the dev server hot-reloads automatically. Run `npm run lint`
before committing.

## Keeping your fork up to date

Add the original repo as an `upstream` remote, then pull in changes:

```bash
git remote add upstream https://github.com/DEV-ETHIXWEB/Allphaseplumbings.git

# whenever you want the latest changes:
git fetch upstream
git checkout main
git merge upstream/main      # or: git rebase upstream/main
git push origin main         # push the updates to your fork
```

## Deploying

This project is configured for **Vercel** out of the box (`vercel.json`):

1. Import your fork into [Vercel](https://vercel.com/new).
2. Set the `PUBLIC_WP_URL` environment variable in the Vercel project settings.
3. Vercel runs `npm run build` and serves `dist/client`. Push to `main` to
   trigger a deploy.

A Cloudflare Workers config (`wrangler.jsonc`) is also included if you prefer
to deploy there instead.

## License

Proprietary — © All Phase Plumbing. All rights reserved.
