import { SpriteId } from "@/core/assets.js";
import { addEntity, Entity, initState, setShadow, setSprite, StateId, Type, updateState } from "@/core/entity.js";
import { onExperienceOrbStateEnter, onExperienceOrbStateExit, onExperienceOrbStateUpdate } from "@/states/xp-orb.js";

export function addExperienceOrb(x: number, y: number, xp: number) {
  const e = addEntity(Type.XP_ORB, x, y);

  setSprite(e, SpriteId.XP_ORB, 8, 10);
  setShadow(e, SpriteId.XP_ORB_SHADOW, 0, 2);

  e.stats.experience = xp;

  initState(e, StateId.ITEM_IDLE);

  return e;
}

export function updateExperienceOrb(e: Entity) {
  updateState(e, onExperienceOrbStateEnter, onExperienceOrbStateUpdate, onExperienceOrbStateExit);
}
