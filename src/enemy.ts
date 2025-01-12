import { COLOR_HEALTH } from "consts.js";
import { Entity, newEntity } from "entity.js";
import { applyCameraTransform, resetTransform, scaleTransform, translateTransform } from "ridder";
import { Scene, addEnemy, getPlayer } from "scene.js";
import { updateSheet } from "sheet.js";
import { drawBar } from "ui/bar.js";

export function newEnemy(scene: Scene, type: string, x: number, y: number) {
  const e = newEntity(scene, type, x, y);
  e.isEnemy = true;
  addEnemy(scene, e);
  return e;
}

type EnemyOptions = {
  health: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  movementSpeed: number;
  experience: number;
  state: string;
  weaponId?: string;
  damage?: number;
};

export function initEnemy(e: Entity, { health, strength, dexterity, intelligence, movementSpeed, experience, state, weaponId = "", damage = 0 }: EnemyOptions) {
  e.sheet.statsBase.health = health;
  e.sheet.statsBase.healthMax = health;
  e.sheet.statsBase.strength = strength;
  e.sheet.statsBase.dexterity = dexterity;
  e.sheet.statsBase.intelligence = intelligence;
  e.sheet.statsBase.movementSpeed = movementSpeed;
  e.sheet.statsBase.experience = experience;
  e.sheet.statsBase.damage = damage;
  e.sheet.weaponId = weaponId;
  updateSheet(e.sheet);
  e.stateStartId = state;
  e.stateNextId = state;
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
  drawBar(-15, 0, e.sheet.stats.health, e.sheet.stats.healthMax, COLOR_HEALTH, 30, 8);
}
