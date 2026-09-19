import { useCallback } from "react";
import { flushSync } from "react-dom";
import { Sun, MoonStar } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeButtonProps {
    className?: string;
}

interface GsapTween {
    resume?: () => void;
}

declare global {
    interface Window {
        gsap?: {
            globalTimeline: {
                getChildren: (
                    recursive: boolean,
                    includeTimelines: boolean,
                    ignoreBeforeTime: boolean,
                ) => GsapTween[];
            };
        };
    }
}

/**
 * Toggles light/dark mode with a circular View-Transition wipe.
 *
 * @credits
 * Circular expansion transition animation inspired by Ramkrishna Swarnkar (@ramxcodes)
 * - Portfolio: https://ramx.in/
 * - GitHub: https://github.com/ramxcodes
 * - Original Implementation: https://github.com/ramxcodes/sleek-portfolio
 */
export default function ThemeButton({ className }: ThemeButtonProps) {
    const { mode, toggleMode } = useTheme();

    const handleToggle = useCallback(
        async (event: React.MouseEvent<HTMLButtonElement>) => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (!document.startViewTransition || prefersReducedMotion) {
                toggleMode();
                return;
            }

            const button = event.currentTarget;
            const { top, left, width, height } =
                button.getBoundingClientRect();
            const x = left + width / 2;
            const y = top + height / 2;
            const endRadius = Math.hypot(
                Math.max(x, window.innerWidth - x),
                Math.max(y, window.innerHeight - y),
            );

            // Preserve GSAP animations across the transition (they pause
            // by default while a view transition is in flight).
            const gsapTweens = window.gsap
                ? window.gsap.globalTimeline.getChildren(true, true, false)
                : [];

            // React state updates are async; the view-transition callback
            // needs the DOM mutation to happen synchronously inside it,
            // so we flushSync the context update.
            const transition = document.startViewTransition(() => {
                flushSync(() => toggleMode());
            });

            await transition.ready;

            gsapTweens.forEach((tween) => {
                if (tween && typeof tween.resume === "function") {
                    tween.resume();
                }
            });

            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${endRadius}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration: 800,
                    easing: "ease-in-out",
                    pseudoElement: "::view-transition-new(root)",
                },
            );

            // Consolidated with useLenis's mobile-nav-close convention (§7)
            // instead of the original's dead "closeMobileNav" event.
            document.dispatchEvent(
                new CustomEvent("portfolio:close-mobile-nav"),
            );
        },
        [toggleMode],
    );

    return (
        <button
            type="button"
            title="Toggle Theme"
            onClick={handleToggle}
            className={`aspect-square w-8 h-8 outline-2 outline-primaryLiteAlt rounded-full relative flex_center cursor-pointer ${className ?? ""}`}
        >
            <Sun
                size={24}
                strokeWidth={2}
                className="lucide lucide-sun absolute"
                style={{ visibility: mode === "light" ? "visible" : "hidden" }}
            />
            <MoonStar
                size={24}
                strokeWidth={2}
                className="lucide lucide-moon-star absolute"
                style={{ visibility: mode === "dark" ? "visible" : "hidden" }}
            />
        </button>
    );
}