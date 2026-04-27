import { CardEffect, type CardId, CardType } from "@/consts.ts";
import { type Card, cards, copyCard, createCard, type Sheet, zeroSheet } from "@/data.ts";
import { shuffle } from "@/lib/utils.ts";

export function setSheet(sheet: Sheet, name: string, health: number) {
  zeroSheet(sheet);
  sheet.name = name;
  sheet.health = health;
  sheet.healthMax = health;
}

export function addCards(sheet: Sheet, id: CardId, amount: number) {
  for (let i = 0; i < amount; i++) {
    sheet.discard.push(cards[id]);
  }
}

export function drawCardsIntoHand(sheet: Sheet, amount: number) {
  for (let i = 0; i < amount; i++) {
    if (sheet.draw.length === 0) {
      sheet.draw.push(...sheet.discard);
      sheet.discard.length = 0;
      shuffle(sheet.draw);
    }

    const card = sheet.draw.pop();

    if (card) {
      sheet.hand.push(card);
    }
  }
}

export function discardHand(sheet: Sheet) {
  sheet.discard.push(...sheet.hand);
  sheet.hand.length = 0;
}

export function playCard(caster: Sheet, card: Card, target: Sheet) {
  const index = caster.hand.indexOf(card);

  if (index !== -1) {
    caster.hand.splice(index, 1);
    caster.discard.push(card);
  }

  const playCard = createCard();
  copyCard(playCard, card);

  switch (playCard.type) {
    case CardType.ATTACK:
      target.play.push(playCard);
      break;

    case CardType.SELF:
      caster.play.push(playCard);
      break;
  }
}

export function processPlayCards(sheet: Sheet) {
  let i = sheet.play.length;

  while (i--) {
    const card = sheet.play[i];

    if (card.duration > 0) {
      card.duration -= 1;

      if (card.duration === 0) {
        sheet.play.splice(i, 1);
      }
    }
  }
}

export function prepareDeck(sheet: Sheet) {
  sheet.play.length = 0;

  sheet.draw.push(...sheet.discard);
  sheet.discard.length = 0;

  sheet.draw.push(...sheet.hand);
  sheet.hand.length = 0;

  shuffle(sheet.draw);
}

export function getTotalValue(sheet: Sheet) {
  let total = 0;

  for (const card of sheet.play) {
    total += card.value;

    switch (card.effect) {
      case CardEffect.BUFF:
        total += card.effectValue;
        break;

      case CardEffect.DEBUFF:
        total -= card.effectValue;
        break;
    }
  }

  return Math.max(0, total);
}
