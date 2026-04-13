import { drawSprite } from "snuggy";
import { Texture, Type } from "@/consts.ts";
import type { Entity } from "@/data.ts";
import { getPlayerIfAlive } from "@/entities/player.ts";
import { addEntity, setEntityTransform } from "@/lib/entities.ts";
import { setBody } from "@/lib/entity.ts";

export function addEnemy(x: number, y: number) {
  const e = addEntity(Type.ENEMY, x, y);
  e.sheet.health = 10;
  e.sheet.healthMax = 10;
  e.speed = 0.5;
  setBody(e, -4, -2, 8, 2);
}

export function updateEnemy(e: Entity) {
  const player = getPlayerIfAlive();

  if (player) {
    e.isFlipped = player.pos.x < e.pos.x;
  }
}

export function drawEnemy(e: Entity) {
  setEntityTransform(e, true);
  drawSprite(Texture.ATLAS, -8, -15, 16, 0, 16, 16);
}
