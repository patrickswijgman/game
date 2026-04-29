import { active, free, index, isDestroyed, MAX_ENTITY_COUNT, posY, toAdd, toRemove, zeroEntity, zeroToAdd, zeroToRemove } from "@/data.ts";

/**
 * Pre-fills the free list with all entity ids.
 * Must be called once at startup before any entities are created.
 */
export function setupEntities() {
  for (let i = MAX_ENTITY_COUNT - 1; i >= 0; i--) {
    free.push(i);
  }
}

/**
 * Pops a free entity id and queues it for addition to the active list.
 * Throws if no free entities are available.
 */
export function nextEntity() {
  const id = free.pop();
  if (id === undefined) {
    throw new Error("No more entities :(");
  }

  toAdd.push(id);

  return id;
}

/**
 * Marks an entity as destroyed and queues it for removal.
 * Safe to call multiple times on the same entity.
 */
export function destroyEntity(id: number) {
  if (!isDestroyed[id]) {
    isDestroyed[id] = true;
    toRemove.push(id);
  }
}

/**
 * Flushes the toAdd queue into the active list.
 * Assigns each new entity its position in the active list.
 */
export function addNewEntities() {
  for (let i = 0; i < toAdd.length; i++) {
    const id = toAdd[i];
    index[id] = active.length;
    active.push(id);
  }

  zeroToAdd();
}

/**
 * Removes destroyed entities from the active list using swap-to-back.
 * Each destroyed entity is swapped with the last active entity,
 * then the list is shrunk by one. This avoids shifting elements.
 * Freed entity ids are returned to the free list for reuse.
 */
export function removeDestroyedEntities() {
  for (let i = 0; i < toRemove.length; i++) {
    const id = toRemove[i];
    const idx = index[id];
    const last = active[active.length - 1];

    active[idx] = last;
    index[last] = idx;
    active.pop();

    zeroEntity(id);

    free.push(id);
  }

  zeroToRemove();
}

/**
 * Sorts entities by depth (posY) using insertion sort.
 * Iterates left to right, sliding each entity leftward past any entity
 * with a greater depth until it reaches its correct position.
 */
export function sortEntities() {
  for (let i = 1; i < active.length; i++) {
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
