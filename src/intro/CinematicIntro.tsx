import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { createIntroTimeline } from "./timeline";
import { INTRO_ASSETS, INTRO_DURATION, INTRO_SCENES, INTRO_SESSION_KEY } from "./scenes";
import { playIntroScore } from "./score";
import "./cinematic-intro.css";

type Props = { onClosing: () => void; onFinish: () => void };

function preloadImages() {
  return Promise.all(Object.values(INTRO_ASSETS).map((src) => new Promise<void>((resolve) => {
    const image = new Image();
    image.onload = () => {
      if (image.decode) image.decode().catch(() => undefined).then(() => resolve());
      else resolve();
    };
    image.onerror = () => resolve();
    image.src = src;
  })));
}

const captions: Record<string, string> = {
  eyes: "NO NOISE.",
  promise: "KEEP YOUR WORD.",
  unbothered: "STAY UNBOTHERED.",
  discipline: "AGAIN.",
  focus: "LOCK IN.",
};

export default function CinematicIntro({ onClosing, onFinish }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const stopSoundRef = useRef<(() => void) | null>(null);
  const finishRef = useRef<() => void>(() => undefined);
  const finishedRef = useRef(false);
  const onFinishRef = useRef(onFinish);
  const onClosingRef = useRef(onClosing);
  const [soundOn, setSoundOn] = useState(false);
  onFinishRef.current = onFinish;
  onClosingRef.current = onClosing;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let cancelled = false;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    skipRef.current?.focus({ preventScroll: true });

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      stopSoundRef.current?.();
      stopSoundRef.current = null;
      try { sessionStorage.setItem(INTRO_SESSION_KEY, "1"); } catch { /* Storage is optional. */ }
      document.body.style.overflow = oldOverflow;
      onFinishRef.current();
    };
    finishRef.current = finish;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        timelineRef.current?.kill();
        finish();
      }
    };
    window.addEventListener("keydown", onKey);
    preloadImages().then(() => {
      if (cancelled || finishedRef.current) return;
      const timeline = createIntroTimeline(root, () => onClosingRef.current(), finish);
      timelineRef.current = timeline;
      timeline.fromTo(root.querySelector(".intro-progress-fill"), { scaleX: 0 }, { scaleX: 1, duration: INTRO_DURATION, ease: "none" }, 0);
      root.dataset.startedAt = String(Date.now());
      timeline.play(0);
    });
    return () => {
      cancelled = true;
      timelineRef.current?.kill();
      timelineRef.current = null;
      stopSoundRef.current?.();
      stopSoundRef.current = null;
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = oldOverflow;
    };
  }, []);

  const skip = () => {
    timelineRef.current?.kill();
    if (rootRef.current) gsap.set(rootRef.current, { autoAlpha: 0 });
    finishRef.current();
  };
  const toggleSound = () => {
    if (stopSoundRef.current) {
      stopSoundRef.current();
      stopSoundRef.current = null;
      setSoundOn(false);
      return;
    }
    try {
      stopSoundRef.current = playIntroScore(timelineRef.current?.time() ?? 0);
      setSoundOn(true);
    } catch {
      setSoundOn(false);
    }
  };

  return (
    <div className="cinematic-intro" ref={rootRef} role="dialog" aria-modal="true" aria-label="Cinematic introduction">
      {INTRO_SCENES.map(({ id, word, image }) => (
        <div className={`intro-scene intro-scene--${id} ${word ? "intro-scene--word" : "intro-scene--image"}`} key={id}>
          {word ? <div className="intro-word-window"><span className={`intro-word intro-word--${id}`}>{word}</span></div> : <>
            <img className={`intro-image intro-image--${id}`} src={image!} alt="" />
            {id === "gotham" && <img className="intro-image intro-gotham-rgb" src={image!} alt="" />}
            {captions[id] && <span className={`intro-caption intro-caption--${id}`}>{captions[id]}</span>}
          </>}
        </div>
      ))}
      <div className="intro-close intro-close--top" aria-hidden="true" />
      <div className="intro-close intro-close--bottom" aria-hidden="true" />
      <div className="intro-head"><span>VINAYAK / FIELD NOTES 001</span><button type="button" className="intro-sound" aria-pressed={soundOn} onClick={toggleSound}>SOUND {soundOn ? "ON" : "OFF"} <span aria-hidden="true">{soundOn ? "◖))" : "◖×"}</span></button></div>
      <div className="intro-foot"><span>CALM. OBSESSION. DISCIPLINE.</span><button ref={skipRef} className="intro-skip" type="button" onClick={skip}>SKIP INTRO ↗</button></div>
      <div className="intro-progress" aria-hidden="true"><div className="intro-progress-fill" /></div>
    </div>
  );
}
