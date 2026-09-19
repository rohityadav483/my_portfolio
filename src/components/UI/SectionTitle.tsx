import type { ReactNode } from "react";

type Props = {
    title: string;
    className?: string;
    color?: "primary" | "secondary";
    children?: ReactNode;
};

export default function SectionTitle({ title, color, className, children }: Props) {
    return (
        <div className={`Fade_Up my-4 ${className ?? ""}`}>
            <div
                className={`Fade_Up Title-Tag Title_Line relative flex items-center open ${color ?? ""}`}
            >
                <span className="text-[1.5em]">{"<"}</span>
                <p className="text-[1.6em]">{title}</p>
                <span className="text-[1.5em]">{">"}</span>
            </div>

            {children}

            <div
                className={`Fade_Up Title-Tag Title_Line relative flex items-center close ${color ?? ""}`}
            >
                <span className="text-[1.5em]">{"</"}</span>
                <p className="text-[1.4em]">{title}</p>
                <span className="text-[1.5em]">{">"}</span>
            </div>
        </div>
    );
}