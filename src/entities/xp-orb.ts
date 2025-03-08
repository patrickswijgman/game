import { SpriteId } from "@/consts/assets.js";
import { Type } from "@/consts/entity.js";
import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { onExperienceOrbStateEnter, onExperienceOrbStateExit, onExperienceOrbStateUpdate } from "@/states/xp-orb.js";
import { addEntity, setShadow, setSprite, setState, updateState } from "@/usecases/entity.js";

export function addExperienceOrb(x: number, y: number, xp: number) {
  const e = addEntity(Type.XP_ORB, x, y);

  setSprite(e, SpriteId.XP_ORB, 8, 10);
  setShadow(e, SpriteId.XP_ORB_SHADOW, 0, 2);

  e.stats.experience = xp;

  setState(e, StateId.XP_ORB_IDLE);

  return e;
}

export function updateExperienceOrb(e: Entity) {
  updateState(e, onExperienceOrbStateEnter, onExperienceOrbStateUpdate, onExperienceOrbStateExit);
}
