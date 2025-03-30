import { Entity } from "@/core/entity.js";
import { tickTimer, tween } from "ridder";

export function updateWindAnimation(e: Entity) {
  tickTimer(e.animTimer, Infinity);
  e.animAngle = tween(-2, 2, e.animDuration, "easeInOutSine", e.animTimer.elapsed);
}
