import { ease } from "snuggy";
import { Anim } from "@/consts.ts";
import { anim, animScaleX, animScaleY, animTime, animY } from "@/data.ts";
import { tickTimer } from "@/lib/timer.ts";

function updateBreatheAnimation(id: number) {
  const e = tickAnimationTimer(id, 2000);
  animScaleX[id] = 1 + 0.05 * e;
  animScaleY[id] = 1 + 0.05 * e;
}

function updateWalkAnimation(id: number) {
  const e = tickAnimationTimer(id, 200);
  animY[id] = -2 * e;
}

function updateStaggerAnimation(id: number) {
  const e = tickAnimationTimer(id, 100);
  animScaleX[id] = 1 + 0.25 * e;
  animScaleY[id] = 1 - 0.25 * e;
}

export function updateAnimation(id: number) {
  switch (anim[id]) {
    case Anim.BREATHE:
      updateBreatheAnimation(id);
      break;
    case Anim.WALK:
      updateWalkAnimation(id);
      break;
    case Anim.STAGGER:
      updateStaggerAnimation(id);
      break;
  }
}

function tickAnimationTimer(id: number, duration: number) {
  if (animTime[id] === 0) {
    animTime[id] = duration;
  }

  tickTimer(animTime, id);

  return ease((animTime[id] % duration) / duration);
}
