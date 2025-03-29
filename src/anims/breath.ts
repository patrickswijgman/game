import { Entity } from "@/core/entity.js";
import { tickTimer, tween } from "ridder";

export function updateBreathAnimation(e: Entity) {
  tickTimer(e.tweenTimer, Infinity);
  e.tweenScale.x = tween(1, 1.1, 2000, "easeInOutSine", e.tweenTimer.elapsed);
  e.tweenScale.y = tween(1, 1.1, 2000, "easeInOutSine", e.tweenTimer.elapsed);
}
