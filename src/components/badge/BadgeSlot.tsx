import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { BadgeFallback } from "../BadgeFallback";
import { buildBadgeImages } from "./cardTexture";

// three.js lives in its own chunk; the hero renders before it downloads.
const Lanyard = lazy(() => import("./Lanyard"));

export function canUseWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

// A failed chunk download or WebGL error must never take the page down: show the static badge.
class BadgeBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <BadgeFallback /> : this.props.children;
  }
}

type Images = Awaited<ReturnType<typeof buildBadgeImages>>;

export function BadgeSlot({ webgl = canUseWebGL() }: { webgl?: boolean }) {
  const reduce = useReducedMotion();
  const live = webgl && !reduce;
  const [images, setImages] = useState<Images | null>(null);

  useEffect(() => {
    if (!live) return;
    let cancelled = false;
    buildBadgeImages("/img/portrait-badge.webp")
      .then((imgs) => !cancelled && setImages(imgs))
      .catch(() => {}); // stay on the static badge
    return () => {
      cancelled = true;
    };
  }, [live]);

  if (!live) return <BadgeFallback />;

  return (
    <BadgeBoundary>
      <Suspense fallback={<BadgeFallback />}>
        {images ? (
          <Lanyard
            frontImage={images.front}
            backImage={images.back}
            strapImage={images.strap}
            cardColor="#0f0f0f"
            strapColor="#0b0b0b"
            finish="matte"
            metal="graphite"
            size={0.62}
            className="absolute inset-0"
          />
        ) : (
          <BadgeFallback />
        )}
      </Suspense>
    </BadgeBoundary>
  );
}
