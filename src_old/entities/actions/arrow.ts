import { doDamageToTargets } from "actions.js";
import { Entity, newEntity, setSprites } from "entity.js";
import { getItem } from "items.js";
import { copyVector, getAngle, getVectorDistance, normalizeVector, polygonFromRect, rect, scaleVector, subtractVector, Vector } from "ridder";
import { destroyEntity, getEntity, Scene } from "scene.js";

export function newArrow(scene: Scene, weapon: Entity, target: Vector) {
  const x = weapon.center.x;
  const y = weapon.center.y;
  const caster = getEntity(scene, weapon.parentId);

  const e = newEntity(scene, "arrow", x, y);

  setSprites(e, "arrow", 16, 15.5);

  e.hitbox = polygonFromRect(x, y, rect(0, -2, 8, 4));
  e.sheet.weaponId = caster.sheet.weaponId;
  e.parentId = caster.id;
  e.angle = getAngle(x, y, target.x, target.y);
  e.isOutlineDangerVisible = caster.isEnemy;

  copyVector(e.direction, target);
  subtractVector(e.direction, e.position);
  normalizeVector(e.direction);

  return e;
}

export function updateArrow(e: Entity, scene: Scene) {
  copyVector(e.velocity, e.direction);
  scaleVector(e.velocity, 4);

  const weapon = getItem(e.sheet.weaponId);
  const distance = getVectorDistance(e.start, e.position);

  if (distance > weapon.stats.range) {
    destroyEntity(scene, e);
    return;
  }

  doDamageToTargets(e, scene);
}
