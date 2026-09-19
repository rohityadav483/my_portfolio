type Props = {
    title: string;
    color?: "primary" | "secondary";
};

export default function SkillTitle({ title, color }: Props) {
    return (
        <div className={`Fade_Up Title-Tag relative flex_center ${color ?? ""}`}>
            <p className="text-[1.6em]">{title}</p>
            <span className="text-[1.5em]">{"()"}</span>
        </div>
    );
}