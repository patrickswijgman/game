import { Entity } from "@/data/entity.js";
import { tickTimer, tween } from "ridder";

export function updateAttackAnimation(e: Entity, duration: number) {
  tickTimer(e.tweenTimer, duration);
  e.tweenScale.x = tween(1, 1.1, duration / 2, "easeInOutSine", e.tweenTimer.elapsed);
  e.tweenScale.y = tween(1, 1.1, duration / 2, "easeInOutSine", e.tweenTimer.elapsed);
}
