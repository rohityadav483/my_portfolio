import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Runs once, at module-evaluation time (module cache guarantees this isn't
// re-run on re-import), so it's safe from React StrictMode's effect
// double-invoke in dev. Ported verbatim from script.ts's GSAP Config region.
gsap.registerPlugin(ScrollTrigger);
gsap.config({
    force3D: true,
    nullTargetWarn: false,
});
gsap.defaults({
    ease: "power2.out",
    duration: 1,
});

/**
 * Ensures GSAP is configured. Import and call once near the root
 * (e.g. in App.tsx) so the side effect above is guaranteed to have run
 * before any other animation hook uses gsap/ScrollTrigger.
 */
export function useGsapConfig() {
    // Intentionally empty — configuration happens on module import above.
}