import { addExperience } from "@/core/combat.js";
import { destroyEntity } from "@/core/entities.js";
import { AnimationId, Entity, setAnimation, setState, StateId } from "@/core/entity.js";
import { getPlayer } from "@/core/world.js";
import { getVectorDistance, tickTimer } from "ridder";

export function onExperienceOrbStateEnter(e: Entity) {
  switch (e.stateId) {
    case StateId.ITEM_IDLE:
      setAnimation(e, AnimationId.ITEM_IDLE, 1000);
      break;

    case StateId.ITEM_PICKUP:
      setAnimation(e, AnimationId.ITEM_PICKUP, 500);
      break;
  }
}

export function onExperienceOrbStateUpdate(e: Entity) {
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

export function onExperienceOrbStateExit() {}
