import { updateBreathAnimation } from "anims/breath.js";
import { updateWalkAnimation } from "anims/walk.js";
import { Entity, lookAt, newEnemy, setConstraints, setSprites, updateState } from "entity.js";
import { getItem } from "items.js";
import { getVectorDistance } from "ridder";
import { getPlayer, Scene } from "scene.js";
import { seek } from "steering.js";

export function newMeleeEnemy(scene: Scene, x: number, y: number) {
  const e = newEnemy(scene, "enemy_melee", x, y);

  setSprites(e, "bandit", 15, 31, 0, -4, true, 0, 2);
  setConstraints(e, 10, 12);

  e.stats.health = 10;
  e.stats.healthMax = 10;
  e.stats.strength = 10;
  e.stats.dexterity = 10;
  e.stats.intelligence = 8;
  e.stats.movementSpeed = 1;
  e.weaponId = "longsword";
  e.stateStartId = "seek";
  e.stateNextId = "seek";

  return e;
}

export function updateMeleeEnemy(e: Entity, scene: Scene) {
  const player = getPlayer(scene);

  if (player.isDestroyed) {
    e.stateNextId = "idle";
  }

  updateState(e, scene, onStateEnter, onStateUpdate, onStateExit);
}

function onStateEnter(e: Entity, scene: Scene, state: string) {
  switch (state) {
    case "action":
      e.isOutlineDangerVisible = true;
      break;
  }
}

function onStateUpdate(e: Entity, scene: Scene, state: string) {
  switch (state) {
    case "idle":
      updateBreathAnimation(e);
      break;

    case "seek":
      {
        const player = getPlayer(scene);
        const distance = getVectorDistance(e.position, player.position);

        if (distance < 20) {
          const weapon = getItem(e.weaponId);
          e.actionId = weapon.actionId;
          return "action";
        }

        seek(e, player.position, e.stats.movementSpeed);
        lookAt(e, player.position);
        updateWalkAnimation(e);
      }
      break;
  }
}

function onStateExit(e: Entity, scene: Scene, state: string) {
  switch (state) {
    case "action":
      e.isOutlineDangerVisible = false;
      break;
  }
}
