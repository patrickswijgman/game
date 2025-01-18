import { CardId } from "@/enums/card.js";

export type Deck = {
  // Library
  equipment: Array<CardId>;
  bonus: Array<CardId>;
  all: Array<CardId>;

  // Combat
  discard: Array<CardId>;
  draw: Array<CardId>;
  hand: Array<CardId>;
};

export function newDeck(): Deck {
  return {
    // Library
    equipment: [],
    bonus: [],
    all: [],

    // Combat
    discard: [],
    draw: [],
    hand: [],
  };
}
