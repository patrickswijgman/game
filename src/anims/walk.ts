import { Entity } from "@/core/entity.js";
import { tickTimer, tween } from "ridder";

export function updateWalkAnimation(e: Entity) {
  tickTimer(e.tweenTimer, Infinity);
  e.tweenPosition.y = -tween(0, 1, 100, "easeInOutSine", e.tweenTimer.elapsed);
}
