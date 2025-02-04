import { ItemId } from "@/consts/item.js";
import { newStats, Stats } from "@/data/stats.js";

export type Sheet = {
  name: string;
  stats: Stats;
  statsBase: Stats;
  weaponId: ItemId;
  armorId: ItemId;
};

export type SheetOptions = {
  name: string;
  stats: Partial<Stats>;
  weaponId: ItemId;
  armorId: ItemId;
};

export function newSheet(): Sheet {
  return {
    name: "",
    stats: newStats(),
    statsBase: newStats(),
    weaponId: ItemId.NONE,
    armorId: ItemId.NONE,
  };
}
