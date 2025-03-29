import { updateExperienceOrbIdleAnimation, updateExperienceOrbSeekAnimation } from "@/anims/xp-orb.js";
import { SpriteId } from "@/core/assets.js";
import { addExperience } from "@/core/combat.js";
import { destroyEntity } from "@/core/entities.js";
import { addEntity, Entity, setShadow, setSprite, setState, StateId, Type, updateState } from "@/core/entity.js";
import { getPlayer, isPlayerAlive } from "@/core/world.js";
import { getVectorDistance } from "ridder";

export function addExperienceOrb(x: number, y: number, xp: number) {
  const e = addEntity(Type.XP_ORB, x, y);

  setSprite(e, SpriteId.XP_ORB, 8, 10);
  setShadow(e, SpriteId.XP_ORB_SHADOW, 0, 2);

  e.stats.experience = xp;

  setState(e, StateId.XP_ORB_IDLE);

  return e;
}

export function updateExperienceOrb(e: Entity) {
  updateState(e, onStateEnter, onStateUpdate, onStateExit);
}

function onStateEnter(e: Entity) {
  switch (e.stateId) {
    case StateId.NONE:
      setState(e, StateId.XP_ORB_IDLE);
      break;
  }
}

function onStateUpdate(e: Entity) {
  switch (e.stateId) {
    case StateId.XP_ORB_IDLE:
      {
        updateExperienceOrbIdleAnimation(e);
        if (isPlayerAlive()) {
          const player = getPlayer();
          const distance = getVectorDistance(e.position, player.position);
          if (distance < player.stats.pickupRange) {
            setState(e, StateId.XP_ORB_SEEK);
          }
        }
      }
      break;

    case StateId.XP_ORB_SEEK:
      {
        if (isPlayerAlive()) {
          const completed = updateExperienceOrbSeekAnimation(e);
          if (completed) {
            addExperience(e.stats.experience);
            destroyEntity(e.id);
          }
        }
      }
      break;
  }
}

function onStateExit() {}
