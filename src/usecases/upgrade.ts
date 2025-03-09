import { UpgradeId } from "@/consts/upgrade.js";
import { game } from "@/data/game.js";
import { upgrades } from "@/data/upgrades.js";
import { addStats } from "@/usecases/stats.js";
import { getPlayer } from "@/usecases/world.js";
import { remove } from "ridder";

export function getUpgrade(id: UpgradeId) {
  return upgrades[id];
}

export function addUpgradeToPool(id: UpgradeId, amount: number) {
  for (let i = 0; i < amount; i++) {
    game.upgrades.push(id);
  }
}

export function applyUpgradeFromPool(id: UpgradeId) {
  const upgrade = getUpgrade(id);
  const player = getPlayer();
  addStats(player.stats, upgrade.stats);
  remove(game.upgrades, id);
}
