import { Entity } from "@/core/entity.js";
import { tickTimer, tween } from "ridder";

export function updateWalkAnimation(e: Entity) {
  tickTimer(e.animTimer, Infinity);
  e.animPosition.y = -tween(0, 1, e.animDuration, "easeInOutSine", e.animTimer.elapsed);
}
