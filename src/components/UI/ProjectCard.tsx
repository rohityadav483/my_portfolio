import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { GithubIcon } from '@/assets/SVGs';
import type { IProject } from '@/config/ProjectsList';
import projectStatus from '@/generated/projectStatus.json';

interface ProjectCardProps {
    project: IProject;
    className?: string;
}

type ProjectStatus = 'LIVE' | 'DOWN' | 'BUILDING';

const STATUS_TEXT_CLASS: Record<ProjectStatus, string> = {
    LIVE: 'text-[var(--status-live-fg)]',
    DOWN: 'text-[var(--status-down-fg)]',
    BUILDING: 'text-[var(--status-warn-fg)]',
};

const STATUS_DOT_CLASS: Record<ProjectStatus, string> = {
    LIVE: 'bg-[var(--status-live-fg)]',
    DOWN: 'bg-[var(--status-down-fg)]',
    BUILDING: 'bg-[var(--status-warn-fg)]',
};

const TECH_ICON_LIMIT = 12;

export default function ProjectCard({ project, className }: ProjectCardProps) {
    const slug = project.name.replaceAll(' ', '-').toLowerCase();

    // Read the prebuilt status map (scripts/checkProjectStatus.ts); fall back
    // to DOWN if the slug is missing (e.g. build script hasn't run yet).
    const status: ProjectStatus =
        project.status === 'development'
            ? 'BUILDING'
            : ((projectStatus as Record<string, ProjectStatus>)[slug] ?? 'DOWN');

    return (
    <div
      className={`Project_Stagger Card_Main w-full md:h-[525px] flex flex-col bg-footerAltLite/80 overflow-hidden mt-3 opacity-0 rounded-xl ${className ?? ''}`}
    >
      <Link to={`/projects/${slug}`} className="Projects_Preview relative w-full p-1">
        <img
          className="Card_Image bg-cover opacity-100 transition-opacity w-full rounded-lg"
          src={project.previewImage}
          alt={`Project_ScreenShot_${project.name}`}
          loading="lazy"
        />

        <div className="absolute inset-1 bg-foreground dark:bg-background rounded-lg transition-opacity opacity-10 hover:opacity-0" />
      </Link>

      <div className="relative w-full flex flex-col flex-1 text-[0.95em] p-2 md:px-6 md:py-4 min-h-0">
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-4 max-h-[60px]">
            <img
              src={project.logoImage}
              alt={`Project_Logo_${project.name}`}
              width={60}
              height={60}
              loading="lazy"
              className="max-h-[60px] max-w-[60px] object-contain"
            />

            <div className="flex flex-col">
              <h3 className="font-ubuntu text-[1.2rem] md:text-[1.4rem]">{project.name}</h3>
            </div>
          </div>

          <div className="flex md:gap-4 items-center">
            <div
              className={`flex items-center gap-2 w-fit text-sm tracking-widest align-middle md:px-2 ${STATUS_TEXT_CLASS[status]}`}
            >
              <div className={`size-3 rounded-full ${STATUS_DOT_CLASS[status]}`} />
              {status}
            </div>

            <div className="flex items-center gap-2">
              
                href={project.sourceUrl}
                title={`${project.name} - GitHub`}
                target="_blank"
                rel="noreferrer"
                className="Projects_Link flex"
              >
                <GithubIcon width={20} height={20} aria-hidden="true" />
                <span className="sr-only">{project.name} - GitHub</span>
              </a>
              
                href={project.liveUrl}
                title={`${project.name} Preview`}
                target="_blank"
                rel="noreferrer"
                className="Projects_Link flex"
              >
                <ArrowUpRightIcon aria-hidden="true" />
                <span className="sr-only">{project.name} Preview</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center py-2">
          <p className="text-center">{project.shortDescription}</p>
        </div>

        <div className="w-full flex_center gap-4 shrink-0">
          {project.technologies.map((tech, index) => {
            if (!tech) return null;
            // Off-by-one truncation preserved verbatim (tracker bug #25, cosmetic, not in the fix list):
            // 13 techs render as 12 icons + a "+1" chip, not 12 + "+2".
            if (project.technologies.length > TECH_ICON_LIMIT && index > TECH_ICON_LIMIT) {
              return null;
            }
            if (project.technologies.length > TECH_ICON_LIMIT && index === TECH_ICON_LIMIT) {
              return (
                <div
                  key="tech-overflow"
                  className="flex items-center justify-center w-6 h-6 p-1 text-xs bg-background/60 rounded"
                >
                  +&nbsp;{project.technologies.length - TECH_ICON_LIMIT}
                </div>
              );
            }

            return (
              <img
                key={tech.title}
                src={tech.icon}
                alt={`TechIcon ${tech.title}`}
                width={22}
                height={22}
                loading="lazy"
                className="flex_center"
              />
            );
          })}
        </div>
      </div >
    </div >
  );
}