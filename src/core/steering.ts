import { getEntity } from "@/core/game.js";
import { Entity } from "@/core/entity.js";
import { addVector, addVectorScaled, copyVector, getDelta, getVectorDistance, getVectorLength, normalizeVector, resetVector, scaleVector, subtractVector, Vector } from "ridder";

export function seek(e: Entity, target: Vector, speed: number) {
  copyVector(e.velocity, target);
  subtractVector(e.velocity, e.position);
  normalizeVector(e.velocity);
  scaleVector(e.velocity, speed);
}

export function flee(e: Entity, target: Vector, speed: number) {
  copyVector(e.velocity, e.position);
  subtractVector(e.velocity, target);
  normalizeVector(e.velocity);
  scaleVector(e.velocity, speed);
}

export function avoid(e: Entity, list: Readonly<Array<number>>) {
  copyVector(e.ahead, e.position);
  addVector(e.ahead, e.velocity);
  resetVector(e.avoid);

  const closest = findClosestAhead(e, list);

  if (closest) {
    const distance = getVectorDistance(e.ahead, closest.position);

    if (distance < closest.radius) {
      copyVector(e.avoid, e.ahead);
      subtractVector(e.avoid, closest.position);
      normalizeVector(e.avoid);
      scaleVector(e.avoid, getVectorLength(e.velocity));
      addVectorScaled(e.velocity, e.avoid, getDelta());
    }
  }
}

function findClosestAhead(e: Entity, list: Readonly<Array<number>>) {
  let distance = Infinity;
  let closest: Entity | null = null;

  for (const id of list) {
    if (id === e.id) {
      continue;
    }

    const c = getEntity(id);

    if (c.radius) {
      const d = getVectorDistance(e.ahead, c.position);

      if (d < distance) {
        distance = d;
        closest = c;
      }
    }
  }

  return closest;
}
