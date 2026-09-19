// scripts/generateSitemap.ts imports PROJECTS_LIST from
// src/constants/ProjectsList.ts, which imports logo/screenshot/
// mockup images and skill icon SVGs. Under Vite those resolve to URL strings;
// plain Node has no loader for binary asset files and crashes with
// ERR_UNKNOWN_FILE_EXTENSION. Neither script ever touches image data — they
// only need name/liveUrl/status — so this loader stubs those imports out as
// their file path string, the same shape Vite would give them.
const ASSET_EXTENSIONS = /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/;

export async function load(url, context, nextLoad) {
    if (ASSET_EXTENSIONS.test(url)) {
        return {
            format: 'module',
            shortCircuit: true,
            source: `export default ${JSON.stringify(url)};`,
        };
    }
    return nextLoad(url, context);
}
