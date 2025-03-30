import { Entity } from "@/core/entity.js";
import { getPlayer } from "@/core/game.js";
import { tickTimer, tween } from "ridder";

export function updateItemIdleAnimation(e: Entity) {
  tickTimer(e.animTimer, Infinity);
  e.animPosition.y = -tween(0, 2, e.animDuration, "easeInOutSine", e.animTimer.elapsed);
}

export function updateItemPickupAnimation(e: Entity) {
  const player = getPlayer();
  const completed = tickTimer(e.animTimer, e.animDuration);
  e.position.x = tween(e.start.x, player.position.x, e.animDuration, "easeInCubic", e.animTimer.elapsed);
  e.position.y = tween(e.start.y, player.position.y, e.animDuration, "easeInCubic", e.animTimer.elapsed);
  return completed;
}
