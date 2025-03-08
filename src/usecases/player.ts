import { getPlayer } from "@/usecases/world.js";

export function isPlayerAlive() {
  const player = getPlayer();
  return player.isPlayer && player.stats.health;
}
