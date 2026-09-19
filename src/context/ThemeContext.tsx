import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { ThemeOptions, type ThemeOptionType } from "@/constants/themeOptions";
import { themeConfig } from "@constants/portfolio.config";

export type ThemeMode = "light" | "dark";

// Must match the blocking inline script in index.html exactly.
const THEME_MODE_KEY = "rohityadav_483-portfolio-theme";
const THEME_NAME_KEY = "rohityadav_483-portfolio-theme-name";

const DEFAULT_THEME: ThemeOptionType = themeConfig; // ThemeOptions.DEFAULT ("default")
const DEFAULT_MODE: ThemeMode = "dark";

function applyThemeClass(theme: ThemeOptionType, mode: ThemeMode) {
    document.documentElement.className = `theme-${theme} ${mode}`;
}

function readStoredTheme(): ThemeOptionType {
    const stored = localStorage.getItem(THEME_NAME_KEY) as ThemeOptionType | null;
    const valid = Object.values(ThemeOptions) as string[];
    return stored && valid.includes(stored) ? stored : DEFAULT_THEME;
}

function readStoredMode(): ThemeMode {
    const stored = localStorage.getItem(THEME_MODE_KEY);
    return stored === "light" || stored === "dark" ? stored : DEFAULT_MODE;
}

interface ThemeContextValue {
    theme: ThemeOptionType;
    mode: ThemeMode;
    setTheme: (theme: ThemeOptionType) => void;
    setMode: (mode: ThemeMode) => void;
    toggleMode: () => void;
    prefersReducedMotion: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    // Read from localStorage on mount (the blocking inline script in index.html
    // already applied the class synchronously before React hydrates, so there is
    // no FOUC — this just brings React's state in sync with what's on <html>).
    const [theme, setThemeState] = useState<ThemeOptionType>(() =>
        typeof window !== "undefined" ? readStoredTheme() : DEFAULT_THEME
    );
    const [mode, setModeState] = useState<ThemeMode>(() =>
        typeof window !== "undefined" ? readStoredMode() : DEFAULT_MODE
    );
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mql.matches);
        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        applyThemeClass(theme, mode);
        localStorage.setItem(THEME_NAME_KEY, theme);
        localStorage.setItem(THEME_MODE_KEY, mode);
    }, [theme, mode]);

    // Cross-tab sync: another tab changing theme/mode updates this one.
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === THEME_NAME_KEY && e.newValue) {
                setThemeState(e.newValue as ThemeOptionType);
            } else if (e.key === THEME_MODE_KEY && (e.newValue === "light" || e.newValue === "dark")) {
                setModeState(e.newValue);
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const setTheme = useCallback((next: ThemeOptionType) => setThemeState(next), []);
    const setMode = useCallback((next: ThemeMode) => setModeState(next), []);
    const toggleMode = useCallback(
        () => setModeState((prev) => (prev === "dark" ? "light" : "dark")),
        []
    );

    return (
        <ThemeContext.Provider value={{ theme, mode, setTheme, setMode, toggleMode, prefersReducedMotion }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
    return ctx;
}