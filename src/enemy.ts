import { Entity, newEntity } from "entity.js";
import { Scene, addEnemy, getPlayer } from "scene.js";

export function newEnemy(scene: Scene, type: string, x: number, y: number) {
  const e = newEntity(scene, type, x, y);
  e.isEnemy = true;
  addEnemy(scene, e);
  return e;
}

type EnemyOptions = {
  health: number;
  stun: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  movementSpeed: number;
  experience: number;
  state: string;
  weaponId?: string;
  damage?: number;
};

export function initEnemy(e: Entity, { health, stun, strength, dexterity, intelligence, movementSpeed, experience, state, weaponId = "", damage = 0 }: EnemyOptions) {
  e.stats.health = health;
  e.stats.healthMax = health;
  e.stats.stunMax = stun;
  e.stats.strength = strength;
  e.stats.dexterity = dexterity;
  e.stats.intelligence = intelligence;
  e.stats.movementSpeed = movementSpeed;
  e.stats.experience = experience;
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
