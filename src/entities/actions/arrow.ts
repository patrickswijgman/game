import { doDamageToTargets } from "actions.js";
import { Entity, newEntity, setSprites } from "entity.js";
import { getItem } from "items.js";
import { copyVector, getAngle, getVectorDistance, normalizeVector, polygonFromRect, rect, scaleVector, subtractVector, Vector } from "ridder";
import { destroyEntity, Scene } from "scene.js";

export function newArrow(scene: Scene, caster: Entity, target: Vector) {
  const x = caster.center.x;
  const y = caster.center.y;

  const e = newEntity(scene, "arrow", x, y);

  setSprites(e, "arrow", 16, 15.5);

  e.hitbox = polygonFromRect(x, y, rect(0, -3.5, 9, 7));
  e.weaponId = caster.weaponId;
  e.parentId = caster.id;
  e.angle = getAngle(x, y, target.x, target.y);

  copyVector(e.direction, target);
  subtractVector(e.direction, e.position);
  normalizeVector(e.direction);

  return e;
}

export function updateArrow(e: Entity, scene: Scene) {
  copyVector(e.velocity, e.direction);
  scaleVector(e.velocity, 4);

  const weapon = getItem(e.weaponId);
  const distance = getVectorDistance(e.start, e.position);

  if (distance > weapon.stats.range) {
    destroyEntity(scene, e);
    return;
  }

  doDamageToTargets(e, scene);
}
