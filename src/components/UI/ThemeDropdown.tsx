import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ThemeDropdownOptions } from "@/constants/themeDropdownOptions";
import { useTheme } from "@/context/ThemeContext";
import type { ThemeOptionType } from "@/constants/themeOptions";

interface ThemeDropdownProps {
    className?: string;
    idPrefix?: string;
}

export default function ThemeDropdown({
    className,
    idPrefix = "",
}: ThemeDropdownProps) {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const btnId = `themeDropdownBtn${idPrefix}`;
    const dropdownId = `themeDropdown${idPrefix}`;
    const previewId = `currentThemePreview${idPrefix}`;
    const nameId = `currentThemeName${idPrefix}`;

    // Context is initialized from localStorage synchronously (useState
    // initializer in ThemeContext), so `theme` is already correct on first
    // render — no separate initTheme()/DOM-query step needed here.
    const current =
        ThemeDropdownOptions.find((option) => option.name === theme) ??
        ThemeDropdownOptions[0];

    const closeDropdown = useCallback(() => setIsOpen(false), []);

    // Outside click + Escape to close.
    useEffect(() => {
        if (!isOpen) return;

        const onClick = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                closeDropdown();
            }
        };
        const onKeydown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeDropdown();
        };

        document.addEventListener("click", onClick);
        document.addEventListener("keydown", onKeydown);
        return () => {
            document.removeEventListener("click", onClick);
            document.removeEventListener("keydown", onKeydown);
        };
    }, [isOpen, closeDropdown]);

    // Prevent scroll chaining to the page when the list is scrolled to its
    // top/bottom edge; must be non-passive for preventDefault to work.
    useEffect(() => {
        const dropdown = dropdownRef.current;
        if (!dropdown) return;

        const onWheel = (e: WheelEvent) => {
            e.stopPropagation();
            const { scrollTop, scrollHeight, clientHeight } = dropdown;
            const isAtTop = scrollTop === 0;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight;
            if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                e.preventDefault();
            }
        };
        const onTouchMove = (e: TouchEvent) => e.stopPropagation();

        dropdown.addEventListener("wheel", onWheel, { passive: false });
        dropdown.addEventListener("touchmove", onTouchMove);
        return () => {
            dropdown.removeEventListener("wheel", onWheel);
            dropdown.removeEventListener("touchmove", onTouchMove);
        };
    }, []);

    // Cross-tab sync is already handled globally by ThemeContext's own
    // `storage` listener (§13) — no duplicate listener needed here.

    const handleSelect = (name: ThemeOptionType) => {
        setTheme(name);
        closeDropdown();
    };

    return (
        <div
            ref={containerRef}
            className={`relative theme-dropdown-container isolate ${className ?? ""}`}
        >
            <button
                id={btnId}
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen((prev) => !prev);
                }}
                className="flex items-center gap-2 px-3 py-2 backdrop-blur-sm border border-white/10 rounded-md transition-all duration-200 min-w-4 md:min-w-32 cursor-pointer"
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-label="Select Theme"
            >
                <div className="flex items-center gap-2 flex-1">
                    <div
                        id={previewId}
                        className="w-4 h-4 rounded-full border border-white/30"
                        style={{
                            background: `linear-gradient(45deg, ${current.primaryColor}, ${current.secondaryColor})`,
                        }}
                    />
                    <span
                        id={nameId}
                        className="hidden sm:block text-sm font-medium"
                    >
                        {current.displayName}
                    </span>
                </div>
                <ChevronDown
                    size={16}
                    className="transition-transform duration-200"
                    style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                />
            </button>

            <div
                ref={dropdownRef}
                id={dropdownId}
                role="menu"
                aria-labelledby={btnId}
                className={`absolute top-full left-0 mt-2 min-w-32 bg-background/70 backdrop-blur-md border border-white/10 rounded-lg shadow-lg transform transition-all duration-200 z-[130] max-h-64 overflow-y-auto overscroll-contain ${isOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2.5"
                    }`}
            >
                <div className="py-2">
                    {ThemeDropdownOptions.map((option) => (
                        <button
                            key={option.name}
                            type="button"
                            role="menuitem"
                            data-theme={option.name}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSelect(option.name as ThemeOptionType);
                            }}
                            className="theme-option w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-white/10 transition-all duration-150 cursor-pointer"
                        >
                            <div
                                className="w-5 h-5 rounded-full border border-white/30 shrink-0"
                                style={{
                                    background: `linear-gradient(45deg, ${option.primaryColor}, ${option.secondaryColor})`,
                                }}
                            />
                            <span className="text-sm font-medium">
                                {option.displayName}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}