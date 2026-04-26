import { CardEffect, CardId, CardType } from "@/consts.ts";
import { type Card, cards } from "@/data.ts";

export function setupCards() {
  // Player
  setValueCard(CardId.DAGGER, "Dagger", 3);
  setValueCard(CardId.SHORTSWORD, "Shortsword", 5);
  setValueCard(CardId.MACE, "Mace", 6);
  setValueCard(CardId.FIREBALL, "Fireball", 7);
  setSpecialCard(CardId.SHARPEN, "Sharpen", CardEffect.BUFF, 2, 1, CardType.SELF);
  setSpecialCard(CardId.TAUNT, "Taunt", CardEffect.DEBUFF, 1, 1, CardType.ATTACK);

  // Rat
  setValueCard(CardId.SCRATCH, "Scratch", 3);
  setValueCard(CardId.BITE, "Bite", 4);
}

function setValueCard(id: CardId, name: string, value: number) {
  const card = cards[id];
  card.name = name;
  card.type = CardType.SELF;
  card.value = value;
  card.duration = 1;
}

function setSpecialCard(id: CardId, name: string, effect: CardEffect, effectValue: number, duration: number, type: CardType) {
  const card = cards[id];
  card.name = name;
  card.type = type;
  card.duration = duration;
  card.effect = effect;
  card.effectValue = effectValue;
}

export function isValueCard(card: Card) {
  return card && card.value > 0;
}

export function isSpecialCard(card: Card) {
  return card && card.value === 0 && card.effect > CardEffect.NONE;
}
