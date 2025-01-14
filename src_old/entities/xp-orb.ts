import { Entity, newEntity, setSprites } from "entity.js";
import { random, tickTimer, tween } from "ridder";
import { destroyEntity, getPlayer, Scene } from "scene.js";

export function newExperienceOrb(scene: Scene, x: number, y: number) {
  const e = newEntity(scene, "experience_orb", x, y);

  setSprites(e, "experience_orb", 8, 10, 0, 0, true);

  e.tweenDuration = random(5, 10) * 100;

  return e;
}

export function updateExperienceOrb(e: Entity, scene: Scene) {
  const player = getPlayer(scene);

  const completed = tickTimer(e.tweenTimer, e.tweenDuration);
  e.position.x = tween(e.start.x, player.center.x, e.tweenDuration, "easeInCirc", e.tweenTimer.elapsed);
  e.position.y = tween(e.start.y, player.center.y, e.tweenDuration, "easeInCirc", e.tweenTimer.elapsed);

  if (completed) {
    destroyEntity(scene, e);
  }
}
