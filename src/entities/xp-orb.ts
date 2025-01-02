import { Entity, newEntity, setSprites } from "entity.js";
import { random, tickTimer, tween } from "ridder";
import { destroyEntity, getPlayer, Scene } from "scene.js";

export function newExperienceOrb(scene: Scene, x: number, y: number, experience: number) {
  const e = newEntity(scene, "experience_orb", x, y);

  e.stats.experience = experience;
  e.tweenDuration = random(5, 10) * 100;

  setSprites(e, "experience_orb", 8, 10, 0, 0, true);

  return e;
}

export function updateExperienceOrb(e: Entity, scene: Scene) {
  const player = getPlayer(scene);

  const completed = tickTimer(e.tweenTimer, e.tweenDuration);
  e.position.x = tween(e.start.x, player.center.x, e.tweenDuration, "easeInCirc", e.tweenTimer.elapsed);
  e.position.y = tween(e.start.y, player.center.y, e.tweenDuration, "easeInCirc", e.tweenTimer.elapsed);

  if (completed) {
    destroyEntity(scene, e);
    player.stats.experience += e.stats.experience;
  }
}
