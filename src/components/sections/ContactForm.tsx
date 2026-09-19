import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Loader2, SendHorizontal } from 'lucide-react';

interface MailStatus {
    status: boolean;
    message: string;
}

export default function ContactForm() {
    const [mailStatus, setMailStatus] = useState<MailStatus>({ status: false, message: '' });
    const [isLoading, setIsLoading] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);
    const clearTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

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

    useEffect(() => {
        return () => {
            if (clearTimeoutRef.current) clearTimeout(clearTimeoutRef.current);
        };
    }, []);

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!nameRef.current || !emailRef.current || !messageRef.current) return;

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const message = messageRef.current.value;

        const templateParams = {
            from_name: name,
            from_email: email,
            message,
            to_email: 'rohitrajeshyadav3062005@gmail.com',
        };

        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error('🙄 Invalid Email ID!');
            }

            setIsLoading(true);
            const { default: emailjs } = await import('@emailjs/browser');
            const mailRes = await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            );

            if (mailRes.status !== 200) {
                throw new Error('😵 Message not Sent');
            }

            setMailStatus({ status: true, message: '👍 Message Sent!' });
            setIsLoading(false);

            nameRef.current.value = '';
            emailRef.current.value = '';
            messageRef.current.value = '';
        } catch (error) {
            if (error instanceof Error) {
                setMailStatus({ status: false, message: error.message });
            } else {
                setMailStatus({ status: false, message: 'An unknown error occurred.' });
            }
        } finally {
            setIsLoading(false);
            clearTimeoutRef.current = setTimeout(() => {
                setMailStatus({ status: false, message: '' });
            }, 3000);
        }
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className="Fade_Up LinkBtnGradient rounded-md w-full lg:max-w-[650px] px-4 py-2 outline outline-white/20 flex_center flex-col"
        >
            <label htmlFor="name" className="w-full h-fit flex justify-center items-start flex-col px-1 py-2">
                Name
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your Name"
                    className="w-full p-2 mt-1 rounded-md border-none outline-none bg-background text-foreground"
                    autoComplete="name"
                    required
                    ref={nameRef}
                />
            </label>
            <label htmlFor="email" className="w-full h-fit flex justify-center items-start flex-col px-1 py-2">
                Email
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                    className="w-full p-2 mt-1 rounded-md border-none outline-none bg-background text-foreground"
                    autoComplete="email"
                    required
                    ref={emailRef}
                />
            </label>
            <label htmlFor="message" className="w-full h-fit flex justify-center items-start flex-col px-1 py-2">
                Message
                <textarea
                    rows={5}
                    id="message"
                    name="message"
                    placeholder="Enter your Message"
                    className="w-full p-2 mt-1 rounded-md border-none outline-none bg-background text-foreground resize-none"
                    ref={messageRef}
                />
            </label>

            <div className="w-full flex justify-start items-center gap-4">
                <button
                    className="flex_center gap-4 border-none bg-background text-foreground outline outline-white/20 my-1 mx-2 py-2 px-6 lg:px-20 rounded-md"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span>Sending</span>
                            <Loader2 className="animate-spin" />
                        </>
                    ) : (
                        <>
                            <span>Submit</span>
                            <SendHorizontal />
                        </>
                    )}
                </button>
                <span>{mailStatus.message}</span>
            </div>
        </form>
    );
}