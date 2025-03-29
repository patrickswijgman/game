import { Entity } from "@/core/entity.js";
import { getPlayer } from "@/core/world.js";
import { tickTimer, tween } from "ridder";

export function updateExperienceOrbIdleAnimation(e: Entity) {
  tickTimer(e.tweenTimer, Infinity);
  e.tweenPosition.y = -tween(0, 2, 1000, "easeInOutSine", e.tweenTimer.elapsed);
}

export function updateExperienceOrbSeekAnimation(e: Entity) {
  const player = getPlayer();
  const completed = tickTimer(e.tweenTimer, 500);
  e.position.x = tween(e.start.x, player.position.x, 500, "easeInCubic", e.tweenTimer.elapsed);
  e.position.y = tween(e.start.y, player.position.y, 500, "easeInCubic", e.tweenTimer.elapsed);
  return completed;
}
