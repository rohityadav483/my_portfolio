import ProjectLayout from '@/layouts/ProjectLayout';

/** Route "/projects". SectionTitle + ProjectCard grid lands in §17. */
export default function Projects() {
    return (
        <ProjectLayout
            title="Projects | rohityadav_483"
            description="Browse selected web engineering projects by Rohit Yadav, with architecture highlights, features, and live demos."
        >
            {/* TODO §17: SectionTitle + PROJECTS_LIST.filter(!isHidden).map(ProjectCard) grid, empty-state message */}
        </ProjectLayout>
    );
}