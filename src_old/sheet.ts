import { Conditions, newConditions } from "conditions.js";
import { getItem } from "items.js";
import { addDamageScalingToStats, addStats, clampStats, copyStats, newStats, Stats } from "stats.js";

export type Sheet = {
  stats: Stats;
  statsBase: Stats;
  conditions: Conditions;
  weaponId: string;
  armorId: string;
};

type SheetOptions = {
  stats?: Partial<Stats>;
  weaponId?: string;
  armorId?: string;
};

export function newSheet({ stats = {}, weaponId = "", armorId = "" }: SheetOptions = {}): Sheet {
  const sheet = {
    stats: newStats(stats),
    statsBase: newStats(stats),
    conditions: newConditions(),
    weaponId,
    armorId,
  };

  updateSheet(sheet);

  return sheet;
}

export function updateSheet(sheet: Sheet) {
  copyStats(sheet.stats, sheet.statsBase);

  if (sheet.weaponId) {
    const weapon = getItem(sheet.weaponId);
    addStats(sheet.stats, weapon.stats);
    addDamageScalingToStats(sheet.stats, weapon.stats);
  }

  if (sheet.armorId) {
    const armor = getItem(sheet.armorId);
    addStats(sheet.stats, armor.stats);
  }

  clampStats(sheet.stats);
}
