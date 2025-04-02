import { COLOR_OUTLINE } from "@/consts.js";
import { AnimationId, applyAnimationTransform, Entity, setAnimation, Type } from "@/core/entity.js";
import { getEntity } from "@/core/game.js";
import { addEntity } from "@/entities/entity.js";
import { drawTextOutlined, scaleTransform } from "ridder";

export function addCombatText(target: Entity, text: string) {
  const x = target.position.x;
  const y = target.position.y - target.hitbox.h - 5;
  const e = addEntity(Type.COMBAT_TEXT, x, y);

  e.text = text;
  e.targetId = target.id;
  e.lifeTime = 1000;

  setAnimation(e, AnimationId.COMBAT_TEXT, 500);

  return e;
}

export function renderCombatText(e: Entity) {
  const target = getEntity(e.targetId);
  const color = getColor(e.text, target);
  scaleTransform(0.5, 0.5);
  applyAnimationTransform(e);
  drawTextOutlined(e.text, 0, 0, color, COLOR_OUTLINE, "circle", "center", "middle");
}

function getColor(text: string, target: Entity) {
  if (text.startsWith("+")) {
    return "lime";
  }
  if (target.isPlayer) {
    return "red";
  }
  if (text.endsWith("!")) {
    return "orange";
  }
  return "white";
}
