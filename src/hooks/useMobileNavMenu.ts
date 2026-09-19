import { useEffect, useRef } from 'react';

interface UseMobileNavMenuOptions {
    /**
     * true (MobileHeader, home page): hash links get preventDefault + closeMenu
     * + 750ms-delayed smooth scrollIntoView; non-hash links just close.
     * false (ProjectsHeader): every link just closes the menu and keeps its
     * default full-page navigation — matches the Astro original's plain <a>
     * behavior for `/#about` etc.
     */
    smoothScrollHashLinks?: boolean;
}

function getGeometry(hamSvg: SVGSVGElement) {
    const hamRect = hamSvg.getBoundingClientRect();
    const vv = window.visualViewport;

    const x = hamRect.left + hamRect.width / 2 + (vv?.offsetLeft || 0);
    const y = hamRect.top + hamRect.height / 2 + (vv?.offsetTop || 0);
    const vw = vv?.width || window.innerWidth;
    const vh = vv?.height || window.innerHeight;
    const endRadius = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y));

    return { x, y, endRadius };
}

/**
 * Ported from MobileHeader.astro / ProjectsHeader.astro's inline mobile-menu
 * script: circular-reveal open/close via WAAPI, staggered item fade-in.
 * Bug #26 fix: hamburger click listener lives on the <button>, not the <svg>
 * (drops the old `e.target.closest('#Ham_Menu')` workaround entirely).
 * Bug #4 fix: also listens for the shared `portfolio:close-mobile-nav` event
 * that useLenis (§7) and ThemeButton (§9) already dispatch, so toggling
 * theme or navigating closes an open mobile menu instead of leaving it dead.
 */
export function useMobileNavMenu({ smoothScrollHashLinks = false }: UseMobileNavMenuOptions = {}) {
    const navRef = useRef<HTMLElement>(null);
    const hamButtonRef = useRef<HTMLButtonElement>(null);
    const hamSvgRef = useRef<SVGSVGElement>(null);
    const isOpenRef = useRef(false);

    const openMenu = () => {
        const navEl = navRef.current;
        const hamSvg = hamSvgRef.current;
        if (isOpenRef.current || !navEl || !hamSvg) return;

        isOpenRef.current = true;
        hamSvg.classList.add('isOpen');
        navEl.style.pointerEvents = 'auto';
        document.body.style.overflow = 'hidden';

        const { x, y, endRadius } = getGeometry(hamSvg);
        const menuItems = navEl.querySelectorAll('.MobileHeader_Nav');

        navEl.animate(
            {
                clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
                opacity: [0, 1],
                backgroundColor: ['var(--background)', 'var(--primaryLite)'],
            },
            { duration: 800, easing: 'ease-in-out', fill: 'forwards' },
        );

        menuItems.forEach((item, i) => {
            item.animate(
                { opacity: [0, 1], transform: ['translateY(40px)', 'translateY(0)'] },
                { duration: 400, easing: 'ease-out', fill: 'forwards', delay: 200 + i * 80 },
            );
        });
    };

    const closeMenu = () => {
        const navEl = navRef.current;
        const hamSvg = hamSvgRef.current;
        if (!isOpenRef.current || !navEl || !hamSvg) return;

        isOpenRef.current = false;
        hamSvg.classList.remove('isOpen');
        document.body.style.overflow = '';

        const { x, y, endRadius } = getGeometry(hamSvg);
        const menuItems = navEl.querySelectorAll('.MobileHeader_Nav');

        menuItems.forEach((item, i) => {
            item.animate(
                { opacity: [1, 0], transform: ['translateY(0)', 'translateY(-20px)'] },
                { duration: 250, easing: 'ease-in', fill: 'forwards', delay: (menuItems.length - i - 1) * 40 },
            );
        });

        const anim = navEl.animate(
            {
                clipPath: [`circle(${endRadius}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`],
                opacity: [1, 0],
                backgroundColor: ['var(--primaryLite)', 'var(--background)'],
            },
            { duration: 700, easing: 'ease-in-out', fill: 'forwards' },
        );

        anim.onfinish = () => {
            navEl.style.pointerEvents = 'none';
            navEl.style.opacity = '0';
            navEl.style.clipPath = 'circle(0px at calc(100% - 45px) 45px)';
            navEl.style.backgroundColor = 'var(--background)';
        };
    };

    const resetMenu = () => {
        const navEl = navRef.current;
        const hamSvg = hamSvgRef.current;
        if (!navEl || !hamSvg) return;

        isOpenRef.current = false;
        hamSvg.classList.remove('isOpen');
        document.body.style.overflow = '';
        navEl.style.pointerEvents = 'none';
        navEl.style.opacity = '0';
        navEl.style.clipPath = 'circle(0px at calc(100% - 45px) 45px)';
        navEl.style.backgroundColor = 'var(--background)';
    };

    useEffect(() => {
        const navEl = navRef.current;
        const hamButton = hamButtonRef.current;
        if (!navEl || !hamButton) return;

        const handleHamClick = (e: MouseEvent) => {
            e.stopPropagation();
            if (isOpenRef.current) closeMenu();
            else openMenu();
        };
        hamButton.addEventListener('click', handleHamClick);

        const handleHashLinkClick = (e: MouseEvent) => {
            const link = e.currentTarget as HTMLAnchorElement;
            const href = link.getAttribute('href');
            if (!href) return;
            e.preventDefault();
            closeMenu();
            setTimeout(() => {
                document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
            }, 750);
        };
        const handleCloseOnly = () => closeMenu();

        const hashLinks = smoothScrollHashLinks
            ? Array.from(navEl.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'))
            : [];
        const closeOnlyLinks = smoothScrollHashLinks
            ? Array.from(navEl.querySelectorAll<HTMLAnchorElement>('a:not([href^="#"])'))
            : Array.from(navEl.querySelectorAll<HTMLAnchorElement>('a'));

        hashLinks.forEach((link) => link.addEventListener('click', handleHashLinkClick));
        closeOnlyLinks.forEach((link) => link.addEventListener('click', handleCloseOnly));

        const handlePageshow = () => resetMenu();
        const handleVisibility = () => {
            if (!document.hidden) resetMenu();
        };
        const handleCloseEvent = () => closeMenu();

        window.addEventListener('pageshow', handlePageshow);
        document.addEventListener('visibilitychange', handleVisibility);
        window.addEventListener('portfolio:close-mobile-nav', handleCloseEvent);

        resetMenu();

        return () => {
            hamButton.removeEventListener('click', handleHamClick);
            hashLinks.forEach((link) => link.removeEventListener('click', handleHashLinkClick));
            closeOnlyLinks.forEach((link) => link.removeEventListener('click', handleCloseOnly));
            window.removeEventListener('pageshow', handlePageshow);
            document.removeEventListener('visibilitychange', handleVisibility);
            window.removeEventListener('portfolio:close-mobile-nav', handleCloseEvent);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [smoothScrollHashLinks]);

    return { navRef, hamButtonRef, hamSvgRef };
}