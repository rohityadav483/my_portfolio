import { useEffect, useRef } from 'react';
import CenterTitle from '@/components/UI/CenterTitle';
import ContactForm from './ContactForm';
import { ContactArt } from '@/assets/SVGs';

const SOCIAL_LINKS = [
    {
        href: 'https://www.linkedin.com/in/rohit-yadav483/',
        label: 'LinkedIn',
        path: 'M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z',
        viewBox: '0 0 16 16',
        size: 30,
    },
    {
        href: 'https://www.instagram.com/rohit_yadav483',
        label: 'Instagram',
        path: 'M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z',
        viewBox: '0 0 16 16',
        size: 30,
    },
    {
        href: 'mailto:rohitrajeshyadav3062005@gmail.com',
        label: 'Gmail',
        path: 'M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z',
        viewBox: '0 0 24 24',
        size: 30,
    },
    {
        href: 'https://x.com/rohityadav_483',
        label: 'Twitter',
        path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
        viewBox: '0 0 24 24',
        size: 30,
    },
    {
        href: 'https://discord.com/users/1292392857709314062',
        label: 'Discord',
        path: 'M 24.957031 1.863281 C 28.207031 6.65625 29.8125 12.058594 29.210938 18.277344 C 29.210938 18.304688 29.195312 18.328125 29.175781 18.34375 C 26.714844 20.15625 24.332031 21.257812 21.980469 21.984375 C 21.941406 21.996094 21.902344 21.984375 21.878906 21.949219 C 21.335938 21.191406 20.84375 20.394531 20.410156 19.554688 C 20.386719 19.507812 20.410156 19.445312 20.460938 19.425781 C 21.242188 19.132812 21.988281 18.777344 22.703125 18.355469 C 22.761719 18.324219 22.765625 18.242188 22.710938 18.203125 C 22.5625 18.089844 22.410156 17.972656 22.265625 17.851562 C 22.238281 17.828125 22.203125 17.824219 22.171875 17.839844 C 17.519531 19.996094 12.421875 19.996094 7.714844 17.839844 C 7.683594 17.828125 7.648438 17.832031 7.621094 17.851562 C 7.480469 17.972656 7.328125 18.089844 7.175781 18.203125 C 7.125 18.242188 7.128906 18.324219 7.1875 18.355469 C 7.902344 18.769531 8.648438 19.132812 9.429688 19.429688 C 9.480469 19.449219 9.503906 19.507812 9.480469 19.554688 C 9.058594 20.394531 8.5625 21.195312 8.011719 21.953125 C 7.988281 21.984375 7.945312 21.996094 7.910156 21.984375 C 5.570312 21.257812 3.1875 20.15625 0.726562 18.34375 C 0.707031 18.328125 0.691406 18.304688 0.691406 18.277344 C 0.1875 12.898438 1.210938 7.449219 4.9375 1.863281 C 4.949219 1.847656 4.960938 1.835938 4.976562 1.828125 C 6.8125 0.984375 8.777344 0.363281 10.832031 0.0078125 C 10.871094 0.00390625 10.90625 0.0195312 10.925781 0.0546875 C 11.179688 0.503906 11.46875 1.082031 11.667969 1.554688 C 13.832031 1.222656 16.03125 1.222656 18.242188 1.554688 C 18.4375 1.09375 18.71875 0.503906 18.972656 0.0546875 C 18.992188 0.0195312 19.027344 0.00390625 19.066406 0.0078125 C 21.121094 0.363281 23.085938 0.984375 24.921875 1.828125 C 24.9375 1.835938 24.949219 1.847656 24.957031 1.863281 Z M 12.769531 12.09375 C 12.789062 10.503906 11.632812 9.1875 10.183594 9.1875 C 8.742188 9.1875 7.597656 10.492188 7.597656 12.09375 C 7.597656 13.695312 8.765625 15 10.183594 15 C 11.621094 15 12.769531 13.695312 12.769531 12.09375 Z M 22.324219 12.09375 C 22.347656 10.503906 21.191406 9.1875 19.742188 9.1875 C 18.300781 9.1875 17.15625 10.492188 17.15625 12.09375 C 17.15625 13.695312 18.324219 15 19.742188 15 C 21.191406 15 22.324219 13.695312 22.324219 12.09375 Z M 22.324219 12.09375',
        viewBox: '0 0 30 22',
        size: 30,
        width30: true,
    },
];

