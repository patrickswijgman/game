import { ease, elapsed } from "snuggy";
import { animScaleX, animScaleY, animY, speed } from "@/data.ts";

export function updateBreatheAnimation(id: number) {
  const d = 2000;
  const t = (elapsed % d) / d;
  animScaleX[id] = 1 + 0.05 * ease(t);
  animScaleY[id] = 1 + 0.05 * ease(t);
}

export function updateWalkAnimation(id: number) {
  const d = 200 / speed[id];
  const t = (elapsed % d) / d;
  animY[id] = -2 * ease(t);
}
