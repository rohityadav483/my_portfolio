export interface ISkill {
    name: string;
    description?: string;
    icon: string;
    link: string;
}
// Updated tech stack per user request
import HtmlIcon from "../assets/skills/html.svg";
import CssIcon from "../assets/skills/css.svg";
import JsIcon from "../assets/skills/javascript.svg";
import TsIcon from "../assets/skills/typescript.svg";
import PythonIcon from "../assets/skills/python.svg";
import CppIcon from "../assets/skills/cpp.svg";
import SqlIcon from "../assets/skills/sql.svg";

import ReactIcon from "../assets/skills/reactjs.svg";
import NextIcon from "../assets/skills/nextjs.svg";
import AstroIcon from "../assets/skills/astrojs.svg";
import TailwindIcon from "../assets/skills/tailwind.svg";
import StreamlitIcon from "../assets/skills/streamlit.svg";

import FastAPIIcon from "../assets/skills/fastapi.svg";
import FlaskIcon from "../assets/skills/flask.svg";
import NodeIcon from "../assets/skills/nodejs.svg";
import ExpressIcon from "../assets/skills/express.svg";
import RestApiIcon from "../assets/skills/restapi.svg";
import FirebaseIcon from "../assets/skills/firebase.svg";
import NextAuthIcon from "../assets/skills/nextauth.svg";

import NumpyIcon from "../assets/skills/numpy.svg";
import PandasIcon from "../assets/skills/pandas.svg";
import MatplotlibIcon from "../assets/skills/matplotlib.svg";
import SeabornIcon from "../assets/skills/seaborn.svg";
import KerasIcon from "../assets/skills/keras.svg";
import LLaMAIcon from "../assets/skills/llama.svg";
import NetworkXIcon from "../assets/skills/networkx.svg";
import OpencvIcon from "../assets/skills/opencv.svg";
import PytorchIcon from "../assets/skills/pytorch.svg";
import ScikitLearnIcon from "../assets/skills/scikitlearn.svg";
import TensorFlowIcon from "../assets/skills/tensorflow.svg";
import TransformersIcon from "../assets/skills/transformers.svg";

import GroqIcon from "../assets/skills/groq.svg";
import GeminiIcon from "../assets/skills/gemini.svg";
import ChatGPTIcon from "../assets/skills/chatgpt.svg";
import ClaudeIcon from "../assets/skills/claude.svg";

import PostgresIcon from "../assets/skills/postgres.svg";
import SupabaseIcon from "../assets/skills/supabase.svg";
import FirebaseIcon2 from "../assets/skills/firebase.svg"; // duplicate, same as above
import ChromaDBIcon from "../assets/skills/chromadb.svg";
import MongoIcon from "../assets/skills/mongodb.svg";
import MysqlIcon from "../assets/skills/mysql.svg";
import RedisIcon from "../assets/skills/redis.svg";

import DockerIcon from "../assets/skills/docker.svg";
import RenderIcon from "../assets/skills/render.svg";
import VercelIcon from "../assets/skills/vercel.svg";
import StreamlitIcon2 from "../assets/skills/streamlit.svg"; // duplicate
import HuggingFaceIcon from "../assets/skills/huggingface.svg";
import NetlifyIcon from "../assets/skills/netlify.svg";

import GitIcon from "../assets/skills/git.svg";
import GithubIcon from "../assets/skills/github.svg";
import NpmIcon from "../assets/skills/npm.svg";
import ViteIcon from "../assets/skills/vitejs.svg";
import PostmanIcon from "../assets/skills/postman.svg";

import VsCodeIcon from "../assets/skills/vscode.svg";
import AntigravityIcon from "../assets/skills/antigravity.svg";
import FigmaIcon from "../assets/skills/figma.svg";
import ColabIcon from "../assets/skills/colab.svg";

