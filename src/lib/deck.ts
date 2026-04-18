import type { Deck } from "@/data.ts";
import { isCardValid } from "@/lib/cards.ts";
import { shuffle } from "@/lib/utils.ts";

export function pullCards(deck: Deck, amount: number) {
  for (let i = 0; i < amount; i++) {
    // if (deck.draw.length === 0) {
    //   shuffle(deck.discard);
    //   deck.draw.push(...deck.discard);
    //   deck.discard.length = 0;
    // }

    const card = deck.draw.pop();

    if (isCardValid(card)) {
      deck.hand.push(card);
    }
  }
}

export function prepareDeck(deck: Deck) {
  deck.draw.push(...deck.discard);
  deck.discard.length = 0;

  deck.draw.push(...deck.hand);
  deck.hand.length = 0;

  shuffle(deck.draw);
}
