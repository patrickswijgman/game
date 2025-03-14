import { updateExperienceOrbIdleAnimation, updateExperienceOrbSeekAnimation } from "@/anims/xp-orb.js";
import { StateId } from "@/consts/state.js";
import { destroyEntity } from "@/core/entities.js";
import { getPlayer } from "@/core/world.js";
import { Entity } from "@/data/entity.js";
import { addExperience } from "@/usecases/combat.js";
import { setState } from "@/usecases/entity.js";
import { isPlayerAlive } from "@/usecases/player.js";
import { getVectorDistance } from "ridder";

export function onExperienceOrbStateEnter(e: Entity) {
  switch (e.stateId) {
    case StateId.NONE:
      setState(e, StateId.XP_ORB_IDLE);
      break;
  }
}

export function onExperienceOrbStateUpdate(e: Entity) {
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

export function onExperienceOrbStateExit() {}
