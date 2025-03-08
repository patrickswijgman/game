import { world } from "@/data/world.js";
import { getEntity } from "@/usecases/entity.js";

export function isPlayerAlive() {
  const player = getEntity(world.playerId);
  return player.isPlayer && player.stats.health;
}
