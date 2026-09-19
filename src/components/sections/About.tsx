import { Avatar_250 } from '@/assets/images';
import SectionTitle from '@/components/UI/SectionTitle';

export interface AboutConfig {
    aboutAvatar?: string;
    description: string[];
}

interface AboutProps {
    config: AboutConfig;
}

/** config.aboutAvatar unused — original imports Avatar_250 directly (same asset), reproduced as-is, harmless per tracker. */
export default function About({ config }: AboutProps) {
    return (
        <section id="about" className="w-full min-h-screen py-4 pt-14 bg-background">
            <SectionTitle title="About Me" color="primary" className="h-screen flex flex-col justify-center">
                <div className="flex_center flex-col lg:flex-row w-full h-full py-10 gap-8">
                    <img
                        src={Avatar_250}
                        alt="About_Avatar"
                        className="Fade_Up rounded-full scale-x-[-1] lg:mx-14"
                        width={250}
                        height={250}
                        loading="lazy"
                        decoding="async"
                    />

                    <div className="Fade_Up w-full md:w-[80%] lg:w-[60%] flex justify-center items-start flex-col gap-4 lg:border-l border-primary py-8 lg:pl-10">
                        <h2 className="Fade_Up text-[1.5em] font-bold">Hey there! 👋🏻</h2>
                        {config.description?.map((para, i) => (
                            <p key={i} className="Fade_Up text-justify">
                                {para}
                            </p>
                        ))}
                    </div>
                </div>
            </SectionTitle>
        </section>
    );
}