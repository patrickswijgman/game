import { Entity, newEntity, setSprites } from "entity.js";
import { random, roll, tickTimer, tween } from "ridder";
import { destroyEntity, Scene } from "scene.js";

export function newPortalParticle(scene: Scene, x: number, y: number) {
  const e = newEntity(scene, "particle_portal", x, y);

  setSprites(e, "particle_portal", 8, 10, 0, 0);

  e.tweenDuration = random(1000, 2000);
  e.isFlipped = roll(0.5);

  return e;
}

export function updatePortalParticle(e: Entity, scene: Scene) {
  const completed = tickTimer(e.tweenTimer, e.tweenDuration);
  e.tweenPosition.y = -tween(0, 50, e.tweenDuration, "easeInOutSine", e.tweenTimer.elapsed);
  e.tweenAlpha = tween(0.5, 0, e.tweenDuration, "easeInOutSine", e.tweenTimer.elapsed);
  e.tweenAngle = tween(0, 360, e.tweenDuration, "linear", e.tweenTimer.elapsed);

  if (completed) {
    destroyEntity(scene, e);
  }
}
