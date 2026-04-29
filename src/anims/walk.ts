import { delta, ease, elapsed } from "snuggy";
import { animY } from "@/data.ts";
import { resetAnimation } from "@/lib/entity.ts";

export function animateWalk(id: number) {
  resetAnimation(id);
  const d = 200;
  const t = (elapsed % d) / d;
  animY[id] = -4 * ease(t) * delta;
}
