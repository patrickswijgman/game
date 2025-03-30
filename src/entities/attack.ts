import { getAttack } from "@/core/attacks.js";
import { dealDamage } from "@/core/combat.js";
import { destroyEntity, getEntity } from "@/core/entities.js";
import { addEntity, Entity, setHitbox, setSprite, Type } from "@/core/entity.js";
import { addStats, copyStats } from "@/core/stats.js";
import { getAlliesGroup, getBodies, getEnemiesGroup } from "@/core/world.js";
import { addVector, copyVector, doRectanglesIntersect, getAngle, getVectorDistance, scaleVector } from "ridder";

export function addAttack(caster: Entity) {
  const e = addEntity(Type.ATTACK, 0, 0);
  const attack = getAttack(caster.attackId);

  copyVector(e.position, caster.direction);
  scaleVector(e.position, attack.reach);
  addVector(e.position, caster.center);
  copyVector(e.start, e.position);

  copyVector(e.direction, caster.direction);

  setSprite(e, attack.spriteId, attack.pivot.x, attack.pivot.y);
  setHitbox(e, attack.hitbox.x, attack.hitbox.y, attack.hitbox.w, attack.hitbox.h);

  copyStats(e.stats, attack.stats);
  addStats(e.stats, caster.stats);

  e.angle = getAngle(caster.center.x, caster.center.y, e.position.x, e.position.y);
  e.depth = attack.reach;
  e.lifeTime = attack.duration;
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

  if (destroyIfHitsWall(e)) {
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

function destroyIfHitsWall(e: Entity) {
  const caster = getEntity(e.casterId);

  for (const body of getBodies()) {
    if (body === caster.body) {
      continue;
    }

    if (doRectanglesIntersect(e.hitbox, body)) {
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

export function onAttackDestroy(e: Entity) {}
