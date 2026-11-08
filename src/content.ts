// Single source for all site copy and links. Facts come from the spec (docs/superpowers/specs).
// A link whose URL is still unknown is `undefined` and must not render.

export type Href = string | undefined;

export interface Project {
  slug: string;
  name: string;
  hook: string;
  dates: string;
  stack: string[];
  points: string[];
  live?: Href;
  repo?: Href;
  note?: string;
}
export interface Service {
  title: string;
  body: string;
  proof: string; // Project.slug
}
export interface Role {
  title: string;
  org: string;
  dates?: string;
  points: string[];
}
export interface Achievement {
  title: string;
  detail: string;
  href?: Href;
  featured?: boolean;
  image?: string;
}
export interface SocialLink {
  label: string;
  href: Href;
}

const email = "vinayaktiwari732@gmail.com";

export const profile = {
  name: "Vinayak Tiwari",
  role: "AI Engineer" as const,
  eyebrow: "AI Engineer — available for freelance & internships",
  tagline: "I build AI products — LLM apps, RAG systems and AI agents.",
  oneLiner: "Intern at InseLabs · President, AlgoZenith-KIIT · CS @ KIIT '28",
  about:
    "I'm a computer science student at KIIT, Bhubaneswar, who likes turning messy problems into AI systems that actually ship: retrieval pipelines over real documents, LLM features with validated outputs, and the full-stack apps around them. Competitive programming keeps my fundamentals sharp.",
  email,
  resumeHref: "/resume-vinayak-tiwari.pdf" as const,
  startProjectHref: `mailto:${email}?subject=Project%20inquiry`,
};

export const stack: string[] = [
  "Azure OpenAI",
  "Gemini",
  "LangChain",
  "RAG",
  "Vector DBs",
  "Azure AI Search",
  "Python",
  "FastAPI",
  "Pydantic",
  "TypeScript",
  "Next.js",
  "React",
  "Supabase",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
];

export const projects: Project[] = [
  {
    slug: "investiq",
    name: "InvestIQ",
    hook: "Ask questions of 100-page annual reports and get grounded answers.",
    dates: "May – Jun 2025",
    stack: ["Python", "FastAPI", "Azure OpenAI", "LangChain", "PostgreSQL"],
    points: [
      "RAG platform for annual-report Q&A with company- and year-filtered retrieval on Azure AI Search.",
      "PDF ingestion with PyMuPDF4LLM, LangChain semantic chunking and Azure OpenAI embeddings.",
      "Automated KPI extraction with Pydantic-validated LLM outputs stored in PostgreSQL; Dockerized FastAPI services with Kubernetes config.",
    ],
    repo: undefined,
  },
  {
    slug: "truehuman",
    name: "TrueHuman",
    hook: "An AI pipeline that finds misuse of a person's identity online and drafts the takedown.",
    dates: "InseLabs internship",
    stack: ["AI pipeline", "Embeddings", "Workflow automation"],
    points: [
      "6-stage identity-protection workflow: facial enrollment, embedding, web monitoring, matching, 0–100 risk scoring and takedown drafting.",
      "AI application workflows and product integrations, from business need to shipped feature.",
    ],
    note: "Internship work at InseLabs",
  },
  {
    slug: "algogym",
    name: "AlgoGym",
    hook: "A DSA training platform with an AI tutor that adapts to your Codeforces progress.",
    dates: "Aug – Sep 2024",
    stack: ["Next.js", "TypeScript", "Gemini API", "Supabase", "PostgreSQL"],
    points: [
      "Next.js 16, React 19 and TypeScript platform with 8 training tracks, topic/rating filters and verified Codeforces progress.",
      "Gemini-powered learning paths, contextual tutoring and code variants in C++, Java and Python, with Zod-validated outputs and PostgreSQL lesson caching.",
      "Codeforces API and LeetCode GraphQL sync with leased database jobs, retries, Supabase Auth and row-level security.",
    ],
    live: undefined,
  },
  {
    slug: "weapon-detection",
    name: "Weapon Detection",
    hook: "Real-time weapon detection on live webcam and CCTV feeds.",
    dates: "Oct 2024 – Jan 2025",
    stack: ["Python", "OpenCV", "Haar Cascade"],
    points: [
      "Detects pistols, rifles and sniper weapons using a custom dataset of 255+ images.",
      "Anomaly-based surveillance alerts for sensitive and crowded areas.",
    ],
    repo: undefined,
  },
];

export const services: Service[] = [
  {
    title: "AI chatbots & RAG over your data",
    body: "Assistants that answer from your PDFs, docs or database — with sources, not guesses.",
    proof: "investiq",
  },
  {
    title: "AI agents & workflow automation",
    body: "LLM pipelines that do multi-step work for you: extract, score, draft, notify.",
    proof: "truehuman",
  },
  {
    title: "Full-stack AI web apps",
    body: "React/Next.js front ends, FastAPI or Supabase back ends, auth and deployment — end to end.",
    proof: "algogym",
  },
  {
    title: "LLM features for your existing product",
    body: "Add Gemini or OpenAI to what you already have, with structured, validated outputs you can trust.",
    proof: "investiq",
  },
];

export const roles: Role[] = [
  {
    title: "Intern",
    org: "InseLabs",
    points: [
      "Built AI-powered tools and workflow automation, translating business needs into product features.",
      "Engineered features for TrueHuman's 6-stage identity-protection workflow.",
      "Worked on AI application workflows and product integrations.",
    ],
  },
  {
    title: "President",
    org: "AlgoZenith-KIIT",
    dates: "Feb 2025 – Present",
    points: [
      "Lead a team of 50 programmers building problem-solving strategies for contests.",
      "Teach Data Structures classes and run post-contest discussions.",
      "Solved 1000+ problems across Codeforces, CodeChef and AtCoder.",
    ],
  },
  {
    title: "Academic Associate & Web Developer",
    org: "IIWCPC — International India Women's Programming Contest",
    points: [
      "Authored and reviewed DSA problems with the IIT Kanpur team.",
      "Headed the Contest Integrity Team for fairness and security.",
      "Built the official IIWCPC website.",
    ],
  },
  {
    title: "B.Tech, Computer Science",
    org: "Kalinga Institute of Industrial Technology",
    dates: "2024 – 2028",
    points: [],
  },
];

export const achievements: Achievement[] = [
  {
    title: "ICPC Asia Amritapuri Regionalist 2025",
    detail: "Qualified for the regional round (rank < 200).",
    href: "/img/icpc-certificate.webp",
    featured: true,
    image: "/img/icpc-certificate.webp",
  },
  { title: "Codeforces Specialist", detail: "Rating 1430 · top 8%" },
  { title: "CodeChef 1513", detail: "Top 10% · Symmetry9" },
  { title: "AIR 1 — Code O Olympic", detail: "IIIT Bhubaneswar" },
  { title: "Rank 1 — Geek Clash", detail: "GFG-KIIT" },
  { title: "Rank 1 of 100 teams — The Last Test Case", detail: "Offline contest, GFG-KIIT" },
  { title: "Finalist — Shaastra Programming Contest", detail: "IIT Madras" },
];

export const socials: SocialLink[] = [
  { label: "Email", href: `mailto:${email}` },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vinayaktiwari9" },
  { label: "GitHub", href: undefined },
  { label: "Codeforces", href: undefined },
  { label: "CodeChef", href: undefined },
];

export const visibleLinks = (links: SocialLink[]) =>
  links.filter((l): l is SocialLink & { href: string } => Boolean(l.href));

export const allContent = { profile, stack, projects, services, roles, achievements, socials };
