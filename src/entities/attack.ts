import { SceneId } from "@/consts/scene.js";
import { StateId } from "@/consts/state.js";
import { Type } from "@/consts/type.js";
import { Entity } from "@/data/entity.js";
import { getAttack } from "@/usecases/attack.js";
import { addEntity, addToCombatLog, destroyEntity, setHitbox, setSprite, setState } from "@/usecases/entity.js";
import { getScene } from "@/usecases/game.js";
import { getEntity } from "@/usecases/scene.js";
import { clampStats } from "@/usecases/stats.js";
import { addVector, copyVector, doRectanglesIntersect, getAngle, getVectorDistance, scaleVector } from "ridder";

export function addAttack(sceneId: SceneId, caster: Entity) {
  const e = addEntity(Type.ATTACK, sceneId, 0, 0);
  const attack = getAttack(caster.attackId);

  copyVector(e.position, caster.direction);
  scaleVector(e.position, attack.reach);
  addVector(e.position, caster.center);
  copyVector(e.start, e.position);

  copyVector(e.direction, caster.direction);

  setSprite(e, attack.spriteId, 8, 8);
  setHitbox(e, attack.hitbox.x, attack.hitbox.y, attack.hitbox.w, attack.hitbox.h);

  e.angle = getAngle(caster.center.x, caster.center.y, e.position.x, e.position.y);
  e.depth = attack.reach;
  e.lifeTime = attack.duration;
  e.casterId = caster.id;
  e.isPhysicsEnabled = true;

  return e;
}

export function updateAttack(e: Entity) {
  const scene = getScene(e.sceneId);
  const caster = getEntity(scene, e.casterId);
  const attack = getAttack(caster.attackId);

  copyVector(e.velocity, e.direction);
  scaleVector(e.velocity, attack.speed);

  for (const id of scene.update) {
    if (id === e.id || id === caster.id || e.blacklist.includes(id)) {
      continue;
    }

    const target = getEntity(scene, id);

    if (doRectanglesIntersect(e.hitbox, target.hitbox)) {
      const damage = caster.sheet.stats.damage;

      target.sheet.stats.health -= damage;
      clampStats(target.sheet.stats);

      setState(target, StateId.STAGGER);

      addToCombatLog(target, damage.toString());

      e.blacklist.push(target.id);
    }
  }

  const traveled = getVectorDistance(e.start, e.position);

  if (attack.range && traveled > attack.range) {
    destroyEntity(e);
  }
}
