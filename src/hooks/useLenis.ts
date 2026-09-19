import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Mount once in the root layout. Ported from script.ts's Smooth Scroll
 * region. Returns a ref to the Lenis instance so other components/hooks
 * (e.g. a "scroll to section" button) can call lenisRef.current?.scrollTo(...).
 */
export function useLenis() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis();
        lenisRef.current = lenis;

        lenis.on("scroll", ScrollTrigger.update);

        const raf = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        // Ported verbatim from script.ts's anchor-click interceptor, but
        // attached as one delegated listener on document instead of a
        // listener per-anchor (tracker §7.5: anchors can re-render in React).
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            const anchor = target?.closest<HTMLAnchorElement>(
                'nav a[href^="#"], a[href^="#home"]'
            );
            if (!anchor) return;

            const href = anchor.getAttribute("href");
            if (!href || !href.startsWith("#")) return;

            e.preventDefault();
            const id = href.slice(1);
            if (!id) return;

            const scrollTarget = document.getElementById(id);
            if (!scrollTarget) return;

            const targetTop = scrollTarget.getBoundingClientRect().top + window.scrollY;
            const triggers = ScrollTrigger.getAll();

            // Force-complete every ScrollTrigger animation whose trigger sits
            // above the scroll target, so jumping down the page doesn't land
            // on a wall of un-animated content. Load-bearing — keep exact.
            triggers.forEach((trigger) => {
                if (!trigger.trigger) return;
                const triggerTop = trigger.trigger.getBoundingClientRect().top + window.scrollY;
                if (triggerTop < targetTop && trigger.animation) {
                    trigger.animation.progress(1, false);
                }
            });

            lenis.scrollTo(scrollTarget);

            // Original directly toggled the mobile nav's own module-scope
            // state (isMenuOpen / HamMenuButton) here. That nav is rebuilt as
            // a React component in Section 9, so instead of reaching into
            // its internals this dispatches an event; the mobile nav
            // component listens for it and closes itself if (and only if)
            // it's actually open — which preserves the original's
            // "only close nav if menu is actually open" guard.
            if (window.innerWidth < 1024) {
                document.dispatchEvent(new CustomEvent("portfolio:close-mobile-nav"));
            }
        };

        document.addEventListener("click", handleAnchorClick);

        return () => {
            document.removeEventListener("click", handleAnchorClick);
            gsap.ticker.remove(raf);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return lenisRef;
}