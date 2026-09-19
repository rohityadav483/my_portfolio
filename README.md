# Portfolio

**Live site: [rohityadav483.netlify.app](https://rohityadav483.netlify.app/)**

Personal portfolio site — React 19 + TypeScript + Vite. Animated with GSAP and Lenis smooth scroll, themeable (multiple color themes + light/dark mode), with a working contact form, an Internship section, per-project detail pages, and an auto-generated sitemap.

## Sections

Hero → About → Skills → Internship → Projects → Contact. Each project also has its own page at `/projects/<project-name>`.

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

The contact form needs an [EmailJS](https://www.emailjs.com/) account. Create a `.env` file in the project root (a template is in `.env.example`):

```
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

Where to find them:
- **Service ID** — Email Services → your connected service
- **Template ID** — Email Templates → your template
- **Public Key** — Account → API Keys (use the *Public* key, never the private one)

The template must use these variables, which `ContactForm.tsx` sends: `{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{to_email}}`.

Notes:
- These are compiled into the JS bundle at build time — set them before running `npm run build`, not after. Restart `npm run dev` after editing `.env`.
- In EmailJS → Account → Security, add your site domain (and `http://localhost:5173` for local testing) to **Allowed Origins**.
- Gmail error `412 ... insufficient authentication scopes`? Delete the Gmail service in EmailJS and reconnect it, ticking every permission box (especially sending email on your behalf) on Google's consent screen. The new service has a new Service ID.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Regenerate themes, start dev server with HMR |
| `npm run start` | Same as `dev`, without opening the browser |
| `npm run build` | Generate theme CSS, generate sitemap, typecheck, then production build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally, to sanity-check a production build |
| `npm run build:themes` | Regenerate `src/styles/themes.css` and theme dropdown options from `src/constants/` theme definitions |
| `npm run lint` | ESLint |
| `npm run release` | Cut a new version + changelog via semantic-release (`release:dry` for a dry run) |

## Project structure

```
src/
  assets/
    projects/      per-project logo + screenshot PNGs, index.ts exports LOGOS / SCREENSHOTS
    internships/   company logos for the Internship section, index.ts exports INTERNSHIP_LOGOS
    skills/        tech-stack icons (SVG)
    images/, SVGs/ avatars and other site graphics
  components/      UI/ (header, footer, cards…) and sections/ (hero, about, skills, internship, projects, contact…)
  constants/       site content — portfolio.config.ts, ProjectsList.ts, InternshipList.ts, skillStack.ts, theme data
  context/         ThemeContext (color theme + light/dark mode)
  hooks/           useLenis, useScrollSpy, etc.
  layouts/         MainLayout, ProjectLayout
  pages/           route-level components (Home, ProjectsPage, ProjectDetail, NotFound)
  styles/          global CSS, generated theme CSS
  utils/           shared helpers
scripts/           Node build-time scripts (theme generation, sitemap)
public/            static files — robots.txt, sitemap.xml (regenerated on build), manifest, resume PDF
```

### Editing your content

Almost everything you'd want to personalize lives in `src/constants/`:
- **`portfolio.config.ts`** — name, bio, social links, nav, footer, action button, SEO defaults (`siteConfig`)
- **`ProjectsList.ts`** — your projects: name, description, tech stack, images, live/source URLs
- **`InternshipList.ts`** — internships: company, role, dates, work mode, highlights, tech stack
- **`skillStack.ts`** — tech-stack icons and links shown in Skills and reused by projects/internships

Theme colors also live in `src/constants/` — edit those and run `npm run build:themes` to regenerate the CSS (this also runs automatically as part of `npm run build`).

#### Adding a project

1. Put `<Name>Logo.png` and `<Name>.png` (screenshot) in `src/assets/projects/`.
2. Import both in `src/assets/projects/index.ts` and add them to `LOGOS` (`<Name>Logo`) and `SCREENSHOTS` (`<Name>Shots`).
3. Add an entry to `PROJECTS_LIST` in `ProjectsList.ts` using `LOGOS.<Name>Logo` and `SCREENSHOTS.<Name>Shots`.
4. Tech icons come from `TECH_STACK["…"]`. The key is the skill name with spaces and dots removed (`React.js` → `Reactjs`, `Tailwind CSS` → `TailwindCSS`). Scikit‑Learn uses a non-breaking hyphen, so copy it exactly. A missing icon goes in `src/assets/skills/` and `skillStack.ts` first.
5. Status: `"completed"` shows a **LIVE** badge, `"development"` shows **NOT LIVE**. There is no live check. The badge only reflects this field. For undeployed projects, `liveUrl` still needs a value (the repo URL works) because the card's external-link button uses it.

The project page URL is the name lowercased with spaces turned into dashes, and it is added to the sitemap on the next build.

#### Adding an internship

Add an entry to `INTERNSHIP_LIST` in `InternshipList.ts`. `endDate`, `location`, `logoImage`, `companyUrl` and `proofLink` are optional. Without a logo, a letter badge is shown. To add one, drop the PNG in `src/assets/internships/` and export it from that folder's `index.ts`.

## SEO

- **Site-wide defaults** live in `siteConfig` in `portfolio.config.ts`.
- **`index.html`** has its own static copies of the title, description, Open Graph/Twitter tags, keywords and the Person JSON-LD. Vite and Node scripts can't import `portfolio.config.ts` there, so **edit both places** when you change the title, description or keywords.
- **Project pages** set their own title, meta description (the project's `shortDescription`), canonical URL, preview image and JSON-LD at runtime via `ProjectLayout`.
- **`public/sitemap.xml`** is regenerated by `npm run build` from `ProjectsList.ts` (hidden projects are skipped). Don't hand-edit it.
- Set `googleSiteVerification` in `siteConfig` and add the matching tag to `index.html` once you have a Search Console code.

## Deployment

The live site is hosted on Netlify at <https://rohityadav483.netlify.app/> and redeploys automatically on every push to `main`. If you change the site URL, update `siteConfig` in `portfolio.config.ts`, `index.html` and `public/robots.txt` (the sitemap regenerates on build).

A `netlify.toml` is included (build command `npm run build`, publish dir `dist`). To deploy:

1. Push this repo to GitHub.
2. **Netlify**: "Add new site" → import from Git → it auto-detects `netlify.toml`. Add the three `VITE_EMAILJS_*` env vars in Site settings → Environment, then deploy.
3. **Vercel**: import the repo, it auto-detects Vite (build `npm run build`, output `dist`). Same env vars in project settings.
4. **Any static host**: run `npm run build` locally with the env vars set, upload `dist/`.

Since this uses client-side routing (React Router), make sure your host rewrites all paths to `/index.html` (a SPA fallback rule), or deep links like `/projects/some-project` will 404 on refresh.

After deploying, add the live domain to EmailJS **Allowed Origins** (see above).

## Requirements

- Node 22 (see `netlify.toml`)
- npm