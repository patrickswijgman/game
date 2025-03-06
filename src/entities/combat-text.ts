import { updateCombatTextAnimation } from "@/anims/combat-text.js";
import { Type } from "@/consts/entity.js";
import { SceneId } from "@/consts/scene.js";
import { Entity } from "@/data/entity.js";
import { addEntity } from "@/usecases/entity.js";
import { setVector } from "ridder";

export function addCombatText(sceneId: SceneId, target: Entity, text: string) {
  const x = target.position.x;
  const y = target.position.y - target.hitbox.h - 5;
  const e = addEntity(Type.COMBAT_TEXT, sceneId, x, y);

  setVector(e.scale, 0.5, 0.5);

  e.text = text;
  e.textColor = getColor(text, target);
  e.lifeTime = 1000;

  return e;
}

export function updateCombatText(e: Entity) {
  updateCombatTextAnimation(e);
}

export function getColor(text: string, target: Entity) {
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
