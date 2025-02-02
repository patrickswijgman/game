import { Entity } from "@/data/entity.js";
import { Scene } from "@/data/scene.js";
import { getScene } from "@/usecases/game.js";
import { getEntity } from "@/usecases/scene.js";
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

export function avoid(e: Entity) {
  copyVector(e.ahead, e.position);
  addVector(e.ahead, e.velocity);
  resetVector(e.avoid);

  const scene = getScene(e.sceneId);
  const closest = findClosestAhead(e, scene);

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

function findClosestAhead(e: Entity, scene: Scene) {
  let distance = Infinity;
  let closest: Entity | null = null;

  for (const id of scene.all) {
    if (id === e.id) {
      continue;
    }

    const c = getEntity(scene, id);

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
