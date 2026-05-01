import { time } from "snuggy";

export function setTimer(timer: Float32Array, id: number, duration: number) {
  if (timer[id] === 0) {
    timer[id] = duration;
    return true;
  }

  return false;
}

export function tickTimer(timer: Float32Array, id: number) {
  if (timer[id] === 0) {
    return false;
  }

  timer[id] -= Math.min(time, timer[id]);

  return timer[id] === 0;
}
