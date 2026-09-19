import { Download } from 'lucide-react';
import { useRef } from 'react';
import ThemeButton from './ThemeButton';
import ThemeDropdown from './ThemeDropdown';
import { useScrollSpy } from '@/hooks/useScrollSpy';

export interface HeaderConfig {
    logotext: string;
    actionButton: { text: string; url: string };
}

interface HeaderProps {
    config: HeaderConfig;
}

const NAV_LINKS = [
    { href: '#about', label: 'ABOUT' },
    { href: '#skills', label: 'SKILLS' },
    { href: '#internship', label: 'INTERNSHIP' },
    { href: '#projects', label: 'PROJECTS' },
    { href: '#contact', label: 'CONTACT' },
];

export default function Header({ config }: HeaderProps) {
    const headerRef = useRef<HTMLElement>(null);
    const navRef = useRef<HTMLElement>(null);

    useScrollSpy(headerRef, navRef, { type: 'debounce', delay: 0 });

    return (
        <header
            id="header"
            ref={headerRef}
            className="hidden lg:block sticky top-0 max-w-[1800px] mx-auto z-50"
        >
            <div className="flex justify-between items-center w-full px-6 py-2 headerGradient backdrop-blur-[2px]">
                <a href="#home" className="Fade_Down_Header font-satisfy font-bold text-[2em]">
                    <span className="gradientText w-fit">{config.logotext}</span>
                </a>

                <nav ref={navRef} className="Header_Nav relative tracking-wide flex gap-6">
                    {NAV_LINKS.map(({ href, label }) => (
                        <a key={href} className="Fade_Down_Header" href={href}>
                            {label}
                        </a>
                    ))}
                </nav>

                <div className="flex_center gap-4">
                    <ThemeDropdown className="Fade_Down_Header" idPrefix="Desktop" />
                    <ThemeButton className="Fade_Down_Header" />


                    <a
                        className="Fade_Down_Header Header_ActionBtn relative overflow-hidden rounded-sm flex_center"
                        href={config.actionButton.url}
                        target="_blank"
                    >
                    <div className="flex_center gap-2">
                        <p>{config.actionButton.text}</p>
                        <Download size={18} />
                    </div>
                </a>
            </div>
        </div>
    </header>
  );
}