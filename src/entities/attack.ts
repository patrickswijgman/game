import { Type } from "@/consts/entity.js";
import { SceneId } from "@/consts/scene.js";
import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { getAttack } from "@/usecases/attack.js";
import { addEntity, addToCombatLog, destroyEntity, setHitbox, setSprites, setState } from "@/usecases/entity.js";
import { getScene } from "@/usecases/game.js";
import { getEntity } from "@/usecases/scene.js";
import { clampStats, copyStats } from "@/usecases/stats.js";
import { addVector, copyVector, doRectanglesIntersect, getAngle, getVectorDistance, roll, scaleVector } from "ridder";

export function addAttack(sceneId: SceneId, caster: Entity) {
  const e = addEntity(Type.ATTACK, sceneId, 0, 0);
  const attack = getAttack(caster.attackId);

  copyVector(e.position, caster.direction);
  scaleVector(e.position, attack.reach);
  addVector(e.position, caster.center);
  copyVector(e.start, e.position);

  copyVector(e.direction, caster.direction);

  setSprites(e, attack.spriteId);
  setHitbox(e, ...attack.hitbox);

  copyStats(e.sheet.stats, caster.sheet.stats);

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

  const targets = caster.isPlayer ? scene.enemies : scene.allies;

  for (const id of targets) {
    if (id === e.id || id === caster.id || e.blacklist.includes(id)) {
      continue;
    }

    const target = getEntity(scene, id);

    if (doRectanglesIntersect(e.hitbox, target.hitbox)) {
      let damage = Math.max(1, e.sheet.stats.damage - target.sheet.stats.armor);
      let isCrit = false;

      if (roll(e.sheet.stats.critChance)) {
        damage *= e.sheet.stats.critDamage;
        isCrit = true;
      }

      target.sheet.stats.health -= damage;
      clampStats(target.sheet.stats);

      setState(target, StateId.STAGGER);

      addToCombatLog(target, isCrit ? `${damage}!` : damage.toString());

      e.blacklist.push(target.id);
    }
  }

  const traveled = getVectorDistance(e.start, e.position);

  if (attack.range && traveled > attack.range) {
    destroyEntity(e);
  }
}
