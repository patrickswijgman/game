import { getAttack } from "@/core/attacks.js";
import { dealDamage } from "@/core/combat.js";
import { Entity, setHitbox, Type } from "@/core/entity.js";
import { destroyEntity, getAlliesGroup, getEnemiesGroup, getEntity } from "@/core/game.js";
import { addStats, copyStats } from "@/core/stats.js";
import { addEntity } from "@/entities/entity.js";
import { addVector, copyVector, doRectanglesIntersect, drawSprite, getAngle, getVectorDistance, rotateTransform, scaleVector } from "ridder";

export function addAttack(caster: Entity) {
  const e = addEntity(Type.ATTACK, 0, 0);
  const attack = getAttack(caster.attackId);

  copyVector(e.position, caster.direction);
  scaleVector(e.position, attack.reach);
  addVector(e.position, caster.center);
  copyVector(e.start, e.position);

  copyVector(e.direction, caster.direction);

  setHitbox(e, attack.hitbox.x, attack.hitbox.y, attack.hitbox.w, attack.hitbox.h);

  copyStats(e.stats, attack.stats);
  addStats(e.stats, caster.stats);

  e.depth = attack.reach;
  e.lifeTime = attack.duration;
  e.attackId = caster.attackId;
  e.casterId = caster.id;
  e.isPhysicsEnabled = true;
  e.isAttack = true;

  return e;
}

export function updateAttack(e: Entity) {
  const caster = getEntity(e.casterId);
  const attack = getAttack(caster.attackId);

  copyVector(e.velocity, e.direction);
  scaleVector(e.velocity, attack.speed);

  if (dealDamageToTargets(e)) {
    return;
  }

  destroyIfOutOfRange(e);
}

function dealDamageToTargets(e: Entity) {
  const caster = getEntity(e.casterId);
  const targets = caster.isPlayer ? getEnemiesGroup() : getAlliesGroup();

  for (const id of targets) {
    if (id === caster.id) {
      continue;
    }

    const target = getEntity(id);

    if (doRectanglesIntersect(e.hitbox, target.hitbox)) {
      dealDamage(e, target);
      destroyEntity(e.id);
      return true;
    }
  }

  return false;
}

function destroyIfOutOfRange(e: Entity) {
  const traveled = getVectorDistance(e.start, e.position);

  if (e.stats.attackRange && traveled > e.stats.attackRange) {
    destroyEntity(e.id);
    return true;
  }

  return false;
}

export function renderAttack(e: Entity) {
  const attack = getAttack(e.attackId);
  rotateTransform(getAngle(0, 0, e.direction.x, e.direction.y));
  drawSprite(attack.spriteId, -attack.pivot.x, -attack.pivot.y);
}

export function onAttackDestroy(e: Entity) {}
