export type ProjectPageData = {
  slug: string;
  title: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  summary: string;
  stack: string[];
  repo?: string;
  paragraphs: string[];
};

export const projectPages: ProjectPageData[] = [
  {
    slug: "weapon-detection",
    title: "Weapon Detection",
    eyebrow: "01 / COMPUTER VISION",
    image: "/projects/weapon-detection.jpeg",
    imageAlt: "A presenter facing a crowded room, used as the editorial image for Weapon Detection",
    summary: "A real-time computer vision prototype for spotting visible weapons in camera feeds.",
    stack: ["Python", "OpenCV", "Haar Cascade", "Computer Vision"],
    repo: "https://github.com/Symmetry7/weapon-detection-",
    paragraphs: [
      "The question behind Weapon Detection was direct: how quickly can a camera feed surface a potentially dangerous object to a person responsible for safety? I built this as a real-time computer vision project for live webcam and CCTV-style input. It watches frames as they arrive and looks for weapon-like shapes, with an emphasis on making the result visible while the feed is still running. The project is a prototype, not a claim that a camera alone can make a safety decision. Its job is to demonstrate a useful first signal that could help a human reviewer pay attention to the right moment.",
      "The core implementation uses Python, OpenCV, and Haar Cascade classifiers. OpenCV handles the video stream, frame processing, and on-screen output. The classifier performs the visual detection work on each frame. I assembled a custom dataset of more than 255 weapon images, covering pistols, rifles, and sniper weapons, and used it to train the detection approach described in my resume. That dataset choice matters because a generic image classifier does not automatically understand the angles, scale, lighting, and partial occlusion found in practical camera footage. Building the data collection was part of the engineering problem, not merely preparation for it.",
      "The live flow was designed around surveillance use: take a feed, inspect frames, identify suspicious weapon activity, and make the anomaly apparent. In a crowded or sensitive space, speed and legibility both matter. The output has to be simple enough that an operator can understand why a frame deserves closer inspection. I kept the pipeline focused on that question instead of adding unrelated dashboard features. The result is a clear demonstration of how classical computer vision can be connected to an operational alert loop without pretending that the algorithm is infallible.",
      "This project also taught me where a detection demo ends and a dependable system begins. A weapon may be small, obscured, rotated, or visually similar to an ordinary object. Lighting and camera quality can shift throughout a scene. A production deployment would require much broader and carefully labeled data, evaluation across camera conditions, measured false-positive and false-negative rates, privacy review, and a human-in-the-loop response process. Those are not decorative caveats; they are the work that would determine whether the system earns trust outside a controlled example.",
      "What I am proud of here is the end-to-end thinking. I moved from collecting visual examples to training a detector, processing real video, and framing the output as an actionable signal. It is a compact project, but it connects model behavior to an actual user and setting. I would revisit it with stronger evaluation and more modern detection architectures, yet the original build remains an honest example of my interest in making machine perception useful under real constraints.",
      "The next iteration would start with a proper test set separated from training data and a record of every false alert. I would compare performance across different resolutions, camera positions, and crowded scenes, then let those observations guide the next data collection round. That measured loop is what turns a visual prototype into an engineering system."
    ]
  },
  {
    slug: "investiq",
    title: "InvestIQ",
    eyebrow: "02 / FINANCIAL INTELLIGENCE",
    image: "/projects/investiq.jpeg",
    imageAlt: "An editorial illustration of people studying data and documents, used for InvestIQ",
    summary: "Ask an annual report a precise question and trace the answer back to the right company and year.",
    stack: ["Python", "FastAPI", "Azure OpenAI", "Azure AI Search", "LangChain", "PostgreSQL"],
    repo: "https://github.com/Symmetry7/InvestIQ",
    paragraphs: [
      "Annual reports are rich with useful information and difficult to interrogate quickly. A single report may run for more than a hundred pages, and the number that matters can sit inside a table, a note, or an explanation written several sections away. InvestIQ is my retrieval-augmented financial intelligence project for that problem. Instead of treating a language model as a source of financial truth, the platform first retrieves relevant report material and then uses it to answer a question. The distinction is central: the report is the evidence, and the model helps a reader work with it.",
      "The pipeline begins with PDF ingestion. I used PyMuPDF4LLM to extract report content, LangChain semantic chunking to divide it into useful retrieval units, and Azure OpenAI embeddings to represent those units for search. They are indexed in Azure AI Search. A user can filter retrieval by company and year, which reduces the chance that a correct-looking answer is grounded in the wrong filing. That filtering is a practical product choice as much as a technical one: financial information changes over time, and a response without its reporting context is easy to misuse.",
      "A FastAPI service sits around the retrieval and question-answering flow. It receives the question, applies the relevant company and year constraints, retrieves report excerpts, and passes that context into the model. The goal is a focused answer connected to document evidence, rather than a broad guess from model memory. I also built automated KPI extraction. For structured financial metrics, the model output is validated with Pydantic before being stored in PostgreSQL. Validation is especially useful here because a plausible number in the wrong shape or field is still an unreliable result.",
      "The project includes Dockerized services and Kubernetes configuration, giving the application a path beyond a one-off notebook. Those choices made me consider where ingestion runs, how an API serves requests, and how extracted data survives between sessions. I did not want the interesting part of the project to stop at a single prompt. The system needed a document path, a search path, an answer path, and a durable data path. Keeping those pieces distinct also makes it easier to inspect what went wrong when a result is weak.",
      "InvestIQ represents how I like to build AI products: start with a specific source of truth, design retrieval around the user's real question, validate structured outputs, and expose the behavior through a usable service. The next level of work would include stronger citation presentation, evaluation sets for report questions, and more explicit handling of tables and conflicting disclosures. Even in its current form, it demonstrates a complete flow from long, messy source documents to targeted answers and stored metrics.",
      "If I were extending the product, I would test it with questions whose answers appear in multiple reporting years and with metrics that use similar labels but different accounting definitions. Those cases are where a fluent answer can hide a bad retrieval decision. I would also show the exact source passage beside every answer so a reader can verify the interpretation quickly."
    ]
  },
  {
    slug: "algogym",
    title: "AlgoGym",
    eyebrow: "03 / ADAPTIVE LEARNING",
    image: "/projects/algogym.jpeg",
    imageAlt: "A red figure standing apart from a crowd, used as the editorial image for AlgoGym",
    summary: "A practice system that turns competitive-programming history into a more intentional training plan.",
    stack: ["Next.js", "React", "TypeScript", "Gemini", "Supabase", "PostgreSQL"],
    repo: "https://github.com/Symmetry7/AlgoGym",
    paragraphs: [
      "Competitive programming has no shortage of problems. The harder question is what to practice next, how to measure progress, and how to turn a wrong answer into a better mental model. AlgoGym is my attempt to make that process more deliberate. It brings problem discovery, progress tracking, and AI-assisted explanation into one training environment. The aim is not to replace the effort of solving problems. It is to remove the friction around choosing the right work and understanding where a solution broke down.",
      "I built the platform with Next.js, React, TypeScript, Supabase, and PostgreSQL. It offers eight training tracks with topic and rating filters, so a learner can work toward a specific skill rather than scrolling through an undifferentiated catalog. Codeforces progress can be verified and reflected in the experience. The platform also synchronizes information from the Codeforces API and LeetCode GraphQL. Those integrations are useful because progress should come from real submissions where possible, not just a checkbox clicked in an interface.",
      "Gemini powers the learning assistance. It can help shape learning paths, answer contextual questions, and produce code variants in C++, Java, and Python. I used Zod validation around model outputs and PostgreSQL lesson caching to make that assistance more predictable and avoid regenerating the same material unnecessarily. A tutor is most valuable when it responds to the learner's context and stays consistent enough to be used as a tool. The model is one component of the experience; the surrounding product structure determines whether its answers are actually useful.",
      "Data synchronization brought a different kind of engineering challenge. External services may be slow, unavailable, or inconsistent, so the platform uses leased database jobs and retry handling. Supabase Auth identifies users, while PostgreSQL row-level security protects user-specific data. These details are less visible than a polished lesson screen, but they make the product feel coherent. A training history has to remain tied to the right person, and a delayed sync should not silently turn a useful progress view into misleading data.",
      "AlgoGym combines two parts of my work that I care about: algorithmic problem solving and full-stack AI engineering. The best part of the project is the connection between verified practice and targeted help. It can show the learner where they stand, give them a narrower next challenge, and offer an explanation when they need one. I would continue improving it by measuring whether the suggested paths actually help people solve more problems independently. That is the standard I want the product to meet: not just more AI output, but better learning.",
      "A useful next experiment would compare suggested practice against a simple baseline: pick a problem near the learner's current rating and topic. If the adaptive path does not help more, it needs to change. I would also ask learners whether a hint arrived at the right moment, whether it gave away too much, and whether they could solve a similar problem later without help. Those questions matter more than counting model responses. The product succeeds when the learner becomes less dependent on the tutor over time."
    ]
  },
  {
    slug: "symm-type",
    title: "SYMM-Type",
    eyebrow: "04 / INTERACTIVE WEB",
    image: "/projects/symm-type.jpeg",
    imageAlt: "A dark winged figure against a red field, used as the editorial image for SYMM-Type",
    summary: "A keyboard-first typing test that makes speed, accuracy, and rhythm visible.",
    stack: ["HTML", "CSS", "JavaScript", "Chart.js"],
    repo: "https://github.com/Symmetry7/SYMM-Type",
    paragraphs: [
      "SYMM-Type is a typing-test website built around a simple interaction: focus the text, type, and learn what your pace actually looks like. Its repository calls it a typing site, and the interface is intentionally direct. There is a word field, a visible caret, a timer, controls for test length, a restart action, and result readouts for words per minute and accuracy. Those parts form a compact loop that can be repeated without a complicated setup. In a portfolio filled with AI systems, this project shows another side of my work: attention to immediate interaction and small details in the browser.",
      "The site is written in plain HTML, CSS, and JavaScript. The available timer choices are 15, 30, 60, and 120 seconds, with 30 seconds selected in the current interface. A random word list feeds the test. As the user types, the script marks letters as correct or incorrect, handles extra characters, moves an active caret, and advances word by word. It also supports moving back to an errored word with Backspace. These are small behaviors, but together they determine whether the test feels like a fluid keyboard exercise or a form that constantly interrupts you.",
      "The results section displays typing speed and accuracy. The code tracks correct and incorrect letters, completed words, and timing, then uses those values to report performance. Chart.js is loaded by the page for visualizing results. I like this kind of feedback because a typing test should reveal more than a final score. Speed without accuracy is incomplete, while accuracy without a sense of pace leaves out the rhythm of the exercise. The product works best when it helps a person notice how those measures change together.",
      "The visual language is restrained and technical. A prominent site mark, compact settings, an active typing surface, and clear result labels keep the focus on the task. The implementation does not need a heavy framework to achieve that. Using browser primitives meant the core interaction had to be understood directly: keyboard events, focus, text nodes, state changes, and timer behavior. That is valuable engineering practice because abstractions can make an interface easier to assemble, but they do not remove the need to understand how it behaves.",
      "I see SYMM-Type as a study in responsiveness. Every keystroke receives immediate visual feedback, the caret follows progress, and the restart control makes another attempt easy. There are opportunities to evolve it further, including richer accessibility support, saved personal records, and more varied text modes. The existing project stands on the strength of a focused idea executed as an interactive tool. It reminds me that a memorable product can be quite small when its feedback is quick, its rules are clear, and its interface stays out of the user's way.",
      "If I returned to it today, I would first test the keyboard experience with different input methods and screen readers. Then I would make the results easier to compare across sessions. That would preserve the fast, quiet feel of the site while giving a returning typist a clearer sense of progress."
    ]
  }
];
