import { drawSprite, isInputDown, pointerWorldX } from "snuggy";
import { animateBreathe } from "@/anims/breathe.ts";
import { animateWalk } from "@/anims/walk.ts";
import { Input, Texture, Type } from "@/consts.ts";
import { isFlipped, posX, posY, setPlayer, speed } from "@/data.ts";
import { addEntityAnimationTransform, setEntityTransform, setHitbox, setupEntity, updateHitbox } from "@/lib/entity.ts";
import { seek } from "@/lib/steering.ts";

export function setupPlayer(x: number, y: number) {
  const id = setupEntity(Type.PLAYER, x, y);
  setHitbox(id, -5, -15, 10, 15);
  speed[id] = 1;
  setPlayer(id);
}

export function updatePlayer(id: number) {
  let x = posX[id];
  let y = posY[id];

  if (isInputDown(Input.UP)) {
    y -= 1;
  }
  if (isInputDown(Input.DOWN)) {
    y += 1;
  }
  if (isInputDown(Input.LEFT)) {
    x -= 1;
  }
  if (isInputDown(Input.RIGHT)) {
    x += 1;
  }

  const isMoving = seek(id, x, y);

  updateHitbox(id);

  isFlipped[id] = pointerWorldX < posX[id];

  if (isMoving) {
    animateWalk(id);
  } else {
    animateBreathe(id);
  }

  setEntityTransform(id, true);
  drawSprite(Texture.ATLAS, -16, -3, 0, 32, 32, 16);
  addEntityAnimationTransform(id);
  drawSprite(Texture.ATLAS, -16, -31, 0, 80, 32, 32);
  drawSprite(Texture.ATLAS, -16, -31, 0, 0, 32, 32);
}
