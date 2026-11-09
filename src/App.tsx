import { useEffect, useRef, useState, type CSSProperties } from "react";
import CinematicIntro from "./intro/CinematicIntro";
import { INTRO_SESSION_KEY } from "./intro/scenes";
import { profile } from "./content";

const asset = (path: string) => "/reference" + path;
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const projects = [
  { image: "/work/cover-image-homepage-revamp.webp", title: "Homepage revamp", tilt: "-3deg", drop: "0px" },
  { image: "/work/cover-image-foss-event.webp", title: "The whimsy booth", tilt: "1deg", drop: "56px" },
  { image: "/work/cover-image-product-hunt.webp", title: "Product Hunt", tilt: "-2deg", drop: "24px" },
  { image: "/work/cover-image-e-mail-drip.webp", title: "E-mail drip", tilt: "4deg", drop: "36px" },
];
const questions = [
  ["how soon are you ready to start?", "yesterday."],
  ["how long have you been in the show biz?", "long enough to empathize “business decisions” but short enough to take no shit."],
  ["who should not hire you?", "if you want a yes-person or someone who “just” follows orders, i’m not your person. i also can’t work with folks without a backbone."],
  ["what’s the fastest way to get your best work?", "i work best with a coach and very specific feedback. i have this innate urge to learn that one can exploit. teach me and let me run."],
  ["what makes you dangerous?", "agency + obsession."],
  ["what do you still suck at?", "i’m easily excited and easily bored. as dangerous as gasoline parked next to scented candles."],
];
const services = ["AI engineering", "LLM apps", "AI agents", "RAG systems", "full stack", "automation", "evaluation"];
const quoteLines = Array.from({ length: 7 }, (_, i) => "/boss-quote/line-" + (i + 1) + ".svg");
const scribbles = [1, 2, 4, 6, 7, 8, 10, 11, 15, 16, 17, 18];
const hireWords = ["hire", "your", "unfair", "advantage"];
const contactHref = `mailto:${profile.email}`;
const VISITOR_NAME_KEY = "portfolio-visitor-first-name";

