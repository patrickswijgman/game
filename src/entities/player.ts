import { Entity, newEntity, updateState } from "data/entity.js";
import { getSession } from "data/game.js";
import { getItem } from "data/items.js";
import { Scene } from "data/scene.js";
import { newMeleeAttack } from "entities/melee-attack.js";
import { getMousePosition, InputCode, isInputDown, isInputPressed, normalizeVector, resetVector, scaleVector } from "ridder";

export function newPlayer(scene: Scene, x: number, y: number) {
  const session = getSession();
  const e = newEntity(scene, x, y);
  e.type = "player";
  e.spriteId = "player";
  e.shadowId = "player_shadow";
  e.shadowOffset.x = 0;
  e.shadowOffset.y = 2;
  e.pivot.x = 8;
  e.pivot.y = 15;
  e.stats = session.stats;
  e.stateNextId = "idle";
  scene.playerId = e.id;
  return e;
}

export function updatePlayer(e: Entity, scene: Scene) {
  updateState(e, scene, onStateEnter, onStateUpdate, onStateExit);
}

function onStateEnter(e: Entity, scene: Scene, state: string) {
  switch (state) {
    case "action":
      {
        switch (e.actionId) {
          case "melee_attack":
            {
              const session = getSession();
              newMeleeAttack(scene, e.pos.x, e.pos.y, session.weaponId);
            }
            break;
        }
      }
      break;
  }
}

function onStateUpdate(e: Entity, scene: Scene, state: string) {
  switch (state) {
    case "idle":
      {
        resetVector(e.vel);

        if (isInputDown(InputCode.KEY_W)) {
          e.vel.y -= 1;
        }
        if (isInputDown(InputCode.KEY_S)) {
          e.vel.y += 1;
        }
        if (isInputDown(InputCode.KEY_A)) {
          e.vel.x -= 1;
        }
        if (isInputDown(InputCode.KEY_D)) {
          e.vel.x += 1;
        }

        normalizeVector(e.vel);
        scaleVector(e.vel, e.stats.movementSpeed);

        if (isInputPressed(InputCode.MOUSE_LEFT)) {
          const session = getSession();
          const weapon = getItem(session.weaponId);
          e.actionId = weapon.actionId;
          e.stateNextId = "action";
        }

        const mouse = getMousePosition(true);

        e.isFlipped = mouse.x < e.pos.x;
      }
      break;
  }
}

function onStateExit() {}
