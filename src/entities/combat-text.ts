import { addEntity, AnimationId, Entity, setAnimation, Type } from "@/core/entity.js";
import { setVector } from "ridder";

export function addCombatText(target: Entity, text: string) {
  const x = target.position.x;
  const y = target.position.y - target.hitbox.h - 5;
  const e = addEntity(Type.COMBAT_TEXT, x, y);

  setVector(e.scale, 0.5, 0.5);

  e.text = text;
  e.textColor = getColor(text, target);
  e.lifeTime = 1000;

  setAnimation(e, AnimationId.COMBAT_TEXT, 500);

  return e;
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
