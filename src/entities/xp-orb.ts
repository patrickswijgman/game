import { SpriteId } from "@/core/assets.js";
import { applyAnimationTransform, drawShadow, Entity, initState, StateId, Type, updateState } from "@/core/entity.js";
import { addEntity } from "@/entities/entity.js";
import { onExperienceOrbStateEnter, onExperienceOrbStateExit, onExperienceOrbStateUpdate } from "@/states/xp-orb.js";
import { drawSprite } from "ridder";

export function addExperienceOrb(x: number, y: number, xp: number) {
  const e = addEntity(Type.XP_ORB, x, y);

  e.stats.experience = xp;

  initState(e, StateId.ITEM_IDLE);

  return e;
}

export function updateExperienceOrb(e: Entity) {
  updateState(e, onExperienceOrbStateEnter, onExperienceOrbStateUpdate, onExperienceOrbStateExit);
}

export function renderExperienceOrb(e: Entity) {
  const x = -8;
  const y = -10;
  drawShadow(SpriteId.XP_ORB_SHADOW, x, y + 2);
  applyAnimationTransform(e);
  drawSprite(SpriteId.XP_ORB, x, y);
}
