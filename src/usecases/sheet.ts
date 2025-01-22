import { Sheet } from "@/data/sheet.js";
import { addEquipmentCards, resetDeck, updateDeck } from "@/usecases/deck.js";
import { getItem } from "@/usecases/item.js";
import { addStats, copyStats } from "@/usecases/stats.js";

export function updateSheet(sheet: Sheet) {
  copyStats(sheet.stats, sheet.statsBase);
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

  updateDeck(sheet.deck);
}
