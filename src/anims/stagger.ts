import { Entity } from "@/core/entity.js";
import { tickTimer, tween } from "ridder";

export function updateStaggerAnimation(e: Entity) {
  tickTimer(e.animTimer, e.animDuration);
  e.animScale.x = tween(1, 1.5, e.animDuration / 2, "easeInOutSine", e.animTimer.elapsed);
  e.animScale.y = tween(1, 0.75, e.animDuration / 2, "easeInOutSine", e.animTimer.elapsed);
}
