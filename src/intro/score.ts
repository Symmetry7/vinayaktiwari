import { INTRO_DURATION } from "./scenes";

// The reference intro synthesizes its soundtrack in Web Audio rather than loading
// an audio file. This original score follows its word-hit / image-noise / rising-drive
// rhythm, synchronized to this portfolio's shorter scene map.
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

  // A low electrical drive slowly opens its filter as the cuts get faster.
  const drive = context.createOscillator();
  const driveFilter = context.createBiquadFilter();
  const driveGain = context.createGain();
  const automate = (parameter: AudioParam, points: [number, number][]) => {
    let value = points[0][1];
    for (let i = 1; i < points.length; i++) {
      const [cue, next] = points[i];
      const [previousCue, previous] = points[i - 1];
      if (offset >= cue) value = next;
      else if (offset > previousCue) { value = previous + (next - previous) * (offset - previousCue) / (cue - previousCue); break; }
    }
    parameter.setValueAtTime(value, start);
    for (const [cue, next] of points) if (cue > offset) parameter.linearRampToValueAtTime(next, time(cue));
  };
  drive.type = "sawtooth";
  automate(drive.frequency, [[0, 55], [2.66, 74], [4.35, 180], [5.17, 330]]);
  driveFilter.type = "lowpass";
  automate(driveFilter.frequency, [[0, 180], [2.66, 760], [5.17, 3400]]);
  automate(driveGain.gain, [[0, 0.0001], [0.15, 0.038], [4.35, 0.075], [5.17, 0.075], [INTRO_DURATION, 0.0001]]);
  drive.connect(driveFilter).connect(driveGain).connect(master);
  drive.start(start);
  drive.stop(time(INTRO_DURATION) + 0.01);
  tone(73.42, 0, INTRO_DURATION, 0.04, "sine");

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

  // Short filtered-noise cuts put a dry edge on photographs and both shutter directions.
  for (const cue of [0.27, 1.16, 2.03, 2.91, 3.75, 4.68, 5.17, 5.56]) {
    if (cue < offset) continue;
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const at = time(cue);
    source.buffer = noiseBuffer;
    filter.type = cue >= 5.17 ? "bandpass" : "highpass";
    filter.frequency.value = cue >= 5.17 ? 2400 : 1600;
    filter.Q.value = cue >= 5.17 ? 4 : 1;
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(cue >= 5.17 ? 0.16 : 0.10, at + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + (cue >= 5.17 ? 0.07 : 0.04));
    source.connect(filter).connect(gain).connect(master);
    source.start(at);
    source.stop(at + 0.085);
  }

  return () => { void context.close(); };
}
