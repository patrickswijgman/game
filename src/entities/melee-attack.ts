import { newEntity, switchState } from "data/entity.js";
import { Item } from "data/items.js";
import { addEntity, Scene } from "data/scene.js";
import { vec } from "ridder";

export function addMeleeAttack(scene: Scene, x: number, y: number, weapon: Item) {
  const e = newEntity({
    pos: vec(x, y),
    spriteId: weapon.spriteId,
    pivot: weapon.pivot,
    stats: weapon.stats,
  });

  switchState(e, "melee_attack_windup");
  addEntity(scene, e);

  return e;
}
