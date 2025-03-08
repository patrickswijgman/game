import { Type } from "@/consts/entity.js";
import { Entity } from "@/data/entity.js";
import { dealDamageToTargets, destroyIfHitsWall, destroyIfOutOfRange, getAttack } from "@/usecases/attack.js";
import { addEntity, getEntity, setHitbox, setSprite } from "@/usecases/entity.js";
import { addStats, copyStats } from "@/usecases/stats.js";
import { addVector, copyVector, getAngle, scaleVector } from "ridder";

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
