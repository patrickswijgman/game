import { Entity } from "@/data/entity.js";
import { SceneId } from "@/enums/scene.js";
import { Type } from "@/enums/type.js";
import { getAttack } from "@/usecases/attack.js";
import { addEntity, setHitbox, setSprite } from "@/usecases/entity.js";
import { getScene } from "@/usecases/game.js";
import { getEntity } from "@/usecases/scene.js";
import { clampStats } from "@/usecases/stats.js";
import { addVector, copyVector, doRectanglesIntersect, getAngle, scaleVector } from "ridder";

export function addAttack(sceneId: SceneId, caster: Entity, attackId: number) {
  const e = addEntity(Type.ATTACK, sceneId, 0, 0);

  const reach = (caster.hitbox.w + caster.hitbox.h) / 2;
  copyVector(e.position, caster.direction);
  scaleVector(e.position, reach);
  addVector(e.position, caster.center);

  const attack = getAttack(attackId);
  setSprite(e, attack.spriteId, 8, 8);
  setHitbox(e, attack.hitbox.x, attack.hitbox.y, attack.hitbox.w, attack.hitbox.h);

  e.angle = getAngle(caster.center.x, caster.center.y, e.position.x, e.position.y);
  e.depth = reach;
  e.lifeTime = attack.duration;
  e.isPhysicsEnabled = true;
  e.casterId = caster.id;

  return e;
}

export function updateAttack(e: Entity) {
  const scene = getScene(e.sceneId);
  const caster = getEntity(scene, e.casterId);

  for (const id of scene.update) {
    if (id === e.id || id === caster.id || e.blacklist.includes(id)) {
      continue;
    }

    const target = getEntity(scene, id);

    if (doRectanglesIntersect(e.hitbox, target.hitbox)) {
      target.sheet.stats.health -= caster.sheet.stats.damage;
      clampStats(target.sheet.stats);
      e.blacklist.push(target.id);
    }
  }
}
