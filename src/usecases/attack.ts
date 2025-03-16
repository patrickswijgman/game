import { getAttack } from "@/data/attacks.js";
import { destroyEntity, getEntity } from "@/data/entities.js";
import { Entity } from "@/data/entity.js";
import { getAlliesGroup, getBodies, getEnemiesGroup } from "@/data/world.js";
import { dealDamage } from "@/usecases/combat.js";
import { doRectanglesIntersect, getVectorDistance } from "ridder";

export function dealDamageToTargets(e: Entity) {
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

export function destroyIfHitsWall(e: Entity) {
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

export function destroyIfOutOfRange(e: Entity) {
  const caster = getEntity(e.casterId);
  const attack = getAttack(caster.attackId);
  const traveled = getVectorDistance(e.start, e.position);

  if (attack.stats.range && traveled > attack.stats.range) {
    destroyEntity(e.id);
    return true;
  }

  return false;
}

export function onAttackDestroy(e: Entity) {
  switch (e.attackId) {
  }
}
