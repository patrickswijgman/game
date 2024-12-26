import { COLOR_BG } from "consts.js";
import { Entity, newEntity } from "entity.js";
import { pick, tickTimer, tween } from "ridder";
import { Scene } from "scene.js";

const DIRECTIONS = [-1, 1];

export function newCombatText(scene: Scene, x: number, y: number, text: string) {
  const e = newEntity(scene, x, y);
  e.type = "combat_text";
  e.text = text;
  e.textAlign = "center";
  e.textBaseline = "middle";
  e.textOutline = COLOR_BG;
  e.lifetime = 1000;
  e.scale.x = 0.5;
  e.scale.y = 0.5;
  e.direction.x = pick(DIRECTIONS);
  return e;
}

export function updateCombatText(e: Entity) {
  tickTimer(e.tweenTimer, 1000);
  const x = e.direction.x * 20;
  const y = -40;
  e.pos.x = tween(e.start.x, e.start.x + x, 1000, "linear", e.tweenTimer.elapsed);
  e.pos.y = tween(e.start.y, e.start.y + y, 500, "easeOutSine", e.tweenTimer.elapsed);
}