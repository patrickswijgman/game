import { Entity } from "@/data/entity.js";
import { tickTimer, tween } from "ridder";

export function updateCombatTextAnimation(e: Entity) {
  tickTimer(e.tweenTimer, 500);
  e.tweenPosition.y = -tween(0, 20, 500, "easeOutCirc", e.tweenTimer.elapsed);
}
