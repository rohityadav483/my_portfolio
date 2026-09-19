import { useEffect, useRef } from 'react';

export default function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;
        const rippleTimeouts = new Set<ReturnType<typeof setTimeout>>();

        function handleMouseMove(evt: MouseEvent) {
            if (window.innerWidth < 1024) return;
            if (!cursor || !cursorDot) return;

            const x = evt.clientX - cursor.offsetWidth / 2;
            const y = evt.clientY - cursor.offsetHeight / 2;
            const xDot = evt.clientX - cursorDot.offsetWidth / 2;
            const yDot = evt.clientY - cursorDot.offsetHeight / 2;

            cursor.animate(
                { transform: `translate3d(${x}px, ${y}px, 0)` },
                { duration: 500, easing: 'ease-in-out', fill: 'forwards' },
            );
            cursorDot.animate(
                { transform: `translate3d(${xDot}px, ${yDot}px, 0)` },
                { duration: 100, easing: 'ease-out', fill: 'forwards' },
            );
        }

        function handleMouseClick() {
            if (!cursor) return;

            const ripple = document.createElement('span');
            ripple.classList.add(
                'absolute',
                'w-[200%]',
                'aspect-square',
                'rounded-full',
                'bg-[var(--orbitDotColor)]',
                'opacity-0',
                'animate-ripple',
            );
            cursor.appendChild(ripple);

            const timeoutId = setTimeout(() => {
                rippleTimeouts.delete(timeoutId);
                if (ripple.parentNode === cursor) {
                    cursor.removeChild(ripple);
                }
            }, 1000);
            rippleTimeouts.add(timeoutId);
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', handleMouseClick);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', handleMouseClick);
            rippleTimeouts.forEach((id) => clearTimeout(id));
            rippleTimeouts.clear();
        };
    }, []);

    return (
        <div className="Cursor-Main hidden lg:block">
            <div id="cursor" ref={cursorRef} className="relative flex_center">
                <div id="cursorView" className="flex_center">
                    View
                </div>
            </div>
            <div id="cursorDot" ref={cursorDotRef}></div>
        </div>
    );
}