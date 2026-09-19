import { Link } from 'react-router-dom';
import SectionTitle from '@/components/UI/SectionTitle';
import ProjectCard from '@/components/UI/ProjectCard';
import { PROJECTS_LIST } from '@/config/ProjectsList';

const PROJECT_LIST_LIMIT = 9;
const SHOW_ALL_PROJECTS = PROJECTS_LIST.filter((p) => !p.isHidden).length > PROJECT_LIST_LIMIT;

export default function Projects() {
    return (
        <section id="projects" className="w-full min-h-screen py-4 pt-14 bg-background">
            <SectionTitle title="My Projects" color="secondary">
                {PROJECTS_LIST.length === 0 && (
                    <p className="text-center text-muted-foreground mt-10">
                        No projects to display at the moment. Please check back later.
                    </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mt-4 mb-8">
                    {PROJECTS_LIST.map((project, index) => {
                        if (project?.isHidden) return null;
                        // Bug #9 fixed: was `index > PROJECT_LIST_LIMIT + 2` (i.e. > 11), inconsistent
                        // with the stated limit of 9. Now actually caps at 9.
                        if (index >= PROJECT_LIST_LIMIT) return null;

                        return <ProjectCard key={project.name} project={project} />;
                    })}
                </div>

                {SHOW_ALL_PROJECTS && (
                    <Link
                        to="/projects"
                        title="View All Projects"
                        className="flex items-center mx-auto w-fit px-4 py-2 bg-footerAlt border border-accent font-medium"
                    >
                        View All Projects
                    </Link>
                )}
            </SectionTitle>
        </section>
    );
}