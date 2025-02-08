import { ItemId, ItemSubtype, ItemType } from "@/consts/item.js";
import { Sheet } from "@/data/sheet.js";
import { getItem } from "@/usecases/item.js";
import { addStats, clampStats, copyStats } from "@/usecases/stats.js";

export function initSheet(sheet: Sheet) {
  copyStats(sheet.stats, sheet.statsBase);
  updateSheet(sheet);
}

export function updateSheet(sheet: Sheet) {
  const health = sheet.stats.health;

  copyStats(sheet.stats, sheet.statsBase);

  sheet.stats.health = health;

  if (sheet.weaponId) {
    const item = getItem(sheet.weaponId);
    addStats(sheet.stats, item.stats);
  }

  if (sheet.armorId) {
    const item = getItem(sheet.armorId);
    addStats(sheet.stats, item.stats);
  }

  if (sheet.offhandId) {
    const item = getItem(sheet.offhandId);
    addStats(sheet.stats, item.stats);
  }

  clampStats(sheet.stats);
}

export function equipItem(sheet: Sheet, itemId: ItemId) {
  const item = getItem(itemId);

  switch (item.type) {
    case ItemType.WEAPON:
      {
        sheet.weaponId = itemId;
        if (item.subtype === ItemSubtype.TWO_HANDED) {
          sheet.offhandId = ItemId.NONE;
        }
        updateSheet(sheet);
      }
      break;

    case ItemType.ARMOR:
      {
        sheet.armorId = itemId;
        updateSheet(sheet);
      }
      break;

    case ItemType.OFFHAND:
      {
        sheet.offhandId = itemId;
        if (sheet.weaponId) {
          const weapon = getItem(sheet.weaponId);
          if (weapon.subtype === ItemSubtype.TWO_HANDED) {
            sheet.weaponId = ItemId.NONE;
          }
        }
        updateSheet(sheet);
      }
      break;
  }
}

export function unequipItem(sheet: Sheet, itemId: ItemId) {
  switch (itemId) {
    case sheet.weaponId:
      sheet.weaponId = ItemId.NONE;
      break;
    case sheet.armorId:
      sheet.armorId = ItemId.NONE;
      break;
    case sheet.offhandId:
      sheet.offhandId = ItemId.NONE;
      break;
  }
  updateSheet(sheet);
}

export function isEquipped(sheet: Sheet, itemId: ItemId) {
  const item = getItem(itemId);

  switch (item.type) {
    case ItemType.WEAPON:
      return sheet.weaponId === itemId;
    case ItemType.ARMOR:
      return sheet.armorId === itemId;
    case ItemType.OFFHAND:
      return sheet.offhandId === itemId;
  }
}
