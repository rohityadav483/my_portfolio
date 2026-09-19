import type { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import ProjectsHeader from '@/components/UI/ProjectsHeader';
import Footer from '@/components/UI/Footer';
import Cursor from '@/components/UI/Cursor';
import { headerConfig, footerConfig, siteConfig } from '@/config/portfolio.config';

export interface ProjectLayoutSEOProps {
    title: string;
    description?: string;
    canonical?: string;
    ogImage?: string;
}

interface ProjectLayoutProps extends ProjectLayoutSEOProps {
    children: ReactNode;
}

export default function ProjectLayout({ title, description, canonical, ogImage, children }: ProjectLayoutProps) {
    const pageDescription = description ?? siteConfig.description;
    const pageImage = ogImage ?? siteConfig.avatar;
    const canonicalUrl = canonical ?? siteConfig.siteUrl;

    const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        name: title,
        description: pageDescription,
        url: canonicalUrl,
        image: pageImage,
        inLanguage: 'en',
    };

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={pageDescription} />
                <link rel="canonical" href={canonicalUrl} />

                <meta property="og:title" content={title} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={pageImage} />
                <meta property="og:url" content={canonicalUrl} />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@rohityadav_483" />
                <meta name="twitter:creator" content="@rohityadav_483" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={pageImage} />
                <meta name="twitter:url" content={canonicalUrl} />

                <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
            </Helmet>

            <ProjectsHeader config={headerConfig} />

            <main className="max-w-450 mx-auto px-6">{children}</main>

            <Cursor />
            <Footer config={footerConfig} />
        </>
    );
}