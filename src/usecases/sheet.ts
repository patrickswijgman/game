import { Sheet } from "@/data/sheet.js";
import { addEquipmentCards, resetDeck, updateDeck } from "@/usecases/deck.js";
import { getItem } from "@/usecases/item.js";
import { addStats, clampStats, copyStats } from "@/usecases/stats.js";

export function updateSheet(sheet: Sheet) {
  const health = sheet.stats.health;

  copyStats(sheet.stats, sheet.statsBase);

  sheet.stats.health = health;

  resetDeck(sheet.deck);

  if (sheet.weaponId) {
    const item = getItem(sheet.weaponId);
    addStats(sheet.stats, item.stats);
    addEquipmentCards(sheet.deck, item);
  }

  if (sheet.armorId) {
    const item = getItem(sheet.armorId);
    addStats(sheet.stats, item.stats);
    addEquipmentCards(sheet.deck, item);
  }

  clampStats(sheet.stats);
  updateDeck(sheet.deck);
}
