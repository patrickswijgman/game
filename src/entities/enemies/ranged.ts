import { updateBreathAnimation } from "anims/breath.js";
import { updateWalkAnimation } from "anims/walk.js";
import { initEnemy, newEnemy, onEnemyStateEnter, onEnemyStateExit, updateEnemy } from "enemy.js";
import { Entity, lookAt, setBody, setConstraints, setSprites, updateState } from "entity.js";
import { getItem } from "items.js";
import { getVectorDistance } from "ridder";
import { getPlayer, Scene } from "scene.js";
import { flee, seek } from "steering.js";

export function newRangedEnemy(scene: Scene, x: number, y: number) {
  const e = newEnemy(scene, "enemy_ranged", x, y);

  setSprites(e, "goblin", 16, 31, 0, -3, true, 0, 2);
  setConstraints(e, 8, 8);
  setBody(e, scene, 8, 3);

  initEnemy(e, {
    health: 12,
    stun: 100,
    strength: -1,
    dexterity: 2,
    intelligence: 0,
    movementSpeed: 1,
    experience: 50,
    state: "seek",
    weaponId: "crossbow_light_worn",
  });

  return e;
}

export function updateRangedEnemy(e: Entity, scene: Scene) {
  updateEnemy(e, scene);
  updateState(e, scene, onStateEnter, onStateUpdate, onStateExit);
}

function onStateEnter(e: Entity, scene: Scene, state: string) {
  onEnemyStateEnter(e, scene, state);
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
        const weapon = getItem(e.sheet.weaponId);
        const shortRange = weapon.stats.range * 0.75;

        if (distance < shortRange) {
          return "flee";
        }

        if (distance < weapon.stats.range) {
          const weapon = getItem(e.sheet.weaponId);
          e.actionId = weapon.actionId;
          return "action";
        }

        seek(e, player.position, e.sheet.stats.movementSpeed);
        lookAt(e, player.position);
        updateWalkAnimation(e);
      }
      break;

    case "flee":
      {
        const player = getPlayer(scene);
        const distance = getVectorDistance(e.position, player.position);
        const weapon = getItem(e.sheet.weaponId);
        const shortRange = weapon.stats.range * 0.75;
        const speed = e.sheet.stats.movementSpeed * 0.5;

        if (distance > shortRange) {
          return "seek";
        }

        flee(e, player.position, speed);
        lookAt(e, player.position);
        updateWalkAnimation(e);
      }
      break;
  }
}

function onStateExit(e: Entity, scene: Scene, state: string) {
  onEnemyStateExit(e, scene, state);
}
