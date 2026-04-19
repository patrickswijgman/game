import type { CardId } from "@/consts.ts";
import type { Sheet } from "@/data.ts";
import { getCard } from "@/lib/cards.ts";
import { shuffle } from "@/lib/utils.ts";

export function addCards(sheet: Sheet, id: CardId, amount: number) {
  for (let i = 0; i < amount; i++) {
    sheet.discard.push(id);
  }
}

export function pullCards(sheet: Sheet, amount: number) {
  for (let i = 0; i < amount; i++) {
    if (sheet.draw.length === 0) {
      sheet.draw.push(...sheet.discard);
      sheet.discard.length = 0;
      shuffle(sheet.draw);
    }

    const cardId = sheet.draw.pop();

    if (cardId !== undefined) {
      sheet.hand.push(cardId);
    }
  }
}

export function discardHand(sheet: Sheet) {
  sheet.discard.push(...sheet.hand);
  sheet.hand.length = 0;
}

export function playCard(sheet: Sheet, i: number, cards: Array<number>) {
  const cardId = sheet.hand[i];
  sheet.hand.splice(i, 1);
  sheet.discard.push(cardId);
  cards.push(cardId);
}

export function prepareDeck(sheet: Sheet) {
  sheet.draw.push(...sheet.discard);
  sheet.discard.length = 0;

  sheet.draw.push(...sheet.hand);
  sheet.hand.length = 0;

  shuffle(sheet.draw);
}

export function getTotalValue(sheet: Sheet, cards: Array<number>) {
  let total = 0;

  for (const cardId of cards) {
    const card = getCard(cardId);
    total += card.value;
  }

  return total;
}