export const WebLanguagesStack: ISkill[] = [
    { name: "HTML", description: "Markup language", icon: HtmlIcon, link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "CSS", description: "Styling language", icon: CssIcon, link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { name: "JavaScript", description: "Scripting language", icon: JsIcon, link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "TypeScript", description: "Typed superset of JS", icon: TsIcon, link: "https://www.typescriptlang.org/" },
    { name: "Python", description: "General‑purpose language", icon: PythonIcon, link: "https://www.python.org/" },
    { name: "C++", description: "High‑performance language", icon: CppIcon, link: "https://isocpp.org/" },
    { name: "SQL", description: "Database query language", icon: SqlIcon, link: "https://www.w3schools.com/sql/" },
];

export const FrontendStack: ISkill[] = [
    { name: "React.js", icon: ReactIcon, link: "https://react.dev/" },
    { name: "Next.js", icon: NextIcon, link: "https://nextjs.org/" },
    { name: "Tailwind CSS", icon: TailwindIcon, link: "https://tailwindcss.com/" },
    { name: "Streamlit", icon: StreamlitIcon, link: "https://streamlit.io/" },
];

export const BackendStack: ISkill[] = [
    { name: "FastAPI", icon: FastAPIIcon, link: "https://fastapi.tiangolo.com/" },
    { name: "Flask", icon: FlaskIcon, link: "https://flask.palletsprojects.com/" },
    // { name: "Node.js", icon: NodeIcon, link: "https://nodejs.org/" },
    // { name: "Express.js", icon: ExpressIcon, link: "https://expressjs.com/" },
    { name: "REST API", icon: RestApiIcon, link: "https://restfulapi.net/" },
    { name: "Firebase", icon: FirebaseIcon, link: "https://firebase.google.com/" },
    { name: "Auth.js", icon: NextAuthIcon, link: "https://authjs.dev/" },
];

export const AIMLStack: ISkill[] = [
    { name: "NumPy", icon: NumpyIcon, link: "https://numpy.org/" },
    { name: "Pandas", icon: PandasIcon, link: "https://pandas.pydata.org/" },
    { name: "Matplotlib", icon: MatplotlibIcon, link: "https://matplotlib.org/" },
    { name: "Seaborn", icon: SeabornIcon, link: "https://seaborn.pydata.org/" },
    { name: "Keras", icon: KerasIcon, link: "https://keras.io/" },
    { name: "LLaMA", icon: LLaMAIcon, link: "https://llama.meta.com/" },
    { name: "NetworkX", icon: NetworkXIcon, link: "https://networkx.org/" },
    { name: "OpenCV", icon: OpencvIcon, link: "https://opencv.org/" },
    { name: "PyTorch", icon: PytorchIcon, link: "https://pytorch.org/" },
    { name: "Scikit‑Learn", icon: ScikitLearnIcon, link: "https://scikit-learn.org/" },
    { name: "TensorFlow", icon: TensorFlowIcon, link: "https://www.tensorflow.org/" },
    { name: "Transformers", icon: TransformersIcon, link: "https://huggingface.co/docs/transformers/" },
];

export const LLMsStack: ISkill[] = [
    { name: "Groq", icon: GroqIcon, link: "https://groq.com/" },
    { name: "Gemini", icon: GeminiIcon, link: "https://deepmind.google/technologies/gemini/" },
    { name: "ChatGPT", icon: ChatGPTIcon, link: "https://openai.com/blog/chatgpt" },
    { name: "Claude", icon: ClaudeIcon, link: "https://www.anthropic.com/product" },
    { name: "LLaMA3", icon: LLaMAIcon, link: "https://llama.meta.com/" },
];

export const DatabaseStack: ISkill[] = [
    { name: "PostgreSQL", icon: PostgresIcon, link: "https://www.postgresql.org/" },
    { name: "Supabase", icon: SupabaseIcon, link: "https://supabase.com/" },
    { name: "Firebase", icon: FirebaseIcon2, link: "https://firebase.google.com/" },
    { name: "ChromaDB", icon: ChromaDBIcon, link: "https://www.trychroma.com/" },
    { name: "MongoDB", icon: MongoIcon, link: "https://www.mongodb.com/" },
    { name: "MySQL", icon: MysqlIcon, link: "https://www.mysql.com/" },
    { name: "Redis", icon: RedisIcon, link: "https://redis.io/" },
];

export const CloudDevOpsStack: ISkill[] = [
    { name: "Docker", icon: DockerIcon, link: "https://www.docker.com/" },
    { name: "Render", icon: RenderIcon, link: "https://render.com/" },
    { name: "Vercel", icon: VercelIcon, link: "https://vercel.com/" },
    { name: "Streamlit", icon: StreamlitIcon2, link: "https://streamlit.io/" },
    { name: "HuggingFace", icon: HuggingFaceIcon, link: "https://huggingface.co/" },
    { name: "Netlify", icon: NetlifyIcon, link: "https://www.netlify.com/" },
];

export const ToolingStack: ISkill[] = [
    { name: "Git", icon: GitIcon, link: "https://git-scm.com/" },
    { name: "GitHub", icon: GithubIcon, link: "https://github.com/" },
    { name: "npm", icon: NpmIcon, link: "https://www.npmjs.com/" },
    { name: "Vite", icon: ViteIcon, link: "https://vitejs.dev/" },
    { name: "Postman", icon: PostmanIcon, link: "https://www.postman.com/" },
];

export const IdeDesignStack: ISkill[] = [
    { name: "VS Code", icon: VsCodeIcon, link: "https://code.visualstudio.com/" },
    { name: "Antigravity", icon: AntigravityIcon, link: "https://antigravity.google/" },
    { name: "Figma", icon: FigmaIcon, link: "https://www.figma.com/" },
    { name: "Google Collab", icon: ColabIcon, link: "https://colab.research.google.com/" },
];

export default {
    WebLanguagesStack,
    FrontendStack,
    BackendStack,
    AIMLStack,
    LLMsStack,
    DatabaseStack,
    CloudDevOpsStack,
    ToolingStack,
    IdeDesignStack,
};