// Shared between browser code (ThemeContext, ThemeDropdown) and the Node-only
// scripts/generateThemes.ts build script. Kept dependency-free (no fs/path)
// so it's safe to import from client bundles — see bug #2 in migration notes:
// ThemeContext previously imported these straight from generateThemes.ts,
// which pulls in `fs`/`path` and self-executes on import.
export const ThemeOptions = {
    CUSTOM: "custom",
    DEFAULT: "default",
    OCEAN: "ocean",
    FOREST: "forest",
    SUNSET: "sunset",
} as const;

export type ThemeOptionType = (typeof ThemeOptions)[keyof typeof ThemeOptions];
