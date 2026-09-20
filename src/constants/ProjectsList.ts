import { LOGOS, SCREENSHOTS } from "@assets/projects"
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
        name: "AI Crypto Advisor",
        shortDescription: "Multi-signal crypto platform combining 3-layer LSTM, FinBERT sentiment, ChromaDB RAG, and Gemini reports — 95% R² and 72% 30-day trend accuracy.",
        description: "AI Crypto Advisor is a full-stack crypto investment platform that fuses deep learning forecasts, NLP sentiment, and RAG-based context into structured natural language reports. A 3-layer LSTM (128→64→32 units) achieves up to 95% test R² and 72% 30-day trend accuracy across 10 coins. FinBERT scores news sentiment in batches of 16, while ChromaDB RAG retrieves cosine-similar historical context. ThreadPoolExecutor parallelizes LSTM prediction, FinBERT scoring, and GNews ingestion simultaneously across all 10 coins, cutting end-to-end latency ~60%. A risk-weighted allocation engine uses softmax-normalized LSTM signals scaled by volatility exponent per risk tier with automated stop-loss alerts. Final reports are synthesized by Gemini 2.5 Flash and deployed on Hugging Face Spaces via Docker.",
        logoImage: LOGOS.CryptoAdvisorLogo,
        previewImage: SCREENSHOTS.CryptoAdvisorShots,
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
    {
        isHidden: false,
        name: "Multi-Agent Debate AI",
        shortDescription: "8-agent LLM debate system on Groq LLaMA-3 with FAISS RAG, dual-model routing, hallucination detection, and per-agent analytics.",
        description: "Multi-Agent Debate AI is a decision-support system that orchestrates 8 specialized LLM agents on Groq LLaMA-3.3-70B and LLaMA-3.1-8B through a 10-step pipeline: Planner → 3 debate rounds → Critic → Fact-Checker → Judge. Each full debate executes 24 API calls with JSON-mode outputs for structured reasoning. Dual-model routing reduces inference cost ~60% via weighted round scoring (R1=25%, R2=35%, R3=40%). Evidence grounding uses FAISS RAG with all-MiniLM-L6-v2 (384-dim embeddings) for top-5 cosine similarity retrieval across uploaded PDF/TXT documents. Includes a Streamlit analytics dashboard with per-agent leaderboards, hallucination flags, and token usage charts.",
        logoImage: LOGOS.MultiAgentLogo,
        previewImage: SCREENSHOTS.MultiAgentShots,
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
        name: "Repo2Arch",
        shortDescription: "Instantly generate architecture diagrams from any GitHub repo using async AST analysis, NetworkX graphs, and Groq LLM synthesis.",
        description: "Repo2Arch transforms any GitHub repository into a visual architecture diagram in under 5 seconds. It runs a 9-stage async FastAPI pipeline — cloning the repo, performing Python AST + regex fingerprinting across 20+ frameworks, constructing a NetworkX dependency graph, generating Mermaid DSL, and synthesizing summaries via a 3-model Groq fallback chain. Raw source code never enters the LLM context, cutting prompt token usage by ~70%. Results are persisted to Supabase for instant cache hits on repeat queries. Ideal for onboarding, code reviews, and rapid codebase comprehension.",
        logoImage: LOGOS.Repo2ArchLogo,
        previewImage: SCREENSHOTS.Repo2ArchShots,
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
        name: "TaxMitra AI",
        shortDescription: "ML-assisted Indian income-tax optimizer comparing Old vs New tax regimes, ranking deduction strategies, and explaining every recommendation in plain language.",
        description: "TaxMitra AI computes a user's full Indian income-tax liability under both the Old and New regimes (FY 2024-25 slabs, age-based senior/super-senior brackets, Section 87A rebate, surcharge + cess) and recommends whichever is cheaper. A trained scikit-learn model (with a rule-based fallback when the model file is unavailable) ranks optimization strategies — maxing Section 80C, health insurance under 80D, NPS 80CCD(1B), home loan interest 24(b) — by projected savings for the user's specific financial profile (18 features including income, age, dependents, HRA, existing deductions, risk appetite). A dedicated explainer module turns every regime recommendation and strategy into a plain-language justification rather than a bare number. Ships as a single unified app: Flask REST API on a background thread (`/api/calculate`, `/api/recommend`, `/api/full-analysis`) alongside a Streamlit dashboard with Plotly visualizations for the interactive UI.",
        logoImage: LOGOS.TaxMitraLogo,
        previewImage: SCREENSHOTS.TaxMitraShots,
        theme: "#1e3a8a",
        status: "development",
        liveUrl: "https://github.com/rohityadav483/tax_optimizer",
        sourceUrl: "https://github.com/rohityadav483/tax_optimizer",
        technologies: [
            TECH_STACK["Python"],
            TECH_STACK["Flask"],
            TECH_STACK["Streamlit"],
            TECH_STACK["Scikit‑Learn"],
            TECH_STACK["Pandas"],
        ],
        features: [
            {
                title: "Old vs New Regime Comparison",
                description: "Full slab-based tax computation for both regimes — age-based senior/super-senior slabs, Section 87A rebate, surcharge and cess — with an automatic cheaper-regime recommendation."
            },
            {
                title: "ML-Ranked Deduction Strategies",
                description: "Trained model ranks 80C/80D/NPS/home-loan-interest optimizations against an 18-feature financial profile, falling back to rule-based ranking if no model file is present."
            },
            {
                title: "Plain-Language Explanations",
                description: "Every regime choice and recommended strategy comes with a generated, human-readable explanation of why — not just a number."
            },
            {
                title: "Interactive Streamlit Dashboard",
                description: "Plotly-powered charts breaking down gross income, deductions, and regime comparison visually."
            },
            {
                title: "Unified Flask + Streamlit Architecture",
                description: "Single entry point runs a Flask REST API on a background thread alongside the Streamlit UI in the main thread — API and dashboard share the same process."
            },
            COMMON_FEATURES.Responsive,
        ],
        logoSize: 50,
        versions: [],
    },
    {
        isHidden: false,
        name: "SIMIGRA",
        shortDescription: "Full-stack migration-support platform unifying jobs, housing, food, transport, and cultural guidance for people relocating to a new city.",
        description: "SIMIGRA centralizes the fragmented process of relocating to a new city into one platform. Users sign up with hashed-password auth and build a profile (destination city, skills, education, cultural preferences), then browse city-filtered job listings, accommodation options (price, ratings, distance, images), local food/living services, and transport mode comparisons (base fare, cost/km). A cultural-adaptation section surfaces language and local-adjustment resources. Backend is a Flask + Flask-SQLAlchemy REST API over PostgreSQL, with CORS enabled for the separately-hosted React frontend.",
        logoImage: LOGOS.SimigraLogo,
        previewImage: SCREENSHOTS.SimigraShots,
        theme: "#0c4a6e",
        status: "development",
        liveUrl: "https://github.com/rohityadav483/SIMIGRA",
        sourceUrl: "https://github.com/rohityadav483/SIMIGRA",
        technologies: [
            TECH_STACK["Reactjs"],
            TECH_STACK["TailwindCSS"],
            TECH_STACK["Python"],
            TECH_STACK["Flask"],
            TECH_STACK["PostgreSQL"],
        ],
        features: [
            {
                title: "Secure Auth & Profiles",
                description: "Email/password signup with Werkzeug password hashing and a unique-email constraint. Profile stores destination city, skills, education, and cultural preferences, editable post-signup."
            },
            {
                title: "City-Filtered Job Listings",
                description: "Job board filterable by city, with salary range, required skills, job type, and posting metadata per listing."
            },
            {
                title: "Accommodation Finder",
                description: "Housing search by city showing property type, price range, address/contact, ratings, distance from center, and images."
            },
            {
                title: "Food & Living Services",
                description: "Local eatery and service directory with cuisine type, pricing, ratings, offers, and distance indicators."
            },
            {
                title: "Transport Comparison",
                description: "Side-by-side comparison of transport modes per city — base fare, cost per km, and mode description."
            },
            {
                title: "Cultural Adaptation Resources",
                description: "Language info and local cultural guides to help new arrivals adjust faster."
            },
            COMMON_FEATURES.Responsive,
        ],
        logoSize: 50,
        versions: [],
    },
    {
        isHidden: false,
        name: "PrevaMed",
        shortDescription: "AI healthcare platform predicting risk for 5 chronic diseases (diabetes, hypertension, cancer, asthma, CKD) with patient/doctor roles and admin dataset tools.",
        description: "PrevaMed takes patient medical/lifestyle data and runs it through 5 separate ML models (GaussianNB, ExtraTree, Random Forest via scikit-learn) to score risk for diabetes, hypertension, cancer, asthma, and CKD — surfaced with preventive recommendations. React/Vite frontend with Firebase auth splits patient and doctor roles; doctors get a dashboard to track patients, admins get a dataset editor (upload/edit/export CSV, JSON, ZIP via Tabulator + PapaParse + JSZip) per disease. Predictions run through a Streamlit backend serving the pickled sklearn models in real time; results are downloadable as reports.",
        logoImage: LOGOS.PrevaMedLogo,
        previewImage: SCREENSHOTS.PrevaMedShots,
        theme: "#0f5132",
        status: "development",
        liveUrl: "https://github.com/rg1464054/PrevaMed-Hackathon",
        sourceUrl: "https://github.com/rg1464054/PrevaMed-Hackathon",
        technologies: [
            TECH_STACK["Reactjs"],
            TECH_STACK["TailwindCSS"],
            TECH_STACK["Python"],
            TECH_STACK["Streamlit"],
            TECH_STACK["Scikit‑Learn"],
            TECH_STACK["Firebase"],
        ],
        features: [
            {
                title: "5-Disease Risk Prediction",
                description: "Separate trained models (GaussianNB, ExtraTree Classifier, Random Forest) per disease — diabetes, hypertension, cancer, asthma, CKD — served live via Streamlit."
            },
            {
                title: "Patient & Doctor Roles",
                description: "Role-based access: patients input data and view their own results, doctors track patients across the platform and advise."
            },
            {
                title: "Interactive Risk Dashboard",
                description: "Visualizes per-disease risk scores and contributing factors in charts."
            },
            {
                title: "Admin Dataset Editor",
                description: "In-browser editable tables (Tabulator) per disease dataset, with CSV/JSON/ZIP import-export via PapaParse and JSZip."
            },
            {
                title: "Firebase Authentication",
                description: "Secure signup/login gating patient, doctor, and admin views."
            },
            {
                title: "Downloadable Reports",
                description: "Patients can export personalized prediction results as reports."
            },
            COMMON_FEATURES.Responsive,
        ],
        logoSize: 50,
        versions: [],
    },
    {
        isHidden: false,
        name: "Hand Sign Language Translator",
        shortDescription: "Real-time ASL fingerspelling translator — MediaPipe hand-landmark detection feeding a CNN classifier, output as live text and speech.",
        description: "Translates American Sign Language fingerspelling into text and speech in real time from a single webcam. MediaPipe locates hand landmarks; OpenCV crops the region of interest, converts to grayscale, and applies Gaussian blur plus adaptive thresholding to binarize the hand shape. A Keras CNN classifies the processed image — the 26 letters are grouped into 8 classes of visually-similar signs (e.g. [a,e,m,n,s,t]) to improve accuracy, with a second-pass classification disambiguating within a class. Recognized letters are assembled into words and converted to speech via pyttsx3. Tested at roughly 90% accuracy under good lighting, with gesture-to-output latency of 1-2 seconds.",
        logoImage: LOGOS.SignLangLogo,
        previewImage: SCREENSHOTS.SignLangShots,
        theme: "#4c1d95",
        status: "development",
        liveUrl: "https://github.com/rohityadav483/Sign_Language_Translator",
        sourceUrl: "https://github.com/rohityadav483/Sign_Language_Translator",
        technologies: [
            TECH_STACK["Python"],
            TECH_STACK["OpenCV"],
            TECH_STACK["TensorFlow"],
            TECH_STACK["Keras"],
        ],
        features: [
            {
                title: "MediaPipe Hand-Landmark Detection",
                description: "Real-time hand tracking via webcam using MediaPipe's landmark system to isolate the region of interest for each gesture."
            },
            {
                title: "CNN Gesture Classification",
                description: "26 ASL fingerspelling letters grouped into 8 visually-similar classes for a Keras CNN, with second-pass disambiguation within ambiguous classes — improves accuracy over a flat 26-class model."
            },
            {
                title: "Text-to-Speech Output",
                description: "Recognized letters assemble into words and are spoken aloud via pyttsx3, alongside live text display."
            },
            {
                title: "~90% Real-Time Accuracy",
                description: "Gesture-to-output latency of 1-2 seconds under good lighting conditions, tested across the full A-Z gesture set."
            },
        ],
        logoSize: 50,
        versions: [],
    },
]
//#endregion Projects List