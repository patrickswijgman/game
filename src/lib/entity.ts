import { addCameraTransform, resetTransform, rotateTransform, scaleTransform, translateTransform } from "snuggy";
import type { Type } from "@/consts.ts";
import { active, activeIndex, animAngle, animScaleX, animScaleY, animX, animY, isAllocated, isDestroyed, isFlipped, MAX_ENTITY_COUNT, posX, posY, toAdd, toRemove, type, zeroEntity, zeroToAdd, zeroToRemove } from "@/data.ts";

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

export function setEntityTransform(id: number, isInWorld: boolean) {
  resetTransform();
  translateTransform(posX[id], posY[id]);
  if (isInWorld) {
    addCameraTransform();
  }
  if (isFlipped[id]) {
    scaleTransform(-1, 1);
  }
}

export function addEntityAnimationTransform(id: number) {
  translateTransform(animX[id], animY[id]);
  scaleTransform(animScaleX[id], animScaleY[id]);
  rotateTransform(animAngle[id]);
}

export function resetEntityAnimation(id: number) {
  animX[id] = 0;
  animY[id] = 0;
  animScaleX[id] = 1;
  animScaleY[id] = 1;
  animAngle[id] = 0;
}

export function destroyEntity(id: number) {
  if (!isDestroyed[id]) {
    isDestroyed[id] = true;
    toRemove.push(id);
  }
}

export function addNewEntities() {
  for (const id of toAdd) {
    activeIndex[id] = active.length;
    active.push(id);
  }
  zeroToAdd();
}

export function removeDestroyedEntities() {
  for (const id of toRemove) {
    const idx = activeIndex[id];
    const last = active[active.length - 1];

    active[idx] = last;
    activeIndex[last] = idx;
    active.pop();

    activeIndex[id] = -1;
    zeroEntity(id);
  }
  zeroToRemove();
}

export function sortEntities() {
  for (let i = 1; i < active.length; i++) {
    const id = active[i];
    const depth = posY[id];

    let j = i - 1;
    while (j >= 0 && posY[active[j]] > depth) {
      const neighbour = active[j];
      active[j + 1] = neighbour;
      activeIndex[neighbour] = j + 1;
      j--;
    }

    active[j + 1] = id;
    activeIndex[id] = j + 1;
  }
}
