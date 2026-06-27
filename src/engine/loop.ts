const FRAME_TIME_TARGET = 1000 / 60;
const FRAME_TIME_THRESHOLD = 100;

let last = 0;
let now = 0;
let frames = 0;
let framesTime = 0;

export let delta = 0;
export let time = 0;
export let elapsed = 0;
export let fps = 0;

export function startLoop(update: () => void) {
  const tick = () => {
    last = now;
    now = performance.now();

    time = now - last;
    delta = time / FRAME_TIME_TARGET;

    if (time < FRAME_TIME_THRESHOLD) {
      elapsed += time;

      frames++;
      framesTime += time;
      if (framesTime >= 1000) {
        fps = frames;
        frames = 0;
        framesTime -= 1000;
      }

      update();
    }

    last = performance.now();
    now = performance.now();
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}
