import { drawSprite, isInputDown } from "snuggy";
import { Input, Texture, Type } from "@/consts.ts";
import { type Entity, entities, playerIdx, setPlayerIdx } from "@/data.ts";
import { addEntity, setEntityTransform } from "@/lib/entities.ts";
import { setHitbox } from "@/lib/entity.ts";
import { resetVec } from "@/lib/vec.ts";

export function addPlayer(x: number, y: number) {
  const e = addEntity(Type.PLAYER, x, y);
  e.sheet.health = 50;
  e.sheet.healthMax = 50;
  e.speed = 1;
  setHitbox(e, -4, -2, 8, 2);
  setPlayerIdx(e.idx);
}

export function updatePlayer(e: Entity) {
  resetVec(e.vel);

  if (isInputDown(Input.UP)) {
    e.vel.y -= 1;
  }
  if (isInputDown(Input.DOWN)) {
    e.vel.y += 1;
  }
  if (isInputDown(Input.LEFT)) {
    e.vel.x -= 1;
    e.isFlipped = true;
  }
  if (isInputDown(Input.RIGHT)) {
    e.vel.x += 1;
    e.isFlipped = false;
  }
}

export function getPlayerIfAlive() {
  const e = entities[playerIdx];

  if (e.type === Type.PLAYER && e.isActive) {
    return e;
  }

  return null;
}

export function drawPlayer(e: Entity) {
  setEntityTransform(e, true);
  drawSprite(Texture.ATLAS, -8, -15, 0, 0, 16, 16);
}
