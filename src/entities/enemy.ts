import { Type } from "@/consts/entity.js";
import { SceneId } from "@/consts/scene.js";
import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { onEnemyStateEnter, onEnemyStateExit, onEnemyStateUpdate } from "@/states/enemy.js";
import { addEntity, setState, updateState } from "@/usecases/entity.js";
import { getScene } from "@/usecases/game.js";

export function addEnemy(sceneId: SceneId, x: number, y: number) {
  const e = addEntity(Type.ENEMY, sceneId, x, y);

  e.isEnemy = true;
  e.isPhysicsEnabled = true;

  setState(e, StateId.ENEMY_IDLE);

  const scene = getScene(e.sceneId);
  scene.enemies.push(e.id);

  return e;
}

export function updateEnemy(e: Entity) {
  updateState(e, onEnemyStateEnter, onEnemyStateUpdate, onEnemyStateExit);
}
