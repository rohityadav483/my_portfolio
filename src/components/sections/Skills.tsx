import CenterTitle from '@/components/UI/CenterTitle';
import SkillTitle from '@/components/UI/SkillTitle';
import SkillGrid from '@/components/UI/SkillGrid';
import {
    WebLanguagesStack,
    FrontendStack,
    BackendStack,
    DatabaseStack,
    AIMLStack,
    LLMsStack,
    CloudDevOpsStack,
    ToolingStack,
    IdeDesignStack,
} from '@/constants/skillStack';

// Row 4 is Tooling-left/LLMs-right, row 5 is single-column — not alphabetical, kept exact per tracker.
const SKILL_ROWS = [
    [
        { title: 'Web & Programming', stack: WebLanguagesStack },
        { title: 'Frontend', stack: FrontendStack },
    ],
    [
        { title: 'Backend & APIs', stack: BackendStack },
        { title: 'Databases & Storage', stack: DatabaseStack },
    ],
    [
        { title: 'AI/ML & Tools', stack: AIMLStack },
        { title: 'Cloud & DevOps', stack: CloudDevOpsStack },
    ],
    [
        { title: 'Tooling & Observability', stack: ToolingStack },
        { title: 'LLMs', stack: LLMsStack },
    ],
    [{ title: 'IDEs & Design', stack: IdeDesignStack }],
] as const;

export default function Skills() {
    return (
        <section id="skills" className="w-full min-h-screen py-4 pt-14 bg-background">
            <CenterTitle title="Tech Stack" color="primary" />

            {SKILL_ROWS.map((row, i) => (
                <div key={i} className="Fade_Up flex justify-center items-start flex-col lg:flex-row gap-2">
                    {row.map(({ title, stack }) => (
                        <div key={title} className="Fade_Up flex_center flex-col gap-4 py-4 xs:p-4 w-full h-full">
                            <SkillTitle title={title} color="primary" />
                            <SkillGrid stack={stack} />
                        </div>
                    ))}
                </div>
            ))}
        </section>
    );
}