import { updateBreathAnimation } from "anims/breath.js";
import { updateWalkAnimation } from "anims/walk.js";
import { initEnemy, newEnemy, onEnemyStateEnter, onEnemyStateExit, updateEnemy } from "enemy.js";
import { Entity, lookAt, setConstraints, setSprites, updateState } from "entity.js";
import { getItem } from "items.js";
import { getVectorDistance } from "ridder";
import { getPlayer, Scene } from "scene.js";
import { flee, seek } from "steering.js";

export function newRangedEnemy(scene: Scene, x: number, y: number) {
  const e = newEnemy(scene, "enemy_ranged", x, y);

  setSprites(e, "bandit", 16, 31, 0, -5, true, 0, 2);
  setConstraints(e, 10, 12);

  initEnemy(e, {
    health: 18,
    stun: 100,
    strength: 11,
    dexterity: 12,
    intelligence: 8,
    movementSpeed: 1,
    experience: 25,
    state: "seek",
    weaponId: "light_crossbow",
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
        const weapon = getItem(e.weaponId);
        const shortRange = weapon.stats.range * 0.75;

        if (distance < shortRange) {
          return "flee";
        }

        if (distance < weapon.stats.range) {
          const weapon = getItem(e.weaponId);
          e.actionId = weapon.actionId;
          return "action";
        }

        seek(e, player.position, e.stats.movementSpeed);
        lookAt(e, player.position);
        updateWalkAnimation(e);
      }
      break;

    case "flee":
      {
        const player = getPlayer(scene);
        const distance = getVectorDistance(e.position, player.position);
        const weapon = getItem(e.weaponId);
        const shortRange = weapon.stats.range * 0.75;
        const speed = e.stats.movementSpeed * 0.75;

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
