import { useHeroOrbit } from '@/hooks/useHeroOrbit';

interface HeroLink {
    label: string;
    url: string;
    icon: string;
}

export interface HeroConfig {
    salutation: string;
    firstName: string;
    lastName: string;
    position: string;
    tagLine: { prefixText: string; highlightedText: string; suffixText: string };
    avatar: string;
    links?: HeroLink[];
}

interface HeroProps {
    config: HeroConfig;
}

export default function Hero({ config }: HeroProps) {
    const { orbitRef, avatarRef, setTrailRef } = useHeroOrbit();

    return (
        <section
            id="Hero"
            className="w-full h-[calc(100vh-4rem)] py-4 bg-background flex justify-evenly lg:justify-around items-center flex-col-reverse lg:flex-row overflow-hidden"
        >
            <div className="w-full lg:w-fit flex justify-start items-center flex-col gap-8">
                <div className="text-[18px] lg:text-[26px] text-center lg:text-left">
                    <p className="Fade_Stagger">{config.salutation}</p>
                    <h1 className="Fade_Stagger gradientText font-ubuntu text-[4em] lg:text-[9rem] leading-tight max-w-xs md:max-w-6xl">
                        {config.firstName}
                        {' ' + config.lastName}
                    </h1>
                    <p className="Fade_Stagger">I&apos;m a {config.position}.</p>
                    <p className="Fade_Stagger">
                        {config.tagLine.prefixText}{' '}
                        <span className="gradientText font-ubuntu">{config.tagLine.highlightedText}</span>{' '}
                        {config.tagLine.suffixText}
                    </p>
                </div>

                <div className="Fade_Stagger flex justify-center lg:justify-start items-center w-full gap-10 py-4 text-socialIconColor!">
                    {config.links?.map((link) => (
                        <a
                            key={link.url}
                            href={link.url}
                            title={link.label}
                            aria-label={link.label}
                            target="_blank"
                            rel="noreferrer"
                            className="Fade_Stagger w-[30px] h-[30px] flex items-center justify-center"
                            dangerouslySetInnerHTML={{ __html: link.icon }}
                        />
                    ))}
                </div>
            </div>

            <div ref={orbitRef} className="Hero_Orbit relative flex_center w-[340px] lg:w-[500px] aspect-square">
                <div
                    ref={avatarRef}
                    id="avatarImage"
                    role="button"
                    className="flex_center w-[180px] sm:w-[250px] aspect-square rounded-full z-10 cursor-pointer"
                    style={{ opacity: 0 }}
                >
                    <img
                        src={config.avatar}
                        alt={`${config.firstName} ${config.lastName} Avatar`}
                        className="object-cover w-full h-full rounded-full noDrag"
                        width={180}
                        height={180}
                        fetchPriority="high"
                    />
                </div>

                <div ref={setTrailRef(0)} className="Spring_Up Hero_Trail Trail1">
                    <span className="Orbit_Dot" />
                </div>
                <div ref={setTrailRef(1)} className="Spring_Up Hero_Trail Trail2">
                    <span className="Orbit_Dot" />
                </div>
                <div ref={setTrailRef(2)} className="Spring_Up Hero_Trail Trail3">
                    <span className="Orbit_Dot" />
                </div>
                <div ref={setTrailRef(3)} className="Spring_Up Hero_Trail Trail4">
                    <span className="Orbit_Dot" />
                </div>
            </div>
        </section>
    );
}