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
  image?: string; // gallery screenshot, added later
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
  handle?: string;
  blurb?: string;
  icon?: string; // simple-icons slug key, e.g. "siGmail"
}
export interface Extra {
  title: string;
  detail: string;
  image?: string;
  alt?: string;
  href?: Href;
  wide?: boolean;
}
export interface Tech {
  name: string;
  icon?: string; // simple-icons export name; text chip when absent (brand not in the set)
  ring: 0 | 1 | 2; // 0 = inner (AI core)
}

const email = "vinayaktiwari732@gmail.com";

export const profile = {
  name: "Vinayak Tiwari",
  role: "AI Engineer" as const,
  eyebrow: "AI Engineer â€” available for freelance & internships",
  tagline: "I build AI products â€” LLM apps, RAG systems and AI agents.",
  oneLiner: "Intern at InseLabs Â· President, AlgoZenith-KIIT Â· CS @ KIIT '28",
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
    dates: "May â€“ Jun 2025",
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
      "6-stage identity-protection workflow: facial enrollment, embedding, web monitoring, matching, 0â€“100 risk scoring and takedown drafting.",
      "AI application workflows and product integrations, from business need to shipped feature.",
    ],
    note: "Internship work at InseLabs",
  },
  {
    slug: "algogym",
    name: "AlgoGym",
    hook: "A DSA training platform with an AI tutor that adapts to your Codeforces progress.",
    dates: "Aug â€“ Sep 2024",
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
    dates: "Oct 2024 â€“ Jan 2025",
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
    body: "Assistants that answer from your PDFs, docs or database â€” with sources, not guesses.",
    proof: "investiq",
  },
  {
    title: "AI agents & workflow automation",
    body: "LLM pipelines that do multi-step work for you: extract, score, draft, notify.",
    proof: "truehuman",
  },
  {
    title: "Full-stack AI web apps",
    body: "React/Next.js front ends, FastAPI or Supabase back ends, auth and deployment â€” end to end.",
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
    dates: "Feb 2025 â€“ Present",
    points: [
      "Collaborated with a team of 50 programmers on problem-solving strategies for contests.",
      "Teach Data Structures classes and run post-contest discussions.",
      "Solved 1000+ problems across Codeforces, CodeChef and AtCoder.",
    ],
  },
  {
    title: "Academic Associate & Web Developer",
    org: "IIWCPC â€” International India Women's Programming Contest",
    points: [
      "Authored and reviewed DSA problems with the IIT Kanpur team.",
      "Headed the Contest Integrity Team for fairness and security.",
      "Built the official IIWCPC website.",
    ],
  },
  {
    title: "B.Tech, Computer Science",
    org: "Kalinga Institute of Industrial Technology",
    dates: "2024 â€“ 2028",
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
  { title: "Codeforces Specialist", detail: "Rating 1430 Â· top 8%" },
  { title: "CodeChef 1513", detail: "Top 10% Â· Symmetry9" },
  { title: "AIR 1 â€” Code O Olympic", detail: "IIIT Bhubaneswar" },
  { title: "Rank 1 â€” Geek Clash", detail: "GFG-KIIT" },
  { title: "Rank 1 of 100 teams â€” The Last Test Case", detail: "Offline contest, GFG-KIIT" },
  { title: "Finalist â€” Shaastra Programming Contest", detail: "IIT Madras" },
];

