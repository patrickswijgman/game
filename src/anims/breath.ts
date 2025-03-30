import { Entity } from "@/core/entity.js";
import { tickTimer, tween } from "ridder";

export function updateBreathAnimation(e: Entity) {
  tickTimer(e.animTimer, Infinity);
  e.animScale.x = tween(1, 1.1, e.animDuration, "easeInOutSine", e.animTimer.elapsed);
  e.animScale.y = tween(1, 1.1, e.animDuration, "easeInOutSine", e.animTimer.elapsed);
}
