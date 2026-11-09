import { INTRO_DURATION } from "./scenes";

// An original five-second score, synthesized only after the viewer enables sound.
// The 140 BPM pulse follows the title cuts without loading or autoplaying audio.
export function playIntroScore(offset = 0): () => void {
  const context = new AudioContext();
  void context.resume();
  const start = context.currentTime + 0.02;
  const time = (cue: number) => start + cue - offset;
  const master = context.createGain();
  master.gain.value = 0.48;
  const compressor = context.createDynamicsCompressor();
  compressor.threshold.value = -18;
  compressor.ratio.value = 3;
  master.connect(compressor).connect(context.destination);

  const tone = (frequency: number, cue: number, length: number, level: number, type: OscillatorType, cutoff?: number) => {
    if (cue + length <= offset || cue >= INTRO_DURATION) return;
    const at = Math.max(start, time(cue));
    const until = Math.min(time(cue + length), time(INTRO_DURATION));
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.linearRampToValueAtTime(level, Math.min(at + 0.035, until));
    gain.gain.setTargetAtTime(0.0001, Math.max(at + 0.055, until - 0.28), 0.085);
    if (cutoff) {
      const filter = context.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = cutoff;
      oscillator.connect(filter).connect(gain);
    } else oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(at);
    oscillator.stop(until + 0.02);
  };

  // Four restrained minor-key harmonies carry the sequence as one connected piece.
  for (const [cue, length, notes] of [
    [0, 1.76, [146.83, 174.61, 220]],
    [1.76, 1.74, [130.81, 164.81, 196]],
    [3.5, 0.85, [116.54, 146.83, 174.61]],
    [4.35, 1.37, [110, 146.83, 164.81]],
  ] as const) {
    notes.forEach((note) => tone(note, cue, length, 0.035, "sawtooth", 580));
  }
  tone(73.42, 0, INTRO_DURATION, 0.065, "sine");

  // A pitched low drum lands on each word; a dry metallic tick marks the images.
  for (const cue of [0, 0.89, 1.76, 2.66, 3.5, 4.35, 5.17]) {
    if (cue < offset) continue;
    const at = time(cue);
    const drum = context.createOscillator();
    const gain = context.createGain();
    drum.type = "sine";
    drum.frequency.setValueAtTime(115, at);
    drum.frequency.exponentialRampToValueAtTime(42, at + 0.2);
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(cue === 5.17 ? 0.33 : 0.24, at + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.25);
    drum.connect(gain).connect(master);
    drum.start(at);
    drum.stop(at + 0.27);
  }

  const noiseBuffer = context.createBuffer(1, Math.ceil(context.sampleRate * 0.09), context.sampleRate);
  const noise = noiseBuffer.getChannelData(0);
  let seed = 19;
  for (let i = 0; i < noise.length; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    noise[i] = (seed / 2147483648 - 1) * (1 - i / noise.length);
  }
  for (let step = 0; step < 26; step++) {
    const cue = step * (60 / 140) / 2;
    if (cue < offset || cue >= INTRO_DURATION) continue;
    const at = time(cue);
    const tick = context.createBufferSource();
    const highpass = context.createBiquadFilter();
    const gain = context.createGain();
    tick.buffer = noiseBuffer;
    highpass.type = "highpass";
    highpass.frequency.value = step % 4 === 2 ? 1850 : 3900;
    gain.gain.value = step % 4 === 2 ? 0.07 : 0.025;
    tick.connect(highpass).connect(gain).connect(master);
    tick.start(at);
  }

  return () => { void context.close(); };
}
