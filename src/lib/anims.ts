import { ease, elapsed } from "snuggy";
import { animScaleX, animScaleY, animY } from "@/data.ts";
import { resetAnimation } from "@/lib/entity.ts";

export function animateBreathe(id: number) {
  resetAnimation(id);
  const d = 2000;
  const t = (elapsed % d) / d;
  animScaleX[id] = 1 + 0.1 * ease(t);
  animScaleY[id] = 1 + 0.1 * ease(t);
}

export function animateWalk(id: number) {
  resetAnimation(id);
  const d = 200;
  const t = (elapsed % d) / d;
  animY[id] = -2 * ease(t);
}
