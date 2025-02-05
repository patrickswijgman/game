import { Sheet } from "@/data/sheet.js";
import { getItem } from "@/usecases/item.js";
import { addStats, clampStats, copyStats } from "@/usecases/stats.js";

export function initSheet(sheet: Sheet) {
  copyStats(sheet.stats, sheet.statsBase);
  updateSheet(sheet);
}

export function updateSheet(sheet: Sheet) {
  const health = sheet.stats.health;

  copyStats(sheet.stats, sheet.statsBase);

  sheet.stats.health = health;

  if (sheet.weaponId) {
    const item = getItem(sheet.weaponId);
    addStats(sheet.stats, item.stats);
  }

  if (sheet.armorId) {
    const item = getItem(sheet.armorId);
    addStats(sheet.stats, item.stats);
  }

  if (sheet.offhandId) {
    const item = getItem(sheet.offhandId);
    addStats(sheet.stats, item.stats);
  }

  clampStats(sheet.stats);
}
