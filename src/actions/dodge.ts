import { Entity, resetState } from "entity.js";
import { copyVector, scaleVector, tickTimer, tween } from "ridder";

export function onDodgeEnter(e: Entity) {
  e.conditions.isInvulnerable = true;
  e.conditions.invulnerableDuration = 250;
}

export function onDodgeUpdate(e: Entity) {
  copyVector(e.velocity, e.direction);
  scaleVector(e.velocity, e.stats.movementSpeed * 2);

  e.isFlipped = e.direction.x < 0;

  const completed = tickTimer(e.tweenTimer, 500);
  e.tweenAngle = tween(0, 360, 500, "easeInSine", e.tweenTimer.elapsed);
  e.tweenPos.y = -tween(0, e.height * 0.8, 250, "easeOutSine", e.tweenTimer.elapsed);

  if (completed) {
    resetState(e);
  }
}

export function onDodgeExit(e: Entity) {
  e.conditions.isInvulnerable = false;
}
