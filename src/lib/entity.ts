import { addCameraTransform, resetTransform, rotateTransform, scaleTransform, translateTransform } from "snuggy";
import type { Type } from "@/consts.ts";
import { active, animAngle, animScaleX, animScaleY, animX, animY, isAllocated, isDestroyed, isFlipped, MAX_ENTITY_COUNT, posX, posY, toAdd, toRemove, type, zeroToAdd, zeroToRemove } from "@/data.ts";
import { remove } from "@/lib/utils.ts";

function nextEntity() {
  for (let i = 0; i < MAX_ENTITY_COUNT; i++) {
    if (!isAllocated[i]) {
      isAllocated[i] = true;
      toAdd.push(i);
      return i;
    }
  }

  throw new Error("Out of entities :(");
}

export function setupEntity(t: Type, x: number, y: number) {
  const i = nextEntity();
  type[i] = t;
  posX[i] = x;
  posY[i] = y;
  animScaleX[i] = 1;
  animScaleY[i] = 1;
  return i;
}

export function setEntityTransform(i: number, isInWorld: boolean) {
  resetTransform();
  translateTransform(posX[i], posY[i]);
  if (isInWorld) {
    addCameraTransform();
  }
  if (isFlipped[i]) {
    scaleTransform(-1, 1);
  }
}

export function addAnimationTransform(i: number) {
  translateTransform(animX[i], animY[i]);
  scaleTransform(animScaleX[i], animScaleY[i]);
  rotateTransform(animAngle[i]);
}

export function destroyEntity(i: number) {
  isDestroyed[i] = true;
  toRemove.push(i);
}

export function addNewEntities() {
  if (toAdd.length > 0) {
    active.push(...toAdd);
    zeroToAdd();
  }
}

export function removeDestroyedEntities() {
  if (toRemove.length > 0) {
    for (const i of toRemove) {
      remove(active, i);
    }
    zeroToRemove();
  }
}

function sortEntitiesOnDepth(a: number, b: number) {
  return posY[a] - posY[b];
}

export function sortEntities() {
  active.sort(sortEntitiesOnDepth);
}
