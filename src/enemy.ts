import { COLOR_HEALTH, COLOR_STUN } from "consts.js";
import { Entity, newEntity } from "entity.js";
import { applyCameraTransform, resetTransform, scaleTransform, translateTransform } from "ridder";
import { Scene, addEnemy, getPlayer } from "scene.js";
import { drawBar } from "ui/bar.js";

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

export function drawEnemyStatus(e: Entity, scene: Scene) {
  resetTransform();
  applyCameraTransform(scene.camera);
  translateTransform(e.position.x, e.position.y - e.height - 10);
  scaleTransform(0.5, 0.5);
  drawBar(-15, 0, e.stats.health, e.stats.healthMax, COLOR_HEALTH, 30, 8);
  drawBar(-15, 8, e.stats.stun, e.stats.stunMax, COLOR_STUN, 30, 6);
}
