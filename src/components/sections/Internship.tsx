import SectionTitle from '@/components/UI/SectionTitle';
import { INTERNSHIP_LIST } from '@/constants/InternshipList';

export default function Internship() {
    const items = INTERNSHIP_LIST.filter((item) => !item.isHidden);
    if (items.length === 0) return null;

    return (
        <section id="internship" className="w-full py-4 pt-14 bg-background">
            <SectionTitle title="Internship" color="primary">
                <div className="flex flex-col gap-6 mt-4 mb-8">
                    {items.map((item) => (
                        <article
                            key={`${item.company}-${item.role}-${item.startDate}`}
                            className="Fade_Up w-full flex flex-col gap-4 bg-footerAltLite/80 rounded-xl border-l-4 border-primary p-4 md:p-8"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    {item.logoImage ? (
                                        <img
                                            src={item.logoImage}
                                            alt={`${item.company}_Logo`}
                                            width={60}
                                            height={60}
                                            loading="lazy"
                                            className="max-h-[60px] max-w-[60px] object-contain"
                                        />
                                    ) : (
                                        <div
                                            aria-hidden="true"
                                            className="size-[60px] shrink-0 flex_center rounded-lg bg-primary/20 text-primary font-ubuntu text-[1.6rem]"
                                        >
                                            {item.company.charAt(0)}
                                        </div>
                                    )}

                                    <div className="flex flex-col">
                                        <h3 className="font-ubuntu text-[1.2rem] md:text-[1.4rem]">{item.role}</h3>
                                        {item.companyUrl ? (
                                            <a
                                                href={item.companyUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="opacity-80 hover:opacity-100 underline-offset-4 hover:underline"
                                            >
                                                {item.company}
                                            </a>
                                        ) : (
                                            <span className="opacity-80">{item.company}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 text-sm">
                                    <span className="tracking-widest">
                                        {item.startDate} – {item.endDate ?? 'Present'}
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-background/60">
                                        {item.location ? `${item.workMode} · ${item.location}` : item.workMode}
                                    </span>
                                </div>
                            </div>

                            <p>{item.summary}</p>

                            <ul className="list-disc pl-5 flex flex-col gap-2 marker:text-primary">
                                {item.highlights.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap items-center gap-2">
                                {item.technologies.map((tech) => {
                                    if (!tech) return null;
                                    return (
                                        <span
                                            key={tech.title}
                                            className="flex items-center gap-2 px-3 py-1 rounded-full bg-background/60 text-sm"
                                        >
                                            <img
                                                src={tech.icon}
                                                alt=""
                                                width={18}
                                                height={18}
                                                loading="lazy"
                                            />
                                            {tech.title}
                                        </span>
                                    );
                                })}
                            </div>

                            {item.proofLink && (
                                <a
                                    href={item.proofLink.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex_center w-fit gap-2 LinkBtnGradient px-4 py-2 rounded"
                                >
                                    {item.proofLink.label}
                                </a>
                            )}
                        </article>
                    ))}
                </div>
            </SectionTitle>
        </section>
    );
}
