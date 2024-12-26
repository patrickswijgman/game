import { Entity } from "entity.js";
import { addVector, addVectorScaled, copyVector, getDelta, getVectorDistance, getVectorLength, normalizeVector, resetVector, scaleVector, subtractVector, Vector } from "ridder";
import { getEntity, Scene } from "scene.js";

export function seek(e: Entity, target: Vector, speed: number) {
  copyVector(e.vel, target);
  subtractVector(e.vel, e.pos);
  normalizeVector(e.vel);
  scaleVector(e.vel, speed);
}

export function avoid(e: Entity, scene: Scene) {
  copyVector(e.ahead, e.pos);
  addVector(e.ahead, e.vel);
  resetVector(e.avoid);

  const closest = findClosestAhead(e, scene);

  if (closest) {
    const distance = getVectorDistance(e.ahead, closest.pos);

    if (distance < closest.radius) {
      copyVector(e.avoid, e.ahead);
      subtractVector(e.avoid, closest.pos);
      normalizeVector(e.avoid);
      scaleVector(e.avoid, getVectorLength(e.vel));
      addVectorScaled(e.vel, e.avoid, getDelta());
    }
  }
}

function findClosestAhead(e: Entity, scene: Scene) {
  let distance = Infinity;
  let closest: Entity | null = null;

  for (const id of scene.active) {
    if (id === e.id) {
      continue;
    }

    const c = getEntity(scene, id);

    if (c.radius) {
      const d = getVectorDistance(e.ahead, c.pos);

      if (d < distance) {
        distance = d;
        closest = c;
      }
    }
  }

  return closest;
}
