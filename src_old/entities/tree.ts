import { Entity } from "entity.js";
import { getElapsedTime, tween } from "ridder";

export function updateTree(e: Entity) {
  e.tweenAngle = tween(-2, 2, e.tweenDuration, "easeInOutSine", getElapsedTime());
}
