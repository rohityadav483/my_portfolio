# Portfolio

Personal portfolio site — React 19 + TypeScript + Vite. Animated with GSAP and Lenis smooth scroll, themeable (multiple color themes + light/dark mode), with an auto-generated sitemap.

## Tech stack

- **React 19** + **TypeScript** + **Vite 6**
- **React Router 7** — client-side routing
- **GSAP** + **ScrollTrigger** — scroll animations
- **Lenis** — smooth scrolling
- **Tailwind CSS 4**
- **EmailJS** — contact form, no backend needed

## Getting started

```bash
npm install
cp .env.example .env   # fill in your EmailJS keys
npm run dev
```

Site runs at `http://localhost:5173`.

## Environment variables

The contact form needs an [EmailJS](https://www.emailjs.com/) account. Create a `.env` file in the project root:

```
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

These are compiled into the JS bundle at build time — set them before running `npm run build`, not after.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Generate theme CSS, generate sitemap, typecheck, then production build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally, to sanity-check a production build |
| `npm run build:themes` | Regenerate `src/styles/themes.css` and theme dropdown options from `src/constants/` theme definitions |
| `npm run lint` | ESLint |
| `npm run release` | Cut a new version + changelog via commit-and-tag-version |

## Project structure

```
src/
  assets/        images, icons, fonts
  components/    UI/ (header, footer, cards…) and sections/ (hero, contact…)
  constants/     site content — portfolio.config.ts, ProjectsList.ts, theme + skill/tech-stack data
  context/       ThemeContext (color theme + light/dark mode)
  hooks/         useLenis, etc.
  layouts/       MainLayout, ProjectLayout
  pages/         route-level components
  styles/        global CSS, generated theme CSS
  utils/         shared helpers
scripts/         Node build-time scripts (theme generation, sitemap)
```

### Editing your content

Almost everything you'd want to personalize lives in `src/constants/`:
- **`portfolio.config.ts`** — name, bio, social links, nav, footer, action button
- **`ProjectsList.ts`** — your projects: name, description, tech stack, images, live/source URLs

Theme colors also live in `src/constants/` — edit those and run `npm run build:themes` to regenerate the CSS (this also runs automatically as part of `npm run build`).

## Deployment

A `netlify.toml` is included (build command `npm run build`, publish dir `dist`). To deploy:

1. Push this repo to GitHub.
2. **Netlify**: "Add new site" → import from Git → it auto-detects `netlify.toml`. Add the three `VITE_EMAILJS_*` env vars in Site settings → Environment, then deploy.
3. **Vercel**: import the repo, it auto-detects Vite (build `npm run build`, output `dist`). Same env vars in project settings.
4. **Any static host**: run `npm run build` locally with the env vars set, upload `dist/`.

Since this uses client-side routing (React Router), make sure your host rewrites all paths to `/index.html` (a SPA fallback rule), or deep links like `/projects/some-project` will 404 on refresh.

## Requirements

- Node 22 (see `netlify.toml` / `.nvmrc` if present)
- npm