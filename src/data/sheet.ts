import { Deck, newDeck } from "@/data/deck.js";
import { newStats, Stats } from "@/data/stats.js";
import { ItemId } from "@/enums/item.js";

export type Sheet = {
  name: string;
  deck: Deck;
  stats: Stats;
  weaponId: ItemId;
  armorId: ItemId;
};

export function newSheet(name: string, stats: Partial<Stats>): Sheet {
  return {
    name,
    deck: newDeck(),
    stats: newStats(stats),
    weaponId: ItemId.NONE,
    armorId: ItemId.NONE,
  };
}
