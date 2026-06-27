import type { Animation } from "@/consts.ts";
import { animAngle, animId, animScaleX, animScaleY, animTime, animX, animY } from "@/data/data.ts";
import { time } from "@/engine/loop.ts";
import { ease } from "@/engine/utils.ts";

export function setAnimation(id: number, nextAnimId: Animation) {
  if (nextAnimId !== animId[id]) {
    animId[id] = nextAnimId;
    animX[id] = 0;
    animY[id] = 0;
    animScaleX[id] = 1;
    animScaleY[id] = 1;
    animAngle[id] = 0;
    animTime[id] = 0;
  }
}

export function updateBreatheAnimation(id: number) {
  animTime[id] += time;
  animScaleX[id] = 1 + 0.05 * ease((animTime[id] % 2000) / 2000);
  animScaleY[id] = 1 + 0.05 * ease((animTime[id] % 2000) / 2000);
}

export function updateWalkAnimation(id: number) {
  animTime[id] += time;
  animY[id] = -2 * ease((animTime[id] % 200) / 200);
}

export function updateStaggerAnimation(id: number) {
  animTime[id] += time;
  animScaleX[id] = 1 + 0.25 * ease((animTime[id] % 100) / 100);
  animScaleY[id] = 1 - 0.25 * ease((animTime[id] % 100) / 100);
}
