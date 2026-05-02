import { time } from "snuggy";

export function tickTimer(timer: Float32Array, id: number) {
  if (timer[id] === 0) {
    return false;
  }

  timer[id] -= Math.min(time, timer[id]);

  return timer[id] === 0;
}
