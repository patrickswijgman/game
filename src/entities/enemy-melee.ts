import { SpriteId } from "@/consts/assets.js";
import { AttackId } from "@/consts/attack.js";
import { Type } from "@/consts/entity.js";
import { SceneId } from "@/consts/scene.js";
import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { onEnemyStateEnter, onEnemyStateExit, onEnemyStateUpdate } from "@/states/enemy-melee.js";
import { addEntity, setCenter, setHitbox, setShadow, setSprite, setState, updateState } from "@/usecases/entity.js";
import { getScene } from "@/usecases/game.js";
import { setVector } from "ridder";

export function addMeleeEnemy(sceneId: SceneId, x: number, y: number) {
  const e = addEntity(Type.ENEMY_MELEE, sceneId, x, y);

  setSprite(e, SpriteId.ENEMY_MELEE, 8, 15, SpriteId.ENEMY_MELEE_FLASH);
  setShadow(e, SpriteId.ENEMY_MELEE_SHADOW, 0, 2);
  setHitbox(e, -3, -8, 6, 8);
  setCenter(e, 0, -3);
  setVector(e.direction, 1, 0);

  e.radius = 8;

  e.stats.health = 15;
  e.stats.healthMax = 15;
  e.stats.damage = 1;
  e.stats.movementSpeed = 1;
  e.stats.movementSpeedMax = 1;
  e.attackId = AttackId.ENEMY_MELEE;

  e.isPhysicsEnabled = true;
  e.isEnemy = true;

  setState(e, StateId.ENEMY_IDLE);

  const scene = getScene(e.sceneId);
  scene.enemies.push(e.id);

  return e;
}

export function updateMeleeEnemy(e: Entity) {
  updateState(e, onEnemyStateEnter, onEnemyStateUpdate, onEnemyStateExit);
}
