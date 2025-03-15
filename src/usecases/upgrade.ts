import { UpgradeId } from "@/consts/upgrade.js";
import { getPlayer, removeUpgradeFromPool } from "@/core/world.js";
import { upgrades } from "@/data/upgrades.js";
import { addStats } from "@/usecases/stats.js";

export function getUpgrade(id: UpgradeId) {
  return upgrades[id];
}

export function applyUpgradeFromPool(id: UpgradeId) {
  const upgrade = getUpgrade(id);
  const player = getPlayer();
  addStats(player.stats, upgrade.stats);
  removeUpgradeFromPool(id);
}
