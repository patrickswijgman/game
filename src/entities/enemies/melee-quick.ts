import { updateBreathAnimation } from "anims/breath.js";
import { updateWalkAnimation } from "anims/walk.js";
import { initEnemy, newEnemy, onEnemyStateEnter, onEnemyStateExit, updateEnemy } from "enemy.js";
import { Entity, lookAt, setBody, setConstraints, setSprites, updateState } from "entity.js";
import { getVectorDistance } from "ridder";
import { getPlayer, Scene } from "scene.js";
import { seek } from "steering.js";

export function newQuickMeleeEnemy(scene: Scene, x: number, y: number) {
  const e = newEnemy(scene, "enemy_melee_quick", x, y);

  setSprites(e, "wolf", 16, 31, 0, -4, true, 0, 2);
  setConstraints(e, 18, 10);
  setBody(e, scene, 18, 4);

  initEnemy(e, {
    health: 18,
    stun: 50,
    strength: 12,
    dexterity: 15,
    intelligence: 3,
    movementSpeed: 1.5,
    experience: 50,
    state: "seek",
    damage: 10,
  });

  return e;
}

export function updateQuickMeleeEnemy(e: Entity, scene: Scene) {
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

        let speed = e.stats.movementSpeed;
        if (distance < 75) {
          speed *= 1.5;
        }

        if (distance < 20) {
          e.actionId = "bite";
          return "action";
        }

        seek(e, player.position, speed);
        lookAt(e, player.position);
        updateWalkAnimation(e);
      }
      break;
  }
}

function onStateExit(e: Entity, scene: Scene, state: string) {
  onEnemyStateExit(e, scene, state);
}
