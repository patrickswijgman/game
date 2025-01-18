import { cards } from "@/data/cards.js";
import { CardId } from "@/enums/card.js";

export function getCard(id: CardId) {
  return cards[id];
}
