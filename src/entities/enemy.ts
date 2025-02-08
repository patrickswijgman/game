import { EnemyId } from "@/consts/enemy.js";
import { SceneId } from "@/consts/scene.js";
import { StateId } from "@/consts/state.js";
import { Type } from "@/consts/type.js";
import { Entity } from "@/data/entity.js";
import { onEnemyStateEnter, onEnemyStateExit, onEnemyStateUpdate } from "@/states/enemy.js";
import { getEnemy } from "@/usecases/enemy.js";
import { addEntity, setCenterFromHitbox, setHitbox, setSprites, setState, updateState } from "@/usecases/entity.js";
import { getScene } from "@/usecases/game.js";
import { initSheet } from "@/usecases/sheet.js";
import { copyStats } from "@/usecases/stats.js";

export function addEnemy(sceneId: SceneId, x: number, y: number, enemyId: EnemyId) {
  const e = addEntity(Type.ENEMY, sceneId, x, y);
  const enemy = getEnemy(enemyId);

  setSprites(e, ...enemy.sprites);
  setHitbox(e, ...enemy.hitbox);
  setCenterFromHitbox(e);

  e.sheet.weaponId = enemy.weaponId;
  e.sheet.armorId = enemy.armorId;
  e.sheet.offhandId = enemy.offhandId;
  copyStats(e.sheet.statsBase, enemy.stats);
  initSheet(e.sheet);

  e.enemyId = enemyId;
  e.isEnemy = true;
  e.isPhysicsEnabled = true;
  e.isLogEnabled = true;

  setState(e, StateId.ENEMY_IDLE);

  const scene = getScene(e.sceneId);
  scene.enemies.push(e.id);

  return e;
}

export function updateEnemy(e: Entity) {
  updateState(e, onEnemyStateEnter, onEnemyStateUpdate, onEnemyStateExit);
}
