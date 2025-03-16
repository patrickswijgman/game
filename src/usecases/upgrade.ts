import { UpgradeId } from "@/consts/upgrade.js";
import { getUpgrade } from "@/data/upgrades.js";
import { getPlayer, removeUpgradeFromPool } from "@/data/world.js";
import { addStats } from "@/usecases/stats.js";

export function applyUpgradeFromPool(id: UpgradeId) {
  const upgrade = getUpgrade(id);
  const player = getPlayer();
  addStats(player.stats, upgrade.stats);
  removeUpgradeFromPool(id);
}