export const socials: SocialLink[] = [
  { label: "Email", href: `mailto:${email}`, handle: email, blurb: "Have a project in mind? Write to me.", icon: "siGmail" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vinayaktiwari9", handle: "in/vinayaktiwari9", blurb: "Work updates and professional networking.", icon: "linkedin" },
  { label: "GitHub", href: undefined, blurb: "Source for the projects above.", icon: "siGithub" },
  { label: "Codeforces", href: undefined, handle: "Specialist · 1430", blurb: "Contest history and ratings.", icon: "siCodeforces" },
  { label: "CodeChef", href: undefined, handle: "Symmetry9 · 1513", blurb: "More contests, more problems.", icon: "siCodechef" },
];

export const about = {
  whoami: "Vinayak Tiwari. CS undergrad at KIIT, Bhubaneswar (class of '28). AI engineer by focus, competitive programmer by habit.",
  whatido: "I build AI products: RAG over real documents, LLM features with validated outputs, agents that automate workflows, and the full-stack apps around them. Open to freelance projects and internships.",
  beyondcode: "President of AlgoZenith-KIIT: teaching DSA and running post-contest discussions. 1000+ problems solved; ICPC Asia Amritapuri Regionalist 2025.",
};

export const tech: Tech[] = [
  { name: "Azure OpenAI", ring: 0 },
  { name: "Gemini", icon: "siGooglegemini", ring: 0 },
  { name: "LangChain", icon: "siLangchain", ring: 0 },
  { name: "Python", icon: "siPython", ring: 0 },
  { name: "FastAPI", icon: "siFastapi", ring: 1 },
  { name: "Pydantic", icon: "siPydantic", ring: 1 },
  { name: "TypeScript", icon: "siTypescript", ring: 1 },
  { name: "Next.js", icon: "siNextdotjs", ring: 1 },
  { name: "React", icon: "siReact", ring: 1 },
  { name: "Supabase", icon: "siSupabase", ring: 1 },
  { name: "PostgreSQL", icon: "siPostgresql", ring: 1 },
  { name: "MongoDB", icon: "siMongodb", ring: 2 },
  { name: "Docker", icon: "siDocker", ring: 2 },
  { name: "Kubernetes", icon: "siKubernetes", ring: 2 },
  { name: "AWS", ring: 2 },
  { name: "Azure", ring: 2 },
  { name: "C++", icon: "siCplusplus", ring: 2 },
  { name: "OpenCV", icon: "siOpencv", ring: 2 },
  { name: "Tailwind CSS", icon: "siTailwindcss", ring: 2 },
  { name: "Git", icon: "siGit", ring: 2 },
];

// "Some extra stuff": roles, wins and photos. Add gallery items here.
export const extras: Extra[] = [
  {
    title: "ICPC Asia Amritapuri Regionalist 2025",
    detail: "Qualified for the regional round (rank < 200).",
    image: "/img/icpc-certificate.webp",
    alt: "ICPC Asia Amritapuri Regional Contest 2025 participation certificate for Vinayak Tiwari",
    href: "/img/icpc-certificate.webp",
    wide: true,
  },
  {
    title: "President @ AlgoZenith-KIIT",
    detail: "Feb 2025 – present. 50 programmers, DSA classes, post-contest discussions.",
    image: "/img/achievement-stage.webp",
    alt: "Vinayak with fellow contestants holding certificates on stage",
  },
  { title: "Intern @ InseLabs", detail: "Built TrueHuman's AI identity-protection pipeline and workflow automation." },
  { title: "Academic Associate @ IIWCPC", detail: "Authored DSA problems with the IIT Kanpur team; headed contest integrity; built the official website." },
  { title: "Codeforces Specialist", detail: "Rating 1430 · top 8%." },
  { title: "CodeChef 1513", detail: "Top 10% · Symmetry9." },
  { title: "AIR 1 · Code O Olympic", detail: "IIIT Bhubaneswar." },
  { title: "Rank 1 · Geek Clash & The Last Test Case", detail: "GFG-KIIT — the second one out of 100 teams." },
  { title: "Finalist · Shaastra Programming Contest", detail: "IIT Madras." },
  { title: "B.Tech CSE @ KIIT", detail: "2024 – 2028, Bhubaneswar." },
];

export const visibleLinks = (links: SocialLink[]) =>
  links.filter((l): l is SocialLink & { href: string } => Boolean(l.href));

export const allContent = { profile, stack, projects, services, roles, achievements, socials, about, tech, extras };
