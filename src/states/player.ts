import { updateBreathAnimation } from "@/anims/breath.js";
import { updateWalkAnimation } from "@/anims/walk.js";
import { SceneId } from "@/consts/scene.js";
import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { setState } from "@/usecases/entity.js";
import { useEquipmentSlot } from "@/usecases/equipment.js";
import { switchScene } from "@/usecases/game.js";
import { getItem } from "@/usecases/item.js";
import { InputCode, copyVector, getVectorLength, isInputDown, isInputPressed, normalizeVector, resetVector, scaleVector } from "ridder";

export function onPlayerStateEnter(e: Entity) {
  switch (e.stateId) {
    case StateId.NONE:
      setState(e, StateId.PLAYER_IDLE);
      break;
  }
}

export function onPlayerStateUpdate(e: Entity) {
  switch (e.stateId) {
    case StateId.PLAYER_IDLE:
      {
        updateBreathAnimation(e);
        useEquipment(e);
        if (move(e)) {
          setState(e, StateId.PLAYER_WALK);
        }
        if (attack(e)) {
          setState(e, StateId.ATTACK);
        }
        openMenus();
      }
      break;

    case StateId.PLAYER_WALK:
      {
        updateWalkAnimation(e);
        useEquipment(e);
        if (!move(e)) {
          setState(e, StateId.PLAYER_IDLE);
        }
        if (attack(e)) {
          setState(e, StateId.ATTACK);
        }
        openMenus();
      }
      break;
  }
}

export function onPlayerStateExit(e: Entity) {}

function move(e: Entity) {
  resetVector(e.velocity);

  if (isInputDown(InputCode.KEY_LEFT)) {
    e.velocity.x -= 1;
    e.isFlipped = true;
  }
  if (isInputDown(InputCode.KEY_RIGHT)) {
    e.velocity.x += 1;
    e.isFlipped = false;
  }
  if (isInputDown(InputCode.KEY_UP)) {
    e.velocity.y -= 1;
  }
  if (isInputDown(InputCode.KEY_DOWN)) {
    e.velocity.y += 1;
  }

  const isMoving = !!getVectorLength(e.velocity);

  if (isMoving) {
    normalizeVector(e.velocity);
    copyVector(e.direction, e.velocity);
    scaleVector(e.velocity, e.sheet.stats.movementSpeed);
  }

  return isMoving;
}

function attack(e: Entity) {
  if (isInputDown(InputCode.KEY_Z) && e.sheet.weaponId) {
    const weapon = getItem(e.sheet.weaponId);
    e.attackId = weapon.attackId;
    return true;
  }

  return false;
}

function useEquipment(e: Entity) {
  useEquipmentOnInput(0, InputCode.KEY_1);
  useEquipmentOnInput(1, InputCode.KEY_2);
  useEquipmentOnInput(2, InputCode.KEY_3);
  useEquipmentOnInput(3, InputCode.KEY_4);
  useEquipmentOnInput(4, InputCode.KEY_5);
  useEquipmentOnInput(5, InputCode.KEY_6);
  useEquipmentOnInput(6, InputCode.KEY_7);
  useEquipmentOnInput(7, InputCode.KEY_8);
  useEquipmentOnInput(8, InputCode.KEY_9);
  useEquipmentOnInput(9, InputCode.KEY_0);
}

function useEquipmentOnInput(slotId: number, input: InputCode) {
  if (isInputPressed(input)) {
    useEquipmentSlot(slotId);
  }
}

function openMenus() {
  if (isInputPressed(InputCode.KEY_I)) {
    switchScene(SceneId.INVENTORY);
    return;
  }
  if (isInputPressed(InputCode.KEY_C)) {
    switchScene(SceneId.CHARACTER);
    return;
  }
}
