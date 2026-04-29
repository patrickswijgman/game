import { delta, ease, elapsed } from "snuggy";
import { animY } from "@/data.ts";
import { resetEntityAnimation } from "@/lib/entity.ts";

export function animateWalk(id: number) {
  resetEntityAnimation(id);
  const d = 200;
  const t = (elapsed % d) / d;
  animY[id] = -4 * ease(t) * delta;
}
