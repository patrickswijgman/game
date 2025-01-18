import { Deck, newDeck } from "@/data/deck.js";
import { ItemId } from "@/enums/item.js";

export type Sheet = {
  deck: Deck;
  equipment: Array<ItemId>;
};

export function newSheet(): Sheet {
  return {
    deck: newDeck(),
    equipment: [],
  };
}
