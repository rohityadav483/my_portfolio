type Props = {
    title: string;
    color?: "primary" | "secondary";
};

export default function CenterTitle({ title, color }: Props) {
    return (
        <div
            className={`Fade_Up Title-Tag Title_Line relative flex_center text-[2em] ${color ?? ""}`}
        >
            <span>{"<"}</span>
            <p>{title}</p>
            <span>{"/>"}</span>
        </div>
    );
}