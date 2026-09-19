import { useEffect, useRef, type RefObject } from 'react';

type ScrollSpyMode = { type: 'debounce'; delay: number } | { type: 'throttle'; limit: number };

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'contact'] as const;

function debounce<T extends (...args: unknown[]) => void>(func: T, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: unknown, ...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function throttle<T extends (...args: unknown[]) => void>(func: T, limit: number) {
    let throttling = false;
    return function (this: unknown, ...args: Parameters<T>) {
        if (!throttling) {
            func.apply(this, args);
            throttling = true;
            setTimeout(() => {
                throttling = false;
            }, limit);
        }
    };
}

/**
 * Ported from Header.astro / MobileHeader.astro's inline scroll-spy script.
 * Toggles `.active` on nav links inside `navRef` whose href matches a
 * section currently crossing the header's bottom edge.
 * Bug #2 fix: loop uses `continue` instead of `return` on a missing section.
 */
export function useScrollSpy(
    headerRef: RefObject<HTMLElement | null>,
    navRef: RefObject<HTMLElement | null>,
    mode: ScrollSpyMode,
) {
    const headerHeightRef = useRef(0);

    useEffect(() => {
        const headerEl = headerRef.current;
        const navEl = navRef.current;
        if (!headerEl || !navEl) return;

        headerHeightRef.current = headerEl.offsetHeight;

        const sections = SECTION_IDS.map((id) => ({
            href: `#${id}`,
            el: document.getElementById(id),
        }));

        const handleScroll = () => {
            for (const { href, el } of sections) {
                if (!el) continue; // bug #2: was `return`, silently killed the whole loop

                const rect = el.getBoundingClientRect();
                const link = navEl.querySelector(`a[href="${href}"]`);
                const inView = rect.top <= headerHeightRef.current && rect.bottom >= headerHeightRef.current;

                link?.classList.toggle('active', inView);
            }
        };

        const scheduled =
            mode.type === 'debounce' ? debounce(handleScroll, mode.delay) : throttle(handleScroll, mode.limit);

        window.addEventListener('scroll', scheduled);
        handleScroll();

        return () => window.removeEventListener('scroll', scheduled);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headerRef, navRef, mode.type, mode.type === 'debounce' ? mode.delay : mode.limit]);
}