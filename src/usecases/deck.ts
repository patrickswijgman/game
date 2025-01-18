import { Deck } from "@/data/deck.js";
import { CardId } from "@/enums/card.js";
import { remove, shuffle } from "ridder";

export function updateDeck(deck: Deck) {
  deck.all.length = 0;
  deck.all.push(...deck.equipment, ...deck.bonus);
}

export function initDeck(deck: Deck) {
  deck.discard.push(...deck.all);
  shuffleDeck(deck);
}

export function shuffleDeck(deck: Deck) {
  deck.draw.push(...deck.discard);
  deck.discard.length = 0;
  shuffle(deck.draw);
}

export function drawCard(deck: Deck, amount = 1) {
  for (let i = 0; i < amount; i++) {
    if (deck.draw.length) {
      const card = deck.draw.pop();
      deck.hand.push(card);
    } else if (deck.discard.length) {
      shuffleDeck(deck);
      drawCard(deck);
    }
  }
}

export function discardCard(deck: Deck, id: CardId) {
  remove(deck.hand, id);
  deck.discard.push(id);
}
