import { SpriteId } from "@/consts/assets.js";
import { Type } from "@/consts/entity.js";
import { UpgradeId } from "@/consts/upgrade.js";
import { Entity } from "@/data/entity.js";
import { Stats } from "@/data/stats.js";
import { getUpgrade, Upgrade } from "@/data/upgrades.js";
import { confirmUpgradeChoice, getPlayer } from "@/data/world.js";
import { addEntity, setHitarea, setSprite } from "@/usecases/entity.js";
import { doesRectangleContain, drawText, getMousePosition, InputCode, isInputPressed, scaleTransform, setVector, translateTransform } from "ridder";

export function addUpgrade(x: number, y: number, id: UpgradeId) {
  const e = addEntity(Type.UI_UPGRADE, x, y);

  setSprite(e, SpriteId.UI_UPGRADE_BG, 2, 2, SpriteId.NONE, SpriteId.UI_UPGRADE_OUTLINE);
  setHitarea(e, 0, 0, 100, 100);

  e.upgradeId = id;

  setVector(e.scroll, 0, 0);
  e.depth = Infinity;

  return e;
}

export function updateUpgrade(e: Entity) {
  const mouse = getMousePosition(false);

  if (doesRectangleContain(e.hitarea, mouse.x, mouse.y)) {
    e.isOutlineVisible = true;

    if (isInputPressed(InputCode.MOUSE_LEFT)) {
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
  drawStat(upgrade, "Health", "healthMax");
  drawStat(upgrade, "Damage", "damage");
  drawStat(upgrade, "Crit Chance", "critChance");
  drawStat(upgrade, "Crit Damage", "critDamage");
  drawStat(upgrade, "Attack Range", "attackRange");
  drawStat(upgrade, "Pickup Range", "pickupRange");
  drawStat(upgrade, "Move. Speed", "movementSpeed");
}

function drawStat(upgrade: Upgrade, label: string, key: keyof Stats) {
  const value = upgrade.stats[key];
  const player = getPlayer();

  let prefix = "";
  if (value > 0) {
    prefix = "+";
  }

  if (value) {
    drawText(label, 10, 0);
    drawText(`${prefix}${value} (${player.stats[key]})`, 160 - 10, 0, "white", "right");
    translateTransform(0, 24);
  }
}
