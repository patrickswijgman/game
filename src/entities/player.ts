import { newEntity } from "data/entity.js";
import { getCurrentRun } from "data/game.js";

export function newPlayer(x: number, y: number) {
  const e = newEntity(x, y);
  const run = getCurrentRun();

  e.nextStateId = "player_idle";

  e.pivot.x = 8;
  e.pivot.y = 15;
  e.spriteId = "player";
  e.shadowId = "player_shadow";
  e.shadowOffset.x = 0;
  e.shadowOffset.y = 2;

  e.stats = run.stats;

  e.isPlayer = true;

  return e;
}
