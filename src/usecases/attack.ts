import { AttackId } from "@/consts/attack.js";
import { attacks } from "@/data/attacks.js";
import { Entity } from "@/data/entity.js";
import { dealDamage } from "@/usecases/combat.js";
import { destroyEntity } from "@/usecases/entity.js";
import { getScene } from "@/usecases/game.js";
import { getEntity } from "@/usecases/scene.js";
import { doRectanglesIntersect, getVectorDistance } from "ridder";

export function getAttack(id: AttackId) {
  return attacks[id];
}

export function dealDamageToTargets(e: Entity) {
  const scene = getScene(e.sceneId);
  const caster = getEntity(scene, e.casterId);
  const targets = caster.isPlayer ? scene.enemies : scene.allies;

  for (const id of targets) {
    if (id === e.id || id === caster.id) {
      continue;
    }

    const target = getEntity(scene, id);

    if (doRectanglesIntersect(e.hitbox, target.hitbox)) {
      dealDamage(e, target);
      destroyEntity(e);
      return true;
    }
  }

  return false;
}

export function destroyIfHitsWall(e: Entity) {
  const scene = getScene(e.sceneId);
  const caster = getEntity(scene, e.casterId);

  for (const body of scene.bodies) {
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
  const scene = getScene(e.sceneId);
  const caster = getEntity(scene, e.casterId);
  const attack = getAttack(caster.attackId);
  const traveled = getVectorDistance(e.start, e.position);

  if (attack.range && traveled > attack.range) {
    destroyEntity(e);
    return true;
  }

  return false;
}
