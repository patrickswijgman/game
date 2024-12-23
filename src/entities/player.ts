import { newEntity, switchState } from "data/entity.js";
import { getCurrentRun } from "data/game.js";
import { addEntity, Scene } from "data/scene.js";
import { vec } from "ridder";

export function addPlayer(scene: Scene, x: number, y: number) {
  const run = getCurrentRun();

  const e = newEntity({
    pos: vec(x, y),
    spriteId: "player",
    shadowId: "player_shadow",
    shadowOffset: vec(0, 2),
    pivot: vec(8, 15),
    stats: run.stats,
    isPlayer: true,
  });

  switchState(e, "player_idle");
  addEntity(scene, e);

  return e;
}
