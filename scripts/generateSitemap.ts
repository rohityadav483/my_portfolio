import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { PROJECTS_LIST } from '../src/constants/ProjectsList';
import { siteConfig } from '../src/constants/portfolio.config';

const OUTPUT_PATH = join(process.cwd(), 'public', 'sitemap.xml');

function slugify(name: string) {
    return name.replaceAll(' ', '-').toLowerCase();
}

async function main() {
    const now = new Date().toISOString();
    const base = siteConfig.siteUrl.replace(/\/$/, '');

    const staticRoutes = [
        { loc: `${base}/`, priority: '1.00' },
        { loc: `${base}/projects`, priority: '0.90' },
    ];

    const projectRoutes = PROJECTS_LIST.filter((p) => !p.isHidden).map((p) => ({
        loc: `${base}/projects/${slugify(p.name)}`,
        priority: '0.80',
    }));

    const urls = [...staticRoutes, ...projectRoutes]
        .map(
            ({ loc, priority }) =>
                `\t<url>\n\t\t<loc>${loc}</loc>\n\t\t<lastmod>${now}</lastmod>\n\t\t<priority>${priority}</priority>\n\t</url>`,
        )
        .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n${urls}\n</urlset>\n`;

    await writeFile(OUTPUT_PATH, xml, 'utf-8');
    console.log(`[generateSitemap] wrote ${staticRoutes.length + projectRoutes.length} URLs →`, OUTPUT_PATH);
}

main().catch((err) => {
    console.error('[generateSitemap] failed:', err);
    process.exit(1);
});