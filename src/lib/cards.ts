import { CardId } from "@/consts.ts";
import { type Card, cards } from "@/data.ts";

export function setupCards() {
  let card: Card;

  card = getCard(CardId.DAGGER);
  card.name = "Dagger";
  card.value = 3;

  card = getCard(CardId.SHORTSWORD);
  card.name = "Shortsword";
  card.value = 5;

  card = getCard(CardId.MACE);
  card.name = "Mace";
  card.value = 6;

  card = getCard(CardId.FIREBALL);
  card.name = "Fireball";
  card.value = 7;

  // Rat

  card = getCard(CardId.SCRATCH);
  card.name = "Scratch";
  card.value = 3;

  card = getCard(CardId.BITE);
  card.name = "Bite";
  card.value = 4;
}

export function getCard(id: CardId) {
  return cards[id];
}

export function isValueCard(id: CardId) {
  const card = cards[id];
  return card && card.value > 0;
}

export function isSpecialCard(id: CardId) {
  const card = cards[id];
  return card && card.value === 0 && card.effects.length > 0;
}
