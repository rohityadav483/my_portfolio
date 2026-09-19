import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TrailSpin {
    duration: number;
    direction: 1 | -1;
}

// Trail1 6s +360, Trail2 8s -360, Trail3 10s +360, Trail4 12s -360
const TRAIL_SPINS: TrailSpin[] = [
    { duration: 6, direction: 1 },
    { duration: 8, direction: -1 },
    { duration: 10, direction: 1 },
    { duration: 12, direction: -1 },
];

/**
 * Ported from script.ts §7.7. Targets #avatarImage + .Trail1–.Trail4 via
 * refs instead of querySelector. State flags (isPressed/isScalingDown/
 * pendingSpringUp) kept as refs, not state, per tracker — must not trigger
 * re-renders.
 */
export function useHeroOrbit() {
    const orbitRef = useRef<HTMLDivElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);
    const trailRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

    const isPressedRef = useRef(false);
    const isScalingDownRef = useRef(false);
    const pendingSpringUpRef = useRef(false);

    const setTrailRef = (index: number) => (el: HTMLDivElement | null) => {
        trailRefs.current[index] = el;
    };

    useEffect(() => {
        const orbit = orbitRef.current;
        const avatar = avatarRef.current;
        const trails = trailRefs.current;
        if (!orbit || !avatar || trails.some((t) => !t)) return;

        const allSpringUp = [avatar, ...trails] as HTMLElement[];

        allSpringUp.forEach((el) => {
            el.classList.add('spring-element-performance');
            gsap.set(el, { force3D: true });
        });
        gsap.set(allSpringUp, { transformOrigin: 'center center', force3D: true });

        const startInfiniteRotations = () => {
            trails.forEach((trail, i) => {
                if (!trail) return;
                const { duration, direction } = TRAIL_SPINS[i];
                gsap.to(trail, {
                    rotation: `${direction > 0 ? '+=' : '-='}360`,
                    duration,
                    repeat: -1,
                    ease: 'linear',
                    force3D: true,
                    overwrite: 'auto',
                });
            });
        };

        const triggerSpringUp = () => {
            gsap.to(allSpringUp, {
                scale: 1,
                duration: 4.25,
                ease: 'elastic.out(0.8, 0.2)',
                stagger: 0.1,
                overwrite: 'auto',
                onStart: startInfiniteRotations,
            });
        };

        const trigger = ScrollTrigger.create({
            trigger: orbit,
            start: 'top bottom',
            once: true,
            onEnter: () => {
                gsap.fromTo(
                    allSpringUp,
                    { opacity: 0, scale: 0.75, rotation: 0 },
                    {
                        opacity: 1,
                        scale: 1,
                        rotation: 0,
                        duration: 4.25,
                        delay: 1.25,
                        ease: 'elastic.out(0.8, 0.2)',
                        stagger: 0.15,
                        force3D: true,
                        onStart: startInfiniteRotations,
                    },
                );
            },
        });

        const onPressStart = () => {
            if (isPressedRef.current) return;
            isPressedRef.current = true;
            isScalingDownRef.current = true;

            gsap.to(allSpringUp, {
                scale: 0.75,
                duration: 0.15,
                ease: 'power2.out',
                stagger: { amount: 0.06, ease: 'power2.inOut' },
                overwrite: 'auto',
                onComplete: () => {
                    isScalingDownRef.current = false;
                    if (pendingSpringUpRef.current) {
                        pendingSpringUpRef.current = false;
                        triggerSpringUp();
                    }
                },
            });
        };

        const onPressEnd = () => {
            if (!isPressedRef.current) return;
            isPressedRef.current = false;

            if (isScalingDownRef.current) {
                pendingSpringUpRef.current = true;
            } else {
                triggerSpringUp();
            }
        };

        const onContextMenu = (e: Event) => e.preventDefault();

        avatar.addEventListener('mousedown', onPressStart, { passive: true });
        avatar.addEventListener('mouseup', onPressEnd, { passive: true });
        avatar.addEventListener('mouseleave', onPressEnd, { passive: true });
        avatar.addEventListener('touchstart', onPressStart, { passive: true });
        avatar.addEventListener('touchend', onPressEnd, { passive: true });
        avatar.addEventListener('touchcancel', onPressEnd, { passive: true });
        avatar.addEventListener('contextmenu', onContextMenu);

        return () => {
            trigger.kill();
            gsap.killTweensOf(allSpringUp);
            avatar.removeEventListener('mousedown', onPressStart);
            avatar.removeEventListener('mouseup', onPressEnd);
            avatar.removeEventListener('mouseleave', onPressEnd);
            avatar.removeEventListener('touchstart', onPressStart);
            avatar.removeEventListener('touchend', onPressEnd);
            avatar.removeEventListener('touchcancel', onPressEnd);
            avatar.removeEventListener('contextmenu', onContextMenu);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { orbitRef, avatarRef, setTrailRef };
}