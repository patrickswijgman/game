import { SpriteId } from "@/consts/assets.js";
import { ItemId } from "@/consts/item.js";
import { SceneId } from "@/consts/scene.js";
import { StateId } from "@/consts/state.js";
import { Type } from "@/consts/type.js";
import { Entity } from "@/data/entity.js";
import { onEnemyStateEnter, onEnemyStateExit, onEnemyStateUpdate } from "@/states/enemy.js";
import { addEntity, setCenter, setFlash, setHitbox, setShadow, setSprite, setState, updateState } from "@/usecases/entity.js";
import { initSheet } from "@/usecases/sheet.js";

export function addEnemy(sceneId: SceneId, x: number, y: number) {
  const e = addEntity(Type.ENEMY, sceneId, x, y);
  setSprite(e, SpriteId.PLAYER, 8, 15);
  setShadow(e, SpriteId.PLAYER_SHADOW, 8, 13);
  setFlash(e, SpriteId.PLAYER_FLASH);
  setHitbox(e, -3, -8, 6, 8);
  setCenter(e, 0, -3);

  e.sheet.name = "Enemy";
  e.sheet.statsBase.health = 10;
  e.sheet.statsBase.healthMax = 10;
  e.sheet.statsBase.movementSpeed = 0.5;
  e.sheet.weaponId = ItemId.LONGSWORD;
  initSheet(e.sheet);

  e.isEnemy = true;
  e.isPhysicsEnabled = true;
  e.isLogEnabled = true;

  setState(e, StateId.ENEMY_IDLE);

  return e;
}

export function updateEnemy(e: Entity) {
  updateState(e, onEnemyStateEnter, onEnemyStateUpdate, onEnemyStateExit);
}
