import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { transitions } from "@/animations/transitions";

/** Ported verbatim from script.ts */
function isElementAboveViewport(element: Element): boolean {
    const rect = element.getBoundingClientRect();
    return rect.bottom < 0;
}

/** Ported verbatim from script.ts */
function handleBatchAnimation(
    elements: Element[],
    fromProps: gsap.TweenVars,
    toProps: gsap.TweenVars
) {
    const aboveViewport: Element[] = [];
    const toAnimate: Element[] = [];

    elements.forEach((el) => {
        if (isElementAboveViewport(el)) {
            aboveViewport.push(el);
        } else {
            toAnimate.push(el);
        }
    });

    if (aboveViewport.length > 0) {
        gsap.set(aboveViewport, { opacity: 1, y: 0 });
    }

    if (toAnimate.length > 0) {
        gsap.fromTo(toAnimate, fromProps, toProps);
    }
}

/** Ported verbatim from script.ts */
function initializeVisibleElements() {
    const allAnimatedElements = document.querySelectorAll(
        ".Fade_Stagger, .Project_Stagger, .Fade_Up, .Fade_Down, .Fade_In"
    );

    allAnimatedElements.forEach((element) => {
        if (isElementAboveViewport(element)) {
            gsap.set(element, { opacity: 1, y: 0 });
        }
    });
}

/**
 * Mount once in the root layout. Registers the five ScrollTrigger.batch()
 * groups from script.ts and cleans them up on unmount.
 *
 * SPA note (tracker §7.4 warning): Astro had full page loads, so batches
 * were only ever registered once per navigation. In the SPA, whichever
 * component mounts this hook is responsible for triggering
 * ScrollTrigger.refresh() after route changes that add/remove animated
 * elements (wired once the router exists in Section 13) so newly-mounted
 * .Fade_* elements get measured correctly.
 */
export function useScrollAnimations() {
    useEffect(() => {
        const batches = [
            ScrollTrigger.batch(".Fade_Stagger", {
                start: "top bottom-=100px",
                interval: 0.1,
                onEnter: (elements) =>
                    handleBatchAnimation(elements, transitions.Stagger.from, transitions.Stagger.to),
                once: true,
            }),
            ScrollTrigger.batch(".Project_Stagger", {
                start: "top bottom-=100px",
                onEnter: (elements) =>
                    handleBatchAnimation(elements, { opacity: 0, y: 50 }, {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        delay: 0.25,
                        stagger: {
                            grid: "auto",
                            each: 0.125,
                        },
                    }),
                once: true,
            }),
            ScrollTrigger.batch(".Fade_Up", {
                start: "top bottom-=100px",
                onEnter: (elements) =>
                    handleBatchAnimation(elements, transitions.FadeUp.from, transitions.FadeUp.to),
                once: true,
            }),
            ScrollTrigger.batch(".Fade_Down", {
                start: "top bottom-=100px",
                onEnter: (elements) =>
                    handleBatchAnimation(elements, transitions.FadeDown.from, transitions.FadeDown.to),
                once: true,
            }),
            ScrollTrigger.batch(".Fade_In", {
                onEnter: (elements) =>
                    handleBatchAnimation(elements, transitions.FadeIn.from, transitions.FadeIn.to),
                once: true,
            }),
        ].flat();

        // .Fade_Down_Header has no ScrollTrigger — direct animation on mount
        const headerFadeDownElements = Array.from(
            document.querySelectorAll<HTMLElement>(".Fade_Down_Header")
        );
        if (headerFadeDownElements.length > 0) {
            gsap.set(headerFadeDownElements, transitions.FadeDownHeader.from);
            gsap.to(headerFadeDownElements, { ...transitions.FadeDownHeader.to });
        }

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", initializeVisibleElements);
        } else {
            initializeVisibleElements();
        }

        ScrollTrigger.addEventListener("refresh", initializeVisibleElements);

        return () => {
            batches.forEach((trigger) => trigger.kill());
            document.removeEventListener("DOMContentLoaded", initializeVisibleElements);
            ScrollTrigger.removeEventListener("refresh", initializeVisibleElements);
        };
    }, []);
}