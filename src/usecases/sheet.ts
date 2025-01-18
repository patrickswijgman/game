import { Sheet } from "@/data/sheet.js";
import { getItem } from "@/usecases/item.js";

export function updateSheet(sheet: Sheet) {
  sheet.deck.equipment.length = 0;

  if (sheet.weaponId) {
    const item = getItem(sheet.weaponId);
    sheet.deck.equipment.push(...item.cards);
  }

  if (sheet.armorId) {
    const item = getItem(sheet.armorId);
    sheet.deck.equipment.push(...item.cards);
  }
}
