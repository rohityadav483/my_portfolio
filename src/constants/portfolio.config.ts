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
    canonical: "https://rohityadav483.netlify.app/",
    googleSiteVerification: "",
    keywords: "Rohit Yadav, RohitYadav483, AI Engineer, ML Engineer, AIML Intern, Frontend Developer, Python Developer, FastAPI Developer, Flask Developer, Streamlit Developer, React Developer, TensorFlow, Keras, Scikit-learn, OpenCV, LLM, Groq, Gemini, Multi-Agent AI, Repo2Arch, AI Crypto Advisor, Multi-Agent Debate, SIMIGRA, PrevaMed, TaxMitra AI, Hand Sign Language Translator, ASL Translator, Chronis, VJTI, Electronics Engineering, Siemens Scholar, LeetCode, Portfolio",
    avatar: "https://github.com/rohityadav483.png",
    siteUrl: "https://rohityadav483.netlify.app/",
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
        "I am Rohit, an Electronics Engineering student at VJTI Mumbai (CGPA 9.18), specializing in the intersection of Artificial Intelligence and Frontend Engineering.",
        "My work centers on architecting end-to-end intelligent systems, blending AI/ML engineering with production-grade frontend development, with a strong emphasis on performance, cost efficiency, and scalability.",
        "As an AIML Intern at Chronis, I developed an LLM-powered Event Understanding Engine for structured behavioral signal extraction, and a calibration validation pipeline that improved confidence-scoring accuracy by 27% over baseline, benchmarked against 160 human-rated ground-truth pairs.",
        "My project portfolio includes an AI Crypto Advisor, which integrates LSTM forecasting, FinBERT sentiment analysis, and ChromaDB-based RAG to deliver data-driven investment insights, and a Multi-Agent Debate AI system, which orchestrates eight LLM agents through a structured reasoning pipeline for automated decision support.",
        "I am a Siemens Scholar, recognized among the top 300 candidates from over 7,000 applicants nationally, and have solved 400+ algorithmic problems on LeetCode. I welcome opportunities to contribute to technically ambitious, high-impact engineering initiatives."
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