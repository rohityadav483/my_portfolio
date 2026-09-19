import { TECH_STACK, type ITechStack } from "@/constants/ProjectsList";
import { INTERNSHIP_LOGOS } from "@assets/internships";

//#region Types
export interface IInternship {
    isHidden: boolean;
    company: string;
    role: string;
    /** e.g. "Jun 2026" */
    startDate: string;
    /** e.g. "Aug 2026" — omit while ongoing (renders as "Present") */
    endDate?: string;
    workMode: "Remote" | "Onsite" | "Hybrid";
    /** City / country — optional, omit for fully remote roles */
    location?: string;
    /** Company logo — optional, a letter badge is shown when missing */
    logoImage?: string;
    companyUrl?: string;
    /** Certificate / offer letter / LinkedIn post — optional */
    proofLink?: { label: string; url: string };
    summary: string;
    highlights: string[];
    technologies: ITechStack[];
}
//#endregion

//#region Internship List
export const INTERNSHIP_LIST: IInternship[] = [
    {
        isHidden: false,
        company: "Chronis",
        role: "AIML Intern",
        startDate: "Jun 2026",
        endDate: "Aug 2026",
        workMode: "Remote",
        logoImage: INTERNSHIP_LOGOS.ChronisLogo,
        summary: "Built an LLM-based event understanding engine that turns free-text personal events into structured behavioral signals, and validated that its confidence scores are actually calibrated against human ratings.",
        highlights: [
            "Built an Event Understanding Engine using LLMs that converts free-text personal events into schema-validated behavioral signals across 7 tracked variables, with a JSON-schema retry loop that feeds validation errors back into the prompt to guarantee well-formed structured output.",
            "Designed a calibration validation pipeline that scores model confidence against blind human ground-truth ratings using Mean Absolute Error, across 160 human-rated event-variable pairs, under a pre-registered pass/fail protocol.",
            "Beat a naive fixed-confidence baseline with 27% lower average error (0.405 vs. 0.556 MAE), showing the model's confidence scores were meaningfully calibrated rather than arbitrary.",
        ],
        technologies: [
            TECH_STACK["Python"],
            TECH_STACK["ChatGPT"],
            TECH_STACK["Gemini"],
            TECH_STACK["Groq"],
        ],
    },
];
//#endregion Internship List
