import { Avatar_180, Avatar_250 } from "@assets/images";

// Importing SVGs as raw strings
import GithubIconRaw from "@assets/SVGs/Github.svg?raw";
import LinkedinIconRaw from "@assets/SVGs/Linkedin.svg?raw";
import TwitterIconRaw from "@assets/SVGs/Twitter.svg?raw";
import InstagramIconRaw from "@assets/SVGs/Instagram.svg?raw";

import DiscordIconRaw from "@assets/SVGs/Discord.svg?raw";
import LeetCodeIconRaw from "@assets/SVGs/LeetCode.svg?raw";

import { LogoIcon } from "@/assets/SVGs";
import { ThemeOptions } from "@/constants/themeOptions";

// Theme Configuration
export const themeConfig = ThemeOptions.DEFAULT;

// Site Configuration
export const siteConfig = {
    title: "Rohit Yadav | AI/ML Engineer & Frontend Developer",
    description: "Rohit Yadav is an AI/ML engineer and frontend developer building intelligent systems, multi-agent pipelines, and scalable data-driven applications.",
    canonical: "https://rohityadav483.github.io/",
    googleSiteVerification: "",
    keywords: "Rohit Yadav, RohitYadav483, AI Engineer, ML Engineer, Frontend Developer, Python Developer, FastAPI Developer, Streamlit Developer, TensorFlow, LLM, Multi-Agent AI, Repo2Arch, AI Crypto Advisor, Multi-Agent Debate, VJTI, Electronics Engineering, Siemens Scholar, LeetCode, Portfolio",
    avatar: "https://github.com/rohityadav483.png",
    siteUrl: "https://rohityadav483.github.io/",
}

// Header Section
export const headerConfig = {
    logotext: "Portfolio.",
    actionButton: {
        text: "Resume",
        url: "/Resume_RohitYadav.pdf" // use full URL or Public Folder path
    },
}

// Hero Section
export const heroConfig = {
    salutation: "Hi👋🏻 My name is",
    firstName: "Rohit.",
    lastName: "",
    position: "AI/ML Engineer & Frontend Developer",
    tagLine: {
        prefixText: "I build",
        highlightedText: "Intelligent Systems",
        suffixText: "that actually work."
    },
    avatar: Avatar_180,
    links: [
        {
            label: "GitHub",
            url: "https://github.com/rohityadav483",
            icon: GithubIconRaw
        },
        {
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/rohit-yadav483/",
            icon: LinkedinIconRaw
        },
        {
            label: "Leetcode",
            url: "https://www.leetcode.com/rohityadav483",
            icon: LeetCodeIconRaw
        }
    ],
}

// About Section
export const aboutConfig = {
    aboutAvatar: Avatar_250,
    description: [
        "Hey there! 👋🏻 I'm Rohit, an Electronics Engineering student at VJTI Mumbai (CGPA 9.18) who lives at the intersection of AI/ML and Frontend engineering.",
        "I build end-to-end intelligent systems — multi-agent LLM pipelines, RAG architectures, LSTM forecasting models, and async FastAPI backends. I care deeply about performance: cutting latency, reducing token costs, and making systems that scale.",
        "Recent work includes a 9-stage async architecture diagram generator, an 8-agent debate AI with FAISS RAG, and a crypto advisory platform combining LSTM + FinBERT + ChromaDB — all deployed and live.",
        "I'm a Siemens Scholar (top 300 from 7,000+ applicants) with 400+ LeetCode problems solved. If you're building something technically ambitious, I'd love to contribute 🚀"
    ],
}

// Footer Section
export const footerConfig = {
    logo: LogoIcon,
    title: "RohitYadav483 | Portfolio.",
    links: [
        {
            label: "GitHub",
            url: "https://github.com/rohityadav483",
            icon: GithubIconRaw
        },
        {
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/rohit-yadav483/",
            icon: LinkedinIconRaw
        },
        {
            label: "X (Twitter)",
            url: "https://x.com/rohityadav_483",
            icon: TwitterIconRaw
        },
        {
            label: "Discord",
            url: "https://discord.com/users/1292392857709314062",
            icon: DiscordIconRaw
        },
        {
            label: "Instagram",
            url: "https://instagram.com/rohit_yadav483",
            icon: InstagramIconRaw
        },

    ],
    copyrightText: `© Copyright 2026-${new Date().getFullYear()} Rohit Yadav`
}