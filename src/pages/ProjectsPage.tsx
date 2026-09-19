import ProjectLayout from '@/layouts/ProjectLayout';
import SectionTitle from '@/components/UI/SectionTitle';
import ProjectCard from '@/components/UI/ProjectCard';
import { PROJECTS_LIST } from '@/config/ProjectsList';

export default function ProjectsPage() {
    return (
        <ProjectLayout
            title="Projects | rohityadav_483"
            description="Browse selected web engineering projects by Rohit Yadav, with architecture highlights, features, and live demos."
        >
            <SectionTitle title="Projects" color="secondary" className="mb-120">
                {PROJECTS_LIST.length === 0 && (
                    <p className="text-center text-muted-foreground mt-10">
                        No projects to display at the moment. Please check back later.
                    </p>
                )}

                {/* Bug #10 fixed: minmax(500px,1fr) overflows below 500px viewport → minmax(min(500px,100%),1fr) */}
                <div className="grid grid-cols-[repeat(auto-fill,minmax(min(500px,100%),1fr))] gap-x-6 gap-y-3 mt-4">
                    {PROJECTS_LIST.map((project) => {
                        if (project?.isHidden) return null;
                        return <ProjectCard key={project.name} project={project} />;
                    })}
                </div>
            </SectionTitle>
        </ProjectLayout>
    );
}