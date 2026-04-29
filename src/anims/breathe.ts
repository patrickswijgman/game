import { delta, ease, elapsed } from "snuggy";
import { animScaleX, animScaleY } from "@/data.ts";
import { resetEntityAnimation } from "@/lib/entity.ts";

export function animateBreathe(id: number) {
  resetEntityAnimation(id);
  const d = 2000;
  const t = (elapsed % d) / d;
  animScaleX[id] = 1 + 0.1 * ease(t) * delta;
  animScaleY[id] = 1 + 0.1 * ease(t) * delta;
}
