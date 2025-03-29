import { SpriteId } from "@/core/assets.js";
import { addEntity, Entity, setHitarea, setSprite, Type } from "@/core/entity.js";
import { copyStats, Stats } from "@/core/stats.js";
import { getUpgrade, Upgrade, UpgradeId } from "@/core/upgrades.js";
import { confirmUpgradeChoice, getPlayer } from "@/core/world.js";
import { doesRectangleContain, drawText, getMousePosition, InputCode, isInputPressed, scaleTransform, setVector, translateTransform } from "ridder";

export function addUpgrade(x: number, y: number, id: UpgradeId) {
  const e = addEntity(Type.UI_UPGRADE, x, y);

  setSprite(e, SpriteId.UI_UPGRADE_BG, 2, 2, SpriteId.NONE, SpriteId.UI_UPGRADE_OUTLINE);
  setHitarea(e, 0, 0, 100, 100);

  e.upgradeId = id;

  setVector(e.scroll, 0, 0);
  e.depth = Infinity;

  const player = getPlayer();
  copyStats(e.stats, player.stats);

  return e;
}

export function updateUpgrade(e: Entity) {
  const mouse = getMousePosition(false);

  if (doesRectangleContain(e.hitarea, mouse.x, mouse.y)) {
    e.isOutlineVisible = true;

    if (isInputPressed(InputCode.MOUSE_LEFT, true)) {
      confirmUpgradeChoice(e.upgradeId);
    }
  } else {
    e.isOutlineVisible = false;
  }
}

export function renderUpgrade(e: Entity) {
  const upgrade = getUpgrade(e.upgradeId);

  translateTransform(0, 12);
  drawText(upgrade.name, e.hitarea.w / 2, 0, "white", "center", "middle");

  translateTransform(0, 20);
  scaleTransform(0.625, 0.625);
  drawStat(e, upgrade, "Health", "healthMax");
  drawStat(e, upgrade, "Damage", "damage");
  drawStat(e, upgrade, "Crit Chance", "critChance");
  drawStat(e, upgrade, "Crit Damage", "critDamage");
  drawStat(e, upgrade, "Attack Range", "attackRange");
  drawStat(e, upgrade, "Pickup Range", "pickupRange");
  drawStat(e, upgrade, "Move. Speed", "movementSpeed");
}

function drawStat(e: Entity, upgrade: Upgrade, label: string, key: keyof Stats) {
  const value = upgrade.stats[key];

  let prefix = "";
  if (value > 0) {
    prefix = "+";
  }

  if (value) {
    drawText(label, 10, 0);
    drawText(`${prefix}${value} (${e.stats[key]})`, 160 - 10, 0, "white", "right");
    translateTransform(0, 24);
  }
}
