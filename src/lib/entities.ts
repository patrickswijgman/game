import { active, activeCount, freeCount, index, isDestroyed, MAX_ENTITY_COUNT, popActive, popFree, posY, pushActive, pushFree, pushToAdd, pushToRemove, toAdd, toAddCount, toRemove, toRemoveCount, zeroEntityAt, zeroToAdd, zeroToRemove } from "@/data.ts";

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
    index[id] = activeCount;
    pushActive(id);
  }
  zeroToAdd();
}

export function removeDestroyedEntities() {
  for (let i = 0; i < toRemoveCount; i++) {
    const id = toRemove[i];
    const idx = index[id];
    const last = active[activeCount - 1];

    active[idx] = last;
    index[last] = idx;
    popActive();

    zeroEntityAt(id);
    pushFree(id);
  }
  zeroToRemove();
}

export function sortEntities() {
  for (let i = 1; i < activeCount; i++) {
    const id = active[i];

    let j = i - 1;
    while (j >= 0 && posY[active[j]] > posY[id]) {
      active[j + 1] = active[j];
      index[active[j]] = j + 1;
      j--;
    }

    active[j + 1] = id;
    index[id] = j + 1;
  }
}
