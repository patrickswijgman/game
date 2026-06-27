import { active, activeCount, activeIndex, add, addCount, animScaleX, animScaleY, isActive, MAX_ENTITY_COUNT, popActive, popFree, posX, posY, pushActive, pushAdd, pushFree, pushRemove, remove, removeCount, zeroAdd, zeroEntity, zeroFree, zeroRemove } from "@/data/data.ts";
import { assert } from "@/engine/utils.ts";

export function setupEntityPool() {
  zeroFree();
  for (let id = MAX_ENTITY_COUNT - 1; id >= 0; id--) {
    pushFree(id);
  }
}

export function setupEntity(x: number, y: number) {
  const id = popFree();
  assert(id >= 0, "No more entities :(");
  isActive[id] = 1;
  posX[id] = x;
  posY[id] = y;
  animScaleX[id] = 1;
  animScaleY[id] = 1;
  pushAdd(id);
  return id;
}

export function destroyEntity(id: number) {
  if (isActive[id]) {
    isActive[id] = 0;
    pushRemove(id);
  }
}

export function flushEntities() {
  for (let i = 0; i < addCount; i++) {
    const id = add[i];
    activeIndex[id] = activeCount;
    pushActive(id);
  }
  zeroAdd();

  for (let i = 0; i < removeCount; i++) {
    const id = remove[i];
    const idx = activeIndex[id];
    const lastId = popActive();
    active[idx] = lastId;
    activeIndex[lastId] = idx;
    zeroEntity(id);
    pushFree(id);
  }
  zeroRemove();
}

export function sortEntities() {
  for (let i = 1; i < activeCount; i++) {
    const id = active[i];
    const y = posY[id];
    let j = i - 1;
    while (j >= 0 && posY[active[j]] > y) {
      active[j + 1] = active[j];
      activeIndex[active[j]] = j + 1;
      j--;
    }
    active[j + 1] = id;
    activeIndex[id] = j + 1;
  }
}
