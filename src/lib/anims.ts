import { ease, elapsed } from "snuggy";
import { Anim } from "@/consts.ts";
import { anim, animScaleX, animScaleY, animY } from "@/data.ts";

function updateBreatheAnimation(id: number) {
  const d = 2000;
  const t = (elapsed % d) / d;
  animScaleX[id] = 1 + 0.05 * ease(t);
  animScaleY[id] = 1 + 0.05 * ease(t);
}

function updateWalkAnimation(id: number) {
  const d = 200;
  const t = (elapsed % d) / d;
  animY[id] = -2 * ease(t);
}

function updateStaggerAnimation(id: number) {}

export function updateAnimation(id: number) {
  switch (anim[id]) {
    case Anim.BREATHE:
      updateBreatheAnimation(id);
      break;
    case Anim.WALK:
      updateWalkAnimation(id);
      break;
  }
}
