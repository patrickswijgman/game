import { CardId } from "@/consts.ts";
import { type Card, cards } from "@/data.ts";

export function setupCards() {
  let card: Card;

  card = getCard(CardId.PUNCH);
  card.name = "Punch";
  card.value = 1;

  card = getCard(CardId.STICK);
  card.name = "Stick";
  card.value = 2;

  // Enemy specific cards

  card = getCard(CardId.BITE);
  card.name = "Bite";
  card.value = 1;
}

export function getCard(id: CardId) {
  return cards[id];
}
