import type { ReactNode } from 'react';
import Header from '@/components/UI/Header';
import MobileHeader from '@/components/UI/MobileHeader';
import Footer from '@/components/UI/Footer';
import Cursor from '@/components/UI/Cursor';
import { headerConfig, footerConfig } from '@/config/portfolio.config';

interface MainLayoutProps {
    children: ReactNode;
}

/**
 * Ported from Layout.astro's structural body (Header/MobileHeader/main/
 * Footer/Cursor). The <html>/<head> shell, <SEO/>, JSON-LD Person block and
 * <AstroFont/> output all move to index.html + react-helmet-async — deferred
 * to §16 per the tracker and Section 1's decision. script-loader.ts is not
 * re-added (confirmed dead in §7; animations mount via hooks instead).
 */
export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <Header config={headerConfig} />
            <MobileHeader config={headerConfig} />

            <main className="max-w-450 mx-auto px-6">{children}</main>

            <Footer config={footerConfig} />
            <Cursor />
        </>
    );
}