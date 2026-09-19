import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { PROJECTS_LIST } from '../src/config/ProjectsList';

type ProjectStatus = 'LIVE' | 'DOWN' | 'BUILDING';

const OUTPUT_PATH = join(process.cwd(), 'src', 'generated', 'projectStatus.json');

/**
 * Ported from ProjectCard.astro's build-time per-project HEAD check — that
 * ran server-side in Astro and cannot run in the browser (CORS blocks HEAD
 * requests to Streamlit/HuggingFace etc., per tracker §9.11). Same logic,
 * moved to a prebuild script writing a static JSON map instead, so the
 * status is baked in exactly the way Astro did it.
 */
async function checkStatus(liveUrl: string): Promise<'LIVE' | 'DOWN'> {
    try {
        const res = await fetch(liveUrl, { method: 'HEAD', redirect: 'follow' });
        return res.ok ? 'LIVE' : 'DOWN';
    } catch {
        return 'DOWN';
    }
}

async function main() {
    const statusMap: Record<string, ProjectStatus> = {};

    await Promise.all(
        PROJECTS_LIST.map(async (project) => {
            const slug = project.name.replaceAll(' ', '-').toLowerCase();

            statusMap[slug] =
                project.status === 'development' ? 'BUILDING' : await checkStatus(project.liveUrl);
        }),
    );

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, JSON.stringify(statusMap, null, 2) + '\n', 'utf-8');

    console.log(`[checkProjectStatus] wrote ${Object.keys(statusMap).length} project statuses →`, OUTPUT_PATH);
}

main().catch((err) => {
    console.error('[checkProjectStatus] failed:', err);
    process.exit(1);
});