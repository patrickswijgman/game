import type { CardId } from "@/consts.ts";
import type { Sheet } from "@/data.ts";

export function addCards(sheet: Sheet, id: CardId, amount: number) {
  for (let i = 0; i < amount; i++) {
    sheet.deck.discard.push(id);
  }
}
