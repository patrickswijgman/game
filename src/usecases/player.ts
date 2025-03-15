import { getPlayer } from "@/core/world.js";

export function isPlayerAlive() {
  const player = getPlayer();
  return player.isPlayer && !!player.stats.health;
}
