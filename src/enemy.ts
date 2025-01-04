import { Entity, newEntity } from "entity.js";
import { Scene, addEnemy, getPlayer } from "scene.js";

export function newEnemy(scene: Scene, type: string, x: number, y: number) {
  const e = newEntity(scene, type, x, y);
  e.isEnemy = true;
  addEnemy(scene, e);
  return e;
}

export function initEnemy(e: Entity, hp: number, str: number, dex: number, int: number, spd: number, xp: number, state: string, weaponId: string, damage: number) {
  e.stats.health = hp;
  e.stats.healthMax = hp;
  e.stats.stunMax = 100;
  e.stats.strength = str;
  e.stats.dexterity = dex;
  e.stats.intelligence = int;
  e.stats.movementSpeed = spd;
  e.stats.experience = xp;
  e.stats.damage = damage;
  e.stateStartId = state;
  e.stateNextId = state;
  e.weaponId = weaponId;
}

export function updateEnemy(e: Entity, scene: Scene) {
  const player = getPlayer(scene);

  if (player.isDestroyed) {
    e.stateNextId = "idle";
  }
}

export function onEnemyStateEnter(e: Entity, scene: Scene, state: string) {
  switch (e.stateId) {
    case "action":
      e.isOutlineDangerVisible = true;
      break;
  }
}

export function onEnemyStateExit(e: Entity, scene: Scene, state: string) {
  switch (e.stateId) {
    case "action":
      e.isOutlineDangerVisible = false;
      break;
  }
}
