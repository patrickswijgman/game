import { Entity, initState, StateId, Type, updateState } from "@/core/entity.js";
import { addToEnemiesGroup } from "@/core/game.js";
import { addEntity } from "@/entities/entity.js";
import { addExperienceOrb } from "@/entities/xp-orb.js";
import { onEnemyStateEnter, onEnemyStateExit, onEnemyStateUpdate } from "@/states/enemy.js";

export function addEnemy(x: number, y: number) {
  const e = addEntity(Type.ENEMY, x, y);

  e.isEnemy = true;

  addToEnemiesGroup(e.id);

  initState(e, StateId.ENEMY_SEEK);

  return e;
}

export function updateEnemy(e: Entity) {
  updateState(e, onEnemyStateEnter, onEnemyStateUpdate, onEnemyStateExit);
}

export function onEnemyDestroy(e: Entity) {
  if (e.stats.experience) {
    addExperienceOrb(e.position.x, e.position.y, e.stats.experience);
  }
}
