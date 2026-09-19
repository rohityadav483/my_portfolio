import type { ISkill } from "@/constants/skillStack";

type Props = {
    stack: readonly ISkill[];
    className?: string;
};

export default function SkillGrid({ stack, className }: Props) {
    return (
        <div
            className={`Fade_Up grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ${className ?? ""}`}
        >
            {stack.map((obj) => (
                <a
                    key={obj.name}
                    href={obj.link}
                    title={obj.name}
                    className="Fade_Stagger flex_center flex-col gap-2 w-24 h-24 rounded-lg skillGradient p-2"
                    target="_blank"
                    rel="noreferrer"
                >
                    <div className="flex_center min-h-[35px] aspect-square">
                        <img
                            src={obj.icon}
                            alt={obj.name.replaceAll(" ", "_") + "_Icon"}
                            width="35"
                            height="35"
                        />
                    </div>
                    <span className="text-[0.9em] overflow-ellipsis whitespace-nowrap overflow-hidden text-center w-full">
                        {obj.name}
                    </span>
                </a>
            ))}
        </div>
    );
}