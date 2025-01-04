import { COLOR_BG, COLOR_TEXT } from "consts.js";
import { Entity, newEntity } from "entity.js";
import { pick, tickTimer, tween } from "ridder";
import { Scene } from "scene.js";

const DIRECTIONS = [-1, 1];

export function newCombatText(scene: Scene, x: number, y: number, text: string) {
  const e = newEntity(scene, "combat_text", x, y);

  e.text = text;
  e.textAlign = "center";
  e.textBaseline = "middle";
  e.textColor = COLOR_TEXT;
  e.textOutline = COLOR_BG;
  e.lifetime = 1000;
  e.scale.x = 0.75;
  e.scale.y = 0.75;
  e.direction.x = pick(DIRECTIONS);

  return e;
}

export function updateCombatText(e: Entity) {
  tickTimer(e.tweenTimer, 1000);
  e.tweenPosition.x = tween(0, e.direction.x * 20, 1000, "linear", e.tweenTimer.elapsed);
  e.tweenPosition.y = tween(0, -40, 500, "easeOutSine", e.tweenTimer.elapsed);
}