function App() {
  const [introDone, setIntroDone] = useState(() => {
    try {
      return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [heroReady, setHeroReady] = useState(introDone);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursor, setCursor] = useState(false);
  const [showMail, setShowMail] = useState(false);
  const [visitorName, setVisitorName] = useState(() => {
    try { return sessionStorage.getItem(VISITOR_NAME_KEY) || ""; } catch { return ""; }
  });
  const [editingName, setEditingName] = useState(false);
  const [draftName, setDraftName] = useState("");
  const heroRef = useRef<HTMLElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const personRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const hireRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editingName) nameInputRef.current?.focus({ preventScroll: true });
  }, [editingName]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("menu-is-open");
    };
  }, [menuOpen]);
  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) target.classList.add("in");
      }),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal-on-view").forEach((node) => observer.observe(node));
    if (reduced) return () => observer.disconnect();
    let frame = 0;
    const progress = (element: HTMLElement) => {
      const travel = element.offsetHeight - window.innerHeight;
      return travel > 0 ? clamp((window.scrollY - element.offsetTop) / travel) : 0;
    };
    const update = () => {
      frame = 0;
      if (heroRef.current) setShowMail(window.scrollY >= heroRef.current.offsetHeight - 32);
      if (personRef.current) {
        const p = progress(personRef.current);
        const list = personRef.current.querySelector<HTMLElement>(".services-list");
        if (list) list.style.setProperty("--service-shift", (0.5 - p) * 440 + "px");
        personRef.current.querySelectorAll<HTMLElement>(".services-list li").forEach((item, i) => {
          const distance = Math.abs(i - p * 6);
          item.style.opacity = String(Math.max(0.13, 1 - distance * 0.24));
          item.style.filter = "blur(" + Math.min(7, distance * 1.35) + "px)";
        });
      }
      if (workRef.current) {
        const p = progress(workRef.current);
        workRef.current.style.setProperty("--work-progress", String(p));
        workRef.current.querySelectorAll<HTMLElement>(".work-card").forEach((card, i) => {
          card.style.setProperty("--enter", String(clamp((p - i * 0.16) / 0.25)));
        });
      }
      if (hireRef.current) {
        const p = progress(hireRef.current);
        hireRef.current.querySelectorAll<HTMLElement>(".hire-word").forEach((word, i) => {
          word.style.setProperty("--enter", String(clamp((p - i * 0.14) / 0.3)));
        });
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  const closeMenu = () => setMenuOpen(false);
  const saveVisitorName = () => {
    const first = draftName.trim().split(/\s+/)[0].slice(0, 20);
    if (first) {
      setVisitorName(first);
      try { sessionStorage.setItem(VISITOR_NAME_KEY, first); } catch { /* Keep the name for this render. */ }
    }
    setEditingName(false);
  };
  const replayIntro = () => {
    if (window.scrollY) window.scrollTo({ top: 0, behavior: "instant" });
    setMenuOpen(false);
    setHeroReady(false);
    setIntroDone(false);
  };

  return (
    <>
      {!introDone && <CinematicIntro onClosing={() => setHeroReady(true)} onFinish={() => { setHeroReady(true); setIntroDone(true); }} />}
      <div className="site-shell" inert={!introDone}>
      <header className="site-header site-header--poster header-live">
        <a className="header-logo" href="#top" aria-label="Vinayak, back to top" onClick={closeMenu}>Vinayak<span aria-hidden="true">.</span></a>
        <button className={"menu-toggle " + (menuOpen ? "is-open" : "")} type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
      </header>
      <nav className={"nav-takeover " + (menuOpen ? "is-open" : "")} aria-label="Main navigation" aria-hidden={!menuOpen}>
        <div className="nav-inner">
          <div className="nav-links">{[["home", "#top"], ["work", "#work"], ["about", "#person"], ["b-roll", "#quote"], ["playground", "#hire"]].map(([label, href], i) => <a key={label} href={href} aria-label={label} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu} style={{ "--i": i } as CSSProperties}><span>{label}</span><i aria-hidden="true">•</i></a>)}</div>
          <img className="nav-photo" src="/hero/vinayak-cutout.png" alt="" />
          <div className="nav-bottom"><span>HAVE SOMETHING WILD IN MIND?</span><a href={contactHref}>LET'S TALK ↗</a><a href="https://www.linkedin.com/in/vinayaktiwari9" target="_blank" rel="noreferrer">LINKEDIN ↗</a></div>
        </div>
      </nav>

      <main>
        <section className={"hero hero-poster " + (heroReady ? "poster-ready" : "")} id="top" ref={heroRef} aria-labelledby="hero-title">
          <div className="hero-poster-stage">
            <div className="hero-poster-frame">
              <img className="hero-poster-image" src="/images/vinayak-modern-design.png" alt="Vinayak portrait with red HELLO, MEET, and VINAYAK typography on a warm cream background" width="1672" height="941" loading="eager" fetchPriority="high" decoding="async" />
              <span className="hero-art-mask hero-art-mask--hello" aria-hidden="true" />
              <span className="hero-art-mask hero-art-mask--meet" aria-hidden="true" />
              <span className="hero-art-mask hero-art-mask--vinayak" aria-hidden="true" />
              <span className="hero-placeholder-cover" aria-hidden="true" />
            </div>
            <div className="hero-name-control">
              {editingName ? <input ref={nameInputRef} className="hero-name-live" type="text" aria-label="your first name" autoComplete="given-name" autoCapitalize="none" spellCheck={false} maxLength={20} enterKeyHint="done" value={draftName} onChange={(event) => setDraftName(event.target.value)} onBlur={saveVisitorName} onKeyDown={(event) => { if (event.key === "Enter") saveVisitorName(); if (event.key === "Escape") setEditingName(false); }} /> : <button className="hero-name-live" type="button" aria-label="type your first name" onClick={() => { setDraftName(visitorName); setEditingName(true); }}>{`{{ ${visitorName || "first name"} }}`}</button>}
            </div>
            <p className="hero-mobile-role" aria-hidden="true">AI ENGINEER<span>↗</span></p>
            <h1 className="sr-only" id="hero-title">Meet Vinayak — Software Engineering, Full-stack, AI</h1>
          </div>
        </section>
        <section className="boss-quote reveal-on-view" id="quote" aria-label="A quote from my ex-boss">
          <div className="boss-quote-stage">
            {quoteLines.map((line, i) => <img className="quote-line" key={line} src={asset(line)} alt="" style={{ "--i": i } as CSSProperties} />)}
            {scribbles.map((number, i) => <img className="quote-scribble" key={number} src={asset("/boss-quote/scribble-" + number + ".svg")} alt="" style={{ "--i": i } as CSSProperties} />)}
          </div>
          <p className="sr-only">and what you’ll be is a gamechanger, trouble-maker, disruptor and envelope pusher. that’s your role. that’s your destiny. — my ex-boss</p>
        </section>
        <section className="person" id="person" ref={personRef} aria-labelledby="person-title">
          <div className="person-stage section-wrap"><div className="person-copy"><h2 id="person-title">i'm your person to get sh*t done</h2><p>{profile.about}</p><a className="bracket-link" href="#hire">[ put me to work ]</a></div>
            <ul className="services-list" aria-label="Services">{services.map((service, i) => <li key={service}><span className="service-index">0{i + 1}</span><span>{service}</span><span aria-hidden="true">↗</span></li>)}</ul></div>
        </section>
        <section className="work-section reveal-on-view" id="work" ref={workRef} aria-labelledby="work-title"><div className="work-stage"><h2 id="work-title">work i'm super<br />proud of.</h2><div className="work-grid">{projects.map((item) => <a className="work-card" key={item.image} href="#hire" aria-label={"Ask about " + item.title} style={{ "--tilt": item.tilt, "--drop": item.drop, "--enter": 0 } as CSSProperties} onMouseEnter={() => setCursor(true)} onMouseLeave={() => setCursor(false)} onMouseMove={(event) => { if (cursorRef.current) { cursorRef.current.style.left = event.clientX + "px"; cursorRef.current.style.top = event.clientY + "px"; } }}><span className="work-card-face"><img src={asset(item.image)} alt={item.title} width="1080" height="1080" loading="lazy" /><span className="work-arrow" aria-hidden="true">↗</span></span></a>)}</div></div></section>
        <div className={"work-cursor " + (cursor ? "is-visible" : "")} ref={cursorRef} aria-hidden="true">open ↗</div>
        <section className="faq-section section-wrap reveal-on-view" id="faqs" aria-labelledby="faq-title"><h2 id="faq-title">before you ask<span>...</span></h2><ol className="faq-grid">{questions.map(([question, answer], i) => <li key={question} className="faq-card" style={{ "--i": i } as CSSProperties}><span className="faq-index">0{i + 1}</span><h3>{question}</h3><p>{answer}</p></li>)}</ol></section>
        <section className="hire-section" id="hire" ref={hireRef} aria-label="Hire your unfair advantage"><a className="hire-panel" href={contactHref} aria-label="Email Vinayak to discuss a project"><div className="hire-ink" aria-hidden="true" /><div className="hire-words" aria-hidden="true">{hireWords.map((word, i) => <img key={word} className={"hire-word hire-word-" + word} src={asset("/hire-lines/word-" + word + ".svg")} alt="" style={{ "--i": i, "--enter": 0 } as CSSProperties} />)}</div></a></section>
      </main>
      <a className={"floating-mail " + (showMail ? "is-visible" : "")} href={contactHref} aria-label="Email Vinayak" tabIndex={showMail ? 0 : -1}><span>✉</span><i>♥</i></a>
      <footer className="site-footer" id="contact"><div className="footer-top"><span className="footer-wordmark">VINAYAK<span aria-hidden="true">.</span></span><a className="bracket-link" href="#top">[ back to top ]</a></div><div className="footer-main"><div className="footer-identity"><p>i’m even better in conversation.<br />say hi at</p><a className="footer-email" href={contactHref}><span>{profile.email.split("@")[0]}</span><span>@{profile.email.split("@")[1]}</span></a></div><div className="footer-columns"><div><a href="https://www.linkedin.com/in/vinayaktiwari9" target="_blank" rel="noreferrer">linkedin ↗</a><a href={contactHref}>mail ↗</a></div><div><a href="#work">01 work</a><a href="#person">02 about</a><a href="#faqs">03 before you ask</a><a href="#hire">04 hire me</a></div></div></div><div className="footer-meta"><span>handmade with ♥ and 🧠</span><span>© 2026 Vinayak Tiwari.</span></div><div className="footer-mantra" aria-hidden="true">fuck normal</div></footer>
      {introDone && !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches && <button className="replay-intro" type="button" onClick={replayIntro}>replay intro ↗</button>}
      </div>
    </>
  );
}
export default App;
