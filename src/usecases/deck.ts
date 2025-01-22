import { Deck } from "@/data/deck.js";
import { Item } from "@/data/items.js";
import { CardId } from "@/enums/card.js";
import { remove, shuffle } from "ridder";

export function initDeck(deck: Deck) {
  deck.discard.push(...deck.all);
  shuffleDeck(deck);
}

export function updateDeck(deck: Deck) {
  deck.all.push(...deck.equipment, ...deck.bonus);
}

export function addEquipmentCards(deck: Deck, item: Item) {
  deck.equipment.push(...item.cards);
}

export function shuffleDeck(deck: Deck) {
  deck.draw.push(...deck.discard);
  deck.discard.length = 0;
  shuffle(deck.draw);
}

export function drawCard(deck: Deck, amount = 1) {
  for (let i = 0; i < amount; i++) {
    if (deck.draw.length === 0 && deck.discard.length) {
      shuffleDeck(deck);
    }

    const card = deck.draw.pop();

    if (card) {
      deck.hand.push(card);
    }
  }
}

export function discardCard(deck: Deck, id: CardId) {
  remove(deck.hand, id);
  deck.discard.push(id);
}

export function resetDeck(deck: Deck) {
  deck.all.length = 0;
  deck.equipment.length = 0;
  deck.hand.length = 0;
  deck.draw.length = 0;
  deck.discard.length = 0;
}
