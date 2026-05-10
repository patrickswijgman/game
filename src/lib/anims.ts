import { ease } from "snuggy";
import { Anim } from "@/consts.ts";
import { anim, animScaleX, animScaleY, animTime, animY } from "@/data.ts";
import { tickTimer } from "@/lib/timer.ts";

function updateBreatheAnimation(id: number) {
  const d = 2000;
  tickAnimationTimer(id, d);
  animScaleX[id] = 1 + 0.05 * getAnimationEase(id, d);
  animScaleY[id] = 1 + 0.05 * getAnimationEase(id, d);
}

function updateWalkAnimation(id: number) {
  const d = 200;
  tickAnimationTimer(id, d);
  animY[id] = -2 * getAnimationEase(id, d);
}

function updateStaggerAnimation(id: number) {
  const d = 100;
  tickAnimationTimer(id, d);
  animScaleX[id] = 1 + 0.25 * getAnimationEase(id, d);
  animScaleY[id] = 1 - 0.25 * getAnimationEase(id, d);
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

function tickAnimationTimer(id: number, d: number) {
  if (animTime[id] === 0) {
    animTime[id] = d;
  }
  tickTimer(animTime, id);
}

function getAnimationEase(id: number, d: number) {
  return ease((animTime[id] % d) / d);
}
