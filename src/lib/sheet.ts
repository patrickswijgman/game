import type { CardId } from "@/consts.ts";
import type { Sheet } from "@/data.ts";
import { getCard } from "@/lib/cards.ts";
import { shuffle } from "@/lib/utils.ts";

export function addCards(sheet: Sheet, id: CardId, amount: number) {
  for (let i = 0; i < amount; i++) {
    sheet.deck.discard.push(id);
  }
}

export function pullCards(sheet: Sheet, amount: number) {
  for (let i = 0; i < amount; i++) {
    if (sheet.deck.draw.length === 0) {
      sheet.deck.draw.push(...sheet.deck.discard);
      sheet.deck.discard.length = 0;
      shuffle(sheet.deck.draw);
    }

    const cardId = sheet.deck.draw.pop();

    if (cardId !== undefined) {
      sheet.deck.hand.push(cardId);
    }
  }
}

export function discardHand(sheet: Sheet) {
  sheet.deck.discard.push(...sheet.deck.hand);
  sheet.deck.hand.length = 0;
}

export function playCard(sheet: Sheet, i: number, cards: Array<number>) {
  const cardId = sheet.deck.hand[i];
  sheet.deck.hand.splice(i, 1);
  sheet.deck.discard.push(cardId);
  cards.push(cardId);
}

export function prepareDeck(sheet: Sheet) {
  sheet.deck.draw.push(...sheet.deck.discard);
  sheet.deck.discard.length = 0;

  sheet.deck.draw.push(...sheet.deck.hand);
  sheet.deck.hand.length = 0;

  shuffle(sheet.deck.draw);
}

export function getTotalValue(sheet: Sheet, cards: Array<number>) {
  let total = 0;

  for (const cardId of cards) {
    const card = getCard(cardId);
    total += card.value;
  }

  return total;
}
