import { SpriteId } from "@/core/assets.js";
import { addExperience } from "@/core/combat.js";
import { destroyEntity } from "@/core/entities.js";
import { addEntity, AnimationId, Entity, initState, setAnimation, setShadow, setSprite, setState, StateId, Type, updateState } from "@/core/entity.js";
import { getPlayer } from "@/core/world.js";
import { getVectorDistance, tickTimer } from "ridder";

export function addExperienceOrb(x: number, y: number, xp: number) {
  const e = addEntity(Type.XP_ORB, x, y);

  setSprite(e, SpriteId.XP_ORB, 8, 10);
  setShadow(e, SpriteId.XP_ORB_SHADOW, 0, 2);

  e.stats.experience = xp;

  initState(e, StateId.ITEM_IDLE);

  return e;
}

export function updateExperienceOrb(e: Entity) {
  updateState(e, onStateEnter, onStateUpdate, onStateExit);
}

function onStateEnter(e: Entity) {
  switch (e.stateId) {
    case StateId.ITEM_IDLE:
      setAnimation(e, AnimationId.ITEM_IDLE, 1000);
      break;

    case StateId.ITEM_PICKUP:
      setAnimation(e, AnimationId.ITEM_PICKUP, 500);
      break;
  }
}

function onStateUpdate(e: Entity) {
  switch (e.stateId) {
    case StateId.ITEM_IDLE:
      {
        const player = getPlayer();
        const distance = getVectorDistance(e.position, player.position);
        if (distance < player.stats.pickupRange) {
          setState(e, StateId.ITEM_PICKUP);
        }
      }
      break;

    case StateId.ITEM_PICKUP:
      {
        if (tickTimer(e.stateTimer, 500)) {
          addExperience(e.stats.experience);
          destroyEntity(e.id);
        }
      }
      break;
  }
}

function onStateExit() {}
