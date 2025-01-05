import { updateBreathAnimation } from "anims/breath.js";
import { updateWalkAnimation } from "anims/walk.js";
import { initEnemy, newEnemy, onEnemyStateEnter, onEnemyStateExit, updateEnemy } from "enemy.js";
import { Entity, lookAt, setConstraints, setSprites, updateState } from "entity.js";
import { getItem } from "items.js";
import { getVectorDistance } from "ridder";
import { getPlayer, Scene } from "scene.js";
import { seek } from "steering.js";

export function newMeleeEnemy(scene: Scene, x: number, y: number) {
  const e = newEnemy(scene, "enemy_melee", x, y);

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
    weaponId: "longsword_worn",
  });

  return e;
}

export function updateMeleeEnemy(e: Entity, scene: Scene) {
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
  onEnemyStateExit(e, scene, state);
}
