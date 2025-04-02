import { SpriteId } from "@/core/assets.js";
import { Entity, InteractionId, setHitarea, Type } from "@/core/entity.js";
import { getPlayer } from "@/core/game.js";
import { copyStats, Stats } from "@/core/stats.js";
import { getUpgrade, Upgrade, UpgradeId } from "@/core/upgrades.js";
import { addWidget } from "@/widgets/widget.js";
import { drawSprite, drawText, scaleTransform, translateTransform } from "ridder";

export function addUpgradeWidget(x: number, y: number, id: UpgradeId) {
  const e = addWidget(Type.WIDGET_UPGRADE, x, y);

  setHitarea(e, 0, 0, 100, 100);

  const player = getPlayer();
  copyStats(e.stats, player.stats);

  e.interactionId = InteractionId.CONFIRM_UPGRADE;
  e.upgradeId = id;

  return e;
}

export function renderUpgradeWidget(e: Entity) {
  const x = -2;
  const y = -2;
  const upgrade = getUpgrade(e.upgradeId);

  drawSprite(SpriteId.UI_UPGRADE_BG, x, y);

  if (e.isHovered) {
    drawSprite(SpriteId.UI_UPGRADE_OUTLINE, x, y);
  }

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
