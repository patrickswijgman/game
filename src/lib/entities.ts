import { Type } from "@/consts.ts";
import {
  active,
  activeCount,
  activeIndex,
  depth,
  enemies,
  enemiesCount,
  enemiesIndex,
  freeCount,
  isDestroyed,
  MAX_ENTITY_COUNT,
  popActive,
  popEnemies,
  popFree,
  posY,
  pushActive,
  pushEnemies,
  pushFree,
  pushToAdd,
  pushToRemove,
  toAdd,
  toAddCount,
  toRemove,
  toRemoveCount,
  type,
  zeroEntityAt,
  zeroToAdd,
  zeroToRemove,
} from "@/data.ts";

export function setupEntities() {
  for (let i = MAX_ENTITY_COUNT - 1; i >= 0; i--) {
    pushFree(i);
  }
}

export function nextEntity() {
  if (freeCount === 0) {
    throw new Error("No more entities :(");
  }
  const id = popFree();
  pushToAdd(id);
  return id;
}

export function destroyEntity(id: number) {
  if (!isDestroyed[id]) {
    isDestroyed[id] = 1;
    pushToRemove(id);
  }
}

export function addNewEntities() {
  for (let i = 0; i < toAddCount; i++) {
    const id = toAdd[i];

    activeIndex[id] = activeCount;
    pushActive(id);

    if (type[id] === Type.ENEMY) {
      enemiesIndex[id] = enemiesCount;
      pushEnemies(id);
    }
  }
  zeroToAdd();
}

export function removeDestroyedEntities() {
  for (let i = 0; i < toRemoveCount; i++) {
    const id = toRemove[i];

    const idx = activeIndex[id];
    const last = active[activeCount - 1];
    active[idx] = last;
    activeIndex[last] = idx;
    popActive();

    if (type[id] === Type.ENEMY) {
      const idx = enemiesIndex[id];
      const last = enemies[enemiesCount - 1];
      enemies[idx] = last;
      enemiesIndex[last] = idx;
      popEnemies();
    }

    zeroEntityAt(id);
    pushFree(id);
  }
  zeroToRemove();
}

export function sortEntities() {
  for (let i = 1; i < activeCount; i++) {
    const id = active[i];

    let j = i - 1;
    while (j >= 0 && posY[active[j]] + depth[active[j]] > posY[id] + depth[id]) {
      active[j + 1] = active[j];
      activeIndex[active[j]] = j + 1;
      j--;
    }

    active[j + 1] = id;
    activeIndex[id] = j + 1;
  }
}
