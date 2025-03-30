import { Entity } from "@/core/entity.js";
import { tickTimer, tween } from "ridder";

export function updateCombatTextAnimation(e: Entity) {
  tickTimer(e.animTimer, e.animDuration);
  e.animPosition.y = -tween(0, 20, e.animDuration, "easeOutCirc", e.animTimer.elapsed);
}
