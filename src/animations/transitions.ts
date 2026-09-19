import type { gsap } from "gsap";

type Transition = {
    from: gsap.TweenVars;
    to: gsap.TweenVars;
};

export const transitions: Record<
    | "SpringUp"
    | "Stagger"
    | "FadeUp"
    | "FadeDown"
    | "FadeDownHeader"
    | "FadeIn"
    | "MobileLink",
    Transition
> = {
    SpringUp: {
        from: {
            opacity: 0,
            scale: 0.75,
        },
        to: {
            ease: "elastic.out(0.6,0.14)",
            opacity: 1,
            scale: 1,
            duration: 4.25,
            delay: 1.25,
            stagger: 0.15,
            scrollTrigger: {
                trigger: ".Spring_Up",
            },
        },
    },
    Stagger: {
        from: {
            opacity: 0,
            y: 50,
        },
        to: {
            opacity: 1,
            y: 0,
            delay: 0.125,
            duration: 1.125,
            stagger: 0.125,
            ease: "power2.out",
        },
    },
    FadeUp: {
        from: {
            opacity: 0,
            y: 50,
        },
        to: {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
        },
    },
    FadeDown: {
        from: {
            opacity: 0,
            y: -50,
        },
        to: {
            opacity: 1,
            y: 0,
            delay: 0.25,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
        },
    },
    FadeDownHeader: {
        from: {
            opacity: 0,
            y: -50,
        },
        to: {
            opacity: 1,
            y: 0,
            delay: 0.25,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
        },
    },
    FadeIn: {
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
            duration: 1,
            stagger: 0.125,
            ease: "power1.out",
        },
    },
    MobileLink: {
        from: {
            y: 100,
            opacity: 0,
        },
        to: {
            y: 0,
            opacity: 1,
            duration: 0.3,
            delay: 0.25,
            stagger: 0.1,
            ease: "power1.out",
        },
    },
};