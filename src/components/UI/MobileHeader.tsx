import { Download } from 'lucide-react';
import { useRef } from 'react';
import ThemeButton from './ThemeButton';
import ThemeDropdown from './ThemeDropdown';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useMobileNavMenu } from '@/hooks/useMobileNavMenu';
import type { HeaderConfig } from './Header';

interface MobileHeaderProps {
    config: HeaderConfig;
}

const NAV_ITEMS = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#internship', label: 'Internship' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
];

export default function MobileHeader({ config }: MobileHeaderProps) {
    const headerRef = useRef<HTMLElement>(null);
    const { navRef, hamButtonRef, hamSvgRef } = useMobileNavMenu({ smoothScrollHashLinks: true });

    useScrollSpy(headerRef, navRef, { type: 'throttle', limit: 16 });

    return (
        <header
            ref={headerRef}
            className="lg:hidden w-full sticky top-0 z-50 headerGradient backdrop-blur-[2px]"
        >
            <div className="flex justify-between items-center py-2 px-4 z-10">
                <a href="#home" className="Fade_In font-satisfy font-bold text-[2em]">
                    <span className="gradientText w-fit">{config.logotext}</span>
                </a>

                <div className="flex items-center gap-4">
                    <ThemeDropdown className="Fade_In" idPrefix="Mobile" />
                    <ThemeButton className="Fade_In" />

                    <button ref={hamButtonRef} id="Ham_Menu" aria-label="Toggle Menu">
                        <svg
                            ref={hamSvgRef}
                            viewBox="20 20 60 60"
                            width="45"
                            className="Fade_In MobileNav_Ham flex justify-center items-end flex-col gap-2 z-80 cursor-pointer"
                        >
                            <path
                                className="line top"
                                d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
                            />
                            <path className="line middle" d="m 30,50 h 40" />
                            <path
                                className="line bottom"
                                d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="backdrop-blur-[2px] absolute inset-0 -z-10" />

            <nav
                ref={navRef}
                id="mobileHeaderNav"
                data-menu-controller="inline"
                className="w-full h-svh flex_center flex-col fixed top-0 right-0 gap-8 z-60 opacity-0 pointer-events-none"
                style={{ clipPath: 'circle(0px at calc(100% - 45px) 45px)' }}
            >
                <div className="absolute inset-0 bg-background/50 backdrop-blur -z-10" />

                {NAV_ITEMS.map(({ href, label }) => (
                    <div key={href} className="MobileHeader_Nav flex_center opacity-0 translate-y-4">
                        <a href={href}>{label}</a>
                    </div>
                ))}

                <div className="MobileHeader_Nav flex_center opacity-0 translate-y-4">
                    <a
                        className="MobileHeader_ActionBtn flex_center"
                        href={config.actionButton.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    <div className="flex_center gap-4">
                        <p>{config.actionButton.text}</p>
                        <Download />
                    </div>
                </a>
            </div>
        </nav>
    </header>
  );
}