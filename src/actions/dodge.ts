import { Entity, resetState } from "entity.js";
import { copyVector, scaleVector, tickTimer, tween } from "ridder";

export function updateDodge(e: Entity) {
  copyVector(e.vel, e.direction);
  scaleVector(e.vel, e.stats.movementSpeed * 1.5);

  e.isFlipped = e.direction.x < 0;

  const completed = tickTimer(e.tweenTimer, 500);
  e.tweenAngle = tween(0, 360, 500, "easeInSine", e.tweenTimer.elapsed);
  e.tweenPos.y = -tween(0, e.height, 250, "easeOutSine", e.tweenTimer.elapsed);

  if (completed) {
    resetState(e);
  }
}
