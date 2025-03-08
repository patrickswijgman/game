import { AttackId } from "@/consts/attack.js";
import { attacks } from "@/data/attacks.js";
import { entities } from "@/data/entities.js";
import { Entity } from "@/data/entity.js";
import { world } from "@/data/world.js";
import { dealDamage } from "@/usecases/combat.js";
import { destroyEntity, getEntity } from "@/usecases/entity.js";
import { doRectanglesIntersect, getVectorDistance } from "ridder";

export function getAttack(id: AttackId) {
  return attacks[id];
}

export function dealDamageToTargets(e: Entity) {
  const caster = getEntity(e.casterId);
  const targets = caster.isPlayer ? entities.enemies : entities.allies;

  for (const id of targets) {
    if (id === e.id || id === caster.id) {
      continue;
    }

    const target = getEntity(id);

    if (doRectanglesIntersect(e.hitbox, target.hitbox)) {
      dealDamage(e, target);
      destroyEntity(e);
      return true;
    }
  }

  return false;
}

export function destroyIfHitsWall(e: Entity) {
  const caster = getEntity(e.casterId);

  for (const body of world.bodies) {
    if (doRectanglesIntersect(e.hitbox, body)) {
      if (body === caster.body) {
        continue;
      }
      destroyEntity(e);
      return true;
    }
  }

  return false;
}

export function destroyIfOutOfRange(e: Entity) {
  const caster = getEntity(e.casterId);
  const attack = getAttack(caster.attackId);
  const traveled = getVectorDistance(e.start, e.position);

  if (attack.range && traveled > attack.range) {
    destroyEntity(e);
    return true;
  }

  return false;
}
