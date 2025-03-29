import { Entity } from "@/core/entity.js";
import { tickTimer, tween } from "ridder";

export function updateWindAnimation(e: Entity) {
  tickTimer(e.tweenTimer, Infinity);
  e.tweenAngle = tween(-2, 2, e.tweenTime, "easeInOutSine", e.tweenTimer.elapsed);
}
