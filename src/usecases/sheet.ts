import { Sheet } from "@/data/sheet.js";
import { getItem } from "@/usecases/item.js";

export function updateSheet(sheet: Sheet) {
  sheet.deck.equipment.length = 0;

  for (const id of sheet.equipment) {
    const item = getItem(id);
    sheet.deck.equipment.push(...item.cards);
  }
}
