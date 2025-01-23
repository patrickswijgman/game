import { Entity } from "@/data/entity.js";
import { SceneId } from "@/enums/scene.js";
import { Type } from "@/enums/type.js";
import { getAttack } from "@/usecases/attack.js";
import { addEntity, setHitbox, setSprite } from "@/usecases/entity.js";

export function addAttack(sceneId: SceneId, x: number, y: number, attackId: number) {
  const e = addEntity(Type.ATTACK, sceneId, x, y);
  const attack = getAttack(attackId);
  setSprite(e, attack.spriteId, 8, 8);
  setHitbox(e, attack.hitbox.x, attack.hitbox.y, attack.hitbox.w, attack.hitbox.h);
  return e;
}

export function updateAttack(e: Entity) {}
