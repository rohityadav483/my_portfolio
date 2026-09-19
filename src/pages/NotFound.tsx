import { Link } from 'react-router-dom';
import ProjectLayout from '@/layouts/ProjectLayout';

/** Astro original had no 404.astro. Wrapped in ProjectLayout per tracker §11.4, for consistent header/footer chrome. */
export default function NotFound() {
    return (
        <ProjectLayout title="404 | rohityadav_483">
            <div className="min-h-[50vh] flex_center flex-col gap-4 text-center px-6">
                <h1 className="font-ubuntu text-[2em]">404</h1>
                <p>This page doesn&apos;t exist.</p>
                <Link to="/" className="LinkBtnGradient px-4 py-2 rounded">
                    Back home
                </Link>
            </div>
        </ProjectLayout>
    );
}