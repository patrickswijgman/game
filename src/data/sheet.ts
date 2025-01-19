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

export type SheetOptions = {
  name: string;
  stats: Partial<Stats>;
  weaponId: ItemId;
  armorId: ItemId;
};

export function newSheet({ name = "", stats = {}, weaponId = ItemId.NONE, armorId = ItemId.NONE }: Partial<SheetOptions> = {}): Sheet {
  return {
    name,
    deck: newDeck(),
    stats: newStats(stats),
    weaponId,
    armorId,
  };
}
