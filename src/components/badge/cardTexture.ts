// Draws the badge artwork at runtime (portrait + type) and hands it to the Lanyard as data URLs.
// Card aspect matches the Lanyard's portrait card (1.6 × 2.25); the top ~140px stays clear for the strap slot.

export const CARD_W = 1024;
export const CARD_H = 1440;

const INK = "#ededed";
const MUTED = "#8a8a8a";
const GROUND = "#0f0f0f";
const SANS = '"Geist Variable", system-ui, sans-serif';
const MONO = '"Geist Mono Variable", ui-monospace, monospace';

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("2D canvas unavailable");
  return [c, ctx] as const;
}

export function drawCardFace(ctx: CanvasRenderingContext2D, portrait: HTMLImageElement, w: number, h: number): void {
  ctx.fillStyle = GROUND;
  ctx.fillRect(0, 0, w, h);

  // Portrait window: cover-fit into a rounded frame below the strap slot.
  const pad = 72;
  const top = 170;
  const pw = w - pad * 2;
  const ph = 860;
  const scale = Math.max(pw / portrait.width, ph / portrait.height);
  const sw = pw / scale;
  const sh = ph / scale;
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(pad, top, pw, ph, 28);
  ctx.clip();
  ctx.drawImage(portrait, (portrait.width - sw) / 2, (portrait.height - sh) / 2, sw, sh, pad, top, pw, ph);
  ctx.restore();

  ctx.fillStyle = INK;
  ctx.font = `600 92px ${SANS}`;
  ctx.letterSpacing = "-3px";
  ctx.fillText("Vinayak Tiwari", pad, top + ph + 120);

  ctx.letterSpacing = "4px";
  ctx.font = `500 34px ${MONO}`;
  ctx.fillStyle = INK;
  ctx.fillText("AI ENGINEER", pad, top + ph + 190);
  ctx.fillStyle = MUTED;
  ctx.fillText("LLM · RAG · AGENTS", pad, top + ph + 240);
}

function drawCardBack(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  ctx.fillStyle = GROUND;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = INK;
  ctx.font = `600 300px ${SANS}`;
  ctx.letterSpacing = "-12px";
  ctx.textAlign = "center";
  ctx.fillText("VT", w / 2, h / 2 + 100);
  ctx.letterSpacing = "4px";
  ctx.font = `500 34px ${MONO}`;
  ctx.fillStyle = MUTED;
  ctx.fillText("OPEN TO FREELANCE & INTERNSHIPS", w / 2, h - 140);
}

function drawStrap(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  // Horizontal artwork: the Lanyard rotates it so its width runs along the strap.
  ctx.fillStyle = "#0b0b0b";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = INK;
  ctx.font = `600 ${Math.round(h * 0.42)}px ${SANS}`;
  ctx.letterSpacing = "8px";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("VINAYAK TIWARI", w / 2, h / 2);
  ctx.fillStyle = MUTED;
  ctx.beginPath();
  ctx.arc(h * 0.35, h / 2, 5, 0, Math.PI * 2);
  ctx.arc(w - h * 0.35, h / 2, 5, 0, Math.PI * 2);
  ctx.fill();
}

export async function buildBadgeImages(portraitSrc: string) {
  await Promise.all([document.fonts.load(`600 92px ${SANS}`), document.fonts.load(`500 34px ${MONO}`)]);
  const portrait = await loadImage(portraitSrc);

  const [front, fctx] = canvas(CARD_W, CARD_H);
  drawCardFace(fctx, portrait, CARD_W, CARD_H);
  const [back, bctx] = canvas(CARD_W, CARD_H);
  drawCardBack(bctx, CARD_W, CARD_H);
  const [strap, sctx] = canvas(1024, 128);
  drawStrap(sctx, 1024, 128);

  return { front: front.toDataURL("image/jpeg", 0.9), back: back.toDataURL("image/jpeg", 0.9), strap: strap.toDataURL("image/png") };
}
