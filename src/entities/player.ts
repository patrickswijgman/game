import { newEntity, switchState } from "data/entity.js";
import { getCurrentRun } from "data/game.js";
import { addEntity, Scene } from "data/scene.js";

export function addPlayer(scene: Scene, x: number, y: number) {
  const e = newEntity(x, y);
  const run = getCurrentRun();

  e.pivot.x = 8;
  e.pivot.y = 15;
  e.spriteId = "player";
  e.shadowId = "player_shadow";
  e.shadowOffset.x = 0;
  e.shadowOffset.y = 2;

  e.stats = run.stats;

  e.isPlayer = true;

  addEntity(scene, e);
  switchState(e, "player_idle");

  return e;
}