export default function Contact() {
    const circleRef = useRef<HTMLDivElement>(null);
    const iconRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    const setIconRef = (i: number) => (el: HTMLAnchorElement | null) => {
        iconRefs.current[i] = el;
    };

    useEffect(() => {
        const center = circleRef.current;
        const images = iconRefs.current.filter((el): el is HTMLAnchorElement => el !== null);

        if (!center || !images.length) {
            console.error('Social circle or icons not found.');
            return;
        }

        const positionIcons = () => {
            const iconSize = images[0].clientWidth;
            const radius = Math.ceil((center.clientWidth + 2) / 2);
            const centerWidth = center.offsetWidth;
            const centerHeight = center.offsetHeight;

            images.forEach((image, index) => {
                const angle = (index / (images.length - 1)) * Math.PI;
                const x = Math.cos(-angle) * radius - iconSize / 2;
                const y = Math.sin(-angle) * radius - iconSize / 2;

                image.style.left = `${centerWidth / 2 + x}px`;
                image.style.top = `${centerHeight / 2 + y}px`;
            });
        };

        positionIcons();
        // Bug #11 fixed: original only ran once on DOMContentLoaded, icons misplaced on resize.
        window.addEventListener('resize', positionIcons);
        return () => window.removeEventListener('resize', positionIcons);
    }, []);

    return (
        <section id="contact" className="w-full min-h-screen mb-16 lg:mb-[25em] py-4 pt-14">
            <CenterTitle title="Contact" color="primary" />

            <div className="w-full flex_center flex-col p-4 text-[1.2em] text-center">
                <h3 className="Fade_Up gradientText font-ubuntu text-[2rem] lg:text-[2.4rem]">
                    Let&apos;s collaborate!
                </h3>
                <p className="Fade_Up">Contact me to discuss your web development needs</p>
                <p className="Fade_Up">or just to say hello. 😉</p>
            </div>

            <div className="flex_center flex-col lg:flex-row w-full h-full gap-4 lg:gap-10 lg:px-20 pt-8 pb-16">
                <div className="relative w-full flex_center flex-col">
                    <div
                        ref={circleRef}
                        id="socialCircle"
                        className="Fade_Up w-full max-w-[350px] scale-[0.9] lg:scale-100 lg:max-w-[450px] aspect-square rounded-full border-2 border-dashed border-contactSocialColor mb-8 md:mb-0 md:mt-7"
                    >
                        {SOCIAL_LINKS.map((social, i) => (
                            <a
                                key={social.label}
                                ref={setIconRef(i)}
                                href={social.href}
                                className="socialIcon absolute w-12 lg:w-16 aspect-square flex_center p-2 lg:p-4 bg-background outline-dashed outline-2 outline-contactSocialColor rounded-full"
                                title={social.label}
                                target="_blank"
                                aria-label={social.label}
                                rel="noreferrer"
                            >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            style={{ color: 'var(--socialIconColor)' }}
                            strokeWidth={0}
                            viewBox={social.viewBox}
                            height={social.size}
                            width={social.width30 ? 30 : social.size}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d={social.path} />
                        </svg>
                    </a>
            ))}
                </div>

                <div className="Fade_Up absolute bottom-10 md:bottom-2 w-[300px] md:w-[400px] flex_center">
                    <ContactArt width="100%" height="100%" />
                </div>
            </div>

            <ContactForm />
        </div>
    </section >
  );
}