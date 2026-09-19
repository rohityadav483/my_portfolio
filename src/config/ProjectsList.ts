import LOGOS from "@assets/Logos"
import SCREENSHOTS from "@assets/Shots"
import MOCKUPS from "@assets/Mockup"
import SKILL_STACK from "@/constants/skillStack";
import { buildTechStack } from "@/utils/commonUtils";

//#region Types
export interface IProject {
    isHidden: boolean;
    name: string;
    shortDescription: string;
    description: string;
    logoImage: string;
    previewImage: string;
    deviceMockupImage: string;
    theme: string;
    status: "completed" | "development";
    liveUrl: string;
    sourceUrl: string;
    demoCredentials?: {
        email: string;
        password: string;
    };
    technologies: ITechStack[];
    features: {
        title: string;
        description: string;
    }[];
    logoSize: number;
    versions: {
        title: string;
        version: string;
        url: string;
    }[];
}

export interface ITechStack {
    title: string;
    description?: string;
    icon: string;
}
//#endregion


//#region Tech Stack
export const TECH_STACK = {
    ...buildTechStack(SKILL_STACK.WebLanguagesStack),
    ...buildTechStack(SKILL_STACK.FrontendStack),
    ...buildTechStack(SKILL_STACK.BackendStack),
    ...buildTechStack(SKILL_STACK.DatabaseStack),
    ...buildTechStack(SKILL_STACK.AIMLStack),
    ...buildTechStack(SKILL_STACK.LLMsStack),
    ...buildTechStack(SKILL_STACK.CloudDevOpsStack),
    ...buildTechStack(SKILL_STACK.ToolingStack),
    ...buildTechStack(SKILL_STACK.IdeDesignStack),
};
//#endregion


//#region COMMON_FEATURES
const COMMON_FEATURES = {
    Responsive: {
        title: "Responsive Design",
        description: "Seamless experience across devices with responsive design that adapts to various screen sizes and orientations."
    },
    SEO: {
        title: "SEO Optimization",
        description: "Crafted with SEO best practices, ensuring optimal visibility on search engines."
    }
}
//#endregion


//#region Template
// {
//     isHidden: false,
//     name:"TITLE",
//     shortDescription:"SHORT_DESCRIPTION",
//     description:"DESCRIPTION",
//     logoImage:LOGO_URL,
//     previewImage:Screenshots.SCREENSHOT_URL,
//     deviceMockupImage:MockupImages.MOCKUP_URL,
//     theme:"PROJECT_THEME_COLOR_HEX",
//     status:"completed OR development",
//     liveUrl:"PROJECT_URL",
//     sourceUrl:"GITHUB_URL",
//     Demo?: { email: "DEMO_EMAIL", password: "DEMO_PASSWORD" },
//     technologies:[TECH_ICONS_URL],
//     features: [{ title: "FEATURE_TITLE", description: "FEATURE_DESCRIPTION" }],
//     logoSize:50,
//     versions: [{ title: "PREV_PROJECT_TITLE", version: "VERSION_NO" }]
// },
//#endregion Template


