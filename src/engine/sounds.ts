export const sounds: Array<AudioBuffer> = [];

let audioContext: AudioContext;
let gain: GainNode;

export function setupAudio() {
  audioContext = new AudioContext();
  gain = audioContext.createGain();
  document.addEventListener("pointerdown", resume, { once: true });
  document.addEventListener("keydown", resume, { once: true });
}

export async function loadSound(id: number, url: string) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const sound = await audioContext.decodeAudioData(buffer);
  sounds[id] = sound;
}

export function playSound(id: number) {
  const sound = sounds[id];
  const source = audioContext.createBufferSource();
  source.buffer = sound;
  source.connect(gain);
  source.start();
  return source;
}

export function setVolume(value: number) {
  gain.gain.value = value;
}

function resume() {
  audioContext.resume();
}