//#region Projects List
export const PROJECTS_LIST: IProject[] = [
    {
        isHidden: false,
        name: "Repo2Arch",
        shortDescription: "Instantly generate architecture diagrams from any GitHub repo using async AST analysis, NetworkX graphs, and Groq LLM synthesis.",
        description: "Repo2Arch transforms any GitHub repository into a visual architecture diagram in under 5 seconds. It runs a 9-stage async FastAPI pipeline — cloning the repo, performing Python AST + regex fingerprinting across 20+ frameworks, constructing a NetworkX dependency graph, generating Mermaid DSL, and synthesizing summaries via a 3-model Groq fallback chain. Raw source code never enters the LLM context, cutting prompt token usage by ~70%. Results are persisted to Supabase for instant cache hits on repeat queries. Ideal for onboarding, code reviews, and rapid codebase comprehension.",
        logoImage: LOGOS.Repo2ArchLogo,
        previewImage: SCREENSHOTS.Repo2ArchShots,
        deviceMockupImage: MOCKUPS.Repo2ArchMockup,
        theme: "#0f172a",
        status: "completed",
        liveUrl: "https://repo2arch.streamlit.app/",
        sourceUrl: "https://github.com/rohityadav483/repo2arch",
        technologies: [
            TECH_STACK["FastAPI"],
            TECH_STACK["Streamlit"],
            TECH_STACK["Python"],
            TECH_STACK["NetworkX"],
            TECH_STACK["Supabase"],
        ],
        features: [
            {
                title: "9-Stage Async FastAPI Pipeline",
                description: "End-to-end async pipeline with background task offloading: clone → AST analysis → graph → Mermaid DSL → LLM synthesis → Supabase persist. Delivers sub-5s response on cached repos."
            },
            {
                title: "Python AST + Regex Fingerprinting",
                description: "Automated framework detection across 20+ frameworks using Python AST traversal and regex patterns — no manual configuration needed. Reduces comprehension time by ~80% on repos with 300+ files."
            },
            {
                title: "3-Model Groq Fallback Chain",
                description: "Metadata-only prompting with a 3-model fallback chain eliminates raw source code from LLM context, cutting token usage ~70% while generating summaries, improvement suggestions, and README overviews."
            },
            {
                title: "Supabase Caching Layer",
                description: "Architecture results persisted to Supabase for instant retrieval on repeated queries — no redundant pipeline execution."
            },
            {
                title: "Interactive Mermaid Diagrams",
                description: "Auto-generated Mermaid DSL diagrams rendered interactively, showing module dependencies, entry points, and architectural layers."
            },
            COMMON_FEATURES.Responsive,
        ],
        logoSize: 50,
        versions: [],
    },
    {
        isHidden: false,
        name: "Multi-Agent Debate AI",
        shortDescription: "8-agent LLM debate system on Groq LLaMA-3 with FAISS RAG, dual-model routing, hallucination detection, and per-agent analytics.",
        description: "Multi-Agent Debate AI is a decision-support system that orchestrates 8 specialized LLM agents on Groq LLaMA-3.3-70B and LLaMA-3.1-8B through a 10-step pipeline: Planner → 3 debate rounds → Critic → Fact-Checker → Judge. Each full debate executes 24 API calls with JSON-mode outputs for structured reasoning. Dual-model routing reduces inference cost ~60% via weighted round scoring (R1=25%, R2=35%, R3=40%). Evidence grounding uses FAISS RAG with all-MiniLM-L6-v2 (384-dim embeddings) for top-5 cosine similarity retrieval across uploaded PDF/TXT documents. Includes a Streamlit analytics dashboard with per-agent leaderboards, hallucination flags, and token usage charts.",
        logoImage: LOGOS.MultiAgentLogo,
        previewImage: SCREENSHOTS.MultiAgentShots,
        deviceMockupImage: MOCKUPS.MultiAgentMockup,
        theme: "#1e1b4b",
        status: "completed",
        liveUrl: "https://multi-agent-debate-online.streamlit.app/",
        sourceUrl: "https://github.com/rohityadav483/multi-agent-debate",
        technologies: [
            TECH_STACK.LLaMA3,
            TECH_STACK["Streamlit"],
            TECH_STACK["Python"],
            TECH_STACK["Pandas"],
        ],
        features: [
            {
                title: "8-Agent LLM Orchestration",
                description: "10-step pipeline (Planner → 3 rounds → Critic → Fact-Checker → Judge) executing 24 Groq API calls per debate with structured JSON-mode outputs for deterministic reasoning."
            },
            {
                title: "Dual-Model Cost Routing",
                description: "Routes calls between LLaMA-3.3-70B and LLaMA-3.1-8B based on round weight (R1=25%, R2=35%, R3=40%), cutting inference cost ~60% without sacrificing output quality."
            },
            {
                title: "FAISS RAG Evidence Grounding",
                description: "Indexes uploaded PDF/TXT evidence using all-MiniLM-L6-v2 (384-dim) embeddings. Top-5 cosine similarity retrieval (threshold 0.75) grounds agent arguments in real documents."
            },
            {
                title: "Dual-Layer FAISS Memory",
                description: "Persistent debate memory with 0.75 similarity threshold and 100-debate auto-rotation prevents context overflow while maintaining relevant historical context."
            },
            {
                title: "Hallucination Detection",
                description: "Dedicated Fact-Checker agent cross-references agent claims against retrieved evidence, flagging unsupported assertions in the analytics dashboard."
            },
            {
                title: "Streamlit Analytics Dashboard",
                description: "Per-agent leaderboards, hallucination flags, and token usage charts via Pandas — full visibility into debate dynamics and model performance."
            },
        ],
        logoSize: 50,
        versions: [],
    },
    {
        isHidden: false,
        name: "AI Crypto Advisor",
        shortDescription: "Multi-signal crypto platform combining 3-layer LSTM, FinBERT sentiment, ChromaDB RAG, and Gemini reports — 95% R² and 72% 30-day trend accuracy.",
        description: "AI Crypto Advisor is a full-stack crypto investment platform that fuses deep learning forecasts, NLP sentiment, and RAG-based context into structured natural language reports. A 3-layer LSTM (128→64→32 units) achieves up to 95% test R² and 72% 30-day trend accuracy across 10 coins. FinBERT scores news sentiment in batches of 16, while ChromaDB RAG retrieves cosine-similar historical context. ThreadPoolExecutor parallelizes LSTM prediction, FinBERT scoring, and GNews ingestion simultaneously across all 10 coins, cutting end-to-end latency ~60%. A risk-weighted allocation engine uses softmax-normalized LSTM signals scaled by volatility exponent per risk tier with automated stop-loss alerts. Final reports are synthesized by Gemini 2.5 Flash and deployed on Hugging Face Spaces via Docker.",
        logoImage: LOGOS.CryptoAdvisorLogo,
        previewImage: SCREENSHOTS.CryptoAdvisorShots,
        deviceMockupImage: MOCKUPS.CryptoAdvisorMockup,
        theme: "#064e3b",
        status: "completed",
        liveUrl: "https://huggingface.co/spaces/rohityadav483/ai-crypto-advisor",
        sourceUrl: "https://github.com/rohityadav483/ai_crypto_advisor",
        technologies: [
            TECH_STACK["TensorFlow"],
            TECH_STACK["Python"],
            TECH_STACK["Streamlit"],
            TECH_STACK["Docker"],
            TECH_STACK["ChromaDB"],
            TECH_STACK["Gemini"],
            TECH_STACK.HuggingFace,
        ],
        features: [
            {
                title: "3-Layer LSTM Forecasting",
                description: "Deep LSTM (128→64→32 units) trained per coin achieves up to 95% test R² and 72% 30-day trend accuracy — reliable price direction forecasting across 10 cryptocurrencies."
            },
            {
                title: "FinBERT Sentiment Analysis",
                description: "Domain-specific FinBERT model scores financial news sentiment in batches of 16. GNews ingestion provides real-time article feeds per coin for up-to-date market signals."
            },
            {
                title: "ChromaDB RAG Context",
                description: "Historical analysis and market context stored in ChromaDB vector store. Cosine-similarity retrieval grounds Gemini reports in relevant past patterns."
            },
            {
                title: "Parallel Inference Engine",
                description: "ThreadPoolExecutor parallelizes LSTM prediction, FinBERT scoring, and GNews ingestion across 10 coins simultaneously — cutting end-to-end latency ~60%."
            },
            {
                title: "Risk-Weighted Allocation Engine",
                description: "Softmax-normalized LSTM upside signals scaled by volatility exponent per risk tier (conservative/moderate/aggressive) with automated stop-loss alert generation."
            },
            {
                title: "Gemini 2.5 Flash Reports",
                description: "Structured natural language advisory reports synthesized by Gemini 2.5 Flash from LSTM forecasts, FinBERT scores, and RAG context — deployed on Hugging Face Spaces via Docker."
            },
            COMMON_FEATURES.Responsive,
        ],
        logoSize: 50,
        versions: [],
    },
]
//#endregion Projects List